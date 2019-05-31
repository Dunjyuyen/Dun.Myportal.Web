<template>
  <mu-card v-if="isShow" style="width: 100%; max-width: 375px; margin: 0 auto;">
    <mu-card-text>{{$store.state.currentDoneExamId.length+1}}/{{$store.state.currentExamData.length}}.{{examQuestion.content}}</mu-card-text>
    <mu-card-text>
      <mu-chip color="primary">{{examQuestion.id}}</mu-chip>
      <mu-chip color="primary">{{examQuestion.desc}}</mu-chip>
      <mu-chip color="primary">{{examQuestion.typeId}}</mu-chip>
      <mu-chip color="primary">{{examQuestion.level == 1? '易':'难'}}</mu-chip>
      <van-checkbox-group class="select-control-group" v-model="user_answer">
        <van-checkbox name="A">{{examQuestion.option_1}}</van-checkbox>
        <van-checkbox name="B">{{examQuestion.option_2}}</van-checkbox>
        <van-checkbox name="C">{{examQuestion.option_3}}</van-checkbox>
        <van-checkbox name="D">{{examQuestion.option_4}}</van-checkbox>
      </van-checkbox-group>
      <van-notice-bar wrapable v-if="isDone && !isError" color="#4caf50" :scrollable="false">作答正确!</van-notice-bar>
      <van-notice-bar
        wrapable
        v-if="isDone && isError"
        :scrollable="false"
      >作答错误! 正确答案:{{examQuestion.answer}}</van-notice-bar>
    </mu-card-text>

    <mu-card-actions>
      <mu-button color="error" @click="handleFinish()">结束</mu-button>
      <mu-button color="primary" v-bind:disabled="isDone" @click="handleSubmit()">提交</mu-button>
      <mu-button v-bind:disabled="!$store.state.isWork" @click="handleNext()">下一题</mu-button>
    </mu-card-actions>
  </mu-card>
</template>
<script>
import error from "../common/error";
export default {
  data() {
    return {
      normal: {
        checkbox: true,
        radio: 1,
        switch: false
      },
      examQuestion: null,
      isShow: false,
      isShow: false,
      isDone: false,
      user_answer: ["A", "B"]
    };
  },
  methods: {
    initExamQuestion() {
      let exams = this.$store.state.currentExamData;
      if (exams.length == 0) {
        const toast = this.$toast({
          message: "获取题目失败",
          type: "fail",
          onClose: () => {
            this.$router.push("/hello");
          }
        });
      } else {
        this.getRandomExam();
      }
    },
    getRandomExam() {
      this.isDone = false;
      this.isError = false;
      let exams = this.$store.state.currentExamData;
      let currentDoneExamId = this.$store.state.currentDoneExamId;
      if (currentDoneExamId.length > exams.length + 1) {
        this.$store.state.isWork = false;
        this.$dialog
          .confirm({
            title: "提示",
            message: "已作答完成了！！"
          })
          .then(() => {
            this.$store.commit("initExamData", () => {
              this.$router.push("/hello");
            });
          })
          .catch(() => {});
        return;
      }
      let loop = 0;
      while (
        currentDoneExamId.indexOf(loop) > -1 &&
        currentDoneExamId.length < exams.length + 1
      ) {
        var question = exams[Math.floor(Math.random() * exams.length)];
        loop = question.id;
        this.examQuestion = question;
      }
      this.isShow = true;
    },
    optionCheck(answer) {
      let error = false;
      for (var i in answer) {
        if (this.examQuestion.answer.indexOf(answer[i]) == -1) {
          error = true;
          break;
        }
      }
      if (answer.length != this.examQuestion.answer.length) {
        error = true;
      }
      return error;
    },
    handleSubmit() {
      this.isDone = true;
      this.isError = this.optionCheck(this.user_answer);
      if (this.isError) {
        str = "";
        for (i in this.user_answer) {
          str += this.user_answer[i];
        }
        error.addExamUserError(this.examQuestion.id, str);
      }
    },
    handleNext() {
      let currentDoneExamId = this.$store.state.currentDoneExamId;
      currentDoneExamId.push(this.examQuestion.id);
      this.$store.commit("setCurrentDoneExamId", currentDoneExamId);
      this.getRandomExam();
    },
    handleFinish() {
      this.$dialog
        .confirm({
          title: "提示",
          message: "确认是否退出考试"
        })
        .then(() => {
          this.$store.commit("initExamData", () => {
            this.$router.push("/hello");
          });
        })
        .catch(() => {});
    }
  },
  mounted() {
    this.initExamQuestion();
  },
  beforeDestroy() {
    this.$store.commit("initExamData", () => {});
  }
};
</script>
<style lang="less" scoped>
.select-control-row {
  padding: 8px 0;
}
.select-control-group {
  margin: 16px 0;
  line-height: 40px;
}
</style>


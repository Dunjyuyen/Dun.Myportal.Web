<template>
  <mu-card v-if="isShow" style="width: 100%; max-width: 375px; margin: 0 auto;">
    <mu-card-text>{{$store.state.currentDoneExamId.length}}/{{$store.state.currentExamData.length+1}}.{{examQuestion.content}}</mu-card-text>
    <mu-card-text>
      <mu-chip color="primary">{{examQuestion.id}}</mu-chip>
      <mu-chip color="primary">{{examQuestion.desc}}</mu-chip>
      <mu-chip color="primary">{{examQuestion.typeId}}</mu-chip>
      <mu-chip color="primary">{{examQuestion.level == 1? '易':'难'}}</mu-chip>
      <van-radio-group
        v-if="examQuestion.typeId==1"
        class="select-control-group"
        v-model="user_answer_single"
      >
        <van-radio name="A">{{examQuestion.option_1}}</van-radio>
        <van-radio name="B">{{examQuestion.option_2}}</van-radio>
        <van-radio name="C">{{examQuestion.option_3}}</van-radio>
        <van-radio name="D">{{examQuestion.option_4}}</van-radio>
      </van-radio-group>

      <van-checkbox-group
        v-if="examQuestion.typeId==2"
        class="select-control-group"
        v-model="user_answer"
      >
        <van-checkbox name="A">{{examQuestion.option_1}}</van-checkbox>
        <van-checkbox name="B">{{examQuestion.option_2}}</van-checkbox>
        <van-checkbox name="C">{{examQuestion.option_3}}</van-checkbox>
        <van-checkbox name="D">{{examQuestion.option_4}}</van-checkbox>
      </van-checkbox-group>

      <van-radio-group
        v-if="examQuestion.typeId==3"
        class="select-control-group"
        v-model="user_answer_single"
      >
        <van-radio :name="1">正确 √</van-radio>
        <van-radio :name="-1">错误 ×</van-radio>
      </van-radio-group>
      <van-notice-bar wrapable v-if="isDone && !isError" color="#4caf50" :scrollable="false">作答正确!</van-notice-bar>
      <van-notice-bar
        wrapable
        v-if="isDone && isError"
        :scrollable="false"
      >作答错误! 正确答案:{{examQuestion.typeId==3? examQuestion.answer==1?'√':'×' :examQuestion.answer }}</van-notice-bar>
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
      user_answer_single:"",
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
              this.$router.push("/hello/error");
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
        loop = question.examQuestionId;
        this.examQuestion = question.examQuestion;
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

      switch (this.examQuestion.typeId) {
        case 1:
          this.isError = this.user_answer_single != this.examQuestion.answer;
          if (this.isError) {
            //error.addExamUserError(this.examQuestion.id, this.user_answer_single);
          }
          break;
        case 2:
          this.isError = this.optionCheck(this.user_answer);
          if (this.isError) {
            let str = "";
            for (var i in this.user_answer) {
              str += this.user_answer[i];
            }
            //error.addExamUserError(this.examQuestion.id, str);
          }
          break;
        case 3:
          this.isError = this.user_answer_single != this.examQuestion.answer;
          if (this.isError) {
            //error.addExamUserError(this.examQuestion.id, this.user_answer_single);
          }
          break;
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
          message: "确认是否退出"
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


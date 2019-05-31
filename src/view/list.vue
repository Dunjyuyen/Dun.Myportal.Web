<template>
  <mu-list toggle-nested>
    <mu-list-item
      button
      :ripple="false"
      nested
      :open="open === 'send'"
      @toggle-nested="open = arguments[0] ? 'send' : ''"
    >
      <mu-list-item-action>
        <mu-icon value="send"></mu-icon>
      </mu-list-item-action>
      <mu-list-item-title>运营知识题库</mu-list-item-title>
      <mu-list-item-action>
        <mu-icon class="toggle-icon" size="24" value="keyboard_arrow_down"></mu-icon>
      </mu-list-item-action>
      <mu-list-item @click="handleOnClickExam(1,1)" button :ripple="false" slot="nested">
        <mu-list-item-title>单选题</mu-list-item-title>
      </mu-list-item>
      <mu-list-item @click="handleOnClickExam(2,1)" button :ripple="false" slot="nested">
        <mu-list-item-title>多选题</mu-list-item-title>
      </mu-list-item>
      <mu-list-item @click="handleOnClickExam(3,1)" button :ripple="false" slot="nested">
        <mu-list-item-title>判断题</mu-list-item-title>
      </mu-list-item>
    </mu-list-item>
  </mu-list>
</template>
<script>
import { getExamQuestions } from "../api/api";
export default {
  data() {
    return {
      open: "send"
    };
  },
  methods: {
    handleOnClickExam(typeId, groupId) {
      const toastLoading = this.$toast({
        mask: true,
        type:'loading',
        message: "加载题库中..."
      });
      let params = {
        typeId,
        groupId
      };
      getExamQuestions(params).then(res => {
        if (res.success) {
          this.$store.commit("setcurrentExamGroup", {
            groupId,
            name: ""
          });
          this.$store.commit("setCurrentExamData", res.result);
          this.$store.commit("setCurrentDoneExamId", [0]);
          this.$store.commit("setIsWork", true);
          switch (typeId) {
            case 1:
              this.$router.push("/exam_single");
              break;
            case 2:
              this.$router.push("/exam_mult");
              break;
            case 3:
              this.$router.push("/exam_judge");
              break;
          }
          toastLoading.clear()
        }
      });
    }
  }
};
</script>


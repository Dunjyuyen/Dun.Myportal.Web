<template>
<div>
  <!-- <van-loading style="margin: 0 16px;" v-if="loading" type="spinner" color="#1989fa" size="24px">加载中...</van-loading> -->
  <mu-list data-mu-loading-color="secondary"  v-loading="loading">
    <mu-list-item v-if="loading" button :ripple="false">
      <mu-list-item-title></mu-list-item-title>
      <mu-list-item-action>
         <mu-badge :content="0" color="secondary"></mu-badge>
      </mu-list-item-action>
    </mu-list-item>
    <mu-list-item v-for="item in groupErrorListData" :key='item.examGroup.id'  button @click="handleOnClickExam(item.examGroup.id)" :ripple="false">
      <mu-list-item-title>{{item.examGroup.name}}</mu-list-item-title>
      <mu-list-item-action>
         <mu-badge :content="item.count+''" color="secondary"></mu-badge>
      </mu-list-item-action>
    </mu-list-item>
  </mu-list>
</div>
</template>
<script>
import { getExamErrorQuestions } from "../api/api";

import { getExamUserErrorsCountByUserId } from "../api/api";
export default {
  data() {
    return {
      open: "send",
      loading:true,
      groupErrorListData:[]
    };
  },
  methods: {
    initGroupErrorList(){
      let params = {
        UserId:this.$cookies.get('userid')
      }
      getExamUserErrorsCountByUserId(params).then(res=>{
        if(res.success){
          this.groupErrorListData = res.result
        }
        this.loading = false;
      })
    },
    handleOnClickExam(groupId) {
      const toastLoading = this.$toast({
        mask: true,
        type:'loading',
        message: "加载题库中..."
      });
      let params = {
        UserId:this.$cookies.get('userid'),
        GroupId:groupId
      };
      getExamErrorQuestions(params).then(res=>{
        if (res.success) {
          this.$store.commit("setcurrentExamGroup", {
            groupId,
            name: ""
          });
          this.$store.commit("setCurrentExamData", res.result);
          this.$store.commit("setCurrentDoneExamId", [0]);
          this.$store.commit("setIsWork", true);
          this.$router.push('/exam_error')
          toastLoading.clear()
        }
      })
    }
  },
  mounted(){
    this.initGroupErrorList()
  }
};
</script>


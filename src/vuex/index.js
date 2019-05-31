import Vue from 'vue';
import Vuex from 'vuex';
import * as Cookies from "js-cookie"
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    enc_auth_token:"",
    AuthToken:"",
    userId:null,
    options: [],
    isWork: false,
    errors:[],
    currentExamGroup: {
      name:"",
      groupId:0
    },
    currentExamData: [],
    currentDoneExamId: [],
  },
  mutations: {
    setcurrentExamGroup(state, val) {
      this.state.currentExamGroup = val;
    },
    setCurrentExamData(state, val) {
      this.state.currentExamData = val;
    },
    setCurrentDoneExamId(state, val) {
      this.state.currentDoneExamId = val;
    },
    setErrors(state, val) {
      this.state.errors = val;
    },
    setIsWork(state, val) {
      this.state.isWork = val;
    },
    set_token(state, val) {
      Cookies.set('Abp.AuthToken', val.accessToken, {
        expires: val.expireInSeconds / 86400
      });
    },
    set_enc_auth_token(state, val) {
      Cookies.set('enc_auth_token', val.encryptedAccessToken, {
        expires: val.expireInSeconds / 86400
      });
    },
    set_userid(state, val) {
      Cookies.set('userid', val.userId, {
        expires: val.expireInSeconds / 86400
      });
    },
    initExamData(state,callback){
      this.state.isWork = false
      this.state.currentExamGroup = {
        name:"",
        groupId:0
      }
      this.state.currentExamData = []
      this.state.currentDoneExamId = []
      this.state.errors = []
      callback()
    },
    clear_cookie(state,callback){
      Cookies.remove('Abp.AuthToken')
      Cookies.remove('enc_auth_token')
      Cookies.remove('userid')
      callback();
    },
    is_login(state,callback){
      if(Cookies.get('userid') != undefined){
        callback(true)
      }else{
        callback(false)
      }
    }
  }
});
export default store;

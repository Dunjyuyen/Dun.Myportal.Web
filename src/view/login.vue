<template>
  <mu-card style="width: 100%; max-width: 375px; margin: 0 auto;">
    <mu-card-title title="欢迎使用应用" sub-title="请先登录账号"></mu-card-title>
    <mu-card-text>
      <mu-form ref="form" :model="validateForm" class="mu-demo-form">
        <mu-form-item label="用户名" prop="username" :rules="usernameRules">
          <mu-text-field v-model="validateForm.username" prop="username"></mu-text-field>
        </mu-form-item>
        <mu-form-item label="密码" prop="password" :rules="passwordRules">
          <mu-text-field type="password" v-model="validateForm.password" prop="password"></mu-text-field>
        </mu-form-item>
        <mu-form-item prop="isAgree">
          <mu-checkbox label="保存密码" v-model="validateForm.rememberClient"></mu-checkbox>
        </mu-form-item>
        <mu-form-item>
          <mu-button color="primary" @click="submit">登录</mu-button>
        </mu-form-item>
      </mu-form>
    </mu-card-text>
  </mu-card>
</template>

<script>
import { authenticate } from "../api/api";
export default {
  data() {
    return {
      usernameRules: [
        { validate: val => !!val, message: "必须填写用户名" },
        { validate: val => val.length >= 3, message: "用户名或邮箱地址" }
      ],
      passwordRules: [
        { validate: val => !!val, message: "必须填写密码" },
        {
          validate: val => val.length >= 3 && val.length <= 10,
          message: "6位密码"
        }
      ],
      validateForm: {
        username: "",
        password: "",
        rememberClient: false
      }
    };
  },
  methods: {
    submit() {
      this.$refs.form.validate().then(result => {
        if (!result) return;
        let param = {
          userNameOrEmailAddress: this.validateForm.username,
          password: this.validateForm.password
        };
        authenticate(param).then(res => {
          if (res.success) {
            this.$store.commit("set_token", res.result);
            this.$store.commit("set_enc_auth_token", res.result);
            this.$store.commit("set_userid", res.result);
            this.$router.push("/hello");
          }
        });
      });
    },
    clear() {
      this.$refs.form.clear();
      this.validateForm = {
        username: "",
        password: "",
        rememberClient: false
      };
    }
  }
};
</script>
<style>
.mu-demo-form {
  width: 100%;
  max-width: 460px;
}
</style>
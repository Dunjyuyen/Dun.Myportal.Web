<template>
  <div>
    <mu-appbar color="primary" style="width: 100%;" :title="$route.name">
      <mu-menu slot="right">
    <mu-button flat>MENU</mu-button>
    <mu-list slot="content">
      <mu-list-item @click='logout()' button>
        <mu-list-item-content>
          <mu-list-item-title>退出登录</mu-list-item-title>
        </mu-list-item-content>
      </mu-list-item>
    </mu-list>
  </mu-menu>
    </mu-appbar>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$router.push("/");
    }
  },
  mounted() {
  }
};
</script>

<style <style lang="less">
#container {
  margin-top: 30px;
}
.mu-radio-label {
  white-space: pre-wrap;
}
</style>

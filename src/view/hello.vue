<template>
  <div>
    <mu-card style="width: 100%; max-width: 375px; margin: 0 auto;">
      <mu-card-header title="Myron Avatar" sub-title="sub title">
        <mu-avatar slot="avatar"></mu-avatar>
      </mu-card-header>

      <!-- <mu-card-title title="Content Title" sub-title="Content Title"></mu-card-title> -->
      <mu-card-text>
        <router-view/>
      </mu-card-text>
    </mu-card>
    <mu-bottom-nav>
      <mu-bottom-nav-item href='button' title="题库列表" icon="restore" to = '/hello'></mu-bottom-nav-item>
      <mu-bottom-nav-item
        title="错题集"
        icon="favorite"
        to = '/hello/error'
      ></mu-bottom-nav-item>
      <mu-bottom-nav-item
        title="学习笔记"
        icon="location_on"
        to = '/hello/note'
      ></mu-bottom-nav-item>
      <mu-bottom-nav-item
        title="学习计划"
        icon="location_on"
        to = '/hello/plan'
      ></mu-bottom-nav-item>
    </mu-bottom-nav>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleOnClickBottomMenu(val) {
      console.log(val);
      if (val != "/hello")
        // this.$toast.message('亲!该模块还在开发中(#^.^#)');
        return;
      this.$router.push(val);
    }
  }
};
</script>

<style lang="less">
</style>
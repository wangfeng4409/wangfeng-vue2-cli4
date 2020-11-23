<template>
  <div class="navbar">
    <div class="left">
      <breadcrumb />
    </div>
    <div class="right" @click="handleLoginout">退出登录</div>
  </div>
</template>

<script>
import Breadcrumb from "./components/Breadcrumb";

export default {
  name: "NavBar",
  components: {
    Breadcrumb
  },
  methods: {
    handleLoginout() {
      this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  .left {
    flex: 1;
  }
  .right {
    width: 150px;
    cursor: pointer;
  }
}
</style>

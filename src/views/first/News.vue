<template>
  <div class="news">
    <h1 @click="handleJump">{{ msg }}</h1>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "News",
  data() {
    return {
      msg: "news"
    };
  },
  methods: {
    handleJump() {
      this.$router.push({
        path: "/second/about"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
h1 {
  margin: 40px 0 0;
}
</style>

<template>
  <div class="hello">
    <h1 @click="handleJump">{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: "Message",
  props: {
    msg: String
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

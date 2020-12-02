<template>
  <div class="hello">
    <h1 @click="handleJump">{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: "Three",
  data() {
    return {
      msg: "three"
    };
  },
  methods: {
    handleJump() {
      this.$router.push({
        name: "About",
        query: {
          id: "111",
          name: "wf",
          date: "2020-10-10"
        }
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

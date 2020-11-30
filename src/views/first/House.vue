<template>
  <div class="house">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: "House",
  data() {
    return {
      msg: "house"
    };
  }
};
</script>

<style lang="scss" scoped>
h1 {
  margin: 40px 0 0;
}
</style>

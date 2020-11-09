<template>
  <div class="navbar">
    <div class="left">
      <breadcrumb />
    </div>
    <div class="right">22</div>
  </div>
</template>

<script>
import Breadcrumb from "./components/Breadcrumb";

export default {
  name: "NavBar",
  components: {
    Breadcrumb
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
  }
}
</style>

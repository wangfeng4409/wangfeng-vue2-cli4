<template>
  <div class="aside">
    <div class="title">wangfeng</div>
    <el-menu :default-active="$route.path" router>
      <side-item
        v-for="route in routes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
    </el-menu>
  </div>
</template>
<script>
import SideItem from "./components/SideItem";
export default {
  name: "SideItems",
  components: {
    SideItem
  },
  computed: {
    routes() {
      console.log(this.$router, "sideItems");
      return this.$router.options.routes.filter(route => route.children);
    }
  }
};
</script>
<style lang="scss" scoped>
.aside {
  .title {
    font-size: 20px;
    padding: 20px 0px;
    font-weight: bolder;
  }
}
</style>

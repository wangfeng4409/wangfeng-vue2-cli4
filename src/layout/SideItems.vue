<template>
  <div class="aside">
    <div class="title">wangfeng</div>
    <el-menu :default-active="$route.path" router>
      <side-item
        v-for="route in permission_routes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
    </el-menu>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import SideItem from "./components/SideItem";
export default {
  name: "SideItems",
  components: {
    SideItem
  },
  computed: {
    ...mapGetters(["permission_routes"])
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

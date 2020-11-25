<template>
  <div class="aside">
    <el-menu
      :default-active="$route.path"
      @open="test"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
      router
    >
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
      return this.$router.options.routes.filter(route => route.children);
    }
  },
  methods: {
    test(key, keyPath) {
      if (key === "news") {
        let route = "";
        keyPath.forEach((key, index) => {
          if (index === keyPath.length - 1) {
            route += "/" + key;
          } else {
            route += key;
          }
        });
        this.$router.push({
          path: route
        });
      }
    }
  }
};
</script>

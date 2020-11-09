<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="item in levelList" :key="item.path">
        {{ item.meta.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "Breadcrumb",
  data() {
    return {
      levelList: null
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    }
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {
      this.levelList = this.$route.matched.filter(
        item => item.meta && item.meta.title
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.breadcrumb {
  width: 100%;
  height: 100%;
}
</style>

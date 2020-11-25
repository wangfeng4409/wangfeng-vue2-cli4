<template>
  <div class="app-wrapper">
    <el-container>
      <el-aside width="200px">
        <side-items />
      </el-aside>
      <el-container>
        <el-header>
          <nav-bar />
        </el-header>
        <el-main>
          <app-main />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import SideItems from "./SideItems";
import NavBar from "./NavBar";
import AppMain from "./AppMain";
export default {
  name: "Layout",
  components: {
    SideItems,
    NavBar,
    AppMain
  }
};
</script>

<style lang="scss" scoped>
.app-wrapper {
  height: 100%;
}
.el-container {
  height: 100%;
}
.el-header {
  background-color: #ffffff;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}
</style>

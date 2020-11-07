<template>
  <div class="aside">
    <el-menu :default-active="$route.path" router>
      <el-submenu index="/admin">
        <template slot="title"> <i class="el-icon-message"></i>Admin </template>
        <el-menu-item-group>
          <el-menu-item index="/admin/home">
            home
          </el-menu-item>
          <el-menu-item index="/admin/news">
            news
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="/second">
        <template slot="title"> <i class="el-icon-menu"></i>导航二 </template>
        <el-menu-item-group>
          <el-menu-item index="/second/about">
            About
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

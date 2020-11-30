<template>
  <div>
    <!-- 单个路由情况 -->
    <el-menu-item
      v-if="
        item.children &&
          item.children.filter(val => val.path && !val.hidden).length === 0
      "
      :index="item.path"
      :key="item.path"
    >
      <i v-if="basePath.split('/').length === 2" class="el-icon-setting" />
      <span slot="title">{{ item.meta.title }}</span>
    </el-menu-item>

    <!-- 多级路由嵌套 -->
    <el-submenu
      v-else-if="
        item.children &&
          item.children.filter(val => val.path && !val.hidden).length > 0
      "
      :index="item.path"
      :key="item.path"
    >
      <template slot="title">
        <i v-if="basePath.split('/').length === 2" class="el-icon-menu" />
        {{ item.meta.title }}
      </template>

      <template
        v-for="child in item.children.filter(val => val.path && !val.hidden)"
      >
        <!-- 二级以上路由嵌套 -->
        <template v-if="child.children && child.children.length > 0">
          <side-item
            :key="child.path"
            :item="child"
            :base-path="basePath + '/' + child.path"
          />
        </template>
        <!-- 二级路由嵌套 -->
        <el-menu-item
          v-else
          :index="basePath + '/' + child.path"
          :key="basePath + '/' + child.path"
        >
          {{ child.meta.title }}
        </el-menu-item>
      </template>
    </el-submenu>
  </div>
</template>
<script>
export default {
  name: "SideItem",
  props: {
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ""
    }
  }
};
</script>

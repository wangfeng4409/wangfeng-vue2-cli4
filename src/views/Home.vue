<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Hello World" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/Message.vue";
import { postList } from "@/api/interface.js";

export default {
  name: "Home",
  components: {
    HelloWorld
  },
  data() {
    return {
      search: {
        startDate:
          "" +
          new Date().getFullYear() +
          "-" +
          (new Date().getMonth() + 1 < 10
            ? "0" + (new Date().getMonth() + 1)
            : new Date().getMonth() + 1) +
          "-" +
          (new Date().getDate() < 10
            ? "0" + new Date().getDate()
            : new Date().getDate()), // 时间查询-开始时间
        endDate:
          "" +
          new Date().getFullYear() +
          "-" +
          (new Date().getMonth() + 1 < 10
            ? "0" + (new Date().getMonth() + 1)
            : new Date().getMonth() + 1) +
          "-" +
          (new Date().getDate() < 10
            ? "0" + new Date().getDate()
            : new Date().getDate()), // 时间查询-结束时间时间
        customerInfo: "", // 客户查询的搜索条件
        customerType: "", // 类型查询的搜索条件
        customerSubType: "", // 类型查询的子类型
        area: "", // 所选择的大区
        branchName: "", // 所输入的分公司
        officeName: "", // 所输入的营业所
        business: "", // 业务查询的搜索条件
        sex: "", // 性别选择
        customerLabel: "", // 客户价值类型筛选
        orderBy: "customerLabel", // 排序的字段; 业绩排序 -> "sumAmount"; 拜访数排序 -> "visitCount"
        orderType: "", // 0升序 1降序
        page: 1,
        rows: 20
      }
    };
  },
  created() {
    this.axiosData();
  },
  methods: {
    axiosData() {
      postList("/labels/customers", this.search)
        .then(res => {
          if (res.code === 0) {
            console.log(res, "res");
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(() => {
          this.$message.error("接口出错,请重新再试");
        });
    }
  }
};
</script>

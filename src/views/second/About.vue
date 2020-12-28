/** * @Author: by wangfeng */
<template>
  <div class="wrapper">
    <div class="main">
      <div
        v-loading="mapshowLoading"
        class="left"
        element-loading-text="数据正在加载中,请稍等!"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.1)"
      >
        <Mapshow
          :adcodes="fAdcodes"
          :center="fCenter"
          :next-organization-id="fNextOrganizationId"
          :permission-type="fPermissionType"
          @sChangeDate="handleReceiveDate"
          @sChangeOrganizationId="handleReceiveId"
        />
      </div>
      <div
        v-loading="poststaffLoading"
        class="right"
        element-loading-text="数据正在加载中,请稍等!"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.1)"
      >
        <Poststaff
          :post-staff-list="fPostStaffList"
          :post-staff-name="fPostStaffName"
          :post-staff-type="fPostStaffType"
        />
      </div>
    </div>
    <div class="main">
      <div
        v-loading="datatargetLoading"
        class="left"
        element-loading-text="数据正在加载中,请稍等!"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.1)"
      >
        <Datatarget :target-list="fTargetList" />
      </div>
    </div>
  </div>
</template>

<script>
import Mapshow from "./Mapshow";
import Poststaff from "./Poststaff";
import Datatarget from "./Datatarget";
import { homemapApi } from "@/api/interface.js";
export default {
  name: "About",
  components: {
    Mapshow,
    Poststaff,
    Datatarget
  },
  data() {
    return {
      mapshowLoading: false,
      requestObj: {
        date:
          "" +
          new Date().getFullYear() +
          "-" +
          (new Date().getMonth() + 1 < 10
            ? "0" + (new Date().getMonth() + 1)
            : new Date().getMonth() + 1) +
          "-01",
        next: 1, // 1->往下寻找,-1->往上寻找,0->查找自己
        organizationId: "",
        employeeId: "00390190"
      },
      fAdcodes: [],
      fNextOrganizationId: "",
      fPermissionType: 0,
      fCenter: [],
      poststaffLoading: false,
      fPostStaffList: [
        { title: "分公司在岗数", numberposts: "", shortagerate: "" },
        { title: "区域经理在岗数", numberposts: "", shortagerate: "" },
        { title: "平台专员在岗数", numberposts: "", shortagerate: "" }
      ],
      fPostStaffName: "",
      fPostStaffType: 0,
      datatargetLoading: false,
      fTargetList: [
        { process: 0, number: "", dasharray: "0 251" },
        { process: 0, number: "", dasharray: "0 251" },
        { process: 0, number: "", dasharray: "0 251" },
        { process: 0, number: "", dasharray: "0 251" }
      ]
    };
  },
  created() {
    this.fetchMapDate();
    this.fetchStaffDate();
    this.fetchTargetDate();
  },
  methods: {
    // 接口请求地图数据
    fetchMapDate() {
      this.mapshowLoading = true;
      homemapApi("/organization/list", this.requestObj)
        .then(res => {
          if (res.code === 0) {
            this.fCenter = [];
            this.fNextOrganizationId = res.data.firstOrganizationId;
            this.fPermissionType = res.data.firstPositionTypeId;
            const organizationList = res.data.organizationList.filter(items => {
              return items.regionList.length;
            });
            organizationList.forEach(items => {
              let center = [];
              let color = "";
              items.regionList.forEach(item => {
                this.fCenter.length
                  ? ""
                  : (this.fCenter = [item.center.lng, item.center.lat]);
                center.length
                  ? ""
                  : (center = [item.center.lng, item.center.lat]);
                color ? "" : (color = item.color);
                item.center = [item.center.lng, item.center.lat];
                item.color = color;
              });
              items.center = center;
            });
            this.fAdcodes = organizationList;
            this.fAdcodes.length
              ? ""
              : this.$message.warning(
                  "该岗位还未进行区域划分，赶紧前往设置吧～"
                );
          } else {
            this.$message.error(res.msg);
          }
          this.mapshowLoading = false;
        })
        .catch(() => {
          this.mapshowLoading = false;
        });
    },
    // 接口请求组织人员配比数据
    fetchStaffDate() {
      this.poststaffLoading = true;
      homemapApi("/organization/staffing", {
        next: this.requestObj.next,
        organizationId: this.requestObj.organizationId,
        employeeId: this.requestObj.employeeId
      })
        .then(res => {
          if (res.code === 0) {
            this.fPostStaffName = res.data.firstEmployeeName;
            this.fPostStaffType = res.data.firstPositionTypeId;
            this.fPostStaffList = [];
            this.fPostStaffList.push(
              {
                title: "分公司在岗数",
                numberposts: res.data.companys,
                shortagerate: res.data.companyVacancyRate
              },
              {
                title: "区域经理在岗数",
                numberposts: res.data.managers,
                shortagerate: res.data.managerVacancyRate
              },
              {
                title: "平台专员在岗数",
                numberposts: res.data.commissioners,
                shortagerate: res.data.commissionerVacancyRate
              }
            );
            this.fPostStaffType === 3 ? this.fPostStaffList.shift() : "";
          } else {
            this.$message.error(res.msg);
          }
          this.poststaffLoading = false;
        })
        .catch(() => {
          this.poststaffLoading = false;
        });
    },
    // 接口请求组织区域
    fetchTargetDate() {
      this.datatargetLoading = true;
      homemapApi("/organization/data", this.requestObj)
        .then(res => {
          if (res.code === 0) {
            this.fTargetList = [];
            this.fTargetList.push(
              {
                process: res.data.transAmountRate,
                number: res.data.transAmountActual,
                dasharray:
                  "" +
                  parseInt((res.data.transAmountRate * 251) / 100).toFixed(2) +
                  " 251"
              },
              {
                process: res.data.newCustomerCountRate,
                number: res.data.newCustomerCountActual,
                dasharray:
                  "" +
                  parseInt((res.data.newCustomerCountRate * 251) / 100).toFixed(
                    2
                  ) +
                  " 251"
              },
              {
                process: res.data.dealCustomerCountRate,
                number: res.data.dealCustomerCountActual,
                dasharray:
                  "" +
                  parseInt(
                    (res.data.dealCustomerCountRate * 251) / 100
                  ).toFixed(2) +
                  " 251"
              },
              {
                process: res.data.firstOrderCustomerCountRate,
                number: res.data.firstOrderCustomerCountActual,
                dasharray:
                  "" +
                  parseInt(
                    (res.data.firstOrderCustomerCountRate * 251) / 100
                  ).toFixed(2) +
                  " 251"
              }
            );
          } else {
            this.$message.error(res.msg);
          }
          this.datatargetLoading = false;
        })
        .catch(() => {
          this.datatargetLoading = false;
        });
    },
    // 父组件接收子组件传来的日期
    handleReceiveDate(date) {
      this.requestObj.date = date + "-01";
      this.fetchMapDate();
      this.fetchTargetDate();
    },
    // 父组件接收子组件传来的organizationId 和 往下级查询数据type=1(往上级查询数据type=-1)
    handleReceiveId(id, type) {
      this.fCenter = [];
      this.requestObj.organizationId = id;
      this.requestObj.next = type;
      this.fetchMapDate();
      this.fetchStaffDate();
      this.fetchTargetDate();
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100vh - 100px);
  min-width: 1000px;
  min-height: 700px;
  background: #ebf1fa;
  padding: 20px;
  .main {
    display: flex;
    flex-direction: row;
    .left {
      flex: 1;
      margin-right: 20px;
      background: #fff;
    }
    .right {
      width: 390px;
      background: #fff;
    }
  }
  .main:nth-of-type(1) {
    flex: 1;
    min-height: 430px;
  }
  .main:nth-of-type(2) {
    height: 240px;
    margin-top: 20px;
    .left {
      margin-right: 0px;
    }
  }
}
</style>

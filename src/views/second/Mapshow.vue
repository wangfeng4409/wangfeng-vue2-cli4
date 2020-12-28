/** * @Author: by wangfeng */
<template>
  <div class="show-map show-map-info">
    <div id="container" />
    <div class="box">
      <div class="select-date">
        <el-date-picker
          v-model="datePicker"
          type="month"
          value-format="yyyy-MM"
          :picker-options="pickerOptions"
          placeholder="选择日期"
          :clearable="false"
          :editable="false"
          @change="handleChangeDate"
        />
      </div>
      <div v-show="nextOrganizationId" class="back">
        <el-button type="success" @click="handleBack(nextOrganizationId)"
          >返回</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Mapshow",
  props: {
    adcodes: {
      type: Array,
      default: () => {
        return [];
      }
    },
    center: {
      type: Array,
      default: () => {
        return [];
      }
    },
    nextOrganizationId: {
      type: String,
      default: ""
    },
    permissionType: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      Map: null,
      AMapUI: null,
      DistrictSearch: null,
      InfoWindow: null,
      datePicker:
        "" +
        new Date().getFullYear() +
        "-" +
        (new Date().getMonth() + 1 < 10
          ? "0" + (new Date().getMonth() + 1)
          : new Date().getMonth() + 1),
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      onlyChangeDateFlag: false,
      polygonList: [], // 记录当前所有绘制的行政区域
      markerList: [], // 记录当前所有的marker
      images: require("@/assets/branchMarker.png")
    };
  },
  watch: {
    adcodes: {
      handler(newVal) {
        this.obtainCode(newVal);
      },
      deep: true
    },
    center: {
      handler(newVal) {
        newVal.length
          ? this.Map.setCenter(newVal)
          : this.Map.setCenter([121.394504, 31.188856]);
        newVal.length ? this.Map.setZoom(4) : this.Map.setZoom(18); // 地图自适应
      },
      deep: true
    }
  },
  mounted() {
    this.initMap();
    this.initMapUI();
    this.initDistrictSearch();
    this.initInfoWindow();
    this.obtainCode(this.adcodes);
  },
  beforeDestroy() {
    this.Map.destroy();
  },
  methods: {
    // 初始化地图实例
    initMap() {
      this.Map = new AMap.Map("container", {
        resizeEnable: true,
        expandZoomRange: true,
        showIndoorMap: false,
        center: this.center.length ? this.center : [121.394504, 31.188856],
        zoom: 4,
        zooms: [3, 20]
      });
    },
    // 初始化地图UI
    initMapUI() {
      this.AMapUI = AMapUI;
      this.AMapUI.loadUI(["control/BasicControl"], BasicControl => {
        const zoomCtrl = new BasicControl.Zoom({
          position: "br",
          showZoomNum: true
        });
        this.Map.addControl(zoomCtrl);
      });
    },
    // 初始化行政区实例
    initDistrictSearch() {
      this.DistrictSearch = new AMap.DistrictSearch({
        subdistrict: 1, // 返回下一级行政区
        showbiz: false, // 是否显示商圈
        extensions: "all" // 返回行政区域边界坐标等具体信息
      });
    },
    // 初始化信息窗体
    initInfoWindow() {
      this.InfoWindow = new AMap.InfoWindow({
        isCustom: true,
        offset: new AMap.Pixel(0, -10)
      });
    },
    // 获取行政区code
    obtainCode(adcodes) {
      adcodes.forEach(items => {
        if (!this.onlyChangeDateFlag) {
          items.regionList.forEach(item => {
            this.DistrictSearch.setLevel(item.administrationName);
            this.DistrictSearch.search(item.code, (status, result) => {
              if (status === "complete") {
                this.drawArea(result.districtList[0], item.color);
              }
            });
          });
        }
        this.drawMarker(items);
      });
    },
    // 绘制管辖区域
    drawArea(data, color) {
      const bounds = data.boundaries; // 记录区域边界
      if (bounds) {
        for (let i = 0, l = bounds.length; i < l; i++) {
          const polygon = new AMap.Polygon({
            // 将区域边界绘制到地图上
            map: this.Map,
            strokeWeight: 1,
            strokeColor: color,
            strokeOpacity: 0.5, // 线透明度
            fillColor: color,
            fillOpacity: 0.5,
            path: bounds[i]
          });
          this.polygonList.push(polygon); // 记录当前所有绘制的行政区域
        }
      }
      this.Map.setFitView(); // 地图自适应
    },
    // 绘制marker
    drawMarker(items) {
      const content =
        `
                    <div class="info">
                        <div class="title">` +
        (items.organizationName || `-`) +
        `</div>
                        <div class="text" style=display:` +
        (items.organizationType === "area" ||
        items.organizationType === "company"
          ? `block`
          : `none`) +
        `>` +
        (items.organizationType === "area"
          ? `大区`
          : items.type === "company"
          ? `分公司`
          : `营业所`) +
        `配置：` +
        (items.positionNum || 0) +
        `</div>
                        <div class="text" style=display:` +
        (items.organizationType === "area" ||
        items.organizationType === "company"
          ? `block`
          : `none`) +
        `>人员状态：` +
        (items.onboardNum || 0) +
        `</div>
                        <div class="text" style=display:` +
        (items.organizationType === "branch" ? `block` : `none`) +
        `>业务人员：` +
        (items.employeeName || `缺编`) +
        `</div>
                        <div class="text">销售额：` +
        (items.monthPerformance
          ? parseFloat(items.monthPerformance).toFixed(2)
          : 0) +
        `</div>
                        <div class="text">目标达成：` +
        (items.attainment || `0`) +
        `%</div>
                    </div>
                `;
      const marker = new AMap.Marker({
        map: this.Map,
        icon: new AMap.Icon({
          image: this.images,
          size: new AMap.Size(13, 28) // 图标大小
        }),
        position: items.center,
        offset: new AMap.Pixel(-10, -10)
      });
      marker.on("mouseover", () => {
        this.InfoWindow.setContent(content);
        this.InfoWindow.open(this.Map, marker.getPosition());
      });
      marker.on("mouseout", () => {
        this.Map.clearInfoWindow();
      });
      this.markerList.push(marker);
      if (
        this.permissionType === 0 ||
        this.permissionType === 1 ||
        this.permissionType === 2
      ) {
        marker.on("click", () => {
          if (this.permissionType === 2) {
            this.$emit("sChangeOrganizationId", items.organizationId, 0);
          } else {
            this.$emit("sChangeOrganizationId", items.organizationId, 1);
          }
          for (let i = 0; i < this.polygonList.length; i++) {
            this.polygonList[i].setMap(null);
          }
          this.Map.remove(this.markerList);
          this.Map.clearInfoWindow();
          this.polygonList = [];
          this.markerList = [];
        });
      }
    },
    // 子组件选择日期事件 需要 传递给父组件
    handleChangeDate() {
      this.onlyChangeDateFlag = true;
      this.Map.remove(this.markerList);
      this.Map.clearInfoWindow();
      this.polygonList = [];
      this.markerList = [];
      this.$emit("sChangeDate", this.datePicker);
    },
    // 子组件点击返回事件 需要 传递给父组件
    handleBack(id) {
      this.onlyChangeDateFlag = false;
      for (let i = 0; i < this.polygonList.length; i++) {
        this.polygonList[i].setMap(null);
      }
      this.Map.remove(this.markerList);
      this.Map.clearInfoWindow();
      this.polygonList = [];
      this.markerList = [];
      this.$emit("sChangeOrganizationId", id, -1);
    }
  }
};
</script>

<style lang="scss" scoped>
.show-map {
  position: relative;
  width: 100%;
  height: 100%;
  #container {
    width: 100%;
    height: 100%;
  }
  .box {
    display: flex;
    flex-direction: row;
    position: absolute;
    top: 10px;
    left: 10px;
    .back {
      margin-left: 10px;
    }
  }
}
</style>
<style lang="scss">
.show-map-info {
  .info {
    border: none;
    border-radius: 5px;
    background-color: #ff8787;
    padding: 10px 20px;
    color: #fff;
    .title {
      font-size: 18px;
      font-weight: 700;
      padding-bottom: 10px;
      text-align: center;
    }
    .text {
      padding-bottom: 5px;
      font-size: 14px;
    }
    .text:nth-last-of-type(1) {
      padding-bottom: 0px;
    }
  }
}
</style>

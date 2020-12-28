<template>
  <div id="dataMap" class="data-map" />
</template>
<script>
import china from "echarts/map/json/china.json";
// import sichun from "@/utils/index.json";
// console.log(china, "china");
// import anhui from "echarts/map/json/province/anhui.json";
const chinaJson = JSON.parse(JSON.stringify(china));
function mergeProvinces(chinaJson, names, properties) {
  var features = chinaJson.features;
  const newFeatures = [];
  var polygons = [];
  var polygons2 = [];

  for (var i = 0; i < names.length; i++) {
    var polygonsCoordinates = [];
    var polygonsEncodeOffsets = [];
    for (var z = 0; z < names[i].length; z++) {
      for (var j = 0; j < features.length; j++) {
        if (features[j].properties.name == names[i][z]) {
          if (features[j].geometry.coordinates[0].constructor == String) {
            // 合并coordinates
            for (var l = 0; l < features[j].geometry.coordinates.length; l++) {
              polygonsCoordinates.push(features[j].geometry.coordinates[l]);
            }
          } else if (features[j].geometry.coordinates[0].constructor == Array) {
            for (var k = 0; k < features[j].geometry.coordinates.length; k++) {
              for (
                var d = 0;
                d < features[j].geometry.coordinates[k].length;
                d++
              ) {
                polygonsCoordinates.push(
                  features[j].geometry.coordinates[k][d]
                );
              }
            }
          }

          if (features[j].geometry.encodeOffsets[0].constructor == String) {
            // 合并encodeOffsets
            polygonsEncodeOffsets.push(features[j].geometry.encodeOffsets);
          } else if (
            features[j].geometry.encodeOffsets[0].constructor == Array
          ) {
            for (
              var kk = 0;
              kk < features[j].geometry.encodeOffsets.length;
              kk++
            ) {
              if (
                features[j].geometry.encodeOffsets[kk][0].constructor == Array
              ) {
                for (
                  var e = 0;
                  e < features[j].geometry.encodeOffsets[kk].length;
                  e++
                ) {
                  polygonsEncodeOffsets.push(
                    features[j].geometry.encodeOffsets[kk][e]
                  );
                }
              } else {
                polygonsEncodeOffsets.push(
                  features[j].geometry.encodeOffsets[kk]
                );
              }
            }
          }

          break;
        }
      }
    }
    polygons.push(polygonsCoordinates);
    polygons2.push(polygonsEncodeOffsets);
  }

  for (var a = 0; a < names.length; a++) {
    var feature = {
      id: features.length.toString(),
      type: "FeatureCollection",
      geometry: {
        type: "Polygon",
        coordinates: polygons[a],
        encodeOffsets: polygons2[a]
      },
      properties: {
        name: properties.name[a] || "",
        childNum: polygons[a].length
      }
    };
    if (properties.cp[a]) {
      feature.properties.cp = properties.cp[a];
    }

    // 将新的合并区域添加到地图中
    // features.push(feature)
    newFeatures.push(feature);
  }
  // chinaJson.features = features
  chinaJson.features = newFeatures;
}
var params = {
  names: [
    // 把各个大区的省份用二维数组分开
    ["北京", "天津", "河北", "山西", "内蒙古"],
    ["黑龙江", "吉林", "辽宁"],
    ["山东", "江苏", "安徽", "江西", "浙江", "福建", "上海", "台湾"],
    ["河南", "湖北", "湖南"],
    ["广东", "广西", "海南", "香港", "澳门"],
    ["重庆", "四川", "云南", "西藏", "贵州"],
    ["陕西", "甘肃", "青海", "宁夏", "新疆"]
  ],
  properties: {
    // 自定义大区的名字，要和上面的大区省份一一对应
    name: ["华北", "东北", "华东", "华中", "华南", "西南", "西北"],
    cp: [
      // 经纬度可以自己随意定义
      [116.24, 39.54],
      [126.32, 43.5],
      [121.28, 31.13],
      [114.2, 30.32],
      [113.15, 23.08],
      [104.04, 30.39],
      [103.49, 36.03]
    ]
  }
};

mergeProvinces(chinaJson, params.names, params.properties);
export default {
  name: "Three",
  data() {
    return {
      myChart: "",
      images: require("@/assets/branchMarker.png")
    };
  },
  mounted() {
    // console.log(chinaJson, "chinaJson");
    this.$echarts.registerMap("china", chinaJson);
    const that = this;
    this.chartDom = document.getElementById("dataMap");
    this.myChart = this.$echarts.init(this.chartDom);
    this.initChart();
    window.addEventListener("resize", function() {
      that.myChart.resize(); // 屏幕自适应
    });
  },
  methods: {
    initChart() {
      this.myChart.setOption({
        tooltip: {
          // 鼠标放上去提示
          trigger: "item",
          padding: 0, // 默认5px
          // backgroundColor: "#ff8787", // 提示框的背景色
          // borderColor: "#ff8787",  //图形的描边颜色
          // borderWidth: 0,
          // alwaysShowContent: true, // 是否永远显示提示框内容，默认情况下在移出可触发提示框区域后 一定时间 后隐藏，设置为 true 可以保证一直显示提示框内容
          formatter: () => {
            return `<div class="my-echarts-map-info">
                        <div class="title">华北</div>
                        <div class="text">大区配置：24</div>
                        <div class="text">人员状态：3</div>
                        <div class="text">业务人员：12</div>
                        <div class="text">销售额：12</div>
                        <div class="text">目标达成：2%</div>
                    </div>`;
          }
        },
        backgroundColor: "#fff", // 地图背景色
        grid: {
          // echarts地图距离容器位置
          left: 20,
          top: 20,
          containLabel: false
        },
        geo: {
          map: "china",
          roam: true,
          itemStyle: {
            normal: {
              areaColor: "#f6efa6",
              borderColor: "rgba(0, 0, 0, 0.2)",
              borderWidth: 1
            },
            emphasis: {
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 20,
              borderWidth: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          },
          layoutCenter: ["65%", "50%"], //距离左右，上下距离的百分比
          layoutSize: "100%",
          showLegendSymbol: true, // 地图中出现地图标识小圆点
          label: {
            normal: {
              show: true,
              textStyle: {
                color: "#333"
              }
            },
            emphasis: {
              // 鼠标放上去时的状态
              show: true,
              textStyle: {
                color: "#333"
              }
            }
          },
          regions: [
            {
              name: "华北",
              itemStyle: {
                areaColor: "#9BC227"
              }
            },
            {
              name: "东北",
              itemStyle: {
                areaColor: "#61A4FF"
              }
            },
            {
              name: "华南",
              itemStyle: {
                areaColor: "#FEB71F"
              }
            },
            {
              name: "华东",
              itemStyle: {
                areaColor: "#0BB1AF"
              }
            },
            {
              name: "华中",
              itemStyle: {
                areaColor: "#D774F2"
              }
            },
            {
              name: "西南",
              itemStyle: {
                areaColor: "#FF8C4A"
              }
            },
            {
              name: "西北",
              itemStyle: {
                areaColor: "#cc8617"
              }
            }
          ]
        },
        // // 标题
        // title: {
        //   text: "中国地图",
        //   left: "center",
        //   top: "top",
        //   textStyle: {
        //     color: "#333"
        //   }
        // },
        legend: {
          orient: "vertical",
          left: "left",
          data: [""]
        },
        // visualMap: {
        //   min: 0,
        //   max: 1500,
        //   left: '10%',
        //   top: 'bottom',
        //   text: ['高', '低'],
        //   calculable: true,
        //   color: ['#0b50b9', '#c3e2f4']
        // },
        selectedMode: "single",
        series: [
          {
            name: "",
            type: "map",
            map: "china",
            geoIndex: 0
            // roam: true,
            // itemStyle: {
            //   normal: {
            //     areaColor: "#f6efa6",
            //     borderColor: "rgba(0, 0, 0, 0.2)",
            //     borderWidth: 1
            //   },
            //   emphasis: {
            //     shadowOffsetX: 0,
            //     shadowOffsetY: 0,
            //     shadowBlur: 20,
            //     borderWidth: 0,
            //     shadowColor: "rgba(0, 0, 0, 0.5)"
            //   }
            // },
            // layoutCenter: ["65%", "50%"], //距离左右，上下距离的百分比
            // layoutSize: "100%",
            // showLegendSymbol: true, // 地图中出现地图标识小圆点
            // label: {
            //   normal: {
            //     show: true,
            //     textStyle: {
            //       color: "#333"
            //     }
            //   },
            //   emphasis: {
            //     // 鼠标放上去时的状态
            //     show: true,
            //     textStyle: {
            //       color: "#333"
            //     }
            //   }
            // },
            // data: [
            //   {
            //     name: "华北",
            //     value: 7342,
            //     itemStyle: {
            //       normal: { areaColor: "#9BC227", label: { show: false } }
            //     }
            //   },
            //   {
            //     name: "东北",
            //     value: 3685,
            //     itemStyle: {
            //       normal: { areaColor: "#61A4FF", label: { show: false } }
            //     }
            //   },
            //   {
            //     name: "华南",
            //     value: 21416,
            //     itemStyle: {
            //       normal: { areaColor: "#FEB71F", label: { show: false } }
            //     }
            //   },
            //   {
            //     name: "华东",
            //     value: 25314,
            //     itemStyle: {
            //       normal: { areaColor: "#0BB1AF", label: { show: false } }
            //     }
            //   },
            //   {
            //     name: "华中",
            //     value: 2500,
            //     itemStyle: {
            //       normal: { areaColor: "#D774F2", label: { show: false } }
            //     }
            //   },
            //   {
            //     name: "西南",
            //     value: 10427,
            //     itemStyle: {
            //       normal: { areaColor: "#FF8C4A", label: { show: false } }
            //     }
            //   },
            //   {
            //     name: "西北",
            //     value: 2440,
            //     itemStyle: {
            //       normal: { areaColor: "#cc8617", label: { show: false } }
            //     }
            //   }
            // ]
          },
          // 添加自定义图标
          {
            name: "地图",
            type: "custom",
            coordinateSystem: "geo",
            renderItem(param, api) {
              return {
                type: "image",
                style: {
                  image: require("@/assets/branchMarker.png"),
                  x: api.coord(params.properties.cp[param.dataIndex])[0] - 13,
                  y: api.coord(params.properties.cp[param.dataIndex])[1],
                  width: 13,
                  height: 20
                }
              };
            },
            data: [
              [116.24, 39.54],
              [126.32, 43.5],
              [121.28, 31.13],
              [114.2, 30.32],
              [113.15, 23.08],
              [104.04, 30.39],
              [103.49, 36.03]
            ],
            zlevel: 5
          }
        ]
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.data-map {
  width: 100%;
  height: calc(100vh - 100px);
}
</style>
<style lang="scss">
.my-echarts-map-info {
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
    text-align: left;
  }
  .text:nth-last-of-type(1) {
    padding-bottom: 0px;
  }
}
</style>

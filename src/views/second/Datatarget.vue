/** * @Author: by wangfeng */
<template>
  <div class="data-target">
    <div class="wrap">
      <div
        v-for="(item, index) in targetList"
        :key="list[index].title"
        class="box"
      >
        <div class="title">{{ list[index].title }}</div>
        <div class="circle">
          <svg
            id="svgForStroke"
            xmlns="http://www.w3.org/2000/svg"
            width="126"
            height="126"
          >
            <circle
              cx="63"
              cy="63"
              r="40"
              stroke="#E5E5E5"
              stroke-width="12"
              fill="none"
            />
            <circle
              class="progress"
              cx="63"
              cy="63"
              r="40"
              :stroke="list[index].color"
              :stroke-dasharray="item.dasharray"
              stroke-width="12"
              fill="none"
              stroke-linecap="round"
            />
          </svg>
          <div class="container" :style="{ color: list[index].color }">
            {{ item.process + "%" }}
          </div>
        </div>
        <div v-if="index === 0" class="target">
          ￥{{ item.number ? parseFloat(item.number).toFixed(2) : "0.00" }}
        </div>
        <div v-else class="target">
          {{ item.number ? item.number + "位" : "0" }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Datatarget",
  props: {
    targetList: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      list: [
        { title: "销售进度", color: "#ff6d73" },
        { title: "客户开发进度", color: "#d482ff" },
        { title: "交易客户进度", color: "#6ba6ff" },
        { title: "首单客户进度", color: "#00FA9A" }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.data-target {
  width: 100%;
  height: 100%;
  .wrap {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    color: #2b343d;
    .box {
      text-align: center;
      .circle {
        position: relative;
        margin: 10px 0;
        #svgForStroke {
          .progress {
            -webkit-transform: rotate(-90deg);
            -moz-transform: rotate(-90deg);
            -ms-transform: rotate(-90deg);
            -o-transform: rotate(-90deg);
            transform: rotate(-90deg);
            transform-origin: center;
            -webkit-transition: stroke-dasharray 2s;
            transition: stroke-dasharray 2s;
          }
        }
        .container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 15px;
        }
      }
      .target {
        font-size: 20px;
        color: #6ba6ff;
      }
    }
    .box:nth-of-type(1) {
      .target {
        color: #ff6d73;
      }
    }
    .box:nth-of-type(2) {
      .target {
        color: #d482ff;
      }
    }
    .box:nth-of-type(4) {
      .target {
        color: #00fa9a;
      }
    }
  }
}
</style>

/** * @Author: by wangfeng */
<template>
  <div class="post-staff">
    <div v-if="postStaffName" class="leader">
      <span class="title">主管：</span>
      <span class="name">{{ postStaffName }}</span>
    </div>
    <div class="wrap">
      <div v-for="(item, index) in postStaffList" :key="item.title" class="box">
        <div class="container">
          <div class="title">
            <img
              :src="
                require('@/assets/company@3x_' +
                  (postStaffType === 3 ? index + 1 : index) +
                  '.png')
              "
            />
            <span>{{ item.title }}</span>
          </div>
          <div class="data">
            {{ item.numberposts ? item.numberposts : "0" }}
          </div>
        </div>
        <div class="container">
          <div class="title"><span>缺编率</span></div>
          <div class="data">
            {{ item.shortagerate ? item.shortagerate + "%" : "0%" }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Poststaff",
  props: {
    postStaffList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    postStaffName: {
      type: String,
      default: ""
    },
    postStaffType: {
      type: Number,
      default: 0
    }
  }
};
</script>

<style lang="scss" scoped>
.post-staff {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0 15px;
  .leader {
    width: 100%;
    margin-top: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e6ebf2;
    .title {
      font-size: 16px;
      color: #707e8c !important;
    }
    .name {
      font-weight: bold;
      font-size: 16px;
    }
  }
  .wrap {
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    color: #2b343d;
    .box {
      display: flex;
      flex-direction: row;
      width: 100%;
      .container {
        flex: 1;
        padding: 15px 0;
        text-align: center;
        .title {
          text-align: center;
        }
        .data {
          text-align: center;
          margin-top: 20px;
          font-size: 32px;
          color: #61a3ff;
        }
      }
      .container:nth-of-type(2) {
        border-radius: 9px;
        background-color: #fff7f7;
        color: #f45b5b;
        .data {
          margin-top: 25px;
          font-size: 22px;
          color: #f45b5b;
        }
      }
    }
  }
}
</style>

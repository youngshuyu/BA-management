<template>
  <div class="pushLog">
    <el-card shadow="hover">
      <div class="searchTop">
        <div class="searchTopBox">
          <div class="title">headline:</div>&nbsp;&nbsp;
          <el-input
            size="small"
            v-model="headline"
            placeholder="Please enter the title"
            class="case-search"
          ></el-input>
        </div>
        <div class="searchTopBox">
          <div class="title" style="width:185px;margin-left:5px;">Push people:</div>
          <el-input
            size="small"
            v-model="pushPeople"
            placeholder="Please enter the title"
            class="case-search"
          ></el-input>
        </div>
        <div class="searchTopBox">
          <div class="title" style="margin-left:5px">select time:</div>
          <el-date-picker
            size="small"
            v-model="choseTime"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="-"
            start-placeholder="startTime"
            end-placeholder="endTime"
            align="right"
            class="date-picker"
          ></el-date-picker>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "pushLog",
  data() {
    return {
      headline: "", // 标题
      pushPeople: "", // 推送人
      choseTime: '', // 选择的时间
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      }
    };
  }
};
</script>

<style lang="less" scoped>
.searchTop {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  .searchTopBox {
    display: flex;
    justify-content: space-between;
    .title {
      width: 100px;
    }
  }
}
</style>
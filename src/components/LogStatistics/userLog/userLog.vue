<template>
  <div class="userLog">
    <el-card shadow="hover">
      <div class="searchBottom">
        <div class="searchBottomBox">
          <div class="title">headline:</div>&nbsp;&nbsp;
          <el-input
            size="small"
            v-model="headline"
            placeholder="Please enter the title"
            class="case-search"
          ></el-input>
        </div>
        <div class="searchBottomBox">
          <div class="title">type:</div>
          <el-select size="small" v-model="type" placeholder="请选择">
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <el-button size="small" type="primary" style="margin-left:10px">search</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "userLog",
  data() {
    return {
      headline:'',
      type: "",
      typeOptions: [
        {
          value: "选项1",
          label: "success"
        },
        {
          value: "选项2",
          label: "fail"
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.searchBottom {
  margin-top: 10px;
  display: flex;
  width: 100%;
  justify-content: start;
  align-items: center;
  .searchBottomBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      width: 70px;
      text-align: right;
      margin-right: 9px;
    }
  }
}
</style>
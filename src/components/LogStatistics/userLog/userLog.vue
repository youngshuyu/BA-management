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
        <el-button size="small" type="primary" style="margin-left:10px" @click="getList">search</el-button>
      </div>
    </el-card>

    <el-card shadow="hover" style="margin-top:10px;">
      <el-table :data="list" style="width: 100%">
        <el-table-column prop="operatorName" label="systematicName" ></el-table-column>
        <el-table-column prop="operationTime" label="systematicName"></el-table-column>
        <el-table-column prop="content" label="systematicName" ></el-table-column>
        
      </el-table>
    </el-card>

    <el-pagination
      background
      :current-page.sync="page"
      layout="prev, pager, next"
      @current-change="getList"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "userLog",
  data() {
    return {
      headline: "",
      page: 1, // 当前页码
      total: 100,
      list:[]
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      let res = await this.$axios({
        url: "/business/log/push/system",
        method: "post",
        data: {
          keyword: this.headline,
          c: 10,
          p: this.page
        }
      });
      console.log(res);
      if (res.code === "0") {
        this.list = res.data.list;
        this.total = res.data.count;
        console.log(res);
      } else {
        this.$message({
          message: res.msg,
          type: "warning"
        });
      }
    }
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

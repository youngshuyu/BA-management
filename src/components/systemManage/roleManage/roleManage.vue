<template>
  <div class="CaseClassification">
    <el-card class="box-card" shadow="hover">
      <div class="clearfix">
        <el-button type="primary" @click="addDialogShow = true">Add a role</el-button>
      </div>
    </el-card>
    <el-card shadow="hover" style="margin-top:10px;">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" width="170px" label="serialNumber"></el-table-column>
        <el-table-column prop="name" label="characterName" width="180"></el-table-column>
        <el-table-column label="operation">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="userDialogShow = true">
              <span :style="{paddingLeft:'10px'}"></span>
              Users
            </el-button>
            <el-button type="text" size="small" @click="JurisdictionDialogShow = true">Jurisdiction</el-button>
            <el-button type="text" size="small">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background layout="prev, pager, next" :total="total"></el-pagination>
    </el-card>
    <el-dialog width="80%" title="User Settings" :visible.sync="userDialogShow">
      <div class="dialogTop">
        <span class="dialogTopName">Name:</span>
        <el-input
          style="width:260px;margin-right:10px;"
          size="small"
          v-model="searchName"
          placeholder="Please enter user name"
        ></el-input>
        <el-button size="small" type="primary">Search</el-button>
      </div>
      <el-table :data="userList">
        <el-table-column type="index" width="170px" label="Number"></el-table-column>
        <el-table-column property="name" label="name" width="150"></el-table-column>
        <el-table-column label="status" width="200"></el-table-column>
        <el-table-column label="operation">
          <el-button type="text" size="small">Delete</el-button>
        </el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog title="Jurisdiction setting" :visible.sync="JurisdictionDialogShow">
      <el-tree :props="props" :load="loadNode" lazy show-checkbox @check-change="handleCheckChange"></el-tree>
      <el-button style="margin-top:10px;" type="primary" size="small">submit</el-button>
    </el-dialog>
    <el-dialog title="Add a role" :visible.sync="addDialogShow">
      <span class="dialogTopName" style="margin-right:10px;">Role Name</span>
      <el-input
        style="width:260px;margin-right:10px;"
        size="small"
        v-model="searchName"
        placeholder="Please enter user name"
      ></el-input>
      <el-tree :props="props" :load="loadNode" lazy show-checkbox @check-change="handleCheckChange"></el-tree>
      <el-button style="margin-top:10px;" type="primary" size="small">submit</el-button>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "CaseClassification",
  data() {
    return {
      addDialogShow: false,
      JurisdictionDialogShow: false,
      searchName: "", // 搜索用户姓名
      userDialogShow: false,
      props: {
        label: "name",
        children: "zones"
      },
      count: 1,
      userList: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      tableData: [],
      total: 10
    };
  },
  methods: {
    async getList() {
      let res = await this.$axios({
        url: "/business/category/case/list"
      });
      console.log("结果", res.data);
      this.tableData = res.data;
    },
    handleCheckChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate);
    },
    handleNodeClick(data) {
      console.log(data);
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve([{ name: "region1" }, { name: "region2" }]);
      }
      if (node.level > 3) return resolve([]);

      var hasChild;
      if (node.data.name === "region1") {
        hasChild = true;
      } else if (node.data.name === "region2") {
        hasChild = false;
      } else {
        hasChild = Math.random() > 0.5;
      }

      setTimeout(() => {
        var data;
        if (hasChild) {
          data = [
            {
              name: "zone" + this.count++
            },
            {
              name: "zone" + this.count++
            }
          ];
        } else {
          data = [];
        }

        resolve(data);
      }, 500);
    }
  },
  created() {
    this.getList();
  }
};
</script>

<style lang="less" scoped>
.CaseClassification {
  padding: 20px;
}
.dialogTop {
  display: flex;
  justify-content: start;
  align-items: center;
  .dialogTopName {
    display: inline-block;
    width: 70px;
  }
}
</style>

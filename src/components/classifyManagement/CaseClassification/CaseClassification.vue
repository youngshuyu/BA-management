<template>
  <div class="CaseClassification">
    <el-card class="box-card" shadow="hover">
      <div class="clearfix">
        <el-button type="primary" @click="dialogFormVisible = true">Add category</el-button>
        <el-dialog title="Add category" :visible.sync="dialogFormVisible" width="500px">
          <div class="ClassifyName">ClassifyName:</div>
          <el-input label="classifyName" v-model="addCaseName" autocomplete="off"></el-input>

          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">Cancel</el-button>
            <el-button type="primary" @click="onSaveCategory">Save</el-button>
          </div>
        </el-dialog>
      </div>
    </el-card>
    <el-card shadow="hover" style="margin-top:10px;">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="systematicName" width="180"></el-table-column>
        <el-table-column prop="operation" label="operation">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editClass(scope.row)">
              <span :style="{paddingLeft:'10px'}"></span>
              Edit
            </el-button>
            <el-button @click="deleteClass(scope.row)" type="text" size="small">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="Edit category" :visible.sync="dialogFormVisible2" width="500px">
        <div class="ClassifyName">ClassifyName:</div>
        <el-input label="classifyName" v-model="editCaseName" autocomplete="off"></el-input>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible2 = false">Cancel</el-button>
          <el-button type="primary" @click="saveEditClass">Save</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'CaseClassification',
  data () {
    return {
      tableData: [],
      dialogFormVisible: false,
      dialogFormVisible2: false,
      addCaseName: '', // 添加的类名
      editCaseName: '', // 修改的类名
      editCaseID: '',
      formLabelWidth: '120px'
    }
  },
  methods: {
    async getList () {
      let res = await this.$axios({
        url: '/business/category/case/list'
      })
      // console.log('结果', res.data)
      this.tableData = res.data
    },
    // 添加分类
    async onSaveCategory () {
      if (this.addCaseName == '') {
        this.$message({
          message: 'The class name cannot be empty',
          type: 'warning'
        })
      } else {
        this.dialogFormVisible = false
        let res = await this.$axios({
          url: '/business/category/case',
          method: 'post',
          data: {
            name: this.addCaseName
          }
        })
        if (res.code == 0) {
          this.dialogFormVisible = false
          this.$message({
            message: 'operate successfully',
            type: 'success'
          })
          this.getList()
        } else {
          this.$message({
            message: 'operation failure',
            type: 'warning'
          })
        }
      }
    },
    // 删除分类
    async deleteClass (row) {
      let res = await this.$axios({
        url: `/business/category/case/${row.id}`,
        method: 'delete'
      })
      if (res.code == 0) {
        this.$message({
          message: 'operate successfully',
          type: 'success'
        })
        this.getList()
      } else {
        this.$message({
          message: 'operation failure',
          type: 'warning'
        })
      }
    },
    // 编辑分类
    editClass (row) {
      this.editCaseName = row.name
      this.editCaseID = row.id
      this.dialogFormVisible2 = true
    },
    // 保存编辑分类
    async saveEditClass () {
      if (this.editCaseName == '') {
        this.$message({
          message: 'The class name cannot be empty',
          type: 'warning'
        })
      } else {
        let res = await this.$axios({
          url: '/business/category/case',
          method: 'put',
          data: {
            id: this.editCaseID,
            name: this.editCaseName
          }
        })
        if (res.code == 0) {
          this.dialogFormVisible2 = false
          this.$message({
            message: 'operate successfully',
            type: 'success'
          })
          this.getList()
        } else {
          this.$message({
            message: 'operation failure',
            type: 'warning'
          })
        }
      }
    }
  },
  created () {
    this.getList()
  }
}
</script>

<style lang="less" scoped>
.CaseClassification {
  padding: 20px;
}
.ClassifyName {
  height: 30px;
  line-height: 30px;
  margin-bottom: 5px;
}
</style>

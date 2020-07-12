<template>
  <div class="CaseClassification">
    <el-card class="box-card" shadow="hover">
      <div class="clearfix">
        <el-button type="primary" @click="dialogFormVisible = true">Add category</el-button>
        <el-dialog title="Add category" :visible.sync="dialogFormVisible" width="500px">
          <el-form :model="form">
            <el-form-item label="Category Name" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Parent Class" :label-width="formLabelWidth">
              <el-select size="middle" v-model="caseClass" placeholder="Please choose" class="caseClass">
                <el-option
                  v-for="item in form.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">Cancel</el-button>
            <el-button type="primary" @click="onSaveCategory">Save</el-button>
          </div>
        </el-dialog>
      </div>
    </el-card>
    <el-card shadow="hover" style="margin-top:10px;">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="systematicName" width="180">
        </el-table-column>
        <el-table-column prop="operation" label="operation">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="dialogFormVisible2 = true">
              <span :style="{paddingLeft:'10px'}"></span>
              Edit
            </el-button>
            <el-button
              type="text"
              size="small"
            >Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="Edit category" :visible.sync="dialogFormVisible2" width="500px">
          <el-form :model="form">
            <el-form-item label="Category Name" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Parent Class" :label-width="formLabelWidth">
              <el-select size="middle" v-model="caseClass" placeholder="Please choose" class="caseClass">
                <el-option
                  v-for="item in form.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible2 = false">Cancel</el-button>
            <el-button type="primary" @click="onSaveCategory">Save</el-button>
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
      tableData: '',
      dialogFormVisible: false,
      dialogFormVisible2: false,
      form: {
        name: '',
        parentClass: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        options: [
          {
            value: '1',
            label: 'Real time weekly report'
          },
          {
            value: '2',
            label: 'Weekly Policy Report'
          },
          {
            value: '3',
            label: 'Public opinion information'
          },
          {
            value: '4',
            label: 'Public opinion briefing'
          }
        ]
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    async getList () {
      let res = await this.$axios({
        url: '/business/category/case/list'
      })
      console.log('结果', res.data)
      this.tableData = res.data
    },
    onSaveCategory () {
      this.dialogFormVisible = false
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
</style>

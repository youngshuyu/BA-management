<template>
  <div class="CaseClassification">
    <el-card class="box-card" shadow="hover">
      <div class="clearfix">
        Filter：
        <el-select size="small" v-model="userCategory" placeholder="Please choose" class="caseClass" style="margin-right:30px;">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        Organizational Structure:
        <el-input  size="small" v-model="organizationalStructure" placeholder="Please enter keywords" class="search" style="width:300px;"></el-input>
      </div>
    </el-card>
    <el-card shadow="hover" style="margin-top:10px;">
      <div class="userSearch">
        Search User:
        <el-input  size="small" v-model="userSearch" placeholder="Please enter keywords" class="search" style="width:300px;margin-right:30px;"></el-input>
        <el-button size="small" type="primary" @click="onSearchUser">Search</el-button>
        <el-button size="small" type="primary" @click="dialogFormVisible = true">Add user</el-button>

        <el-dialog title="Add user" :visible.sync="dialogFormVisible" width="500px">
          <el-form :model="form">
            <el-form-item label="userName" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="account" :label-width="formLabelWidth">
              <el-input v-model="form.account" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="password" :label-width="formLabelWidth">
              <el-input v-model="form.password" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">Cancel</el-button>
            <el-button type="primary" @click="onAddUser">Confirm</el-button>
          </div>
        </el-dialog>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" width="120" label="Number"></el-table-column>
        <el-table-column prop="userAccount" label="userAccount" width="180"></el-table-column>
        <el-table-column prop="userName" label="userName" width="180"></el-table-column>
        <el-table-column prop="role" label="role" width="180"></el-table-column>
        <el-table-column prop="state" label="state" width="180"></el-table-column>
        <el-table-column prop="operation" label="operation">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="lookOver">
              <span :style="{paddingLeft:'10px'}"></span>
              Look over
            </el-button>
            <el-button type="text" size="small">
              <span :style="{paddingLeft:'10px'}"></span>
              Ban
            </el-button>
            <el-button
              type="text"
              size="small"
            >Role setting</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="User information" :visible.sync="userInfo" width="500px">
          <el-form :model="form">
            <el-form-item label="UserName" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="UserAccount" :label-width="formLabelWidth">
              <el-input v-model="form.account" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Telephone" :label-width="formLabelWidth">
              <el-input v-model="form.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Email" :label-width="formLabelWidth">
              <el-input v-model="form.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Department" :label-width="formLabelWidth">
              <el-input v-model="form.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="RoleName" :label-width="formLabelWidth">
              <el-input v-model="form.password" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="userInfo = false">Cancel</el-button>
            <el-button type="primary" @click="onSaveUserInfo">Save</el-button>
          </div>
        </el-dialog>
      <el-pagination background layout="prev, pager, next" :total="total"></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'CaseClassification',
  data () {
    return {
      userCategory: '',
      organizationalStructure: '',
      options: [
        {
          value: 'all',
          label: 'all'
        },
        {
          value: 'Activated',
          label: 'Activated'
        },
        {
          value: 'Nonactivated',
          label: 'Nonactivated'
        }
      ],
      userSearch: '',
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px',
      userInfo: false,
      total: 10
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
    onAddUser () {
      this.dialogFormVisible = false
    },
    lookOver () {
      this.userInfo = true
    },
    onSaveUserInfo () {
      this.userInfo = false
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

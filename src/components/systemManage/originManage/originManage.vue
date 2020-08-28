<template>
  <div class="CaseClassification">
    <el-card class="box-card" shadow="hover">
      <div class="clearfix">
        <el-button type="primary" @click="dialogFormVisible = true">Add organizational structure</el-button>

        <el-dialog
          title="Add organizational structure"
          :visible.sync="dialogFormVisible"
          width="600"
        >
          <el-form :model="form" :rules="rules" ref="addForm">
            <el-form-item
              prop="name"
              label="Name of Organization Structure"
              :label-width="formLabelWidth"
            >
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Parent schema" :label-width="formLabelWidth">
              <el-cascader
                style="width:100%"
                :props="addProps"
                change-on-select
                :options="treeData"
                @change="change"
                v-model="form.parentId"
              ></el-cascader>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">Cancel</el-button>
            <el-button type="primary" @click="onAddOrganizationalStructure('addForm')">Add</el-button>
          </div>
        </el-dialog>
      </div>
    </el-card>
    <el-card shadow="hover" style="margin-top:10px;">
      <el-tree :data="treeData" :props="props"></el-tree>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'CaseClassification',
  data () {
    return {
      treeData: [],
      props: {
        label: 'name',
        children: 'sons',
        value: 'id'
      },
      addProps: {
        expandTrigger: 'click',
        children: 'sons',
        value: 'id',
        label: 'name',
        emitPath: false
      },
      count: 1,
      dialogFormVisible: false,
      form: {
        parentId: null,
        name: ''
      },
      formLabelWidth: '220px',
      rules: {
        name: [
          {
            required: true,
            message: 'Please enter the organizationName',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    change () {
      console.log(this.form.parentId)
    },
    async getList () {
      let res = await this.$axios({
        url: '/auth/system/organization/tree'
      })
      console.log('结果', res.data)
      this.treeData = res.data
    },
    handleCheckChange (data, checked, indeterminate) {
      console.log(data, checked, indeterminate)
    },
    handleNodeClick (data) {
      console.log(data)
    },
    loadNode (node, resolve) {
      if (node.level === 0) {
        return resolve([{ name: 'region1' }, { name: 'region2' }])
      }
      if (node.level > 3) return resolve([])

      var hasChild
      if (node.data.name === 'region1') {
        hasChild = true
      } else if (node.data.name === 'region2') {
        hasChild = false
      } else {
        hasChild = Math.random() > 0.5
      }

      setTimeout(() => {
        var data
        if (hasChild) {
          data = [
            {
              name: 'zone' + this.count++
            },
            {
              name: 'zone' + this.count++
            }
          ]
        } else {
          data = []
        }

        resolve(data)
      }, 500)
    },
    onAddOrganizationalStructure (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addSubmit()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async addSubmit () {
      let res = await this.$axios({
        url: '/auth/system/organization',
        method: 'post',
        data: this.form
      })
      console.log(res)
      if (res.code == '0') {
        this.dialogFormVisible = false
        this.$message({
          message: 'operate successfully',
          type: 'success'
        })
        this.getList()
      } else {
        this.$message({
          message: res.msg,
          type: 'warning'
        })
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
</style>

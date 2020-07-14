<template>
  <div class="CaseClassification">
    <el-card class="box-card" shadow="hover">
      <div class="clearfix">
        <el-button type="primary" @click="dialogFormVisible = true">Add organizational structure</el-button>
        <el-dialog title="Add organizational structure" :visible.sync="dialogFormVisible" width="600">
          <el-form :model="form">
            <el-form-item label="Name of Organization Structure" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Parent schema" :label-width="formLabelWidth">
              <el-input v-model="form.parentSchema" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">Cancel</el-button>
            <el-button type="primary" @click="onAddOrganizationalStructure">Add</el-button>
          </div>
        </el-dialog>
      </div>
    </el-card>
    <el-card shadow="hover" style="margin-top:10px;">
      <el-tree
        :data="treeData"
        :props="props"
        show-checkbox
        @check-change="handleCheckChange">
      </el-tree>
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
        children: 'sons'
      },
      count: 1,
      dialogFormVisible: false,
      form: {
        name: '',
        parentSchema: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '220px'
    }
  },
  methods: {
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
          data = [{
            name: 'zone' + this.count++
          }, {
            name: 'zone' + this.count++
          }]
        } else {
          data = []
        }

        resolve(data)
      }, 500)
    },
    onAddOrganizationalStructure () {
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

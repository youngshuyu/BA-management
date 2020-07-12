<template>
  <div class="CaseClassification">
    <el-card class="box-card" shadow="hover">
      <div class="clearfix">
        Filter：
        <el-select size="small" v-model="caseClass" placeholder="Please choose" class="caseClass">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </el-card>
    <el-card shadow="hover" style="margin-top:10px;">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" width="170px" label="serialNumber"></el-table-column>
        <el-table-column prop="name" label="characterName" width="180">
        </el-table-column>
        <el-table-column prop="operation" label="operation">
          <template slot-scope="scope">
            <el-button type="text" size="small">
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
      <el-pagination background layout="prev, pager, next" :total="total"></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'CaseClassification',
  data () {
    return {
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
          value: 'unscramble',
          label: 'Unscramble category'
        }
      ]
    }
  },
  methods: {
    async getList () {
      let res = await this.$axios({
        url: '/business/category/case/list'
      })
      console.log('结果', res.data)
      this.tableData = res.data
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

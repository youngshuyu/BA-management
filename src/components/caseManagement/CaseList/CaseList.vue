<template>
  <div class="caselist-wrapper">
    <div class="search">
       案件搜索： <el-input v-model="keyword" placeholder="请输入关键词" class="case-search"></el-input>
        时间选择：
        <el-date-picker
          v-model="value2"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
          class="date-picker">
        </el-date-picker>
        <el-button type="primary" @click="onSearchCase">确定</el-button>
    </div>
    <div class="caseClass-export">
      案件种类：
      <el-select v-model="caseClass" placeholder="请选择" class="caseClass">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary">下载导入模板</el-button>
      <el-button type="primary" @click="dialogFormVisible = true">导入</el-button>
      <el-dialog  :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="分类列表" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="娱乐类" value="shanghai"></el-option>
              <el-option label="xx类" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      value2: '',
      keyword: '',
      options: [{
        value: 'all',
        label: '全部'
      }, {
        value: 'policy',
        label: '政策类'
      }, {
        value: 'unscramble',
        label: '解读类'
      }],
      caseClass: '',
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
      formLabelWidth: '120px'
    }
  },
  methods: {
    onSearchCase () {
      if (this.keyword === '') {
        this.$message({
          message: '关键字不能为空',
          type: 'warning'
        })
      } else {

      }
    }
  }
}

</script>

<style lang="less" scoped>
.caselist-wrapper {
  padding:20px;
  .search {
    font-size: 14px;
    margin-bottom: 15px;
    .case-search {
      width: 300px;
      margin-right: 30px;
    }
    .date-picker {
      margin-right: 30px;
    }
  }
  .caseClass-export {
    font-size: 14px;
    .caseClass {
      margin-right: 35px;
      width: 300px;
    }
  }
}
</style>

<template>
  <div class="caselist-wrapper">
    <el-card shadow="hover">
      <div class="search">
        Case Search:
        <el-input  size="small" v-model="keyword" placeholder="Please enter keywords" class="case-search"></el-input>
        Time Select:
        <el-date-picker
          size="small"
          v-model="time"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="to"
          start-placeholder="start date"
          end-placeholder="end date"
          align="right"
          class="date-picker"
        ></el-date-picker>
        <el-button size="small" type="primary" @click="onSearchCase">confirm</el-button>
      </div>
      <div class="caseClass-export">
        Types Of Cases：
        <el-select size="small" v-model="caseClass" placeholder="Please choose" class="caseClass">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-button size="small" type="primary">Download imported template</el-button>
        <el-upload
          class="upload-demo"
          :action="action"
        >
          <el-button size="small" type="primary">Click upload</el-button>
        </el-upload>
      </div>
    </el-card>
    <el-card shadow="hover" style="margin-top:10px;">
      <div class="caselistConent" v-for="(item,index) in list" :key="index">
        <div style="flex:1;">
          <div class="caselistTitle">{{item.title}}</div>
          <div class="caselistConentBottom">
            <div class="caselistaAuthor">Author:{{item.author}}</div>
            <div class="caselistTime">Rlease time:{{item.publishTime}}</div>
            <div class="caselistReadCount">Pageview:{{item.readCount}}</div>
          </div>
        </div>
        <div class="buttonPush">
          <el-button style="postion" type="primary" plain>push</el-button>
        </div>
      </div>
    </el-card>

    <div class>
      <el-pagination background layout="prev, pager, next" :total="total"></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'caselist',
  data () {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: 'Last week',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: 'Last month',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: 'The last three months',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      list: '',
      time: '',
      keyword: '',
      options: [
        {
          value: 'all',
          label: 'all'
        },
        {
          value: 'policy',
          label: 'Policy category'
        },
        {
          value: 'unscramble',
          label: 'Unscramble category'
        }
      ],
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
      total: 100,
      formLabelWidth: '120px',
      endTime: '',
      startTime: '',
      rule: 'READ',
      asc: 'ASC',
      action: ''
    }
  },
  methods: {
    onSearchCase () {
      if (this.keyword === '') {
        this.$message({
          message: 'Keyword cannot be empty.',
          type: 'warning'
        })
      } else {
      }
    },
    async getList () {
      let res = await this.$axios({
        url: '/business/category/case/list',
        method: 'post',
        data: {
          asc: this.asc, // ASC正序，DESC倒叙
          categoryId: '', // 分类
          endTime: this.endTime, // 结束时间
          keyword: this.keyword,
          rule: this.rule, // 排序规则:READ 阅读量，TIME: 时间
          startTime: this.startTime, // 开始时间
          page: 1,
          pageSize: 10
        }
      })
      if (res.code === "0") {
        this.list = res.data.list
        this.total = res.data.count
        console.log(res)
      } else {
        this.$message({
          message: res.msg,
          type: 'warning'
        })
      }
      // console.log(res)
    }
  },
  created () {
    this.getList()
  }
}
</script>

<style lang="less" scoped>
.caselist-wrapper {
  padding: 20px;
  .search {
    font-size: 14px;
    margin-bottom: 15px;
    .case-search {
      width: 300px;
      margin-right: 20px;
    }
    .date-picker {
      margin-right: 20px;
    }
  }
  .caseClass-export {
    font-size: 14px;
    .caseClass {
      margin-right: 35px;
      width: 300px;
    }
  }
  .caselistConent {
    .buttonPush {
      width: 100px;
      display: flex;
      justify-content: flex-end;
    }
    border-bottom: 1px solid #ccc;
    // margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 5px;
    .caselistTitle {
      font-size: 24px;
      padding: 5px;
    }
    .caselistConentBottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-left: 5px;
      .caselistaAuthor {
        font-size: 14px;
        color: rgb(192, 196, 209);
        margin-right: 10px;
      }
      .caselistTime {
        font-size: 14px;
        color: rgb(192, 196, 209);
        margin-right: 10px;
      }
      .caselistReadCount {
        font-size: 14px;
        color: rgb(192, 196, 209);
        margin-right: 10px;
      }
    }
  }
}
</style>

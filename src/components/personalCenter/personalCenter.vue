<template>
  <div class="pushLog">
    <el-card shadow="hover">
      <div class="searchTop">
        <div class="searchTopBox">
          <div class="title">headline:</div>&nbsp;&nbsp;
          <el-input
            size="small"
            v-model="headline"
            placeholder="Please enter the title"
            class="case-search"
          ></el-input>
        </div>
        <div class="searchTopBox">
          <div class="title" style="width:150px;margin-left:5px;">Push people:</div>
          <el-input
            size="small"
            v-model="pushPeople"
            placeholder="Please enter the title"
            class="case-search"
          ></el-input>
        </div>
        <div class="searchTopBox">
          <div class="title" style="margin-left:5px">select time:</div>
          <el-date-picker
            value-format="yyyy-MM-dd HH:mm:ss"
            style="width:255px;"
            size="small"
            v-model="choseTime"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="-"
            start-placeholder="startTime"
            end-placeholder="endTime"
            align="right"
            class="date-picker"
          ></el-date-picker>
        </div>
      </div>
      <div class="searchBottom">
        <el-button size="small" type="primary" @click="search()">search</el-button>
      </div>
    </el-card>
    <el-card shadow="hover" style="margin-top:10px;">
      <el-tabs v-model="read" type="card" @tab-click="handleClick">
        <el-tab-pane label="UNREAD" name="UNREAD"></el-tab-pane>
        <el-tab-pane label="READ" name="HAVE_READ"></el-tab-pane>
      </el-tabs>
      <el-table :data="tableData" style="width: 100%" @cell-click="CaseInfo">
        <el-table-column type="index" width="170px" label="serialNumber"></el-table-column>
        <el-table-column prop="title" label="title"></el-table-column>
        <el-table-column prop="pushUsername" label="Push People"></el-table-column>
        <el-table-column prop="acceptUsername" label="Accept People"></el-table-column>
        <el-table-column prop="createTime" label="Push Time"></el-table-column>
      </el-table>
    </el-card>
    <el-pagination
      background
      :current-page.sync="page"
      layout="prev, pager, next"
      @current-change="pagin()"
      :total="total"
    ></el-pagination>
    <el-dialog :visible.sync="caseInfoDialog" width="80%">
      <caseInfo :case="caseID"></caseInfo>
    </el-dialog>
  </div>
</template>

<script>
import caseInfo from '../caseManagement/CaseList/caseInfo'
export default {
  name: 'personalCenter',
  components: {
    caseInfo
  },
  data () {
    return {
      caseInfoDialog: false,
      caseID: '',
      read: 'UNREAD',
      tableData: [],
      total: 10, // 总条数
      page: 1, // 当前页码
      headline: '', // 标题
      pushPeople: '', // 推送人
      choseTime: '', // 选择的时间
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
      options: [],
      value: '',
      status: '',
      statusOptions: []
    }
  },
  methods: {
    CaseInfo (item) {
      this.caseInfoDialog = true
      this.caseID = item.id
      console.log('1111', item)
    },
    handleClick () {
      this.getList()
    },
    // 搜索
    search () {
      this.getList()
    },
    // 分页
    pagin () {
      this.getList()
    },
    // 获取列表
    async getList () {
      let endTime = ''
      let startTime = ''
      if (this.choseTime != null && this.choseTime.length > 1) {
        endTime = this.choseTime[1]
        startTime = this.choseTime[0]
      } else if (this.choseTime != null && this.choseTime.length === 1) {
        startTime = this.choseTime[0]
      }
      let res = await this.$axios({
        url: '/business/log/push',
        method: 'post',
        data: {
          c: 10,
          read: this.read,
          p: this.page,
          endTime: endTime, // 结束时间
          startTime: startTime, // 开始时间
          title: this.headline,
          username: this.pushPeople
        }
      })
      console.log('push', res)
      if (res.code === '0') {
        this.total = res.data.count
        this.tableData = res.data.list
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
.searchTop {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  .searchTopBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      width: 100px;
    }
  }
}
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

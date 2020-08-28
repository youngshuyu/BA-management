<template>
  <div class="caselist-wrapper">
    <el-card shadow="hover" style="margin-top:10px;">
      <div class="caselistConent" v-for="(item,index) in list" :key="index">
        <div style="flex:1;">
          <div class="caselistTitle" >{{item.title}}</div>
          <div class="caselistConentBottom">
            <div class="caselistaAuthor">Author:{{item.author}}</div>
            <div class="caselistTime">Rlease time:{{item.publishTime}}</div>
            <div class="caselistReadCount">Pageview:{{item.readCount}}</div>
          </div>
        </div>
      </div>
      <div class="noContent" v-show="list.length === 0">There are no matching results</div>
    </el-card>
    <el-pagination
      background
      :current-page.sync="page"
      layout="prev, pager, next"
      @current-change="pagin()"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: 'caseDetail',
  props: {
    name: String
  },
  components: {},
  data () {
    return {
      categoryList: [],
      list: '',
      caseClass: [],
      page: 1, // 当前页码
      total: 100,
      formLabelWidth: '120px',
      endTime: '',
      startTime: '',
      rule: 'READ',
      asc: 'ASC'
    }
  },
  methods: {
    pagin () {
      this.getList()
    },
    async getCaseCategory () {
      try {
        const { data } = await this.$axios({
          url: '/business/category/case/list'
        })
        console.log(data)

        this.categoryList = data
      } catch (error) {
        console.log('[getCaseCategory fail]' + error)
      }
    },
    async getList () {
      let choseArr = '';
      this.categoryList.forEach(item => {
        if (item.name === this.name) {
          choseArr = item.id
        }
      })
      if (choseArr.length === 0) {
        choseArr = '';
      }
      let res = await this.$axios({
        url: '/business/category/case/list',
        method: 'post',
        data: {
          asc: this.asc, // ASC正序，DESC倒叙
          categoryId: choseArr, // 分类
          endTime: '', // 结束时间
          keyword: '',
          rule: this.rule, // 排序规则:READ 阅读量，TIME: 时间
          startTime: '', // 开始时间
          page: this.page,
          pageSize: 10
        }
      })
      console.log(res)

      if (res.code === '0') {
        this.list = res.data.list
        this.total = res.data.count
        console.log(res)
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
      width: 160px;
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
      cursor: pointer;
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
  .noContent {
    text-align: center;
  }
  .dialog-footer {
    display: flex;
    justify-content: flex-end;
  }
}
</style>

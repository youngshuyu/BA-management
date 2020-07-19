<template>
  <div class="caselist-wrapper">
    <el-card shadow="hover">
      <div class="search">
        Case Search:
        <el-input  size="small" v-model="keyword" placeholder="Please enter keywords" class="case-search"></el-input>
        Time Select:
        <el-date-picker
          value-format="yyyy-MM-dd HH:mm:ss"
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
        <el-button size="small" type="primary" @click="onSearchCase">Confirm</el-button>
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
        <el-button size="small" type="primary" @click="downloadTemplate">Download imported template</el-button>
        <el-button size="small" type="primary" @click="openImportDialog">Click upload</el-button>
        <el-dialog title="Import article" :visible.sync="importDialog" width="500px">
          <div style="margin-bottom:10px;">Please check the type of article you want to upload.</div>
          <el-checkbox-group v-model="checkList">
            <el-checkbox :label="item.name" v-for="item in categoryList" :key="item.id"></el-checkbox>
          </el-checkbox-group>
          <div slot="footer" class="dialog-footer">
            <el-button @click="importDialog = false">Cancel</el-button>
            <el-upload
            class="upload-demo"
            ref="upload"
            multiple
            :action="importUrl"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :http-request="onImport"
            :auto-upload="true">
            <el-button slot="trigger"  type="primary" style="margin-left:20px;">Choose File</el-button>
            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
            <!-- <el-button type="success" @click="onImport">Upload</el-button> -->
          </div>
        </el-dialog>
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
      <div class="noContent" v-show="list.length === 0">There are no matching results</div>
    </el-card>
      <el-pagination
        background
        :current-page.sync="page"
        layout="prev, pager, next"
        @current-change="xxx()"
        :total="total"></el-pagination>
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
      page: 1, // 当前页码
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
      action: '',
      importDialog: false,
      categoryList: [],
      checkList: [],
      importUrl: 'http://47.95.197.255:7001/business/category/case/import/',
      fileList: [],
      files: ''
    }
  },
  methods: {
    xxx () {
      this.getList()
    },
    onSearchCase () {
      console.log(this.time)

      this.getList()
    },
    async getList () {
      let res = await this.$axios({
        url: '/business/category/case/list',
        method: 'post',
        data: {
          asc: this.asc, // ASC正序，DESC倒叙
          categoryId: this.caseClass, // 分类
          endTime: this.time[1], // 结束时间
          keyword: this.keyword,
          rule: this.rule, // 排序规则:READ 阅读量，TIME: 时间
          startTime: this.time[0], // 开始时间
          page: this.page,
          pageSize: 10
        }
      })
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
    },
    async getCaseCategory () {
      try {
        const { data } = await this.$axios({
          url: '/business/category/case/list'
        })
        console.log(data)

        this.categoryList = data
        let caseOptions = []
        data.forEach(item => {
          let obj = {}
          obj.value = item.name
          obj.label = item.name
          caseOptions.push(obj)
        })
        this.options = caseOptions
      } catch (error) {
        console.log('[getCaseCategory fail]' + error)
      }
    },
    downloadTemplate () {
      // 获取XMLHttpRequest
      let xmlResquest = new XMLHttpRequest()
      //  发起请求
      xmlResquest.open('GET', 'http://47.95.197.255:7001/business/category/case/model', true)
      // 设置请求头类型
      xmlResquest.setRequestHeader('Content-type', 'application/json')
      //  设置请求token
      xmlResquest.setRequestHeader('Authorization', '043ef4e7caee456ea02de11931408651')
      xmlResquest.responseType = 'blob'
      //  返回
      xmlResquest.onload = function (oEvent) {
        let content = xmlResquest.response
        // 组装a标签
        let elink = document.createElement('a')
        // 设置下载文件名
        elink.download = 'importExcel.xlsx'
        elink.style.display = 'none'
        let blob = new Blob([content])
        elink.href = URL.createObjectURL(blob)
        document.body.appendChild(elink)
        elink.click()
        document.body.removeChild(elink)
      }
      xmlResquest.send()
    },
    openImportDialog () {
      this.importDialog = true
      // this.getCaseCategory()
    },
    async onImport (param) {
      if (this.checkList.length === 0) {
        this.$message({
          message: 'Please select the article category!',
          type: 'warning'
        })
        return
      }
      let categoryId = []
      this.checkList.forEach(item => {
        this.categoryList.forEach(i => {
          if (i.name === item) {
            categoryId.push(i.id)
          }
        })
      })
      let url = '/business/category/case/import/' + categoryId.join('-')
      // console.log(url)
      this.importUrl = this.importUrl + categoryId.join('-')
      var fileObj = param.file
      // FormData 对象
      var file = new FormData()
      // 文件对象
      file.append('file', fileObj)
      console.log(categoryId)
      let res = await this.$axios({
        url: url,
        method: 'POST',
        data: file
      })
      console.log(res)
      if (res.code === '0') {
        this.$message({
          message: 'Operation is successful',
          type: 'success'
        })
      } else {
        this.$message({
          message: res.msg,
          type: 'warning'
        })
      }
      // this.importDialog = false
      // this.$refs.upload.submit()
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    }
  },
  created () {
    this.getList()
    this.getCaseCategory()
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
  .noContent {
    text-align: center;
  }
  .dialog-footer {
    display: flex;
    justify-content: flex-end;
  }
}
</style>

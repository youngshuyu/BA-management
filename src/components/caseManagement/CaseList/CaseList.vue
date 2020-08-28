<template>
  <div class="caselist-wrapper">
    <el-card shadow="hover">
      <div class="search">
        Case Search:
        <el-input
          size="small"
          v-model="keyword"
          placeholder="Please enter keywords"
          class="case-search"
        ></el-input>Time Select:
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
            <el-button @click="importDialog = false" style="height:40px">Cancel</el-button>
            <el-upload
              class="upload-demo"
              ref="upload"
              multiple
              :action="importUrl"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              :http-request="onImport"
              :auto-upload="true"
            >
              <el-button slot="trigger" type="primary" style="margin-left:20px;">Choose File</el-button>
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
          <div class="caselistTitle" @click="enterCaseInfo(item)">{{item.title}}</div>
          <div class="caselistConentBottom">
            <div class="caselistaAuthor">Author:{{item.author}}</div>
            <div class="caselistTime">Rlease time:{{item.publishTime}}</div>
            <div class="caselistReadCount">Pageview:{{item.readCount}}</div>
          </div>
        </div>
        <div class="buttonPush">
          <el-button style="postion" type="primary" plain @click="pushCase(item.id)">push</el-button>
          <el-button style="postion" type="primary" plain @click="editCaseType(item.id)">Edit</el-button>
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
    <el-dialog :visible.sync="caseInfoDialog" width="80%">
      <caseInfo v-if="caseInfoDialog" :case="caseID"></caseInfo>
    </el-dialog>
    <el-dialog :visible.sync="caseTypeDialog" width="500px">
      <div>
        Types Of Cases：
        <el-select
          size="small"
          v-model="editCase"
          multiple
          collapse-tags
          style="margin-left: 20px;"
          placeholder="Please choose"
          class="caseClass"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <div class="dialog-footer" style="margin-top:10px;">
          <el-button @click="caseTypeDialog = false">Cancel</el-button>
          <el-button type="primary" @click="editCaseTypeSubmit">submit</el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="pushDialog" width="500px">
      <el-select
        v-model="pushName"
        :filter-method="searchPushPeople"
        filterable
        placeholder="请输入姓名"
      >
        <el-option
          v-for="item in pushOptions"
          :key="item.id"
          :label="item.realName + '/' + item.route"
          :value="item.realName + '/' + item.id"
        >
          <p style="margin:0;">{{ item.realName }}/{{ item.route }}</p>
        </el-option>
      </el-select>
      <div class="dialog-footer" style="margin-top:10px;">
        <el-button @click="closePushDialog">Cancel</el-button>
        <el-button type="primary" @click="pushSubmit">submit</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import caseInfo from './caseInfo'
export default {
  name: 'caselist',
  components: {
    caseInfo
  },
  data () {
    return {
      pushName: '',
      pushOptions: [],
      pushDialog: false,
      editCase: [],
      caseTypeDialog: false,
      caseID: '',
      caseInfoDialog: false,
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
      options: [],
      caseClass: [],
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
      files: '',
      id: '',
      pushId: 1
    }
  },
  methods: {
    closePushDialog () {
      this.pushDialog = false
      this.pushName = ''
    },
    async pushSubmit () {
      let realName = this.pushName.split('/')[0]
      let userId = Number(this.pushName.split('/')[1])
      let res = await this.$axios({
        url: '/business/category/case/push',
        method: 'post',
        data: {
          caseId: this.pushId,
          realName: realName,
          userId: userId
        }
      })
      if (res.code == '0') {
        this.pushDialog = false
        this.pushName = ''
        this.getList()
      } else {
        this.$message({
          message: res.msg,
          type: 'warning'
        })
      }
    },
    async searchPushPeople (val) {
      let res = await this.$axios({
        url: '/auth/user/user/list',
        method: 'post',
        data: {
          keyword: val
        }
      })
      if (res.code == '0') {
        this.pushOptions = res.data
      } else {
        this.$message({
          message: res.msg,
          type: 'warning'
        })
      }
    },
    // 推送
    pushCase (id) {
      this.pushDialog = true
      this.pushId = id
    },
    editCaseType (id) {
      this.caseTypeDialog = true
      this.id = id
    },
    // 编辑
    async editCaseTypeSubmit () {
      let choseArr = []
      for (let i = 0; i < this.categoryList.length; i++) {
        for (let j = 0; j < this.editCase.length; j++) {
          if (this.editCase[j] == this.categoryList[i].name) {
            choseArr.push(this.categoryList[i].id)
          }
        }
      }
      // console.log(choseArr)
      let res = await this.$axios({
        url: '/business/category/case/change',
        method: 'put',
        data: {
          id: this.id,
          categoryIds: choseArr
        }
      })
      if (res.code == '0') {
        this.$message({
          message: 'operate successfully',
          type: 'success'
        })
        this.caseTypeDialog = false
        this.editCase = []
      } else {
        this.$message({
          message: res.msg,
          type: 'warning'
        })
      }
    },
    enterCaseInfo (item) {
      this.caseInfoDialog = true
      this.caseID = item.id
    },
    pagin () {
      this.getList()
    },
    onSearchCase () {
      this.getList()
    },
    async getList () {
      let choseArr = ''
      this.categoryList.forEach(item => {
        if (item.name === this.caseClass) {
          choseArr = item.id
        }
      })
      if (choseArr.length === 0) {
        choseArr = ''
      }
      let endTime = ''
      let startTime = ''
      if (this.time != null && this.time.length > 1) {
        endTime = this.time[1]
        startTime = this.time[0]
      } else if (this.time != null && this.time.length === 1) {
        startTime = this.time[0]
      }
      let res = await this.$axios({
        url: '/business/category/case/list',
        method: 'post',
        data: {
          asc: this.asc, // ASC正序，DESC倒叙
          categoryId: choseArr, // 分类
          endTime: endTime, // 结束时间
          keyword: this.keyword,
          rule: this.rule, // 排序规则:READ 阅读量，TIME: 时间
          startTime: startTime, // 开始时间
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
      xmlResquest.open(
        'GET',
        'http://47.95.197.255:7001/business/category/case/model',
        true
      )
      // 设置请求头类型
      xmlResquest.setRequestHeader('Content-type', 'application/json')
      //  设置请求token
      xmlResquest.setRequestHeader(
        'Authorization',
        window.localStorage.getItem('user-token')
      )
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
        this.importDialog = false
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

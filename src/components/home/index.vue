<template>
  <div>
    <el-card>
      <!-- 词云 -->
      <div ref="wordCloudBox"></div>
    </el-card>
    <el-dialog :visible.sync="showCaseListDetail" width="80%">
      <caseDetail v-if="showCaseListDetail" :name="name"></caseDetail>
    </el-dialog>
  </div>
</template>

<script>
import myCloud from '@/assets/js/myCloud.js'
import caseDetail from './caseDetail'
export default {
  name: 'index',
  components: {
    caseDetail
  },
  data () {
    return {
      wordList: [],
      showCaseListDetail: false,
      name: ''
    }
  },

  methods: {
    async getData () {
      let res = await this.$axios({
        url: '/business/category/case/list'
      })
      console.log('结果', res.data)
      //   this.tableData = res.data
      res.data.forEach(item => {
        if (item.readCount === 0) {
          this.wordList.push({ text: item.name, size: 12 })
        } else {
          this.wordList.push({ text: item.name, size: item.readCount })
        }
      })
      this.getWordCloud(this.wordList)
    },
    transform (arr) {
      arr.forEach(item => {
        let obj = {}
        obj.text = item.name
        // if (item.readCount >= )
      })
    },
    // 生成词云
    getWordCloud (wordList) {
      let wordOption = {
        wordList,
        size: [1118, 700], // 盒子的宽高
        svgElement: this.$refs.wordCloudBox // 使用ref选择节点
      }
      myCloud(wordOption, this.getArticleList)
    },
    // 回调
    getArticleList (e) {
      // ...
      console.log(e)
      this.name = e
      this.showCaseListDetail = true
    },
    onClick (e) {
      console.log(e)
    }
  },
  created () {
    this.getData()
  }
}
</script>

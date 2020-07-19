<template>
  <el-card>
      <!-- 词云 -->
    <div ref='wordCloudBox'></div>
  </el-card>

</template>

<script>
import myCloud from '@/assets/js/myCloud.js'
export default {
  name: 'index',
  data () {
    return {
      wordList: []
    }
  },

  methods: {
    async getData () {
      let res = await this.$axios({
        url: '/business/category/case/list'
      })
      console.log('结果', res.data)
    //   this.tableData = res.data
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
    getArticleList () {
      // ...
    }
  },
  created () {
    this.getData()
  },
  mounted () {
    let wordList = [
      { text: 'vue devtool', size: 20 },
      { text: 'html', size: 25 },
      { text: 'js', size: 30 },
      { text: 'js', size: 30 },
      { text: 'vue', size: 20 },
      { text: 'html', size: 25 },
      { text: 'js', size: 30 },
      { text: 'js', size: 30 },
      { text: 'vue', size: 20 },
      { text: 'html', size: 25 },
      { text: 'js', size: 30 },
      { text: 'js', size: 30 },
      { text: 'vue', size: 20 },
      { text: 'html', size: 25 },
      { text: 'js', size: 30 },
      { text: 'js', size: 30 },
      { text: 'vue', size: 20 },
      { text: 'html', size: 25 },
      { text: 'js', size: 30 },
      { text: 'js', size: 30 },
      { text: 'vue', size: 20 },
      { text: 'html', size: 25 },
      { text: 'js', size: 30 },
      { text: 'js', size: 30 },
      { text: 'vue', size: 20 },
      { text: 'html', size: 25 },
      { text: 'js', size: 30 },
      { text: 'js', size: 30 },
      { text: 'vue sadsadsahdadhad', size: 20 },
      { text: 'html', size: 25 },
      { text: 'js', size: 30 },
      { text: 'vue', size: 20 },
      { text: 'html', size: 25 },
      { text: 'js', size: 30 },
      { text: 'js', size: 30 },
      { text: 'vue', size: 20 },
      { text: 'html', size: 25 },
      { text: 'js', size: 30 },
      { text: 'js', size: 30 },
      { text: 'vue', size: 20 },
      { text: 'html', size: 25 },
      { text: 'js', size: 30 },
      { text: 'js', size: 30 },
      { text: 'vue', size: 20 },
      { text: 'html', size: 25 },
      { text: 'js', size: 30 }
    ]
    this.getWordCloud(wordList)
  }

}

</script>

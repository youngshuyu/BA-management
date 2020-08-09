<template>
        <!-- 发布评论 -->
        <el-row class="post-comment">
            <el-input
                type="textarea"
                :rows="2"
                placeholder="Please enter a comment."
                v-model="textarea">
             </el-input>
             <el-button class="release-btn" type="primary" @click="onPostComment">Release</el-button>
        </el-row>
</template>

<script>
export default {
  props: {
    case: {
      type: Number
    //   required: true
    }
  },
  data () {
    return {
      textarea: ''
    }
  },
  methods: {
    async onPostComment () {
      if (this.textarea.trim() === '') {
        this.$message({
          message: 'Comment content cannot be empty！',
          type: 'warning'
        })
      } else {
        // this.$toast.loading({
        //   duration: 0, // 持续展示 toast
        //   message: '操作中...',
        //   forbidClick: true // 是否禁止背景点击
        // })
        let res = await this.$axios({
          url: '/business/category/case/comment',
          method: 'post',
          data: {
            caseId: this.case,
            content: this.textarea,
            commentId: 0
          }
        })
        console.log(res)
        this.$emit('click-post')
        this.textarea = ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
.post-comment {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    .release-btn {
        margin-top: 20px;
    }
}
</style>

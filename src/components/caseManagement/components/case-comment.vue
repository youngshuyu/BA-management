<template>
  <div class="case-comment">
        <!-- 评论列表 -->
        <ul v-if="caseCommentList.length !== 0" class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
            <comment-item v-for="(item,index) in caseCommentList"  :key="index" :comment="item" :case="caseId" @click-reply="$emit('click-reply', $event)" @click-cancelReply="$emit('click-cancelReply')"/>
        </ul>
        <p class="noComments" v-else>No comment, please post yours.</p>
  </div>
</template>

<script>
import CommentItem from './comment-item'
export default {
  name: 'CaseComment',
  props: {
    case: {
      type: Number,
      required: true
    }
  },
  components: { CommentItem },
  data () {
    return {
      count: 0,
      caseCommentList: [],
      caseId: ''
    }
  },
  methods: {
    load () {
      this.count += 2
    },
    async getCaseComment () {
      const { data } = await this.$axios({
        url: '/business/category/case/comment/list',
        method: 'post',
        data: {
          c: 0,
          caseId: this.case,
          p: 10
        }
      })
      console.log(data)

      this.caseCommentList = data.list
    }
  },
  created () {
    this.getCaseComment()
    this.caseId = this.case
  }
}
</script>

<style lang="less" scoped>
    .case-comment {
        ul {
            margin: 0;
            padding: 0;
        }
        .noComments {
            font-size: 20px;
            text-align: center;
        }
    }
</style>

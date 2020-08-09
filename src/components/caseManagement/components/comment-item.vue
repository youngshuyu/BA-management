<template>
    <div class="comment-item">
      <!-- 评论作者名字 -->
        <span style="color: #466b9d;" slot="title">{{ comment.fromUsername }}</span>
    <!-- 评论作者名字 -->

        <div slot="label">
        <!-- 评论内容 -->
        <p style="color: #363636;text-indent:2em;">{{ comment.content }}</p>
        <!-- /评论内容 -->

        <p>
            <!-- 评论发布日期 -->
            <span style="margin-right: 10px;">{{ comment.createTime }}</span>
            <!-- 评论发布日期 -->

            <el-button
            size="mini"
            type="default"
            @click="showReplyComment"
            >Reply</el-button>
        </p>

        </div>
        <div class="reply" v-show="isReplyCommentShow">
            <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="textarea"
                style="margin-bottom:20px;">
            </el-input>
            <el-button type="primary" @click="cancelReply">Cancel</el-button>
            <el-button type="primary" @click="replyComment">Reply</el-button>
        </div>
        <div class="reply-comment" v-if="comment.children.length > 0">
            <span @click="showChildrenReply">>>>There are {{comment.children.length}} replies</span>
            <ul v-if="showChildrenReplyList" class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
                <div v-for="item in comment.children" :key="item.id">
                    <span style="color: #466b9d;" slot="title">{{ comment.fromUsername }}</span>
                <!-- 评论作者名字 -->

                    <div slot="label">
                    <!-- 评论内容 -->
                    <p style="color: #363636;text-indent:2em;">{{ comment.content }}</p>
                    <!-- /评论内容 -->

                    <p>
                        <!-- 评论发布日期 -->
                        <span style="margin-right: 10px;">{{ comment.createTime }}</span>
                        <!-- 评论发布日期 -->

                        <!-- <el-button
                        size="mini"
                        type="default"
                        @click="showReplyComment"
                        >Reply</el-button> -->
                    </p>
                    </div>
                </div>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
  name: 'CommentItem',
  components: {},
  props: {
    comment: {
      type: Object,
      required: true,
      commentId: ''
    },
    case: {
      type: Number
    }
  },
  data () {
    return {
      textarea: '',
      isReplyCommentShow: false,
      showChildrenReplyList: false
    }
  },
  methods: {
    showReplyComment () {
      this.isReplyCommentShow = true
      this.$emit('click-reply')
    },
    cancelReply () {
      this.isReplyCommentShow = false
      this.$emit('click-cancelReply')
    },
    async replyComment () {
      if (this.textarea.trim() !== '') {
        try {
          let res = await this.$axios({
            url: '/business/category/case/comment',
            method: 'post',
            data: {
              caseId: this.case,
              content: this.textarea,
              commentId: this.comment.id,
              toUserId: this.comment.fromUserId,
              toUsername: this.comment.fromUsername
            }
          })
          console.log(res)
        } catch (error) {
          console.log(error)
        }
      } else {
        this.$message({
          message: 'The reply cannot be empty.',
          type: 'warning'
        })
      }
    },
    showChildrenReply () {
      this.showChildrenReplyList = true
    },
    load () {}
  }
}
</script>

<style lang="less" scoped>
.comment-item {
    border-top: 1px solid red;
    border-bottom: 1px solid red;
    .reply {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
    }
}
</style>

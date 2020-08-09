<template>
  <div class="comment-reply">
    <!-- 导航栏 -->
    <!-- <van-nav-bar :title="`${currentComment.reply_count}条回复`">
      <van-icon
        slot="left"
        name="cross"
        @click="$emit('click-close')"
      />
    </van-nav-bar> -->
    <!-- /导航栏 -->

    <!-- 当前评论项 -->
    <!-- <comment-item :comment="currentComment"/> -->
    <!-- /当前评论项 -->

    <!-- <van-cell title="所有回复" /> -->

    <!-- 评论的回复列表 -->
    <ul v-if="caseCommentList.length !== 0" class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
        <comment-item :comment="comment" v-for="(comment, index) in list" :key="index" />
    </ul>
    <!-- /评论的回复列表 -->
    <!-- 回复评论 -->
    <!-- <van-popup
      v-model="isPostShow"
      position="bottom"
    > -->
    <!-- 在组件上使用v-model相当于
        :value="inputComment"
        @input="inputComment = 事件参数" -->
      <post-comment v-model="inputComment" @click-post="onPostComment"/>
    <!-- </van-popup> -->
    <!-- /回复评论 -->
    <!-- 底部 -->
    <!-- <div class="footer">
      <van-button
        class="write-btn"
        type="default"
        round
        size="small"
        @click="isPostShow = true"
      >写评论</van-button>
      <van-icon
        name="good-job"
        @click="onLike"
      />
    </div> -->
    <!-- /底部 -->
  </div>
</template>

<script>
import postComment from './post-comment'
export default {
  name: 'CommentReply',
  components: { postComment },
  props: {
    currentComment: {
      type: Object,
      required: true
    },
    case: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 20,
      isPostShow: false,
      inputComment: '',
      caseCommentList: []
    }
  },
  methods: {
    onPostComment () {}
  }
}
</script>

<style lang="less" scoped>
</style>

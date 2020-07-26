<template>
  <div class="caseInfo">
    <h1 class="caseInfoTitle">{{caseInfo.title}}</h1>
    <div class="caseInfoConentBottom">
      <div class="casrInfoAuthor">Author:{{caseInfo.author}}</div>
      <div class="caseInfoTime">Rlease time:{{caseInfo.publishTime}}</div>
      <div class="caseInfoReadCount">Pageview:{{caseInfo.readCount}}</div>
    </div>
    <div class="caseInfoText">
      如果两个实例引用同一个对象，当其中一个实例的属性发生改变时，另一个实例属性也随之改变，只有当两个实例拥有自己的作用域时，才不会相互干扰。
      这是因为JavaScript的特性所导致，在component中，data必须以函数的形式存在，不可以是对象。
      组建中的data写成一个函数，数据以函数返回值的形式定义，这样每次复用组件的时候，都会返回一份新的data，相当于每个组件实例都有自己私有的数据空间，它们只负责各自维护的数据，不会造成混乱。而单纯的写成对象形式，就是所有的组件实例共用了一个data，这样改一个全都改了。
    </div>
    <div>
      <div class="replyLisst">
        <div v-for="(item , index) in replyList" :key="index">
          <div class="replyItem">
            <div>
              <div class="replyContent">{{item.content}}</div>
              <div class="replyName">{{item.fromUsername}}</div>

              <div class="replyTime">{{item.createTime}}</div>
            </div>
            <div>
              <el-button
                type="primary"
                plain
                v-if="item.canDelete"
                size="mini"
                @click="openReply(item)"
              >reply</el-button>
              <el-button type="danger" plain v-if="item.canDelete" size="mini" @click="deleteReply(item.id)">delete</el-button>
            </div>
          </div>
          <div v-for="(ite , i) in item.children" :key="i">
          <div class="replyItem">
            <div>

              <div class="replyContent">{{ite.content}}</div>
              <div class="replyName">from {{ite.fromUsername}} to {{ite.toUsername}}</div>
              <div class="replyTime">{{ite.createTime}}</div>
            </div>
            <div>
              <el-button
                type="primary"
                plain
                size="mini"
                @click="openReply(ite)"
              >reply</el-button>
              <el-button type="danger" plain v-if="ite.canDelete" size="mini"  @click="deleteReply(ite.id)">delete</el-button>
            </div>
          </div>
        </div>
        </div>
      </div>
      <div class="reply">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          :placeholder="placeholder"
          v-model="reply"
          :maxlength="maxlength"
        ></el-input>
      </div>
      <el-button type="primary" @click="replySubmit()">reply</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'caseInfo',
  props: {
    case: Number
  },
  data () {
    return {
      placeholder: '请输入回复',
      caseInfo: {},
      reply: '',
      replyList: [],
      maxlength: 100,
      replyItem: '',
      replyInputShow: false,
      fromUserId: '',
      fromUsername: '',
      commentId: 0
    }
  },
  methods: {
    // 获取文章详情
    async getCaseInfo () {
      let res = await this.$axios({
        url: `/business/category/case/${this.case}`,
        method: 'get'
      })
      if (res.code === '0') {
        this.caseInfo = res.data
      } else {
        this.$message({
          message: res.msg,
          type: 'warning'
        })
      }
    },
    // 删除评论
    async deleteReply (id) {
      let res = await this.$axios({
        url: `/business/category/case/comment/${id}`,
        method: 'delete'
      })
      if (res.code == '0') {
        this.getReply()
      } else {
        this.$message({
          message: res.msg,
          type: 'warning'
        })
      }
    },
    // 获取评论
    async getReply () {
      let res = await this.$axios({
        url: '/business/category/case/comment/list',
        method: 'post',
        data: {
          c: 10,
          caseId: this.case,
          p: 1
        }
      })
      if (res.code == 0) {
        this.replyList = res.data.list
        console.log('success')
      } else {
        this.$message({
          message: res.msg,
          type: 'warning'
        })
      }
      // console.log('2222', res)
    },
    // 发布评论
    async replySubmit (item) {
      let data = {
        caseId: this.case,
        commentId: this.commentId,
        content: this.reply,
        toUserId: this.fromUserId,
        toUsername: this.fromUsername
      }

      let res = await this.$axios({
        url: '/business/category/case/comment',
        method: 'post',
        data: data
      })
      // console.log(res)
      if (res.code == 0) {
        this.getReply()
        this.reply = ''
      } else {
        this.$message({
          message: res.msg,
          type: 'warning'
        })
      }
    },
    // 回复评论
    openReply (item) {
      this.placeholder = `回复:${item.fromUsername}`
      this.fromUserId = item.fromUserId
      this.fromUsername = item.fromUsername
      this.commentId = item.id
    }
  },
  created () {
    this.getCaseInfo()
    this.getReply()
  }
}
</script>

<style lang="less" scoped>
.caseInfo {
  .caseInfoConentBottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 5px;
    .casrInfoAuthor {
      font-size: 14px;
      color: rgb(192, 196, 209);
      margin-right: 10px;
    }
    .caseInfoTime {
      font-size: 14px;
      color: rgb(192, 196, 209);
      margin-right: 10px;
    }
    .caseInfoReadCount {
      font-size: 14px;
      color: rgb(192, 196, 209);
      margin-right: 10px;
    }
  }
  .caseInfoText {
    margin-top: 10px;
    text-indent: 2em;
    line-height: 25px;
  }
  .replyLisst {
    width: 100%;
    // height: 100px;
    border: 1px solid red;
    box-sizing: border-box;
    padding: 10px;
    .replyItem {
      padding: 5px;
      border-bottom: 1px solid #f6f6f6;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      .replyName {
        margin-top: 5px;
        display: inline-block;
        margin-right: 10px;
      }
      .replyTime {
        display: inline-block;
      }
    }
  }
}
</style>

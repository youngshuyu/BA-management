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
    <div>回复</div>
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
      caseInfo: {}
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
    }
    // 获取评论

  },
  created () {
    this.getCaseInfo()
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
      text-indent:2em;
      line-height: 25px;
  }
}
</style>

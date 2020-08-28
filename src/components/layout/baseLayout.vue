// 使用的menu.js生成的菜单
<template>
  <div class="baseLayoutWrapper">
    <div class="baseLayoutHeader">
      <div class="baseLayoutHeaderLeft">
        <p>Case Analysis platform</p>
      </div>
      <!--一级导航  -->
      <div class="baseLayoutHeaderTab">
        <div v-for="(item,i) in tabList" :key="i" @click="handleTab(item)">
          <div
            :class=" {'baseLayoutHeaderTabItem':item.name!=currentTab,'baseLayoutHeaderTabItemActive':item.name==currentTab}"
          >{{item.title}}</div>
        </div>
      </div>
      <!-- /一级导航 -->
      <div class="baseLayoutHeaderInfo">
        <div class="baseLayoutHeaderInfoTop">
          <div class="baseLayoutHeaderInfoTopItem">
            <!-- <el-tooltip  placement="bottom-start"> -->
            <p class="adminPeople">user: {{userName}}</p>
          </div>

          <div class="baseLayoutHeaderInfoTopItem" @click="dialogFormVisible = true">
            <el-tooltip content="Information modification" placement="bottom-start">
              <img src="@/assets/img/set.png" alt />
            </el-tooltip>
          </div>

          <div class="baseLayoutHeaderInfoTopItem" @click="logout">
            <el-tooltip content="LogOut" placement="bottom-start">
              <img src="@/assets/img/quit.png" alt />
            </el-tooltip>
          </div>
        </div>
      </div>
    </div>
    <!-- 二级导航 -->
    <div class="baseLayoutMain">
      <div class="baseLayoutAside">
        <div class="baseLayoutAsideList">
          <div
            v-for="(item,i) in defaultSubMenu"
            :key="i"
            :class=" {'baseLayoutAsideItem':item.name!=currentMenu,'baseLayoutAsideItemActive':item.name==currentMenu}"
          >
            <div class="baseLayoutAsideItemTitleBox" @click="handleMenu(item)">
              <p class="baseLayoutAsideItemTitle">{{item.title}}</p>
            </div>
            <!-- <div
              v-for="(ite,int) in item.children"
              :key="int"
              @click="handleMenu(ite)"
              :class=" {'baseLayoutAsideItem':ite.name!=currentMenu,'baseLayoutAsideItemActive':ite.name==currentMenu}"
            >
              <p class="baseLayoutAsideItemText">{{ite.title}}</p>
            </div>-->
          </div>
        </div>
      </div>

      <div class="baseLayoutContent">
        <router-view />
      </div>
    </div>
    <!-- 二级导航结束 -->
    <el-dialog title="Information modification" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item prop="name" label="RealName" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="Password" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="onEditAccountInfo('ruleForm')">Confirm</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { menuData } from '@/menu';
export default {
  data () {
    var checkName = (rule, value, callback) => {
      console.log(value)
      if (!value) {
        return callback(new Error('The user name cannot be empty.'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input a password.'))
      } else if (String(value).length < 6) {
        callback(new Error('Password length is not less than 6 digits!'))
      } else {
        callback()
      }
    }
    return {
      userName: '',
      tabList: [], // tab列表
      defaultSubMenu: [], // 默认的二级菜单
      currentTab: '',
      currentMenu: '',
      formLabelWidth: '120px',
      dialogFormVisible: false, // 修改密码弹窗
      pathnameArr: this.$router.history.current.path.substr(1).split('/'), // 当前路由 或使用：window.location.href.split('#/')[1].split('/')
      form: {
        name: '',
        password: ''
      },
      rules: {
        password: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        name: [{ required: true, validator: checkName, trigger: 'blur' }]
      }
    }
  },
  methods: {
    logout () {
      this.$router.push('/login')
      window.localStorage.removeItem('user-token')
    },
    handleTab (list) {
      this.currentTab = list.name
      let subMenuList = list.children
      this.defaultSubMenu = subMenuList
      this.currentMenu = subMenuList[0].name
      this.$router.push(subMenuList[0].path)
    },
    handleMenu (item) {
      this.currentMenu = item.name
      this.$router.push(item.path)
    },
    // 根据当前路由，设置二级路由
    setTabList (isDev) {
      let tabLists = []
      tabLists = menuData || []
      let menuDataByApi = this.$store.state.menuData
      if (isDev && isDev == 'dev') {
        tabLists = menuData || [] // 使用本地全部菜单
      } else {
        tabLists = menuDataByApi || [] // 使用接口权限菜单
      }
      let pathnameArr = this.pathnameArr
      // console.log("当前路由地址 :" , pathnameArr);

      let defaultSubMenus = [] // 二级菜单
      tabLists.map((item, index) => {
        if (item.name === pathnameArr[0]) {
          defaultSubMenus = item.children
        }
      })
      // defaultSubMenus = tabLists[0].children;
      this.tabList = tabLists
      this.defaultSubMenu = defaultSubMenus
      // this.$router.push(defaultSubMenus[0].path);  // 默认跳转到第一个tab的第一个菜单 对应的页面
      // console.log("tab列表：" , this.tabList);
      // console.log("默认的二级菜单列表：" , this.defaultSubMenu);
    },
    // 点亮当前tab样式
    setActivelyItem () {
      let pathnameArr = this.pathnameArr
      this.currentTab = pathnameArr[0]
      this.currentMenu = pathnameArr[1]
    },
    onEditAccountInfo (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let formParams = {
            id: window.localStorage.getItem('id'), // 用户名
            password: this.form.password, // 密码
            realName: this.form.name // 渠道
          }
          this.editUserInfo(formParams)
        } else {
          console.log('表单校验错误!!')
          return false
        }
      })
      // this.dialogFormVisible = false
    },
    async editUserInfo (formParams) {
      let res = await this.$axios({
        url: '/auth/user/change/user/info',
        method: 'post',
        data: formParams
      })
      console.log(res)
      if (res.code === '0') {
        this.dialogFormVisible = false
        this.logout()
        this.$message({
          message: 'operate successfully',
          type: 'success'
        })
      } else {
        this.$message({
          message: res.msg,
          type: 'warning'
        })
      }
    },
    async getUserInfo () {
      let res = await this.$axios({
        url: '/auth/user/info',
        method: 'get'
      })
      // let res = await this.$axios({
      //   url: '/auth/user/info',
      //   method: 'get'
      // })
      if (res.code === '0') {
        window.localStorage.setItem('id', res.data.id)
        this.userName = res.data.realName
      }
    }
  },
  created () {
    this.getUserInfo()
  },
  mounted () {
    this.setTabList('dev') // 传参"dev" 即可使用开发菜单（全部菜单）
    this.setActivelyItem()
  }
}
</script>

<style lang="less">
.baseLayoutWrapper {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .baseLayoutHeader {
    left: 0px;
    top: 0px;
    height: 50px;
    width: 100%;
    background: linear-gradient(90deg, rgb(86, 84, 209), rgb(40, 103, 255));
    display: flex;
    background-size: 100% 100%;
    .baseLayoutHeaderInfo {
      .baseLayoutHeaderInfoTop {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: flex-end;
        padding: 15px 5px;
        box-sizing: border-box;
        .baseLayoutHeaderInfoTopItem {
          margin: 0 15px;
          cursor: pointer;
          font-size: 12px;
          color: #fff;
          height: 100%;
          .adminPeople {
            width: 100%;
            margin: 3px 15px;
          }
          /*color: rgb(53, 146, 228);*/
        }
      }
      .baseLayoutHeaderInfoTimeWrapper {
        width: 40%;
        height: 30%;
        position: relative;
      }
      .baseLayoutHeaderInfoTimeLong {
        position: absolute;
        right: 10px;
        bottom: -26px;
        color: rgb(53, 146, 228);
        font-size: 12px;
      }
    }
    .baseLayoutHeaderTab {
      width: 75%;
      display: flex;
      justify-content: flex-start;
      .baseLayoutHeaderTabItem {
        padding: 15px 10px;
        /*padding: 8px 15px;*/
        /*margin: 8px 5px;*/
        cursor: pointer;
        /*border: 1px solid #2589DE;*/
        /*color: #2589DE;*/
        /*width: 56px;*/
        /*height: 20px;*/
        color: rgba(255, 255, 255, 1);
        font-size: 14px;
        text-align: left;
        font-family: PingFangSC-Regular;
        /*<!--box-shadow: 0px 0px 10px -1px #2589DE;-->*/
        /*<!--border-radius: 2px;-->*/
        /*<!--transition: 0.5s;-->*/
      }
      .baseLayoutHeaderTabItem:hover {
        color: yellow;
        transition: 0.5s;
      }
      .baseLayoutHeaderTabItemActive {
        background-color: rgba(0, 0, 0, 0.2);
        padding: 15px 10px;
        font-size: 14px;
        cursor: pointer;
        text-align: center;
        color: yellow;
      }
    }
    .baseLayoutHeaderLeft {
      width: 220px;
      p {
        margin: 14px 0 0 20px;
        left: 20px;
        top: 14px;
        width: 180px;
        height: 22px;
        color: rgba(255, 255, 255, 1);
        font-size: 16px;
        text-align: left;
        font-family: PingFangSC-Semibold;
      }
    }
  }
  .baseLayoutMain {
    width: 100%;
    flex: 1;
    display: flex;
    overflow-y: scroll;
    .baseLayoutAside {
      min-width: 200px;
      height: 100%;
      /*background-color: #fff;*/
      overflow-y: scroll;
      /*padding: 10px 0 0 10px;*/
      background-color: aliceblue;
      /*border-right: 1px solid #ccc;*/
      .baseLayoutAsideList {
        padding: 10px 0 0 10px;
        height: 100%;
        background-color: aliceblue;
      }
      .baseLayoutAsideItemTitleBox {
        width: 100%;
        min-height: 36px;
        margin: 1px 0;
        display: table;
        padding: 5px 0px 5px 2px;
        box-sizing: border-box;
        background-color: #fff;
        .baseLayoutAsideItemTitle {
          display: table-cell;
          vertical-align: middle;
          text-align: left;
          padding-right: 5px;
          color: #000;
        }
      }
      .baseLayoutAsideItem,
      .baseLayoutAsideItemActive {
        width: 100%;
        min-height: 30px;
        text-align: left;
        margin: 1px 0;
        font-size: 14px;
        padding: 5px 0px 5px 20px;
        cursor: pointer;
        display: table;
        box-sizing: border-box;
      }
      .baseLayoutAsideItemText {
        display: table-cell;
        vertical-align: middle;
        box-sizing: border-box;
        padding-right: 5px;
        color: #333;
      }
      .baseLayoutAsideItem {
        background-color: #fff;
        &:hover {
          background-color: #eee;
        }
      }
      .baseLayoutAsideItemActive {
        background-color: #f7f7f7;
      }
    }
    .baseLayoutAside::-webkit-scrollbar {
      display: none;
    }
    .baseLayoutContent {
      margin: 0;
      padding: 0;
      width: 100%;
      /*height:100%;*/
      background-color: #fff;
      overflow-y: auto;
      padding: 10px;
    }
  }
}
.el-pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>

// 使用的menu.js生成的菜单
<template>
  <div class="baseLayoutWrapper">
    <div class="baseLayoutHeader">
      <div class="baseLayoutHeaderLeft">
        <p>Case Analysis platform</p>
      </div>
      <div class="baseLayoutHeaderTab">
        <div v-for="(item,i) in tabList" :key="i" @click="handleTab(item)">
          <div
            :class=" {'baseLayoutHeaderTabItem':item.name!=currentTab,'baseLayoutHeaderTabItemActive':item.name==currentTab}"
          >{{item.title}}</div>
        </div>
      </div>
      <div class="baseLayoutHeaderInfo">
        <div class="baseLayoutHeaderInfoTop">
          <div class="baseLayoutHeaderInfoTopItem">
            <!-- <el-tooltip  placement="bottom-start"> -->
            <p class="adminPeople">user:XXX</p>
          </div>

          <div class="baseLayoutHeaderInfoTopItem" @click="dialogFormVisible = true">
            <el-tooltip content="修改密码" placement="bottom-start">
              <img src="@/assets/img/set.png" alt />
            </el-tooltip>
          </div>

          <div class="baseLayoutHeaderInfoTopItem">
            <el-tooltip content="退出登陆" placement="bottom-start">
              <img src="@/assets/img/quit.png" alt />
            </el-tooltip>
          </div>

          <!-- 1134 -->
        </div>
      </div>
    </div>

    <div class="baseLayoutMain">
      <div class="baseLayoutAside">
        <div class="baseLayoutAsideList">
          <!-- <el-menu :default-active="currentMenu">
                        <el-submenu  v-for="(item,i) in defaultSubMenu" :index="item.name" :key="i">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>{{item.title}}</span>
                            </template>
                            <el-menu-item v-for="(ite,int) in item.children" :index="ite.name" @click="handleMenu(ite)" :key="int">{{ite.title}}</el-menu-item>
                        </el-submenu>
          </el-menu>-->

          <div v-for="(item,i) in defaultSubMenu" :key="i">
            <div class="baseLayoutAsideItemTitleBox">
              <p class="baseLayoutAsideItemTitle">{{item.title}}</p>
            </div>
            <div
              v-for="(ite,int) in item.children"
              :key="int"
              @click="handleMenu(ite)"
              :class=" {'baseLayoutAsideItem':ite.name!=currentMenu,'baseLayoutAsideItemActive':ite.name==currentMenu}"
            >
              <p class="baseLayoutAsideItemText">{{ite.title}}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="baseLayoutContent">
        <router-view />
      </div>
    </div>

    <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
        <el-form-item label="新密码" prop="newPass" :label-width="formLabelWidth">
          <el-input
            type="password"
            v-model="ruleForm.newPass"
            autocomplete="new-password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="checkPass" :label-width="formLabelWidth">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="new-password"
            show-password
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button @click="dialogFormVisible = false">cancel</el-button>
          <el-button type="primary">confirm</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { menuData } from "@/menu";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.newPass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      rules: {
        newPass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      },
      ruleForm: {
        newPass: "",
        checkPass: " "
      },
      tabList: [], // tab列表
      defaultSubMenu: [], // 默认的二级菜单
      currentTab: "",
      currentMenu: "",
      formLabelWidth: "120px",
      dialogFormVisible: false, // 修改密码弹窗
      pathnameArr: this.$router.history.current.path.substr(1).split("/") // 当前路由 或使用：window.location.href.split('#/')[1].split('/')
    };
  },
  methods: {
    handleTab(list) {
      this.currentTab = list.name;
      let subMenuList = list.children;
      let subSubMenuList = subMenuList[0].children;

      this.defaultSubMenu = subMenuList;
      this.currentMenu = subSubMenuList[0].name;

      this.$router.push(subSubMenuList[0].path);
    },
    handleMenu(item) {
      this.currentMenu = item.name;
      this.$router.push(item.path);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    // 根据当前路由，设置二级路由
    setTabList(isDev) {
      console.log(isDev);
      console.log(menuData);

      let tabLists = [];
      tabLists = menuData || [];
      //   let menuDataByApi = JSON.parse(
      //     this.$commonUtils.getSessionItem("menuData")
      //   ); // 从缓存中取 登录时获取的菜单数据

      //   if (isDev && isDev == 'dev') {
      //     tabLists = menuData || []; // 使用本地全部菜单
      //   } else {
      //     tabLists = menuDataByApi || []; // 使用接口权限菜单
      //   }

      // let url = window.location.href;
      // let pathnameArr = url.split('#/')[1].split('/');

      let pathnameArr = this.pathnameArr;
      // console.log("当前路由地址 :" , pathnameArr);

      let defaultSubMenus = []; // 二级菜单
      tabLists.map((item, index) => {
        if (item.name == pathnameArr[0]) {
          defaultSubMenus = item.children;
        }
      });
      // defaultSubMenus = tabLists[0].children;
      this.tabList = tabLists;
      this.defaultSubMenu = defaultSubMenus;
      // this.$router.push(defaultSubMenus[0].path);  // 默认跳转到第一个tab的第一个菜单 对应的页面
      // console.log("tab列表：" , this.tabList);
      // console.log("默认的二级菜单列表：" , this.defaultSubMenu);
    },
    // 点亮当前tab样式
    setActivelyItem() {
      let pathnameArr = this.pathnameArr;
      this.currentTab = pathnameArr[0];
      this.currentMenu = pathnameArr[1];
    }
  },

  mounted() {
    this.setTabList("dev"); // 传参"dev" 即可使用开发菜单（全部菜单）
    this.setActivelyItem();
  }
};
</script>

<style scoped lang="less">
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
        background-color: #3592e4;
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
</style>

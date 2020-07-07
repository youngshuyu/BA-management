// 登陆页面
<template>
  <div class="loginPageWrapper">
    <vue-particles
      color="#dedede"
      :particleOpacity="0.7"
      :particlesNumber="80"
      shapeType="circle"
      :particleSize="4"
      linesColor="#dedede"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    ></vue-particles>
    <div class="loginPageContent">
      <div class="logoBox">
        <!-- <img class="logoIcon" src="@/assets/img/logo.png" alt=""> -->
        <div :style="{fontSize:'60px',color:'#fff'}">
          <i class="el-icon-menu"></i>
        </div>
        <div class="logoText">新人培训入司管理系统</div>
      </div>
      <div class="formContainer">
        <el-form
          label-position="top"
          status-icon
          ref="ruleForm"
          label-width="110px"
          class="formBox"
        >
          <el-form-item label="请输入用户名" prop="name">
            <el-input placeholder="请输入用户名" autocomplete="on"></el-input>
          </el-form-item>

          <el-form-item label="请输入密码" prop="pass">
            <el-input placeholder="请输入密码" type="password" autocomplete="new-password"></el-input>
          </el-form-item>

          <el-form-item style="margin-top:15px">
            <el-col>
              <el-button type="primary">登录</el-button>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-col style="text-align:right">
              <div class="reset">重置信息</div>
            </el-col>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style lang="less" scoped>
.loginPageWrapper {
  width: 100%;
  height: 100vh;
  background-color: #fff;
  background: url(.././assets/img/登录背景.png) no-repeat center center;
  background-size: 100% 100%;
  position: relative;
}
.loginPageContent {
  display: flex;
  width: 700px;
  height: 400px;
  margin: 0 auto;
  background-color: rgba(0, 0, 0, 0.2);
  overflow: hidden;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* padding: 20px; */
  border-radius: 15px;
}
.logoBox {
  width: 50%;
  height: 100%;
  background-size: cover;
  background: url(.././assets/img/登录背景.png) no-repeat center center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .logoIcon {
    width: 50px;
    height: 50px;
  }
  .logoText {
    margin-top: 18px;
    color: #fff;
    font-size: 20px;
  }
}
.formContainer {
  background-color: #fff;
  position: relative;
  height: 100%;
  width: 50%;
}
.formBox {
  padding: 20px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .el-form-item--mini.el-form-item,
  .el-form-item--small.el-form-item {
    margin-bottom: 10px;
  }
  .el-button--mini,
  .el-button--mini.is-round {
    width: 100%;
  }
  /deep/ .el-form-item__label {
    float: none;
    display: inline-block;
    text-align: left;
    padding: 0px !important;
  }
  .reset {
    font-size: 14px;
    color: #606266;
    cursor: pointer;
  }
  .el-button {
    width: 100%;
  }
}

.checkCodeImg {
  width: 100%;
  height: 30px;
  background: #fff;
  text-align: center;
  /*background-color:rgba(0, 0, 0, 0.6);*/
  border-radius: 4px;
  cursor: pointer;
}
.imgCode {
  width: 100%;
  height: 30px;
}
.verification {
  width: 100%;
  height: 30px;
  /*background-color:rgba(0, 0, 0, 0.6);*/
  border-radius: 4px;
}
.checkCodeBtn {
  width: 100%;
  height: 30px;
  font-size: 12px;
  line-height: 30px;
  color: deepskyblue;
}
.userInfoItem {
  width: 100%;
  height: 28px;
  line-height: 28px;
  text-align: left;
  font-size: 12px;
  color: #fff;
  padding-left: 14px;
  border: 1px solid #aaa;
  border-radius: 4px;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.2);
}

.loginPageContent .el-form-item__label {
  color: #fff;
}
.loginPageContent .el-input__inner {
  background-color: rgba(0, 0, 0, 0.2);
  color: #fff;
  border: 1px solid #aaa;
  border-width: 1px;
}
.loginPageContent .el-select {
  width: 100%;
}
</style>

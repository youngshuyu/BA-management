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
        <div class="logoText">Case Analysis platform</div>
      </div>
      <div class="formContainer">
        <el-form
          label-position="top"
          status-icon
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="110px"
          class="formBox"
        >
          <!-- <el-input v-model="userName" placeholder="Please enter the user name" autocomplete="on"></el-input> -->
          <el-form-item label="Please enter the user name" prop="name">
            <el-input
              v-model="ruleForm.name"
              placeholder="Please enter the user name"
              autocomplete="on"
            ></el-input>
          </el-form-item>

          <el-form-item label="enter your PIN" prop="pass">
            <el-input
              v-model="ruleForm.pass"
              placeholder="enter your PIN"
              type="password"
              autocomplete="new-password"
            ></el-input>
          </el-form-item>

          <el-form-item style="margin-top:15px">
            <el-col>
              <el-button type="primary" :loading="loading" @click="submitForm('ruleForm')">Login</el-button>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-col style="text-align:right">
              <div class="reset" @click="resetForm('ruleForm')">resetMessage</div>
            </el-col>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'login',
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
      loading: false,
      ruleForm: {
        name: '',
        pass: ''
      },
      rules: {
        pass: [{ required: true, validator: validatePass, trigger: 'blur' }],
        name: [{ required: true, validator: checkName, trigger: 'blur' }]
      }
    }
  },
  created () {},
  mounted () {},
  methods: {
    // 点击登录之后校验
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let formParams = {
            userCode: this.ruleForm.name, // 用户名
            passWord: this.ruleForm.pass, // 密码
            channel: this.ruleForm.department // 渠道
          }
          this.doSubmitForm(formParams)
        } else {
          console.log('表单校验错误!!')
          return false
        }
      })
    },
    // 执行登录
    async doSubmitForm (params) {
      this.loading = true
      let res = await this.$axios({
        url: '/auth/user/login',
        method: 'post',
        data: {
          'password': this.ruleForm.pass,
          'username': this.ruleForm.name
        }
      })
      this.loading = false
      // console.log(res)
      if (res.code === '0') {
        // console.log(res)
        window.localStorage.setItem('user-token', res.data)
        let result = await this.$axios({
          url: '/auth/user/menu/list'
        })
        // console.log(result)
        if (result.code == 0) {
          window.localStorage.setItem('menuData', res.data)
          this.$router.push('/home/index')
        } else {
          this.$message({
            message: res.msg,
            type: 'warning'
          })
        }
      } else {
        this.$message({
          message: res.msg,
          type: 'warning'
        })
      }
    },
    // 表单重置
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
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


<template>
    <div class="wrap">
        <div class="logo">
            <div class="img"></div>
            <div class="text">在线学习平台</div>
        </div>
        <div class="box">
            <div class="form" v-if="formType === 1">
                <div class="form-name">账号登录</div>
                <el-form :model="loginForm" :rules="Object.assign(cellphoneRules,passwordRules)" ref="loginForm" label-width="100px" class="login-ruleForm">
                    <el-form-item  prop="cellphone">
                        <el-input placeholder="请输入手机号码"  maxlength="11" v-model.trim="loginForm.cellphone"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input placeholder="请输入密码" minlength="6" maxlength="18" type="password"  v-model.trim="loginForm.password"></el-input>
                    </el-form-item>
                    <el-button v-if="!loginType" @click="submitLoginForm('loginForm')" type="primary">登录</el-button>
                    <el-button v-else type="primary" :loading="true">登录中</el-button>
                    <!-- <div class="btns">
                        <el-button type="text" @click="toggleFormType(2)">验证码登录</el-button>
                        <el-button type="text" @click="toggleFormType(3)">找回密码</el-button>
                    </div> -->
                    <div class="btns" style="margin-top:20px">
                      {{maxAge}}
                      <el-form-item label="保存">
                        <el-radio-group v-model="maxAge" size="small">
                          <el-radio label="0" border>一天</el-radio>
                          <el-radio label="1" border>七天</el-radio>
                          <el-radio label="2" border>三十天</el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </div>
                     <div class="btns">
                        <el-button type="text" @click="goRegister">账号注册</el-button>
                        <!-- <el-button type="text" @click="toggleFormType(3)">找回密码</el-button> -->
                    </div>
                </el-form>
            </div>
            <!-- <div class="form" v-else-if="formType === 2">
                <div class="form-name">验证码登录</div>
                <el-form :model="verifyForm" :rules="Object.assign(cellphoneRules,verifyCodeRules)" ref="verifyForm" label-width="100px" class="login-ruleForm">
                    <el-form-item  prop="cellphone">
                        <el-input placeholder="请输入手机号码" maxlength="11" v-model.trim="verifyForm.cellphone"></el-input>
                    </el-form-item>
                    <el-form-item prop="verifyCode">
                        <el-input placeholder="请输入验证码" v-model.trim="verifyForm.verifyCode">
                            <el-button slot="append" v-if="!sendCodeType.active" icon="el-icon-message" @click="sendCode(verifyForm.cellphone)"></el-button>
                            <template slot="append" v-else>{{sendCodeType.seconds}}s</template>
                        </el-input>
                    </el-form-item>
                    <el-button  @click="submitVerifyForm('verifyForm')" type="primary" :loading="globalState.loading">登录</el-button>
                    <div class="btns">
                        <el-button type="text" @click="toggleFormType(1)">密码登录</el-button>
                    </div>
                </el-form>
            </div> -->
            <!-- <div class="form" v-else-if="formType === 3">
                <div class="form-name">重置密码</div>
                <el-form :model="resetForm" :rules="Object.assign(cellphoneRules,passwordRules,verifyCodeRules)" ref="resetForm" label-width="100px" class="login-ruleForm">
                    <el-form-item  prop="cellphone">
                        <el-input placeholder="请输入手机号码" maxlength="11" v-model.trim="resetForm.cellphone"></el-input>
                    </el-form-item>
                    <el-form-item prop="verifyCode">
                        <el-input placeholder="请输入验证码" v-model.trim="resetForm.verifyCode">
                            <el-button slot="append" icon="el-icon-message" @click="sendCode(resetForm.cellphone)" v-if="!sendCodeType.active"></el-button>
                            <template slot="append" v-else>{{sendCodeType.seconds}}s</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-if="hidePassword" placeholder="请输入6-18位新密码" minlength="6" maxlength="18" type="password" v-model.trim="resetForm.password">
                              <el-button  slot="append" icon="el-icon-view" @click="hidePassword=!hidePassword"></el-button>
                        </el-input>
                        <el-input v-else placeholder="请输入6-18位新密码" minlength="6" maxlength="18" type="text" v-model.trim="resetForm.password">
                              <el-button  slot="append" icon="el-icon-view" @click="hidePassword=!hidePassword"></el-button>
                        </el-input>
                    </el-form-item>
                    <el-button  @click="submitResetForm('resetForm')" type="primary" :loading="globalState.loading">确认重置</el-button>
                </el-form>
            </div>
            <div class="tips">
                <div class="QRcode"></div>
                <p>下载升学APP</p>
                <p>随时随地，你的学习不间断</p>
                <el-button>扫码下载</el-button>
            </div> -->
        </div>
    </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  name: 'login',
  data () {
    return {
      maxAge: '',
      formType: 1,
      sendCodeType: {
        active: false,
        seconds: 60
      },
      hidePassword: true,
      loginType: false,
      loginForm: {
        cellphone: '',
        password: ''
      },
      verifyForm: {
        cellphone: '',
        verifyCode: ''
      },
      resetForm: {
        cellphone: '',
        verifyCode: '',
        password: ''
      },
      cellphoneRules: {
        cellphone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { pattern: /^1[345789]\d{9}$/, message: '目前只支持中国大陆的手机号码', trigger: 'blur' }
        ] },
      passwordRules: {
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '请输入6-18位密码', trigger: 'blur' }
        ] },
      verifyCodeRules: {
        verifyCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]}
    }
  },
  computed: {
    ...mapGetters({
      globalState: ['globalState']
    })
  },
  methods: {

    // 注册
    goRegister () {
      this.$router.push({path: 'register'})
    },
    // 账号登陆
    submitLoginForm (formName) {
      let maxAge = 0
      switch (this.maxAge) {
        case '0':
          // 一天
          maxAge = 24 * 60 * 60 * 1000
          break
        case '1':
          // 七天
          maxAge = 24 * 60 * 60 * 1000 * 7
          break
        case '2':
          // 30天
          maxAge = 24 * 60 * 60 * 1000 * 30
          break
        default:
          maxAge = 0
          break
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch({
            type: 'login',
            memberCellphone: this.loginForm.cellphone,
            loginPwd: this.loginForm.password,
            maxAge: maxAge
          }).then(res => {
            this.loginSuccess()
          })
        } else { return false }
      })
    },
    // 登录成功
    loginSuccess () {
      this.$router.push('/user')
      this.$message({
        showClose: true,
        duration: 1500,
        message: '登录成功',
        type: 'success'})
    }
  },
  destroyed () {
    // const timer = this.sendCode()
    // timer.clearCountInterval()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.wrap{
      padding: 210px 0 0 33%;
      width:100%;
      min-height: 100vh;
      background: url('../../assets/images/loginbg.png') no-repeat center center;
      background-size:100% 100%;
    .logo{
        display: flex;
        align-items:center;
        .img{
            width:125px;
            height:35px;
            background: url('../../assets/images/loginlogo.png') no-repeat center ;
            background-size:100% 100%;
            margin-right:2px;
        }
        .text{
            height:34px;
            line-height: 34px;
            font-size:30px;
            color:#fff;
            padding-left:16px;
            border-left:1px solid #fff;
        }
    }
    .box{
        width:370px;
        height:370px;
        margin-top:35px;
        display: flex;
        .form{
            width:370px;
            background: #fff;
            .form-name{
                text-align: center;
                margin: 36px 0;
            }
            .login-ruleForm{
                padding: 0 34px;
                .el-form-item{
                    margin-left:-100px;
                }
                .btns .el-form-item{
                    margin-left:-60px;
                    margin-bottom: 0;
                }
                .el-button--primary{
                    width:100%;
                }
                .btns{
                    display:flex;
                    justify-content: space-between;
                }
            }
        }
        .tips{
            width: 270px;
            padding-top:74px;
            background: #f5f6fa;
            display: flex;
            flex-direction: column;
            align-items: center;
            color:#666;
            .QRcode{
                width:104px;
                height:104px;
                background: #000;
            }
            p{
                margin-top:11px;
            }
            .el-button{
                width:128px;
                margin-top:20px;
            }
        }
    }
}
</style>

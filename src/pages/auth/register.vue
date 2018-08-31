
<template>
    <div class="wrap">
        <div class="box">
          <div class="form-name">账号注册</div>
          <el-form :model="registerForm" :rules="Object.assign(cellphoneRules,passwordRules)" ref="registerForm" label-width="100px" class="login-ruleForm">
               <el-form-item prop="username">
                  <el-input placeholder="请输入用户名" minlength="6" maxlength="18" type="text"  v-model.trim="registerForm.username"></el-input>
              </el-form-item>
              <el-form-item  prop="cellphone">
                  <el-input placeholder="请输入手机号码"  maxlength="11" v-model.trim="registerForm.cellphone"></el-input>
              </el-form-item>
              <el-form-item prop="email">
                <el-input placeholder="请输入邮箱"  maxlength="30" v-model.trim="registerForm.email"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                  <el-input placeholder="请输入密码" minlength="6" maxlength="18" type="password"  v-model.trim="registerForm.password"></el-input>
              </el-form-item>
               <el-form-item prop="toopassword">
                  <el-input placeholder="请再次输入密码" minlength="6" maxlength="18" type="password"  v-model.trim="registerForm.toopassword"></el-input>
               </el-form-item>
              <!-- <el-form-item prop="toopassword">
                <el-upload
                  class="upload"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :before-remove="beforeRemove"
                  :on-success="handleSuccess"
                  :on-error="handleError"
                  name="file"
                  :limit="1"
                  :on-exceed="handleExceed"
                  :file-list="fileList"
                  :http-request="httpRequest">
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
              </el-form-item> -->
              <input id="uploadavatar" type="file" value=""/>
              <el-button @click="submitregisterForm('registerForm')" type="primary">注册</el-button>
          </el-form>
      </div>
    </div>
</template>

<script>

import authService from './authService'
import { mapGetters } from 'vuex'

export default {
  name: 'login',
  data () {
    return {
      fileList: [],
      registerForm: {
        username: 'sheng',
        cellphone: '18682049766',
        email: '317595260@qq.com',
        password: '123456',
        toopassword: '123456'
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
        ] }
    }
  },
  computed: {
    ...mapGetters({
      globalState: ['globalState']
    })
  },
  methods: {
    // 账号注册
    submitregisterForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let {username, email, cellphone, password, toopassword} = this.registerForm
          authService.register(username, email, cellphone, password, toopassword).then(result => {
            this.registerSuccess()
          }).catch((err) => {
            console.log(err)
          })
        } else { return false }
      })
    },
    // 注册成功
    registerSuccess () {
      this.$message({
        showClose: true,
        duration: 1500,
        message: '注册成功',
        type: 'success'
      })
      this.$router.push({path: 'login'})
    }
    // handleRemove (file, fileList) {
    //   console.log(file, fileList)
    // },
    // handlePreview (file) {
    //   console.log(file)
    // },
    // handleExceed (files, fileList) {
    //   this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    // },
    // beforeRemove (file, fileList) {
    //   return this.$confirm(`确定移除 ${file.name}？`)
    // },
    // handleSuccess (response, file, fileList) {
    //   console.log(response, file, fileList)
    // },
    // handleError () {

    // },
    // httpRequest () {
    //   debugger
    //   authService.uploadavatar().then(result => {
    //     console.log(result)
    //   }).catch((err) => {
    //     console.log(err)
    //   })
    // }

  },

  mounted () {
    var Input = document.getElementById('uploadavatar')
    Input.onchange = function upload () {
      var files = this.files ? this.files : []
      if (!files.length || !window.FileReader) {
        console.log('浏览器不支持HTML5')
        return false
      };
      // 创建一个FormData对象,用来组装一组用 XMLHttpRequest发送请求的键/值对
      var fd = new FormData()
      // 把 input 标签获取的文件加入 FromData 中
      fd.append('file', files[0])

      // Ajax
      var request = new XMLHttpRequest()
      request.open('POST', 'http://localhost:3000/uploadavatar')
      request.send(fd)
      request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
          console.log('上传成功')
          var response = JSON.parse(request.responseText)
          console.log(response)
        }
      }
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
      padding-bottom: 30px;
      position: absolute;
      left: 50%;
      top:50%;
      transform: translate(-50%,-50%);
      background: #fff;
      .form-name{
          text-align: center;
          padding: 36px 0;
      }
      .login-ruleForm{
          padding: 0 34px;
          .el-form-item{
              margin-left:-100px;
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
}
</style>

<template>
  <div class="header-nav">
    <div class="logo">
      <div class="userName">欢迎你! <span style="color:#ff0000">{{userName}}</span></div>
      <div class="text">在线学习平台</div>
    </div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-dropdown class="avater"  @command="handleCommand">
        <span class="el-dropdown-link">
          <img :src="userInfo.avatarSrc || avatarSrc" alt="">
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="logout">登出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-menu-item v-for="(bar,barIndex) in navigationBar" :key="barIndex" :index="bar.index" >{{bar.name}}</el-menu-item>
    </el-menu>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import avater from '@/assets/images/avater.png'

export default {
  name: 'headerNav',
  data () {
    return {
      avatarSrc: avater,
      userName: 'guest',
      activeIndex: '0',
      navigationBar: [
        {
          name: '课程',
          path: '/lesson',
          // path: '/login',
          index: '0'
        },
        {
          name: '题库',
          path: '/exercises',
          index: '1'
        },
        {
          name: '考试相关',
          path: '/examination',
          index: '2'
        },
        {
          name: '学习资料',
          path: '/study',
          index: '3'
        },
        {
          name: '个人中心',
          path: '/user',
          index: '4'
        }
      ],
      colors: [
        {
          name: '天蓝色',
          path: '/user',
          index: '4'
        }
        // primary: '#488aff',
        // secondary: '#32db64',
        // danger: '#f53d3d',
        // light: '#f4f4f4',
        // dark: '#222',
        // gray: '#f8f8f8'
      ]
    }
  },
  computed: {
    // Map store/user state
    ...mapGetters({
      userInfo: ['userInfo']
    })

  },
  methods: {
    handleSelect (key, keyPath) {
      if (!this.$route.path.includes(this.navigationBar[key].path)) {
        this.$router.push(this.navigationBar[key].path)
      }
    },
    init () {
      this.activeIndex = this.navigationBar.find(item => this.$route.path.includes(item.path)).index
      let vuex = JSON.parse(localStorage.getItem('vuex'))
      this.userName = (vuex && vuex.user && vuex.user.userName) || 'guest'
    },
    handleCommand (command) {
      switch (command) {
        case 'logout':
          this.logout().then(result => {
            this.$message.success('登出成功!')
            this.$router.push('/login')
          })

          break
        default:
          break
      }
    },
    ...mapActions({
      logout: 'logout'
    })
  },
  mounted: function () {
    this.init()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .header-nav{
    display:flex;
    justify-content:space-between;
    width:1200px;
    margin:0 auto;
    .logo{
      display: flex;
      align-items:center;
      .img{
        width:125px;
        height:35px;
        background: url('../../assets/images/logo.png') no-repeat center ;
        background-size:100% 100%;
        margin-right:2px;
      }
      .text{
        height:34px;
        line-height: 34px;
        color:#666;
        padding-left:16px;
        border-left:1px solid #666;
        margin-left:16px;
      }
    };
    .person{
      line-height: 60px;
    }
  }
  .el-menu{
    width:880px;
    border-bottom:none;
   .el-menu-item:last-child{
    float:right;
    padding-left:50px;
   }
   .theme,.avater{
      position: absolute;
      width:36px;
      height:36px;
      right:90px;
      top:10px;
      z-index: 10;
      img{
        display: inline-block;
        border-radius:50%;
        object-fit: cover;
      }
   }
   .theme{
     right:130px;
     .el-dropdown-link{
       display: inline-block;
        width:36px;
        height:36px;
        // border-radius:50%;
        // border:1px solid #000;
        // border-style:solid;
        // border-color:nth($theme-colors, 2) nth($theme-colors, 4) nth($theme-colors, 6) nth($theme-colors, 5);
     }
   }
  }
</style>

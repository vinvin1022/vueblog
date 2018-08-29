<template>
    <el-container>
        <el-header><headerNav></headerNav></el-header>
        <el-main>
          <!-- <transition name="fade" mode="out-in"> -->
           <router-view></router-view>
          <!-- </transition> -->
        </el-main>
        <el-footer>
        </el-footer>
    </el-container>
</template>

<script>
import headerNav from './headerNav'
export default {
  name: 'layout',
  data () {
    return {
    }
  },
  components: {
    headerNav
  },
  methods: {
    init () {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
// .el-header{
//   padding:0;
//   background: #fff;
//   margin-bottom: 2px;
// }
// .el-main,.el-footer{
//   width:1200px;
//   margin: 0 auto;
//   padding: 0;
//   overflow-y: hidden;
// }
// .el-container{
//   background:map-get($colors, gray);
//   min-height:100vh;
// }
// .title-main{
//   background:#f8f8f8;
//   width: 100%;
//   height: 50px;
// }
// .title-p{
//   display: inline-block;
//   margin-top: 15px;
//   height:20px;
//   line-height: 20px;
//   font-size: 14px;
//   color:  #999999;
// }
// .el-footer{
//   background: #f8f8f8;
//   height: 10px;
// }
// .fade-enter-active, .fade-leave-active {
//   transition: opacity .2s;
// }
// .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
//   opacity: 0;
// }
</style>

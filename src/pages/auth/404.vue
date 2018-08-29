
<template>
    <div class="main">
        <h1>404 Not Found</h1>
        <p><router-link :to='home'>回到首页或登录</router-link></p>
    </div>
</template>

<script>

export default {
  name: 'login',
  data () {
    return {
      home: '/'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.main{
    height:100vh;
    margin-top:20%;
    text-align: center;
    h1{
        font-size:60px;
    }
    p{
        margin-top:100px;
        font-size:20px;
    }
}
</style>

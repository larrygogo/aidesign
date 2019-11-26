<template>
  <div class="error">
    <div class="img404">
      <!--<h1 v-if="error.statusCode === 404">页面不存在</h1>-->
      <!--<h1 v-else>应用发生错误异常</h1>-->
      <nuxt-link class="btn" to="/">返回首页</nuxt-link>
    </div>

  </div>
</template>

<script>
  export default {
    props: ['error'],
    layout: 'nologin' // 你可以为错误页面指定自定义的布局
  }
</script>

<style scoped>
  .img404 {
    position: absolute;
    /* background: 50% url(~assets/images/public/404.png) no-repeat; */
    display: flex;
    width: 100%;
    background-size: cover;
    height: 100%;
    justify-content: center;
    align-items: center;
  }
  .btn {
    color: #fff;
    width: 200px;
    height: 50px;
    font-size: 24px;
    line-height: 50px;
    text-align: center;
    border-radius: 25px;
    text-decoration: none;
    background-image: linear-gradient(55deg, #4facfe, #00f2fe);
  }
</style>

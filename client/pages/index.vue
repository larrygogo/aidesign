<template>
  <section class="page">
    <div class="login-row">
      <header class="login-head">
        <img class="login-image" src="~/assets/images/login.png" alt />
        <p class="logo">AI Design</p>
        <p class="slogan">
          <span>敲客</span>智能设计图像渲染
        </p>
        <button class="btn" @click="$router.push('/console')">开始使用</button>
      </header>
    </div>
  </section>
</template>

<script>
export default {
};
</script>

<style lang="scss" scoped>
@import '~assets/style/style.scss';
.page {
  display: flex;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-image: -webkit-linear-gradient(bottom, #1d252d, #000000);

  .login-row {
    // width: 400px;
    margin: 0 auto;
    color: #fff;
    margin-top: -10vh;

    .login-head {
      text-align: center;
      font-size: 50px;

      .logo {
        font-family: "Arvo-BoldItalic";
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1em;
        margin-top: 0;
        margin-bottom: 20px;
        font-weight: 400;
        letter-spacing: 8px;
        color: #efefef;
        text-shadow: 6px 4px 0px #00b050;
      }

      .slogan {
        padding-left: 20px;
        margin: 0;
        font-weight: 100;
        letter-spacing: 20px;
        margin-bottom: 20px;

        span {
          background-image: linear-gradient(to right, #0ba360, #3cba92);
          background-clip: text;
          color: transparent;
        }
      }

      .login-image {
        width: 100px;
        margin-right: 20px;
      }
    }

    .btn {
        height: 50px;
        min-width: 200px;
        font-size: 24px;
        // background-color: #00b050;
        background-image: linear-gradient(to right, #0ba360, #3cba92);
        color: #ffffff;
        border: none;
        transition: all .2s;
        cursor: pointer;
        outline: none;

        &:hover {
            box-shadow: 0 2px 20px rgba(52, 107, 55, 0.6);
        }
    }
  }
}
</style>



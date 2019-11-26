<template>
  <section class="console-container">
    <header class="header">
      <span>AI Design</span>
    </header>
    <nuxt />
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import "~assets/style/style.scss";

body {
  margin: 0;
}

.console-container {
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;

  .header {
    padding: 10px 40px;
    line-height: 60px;
    font-family: "Arvo-BoldItalic";
    font-size: 40px;
    color: #fff;
    letter-spacing: 6px;
    text-align: center;
    // text-shadow: 6px 4px 0px #00b050;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.4);
    background-color: #1d252d;
    //   background-image: -webkit-linear-gradient(right, #1d252d, #1d252d);
  }
}
</style>
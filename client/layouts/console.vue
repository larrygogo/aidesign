<template>
  <section class="console-container">
    <header class="header">
      <div class="back-icon">
        <!-- <fa :icon="['fal', 'left-']" -->
      </div>
      <img src="~assets/images/login.png" alt />
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
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 40px;
    line-height: 60px;
    height: 60px;
    font-family: "Arvo-BoldItalic";
    font-size: 40px;
    color: #fff;
    letter-spacing: 6px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.4);
    background-color: #1d252d;

    @media screen and (max-width: 768px) {
      --height: calc(1vh / 3);
      --width: calc(1vw / 3);
      --target: calc(var(--height) + var(--width));
      font-size: calc(var(--target) + 24px);
    }

    img {
      height: 80%;
      margin-right: 20px;
    }
  }
}
</style>
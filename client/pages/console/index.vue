<template>
  <div class="page">
    <section class="list">
      <div class="item" @click="$router.push('/console/render')">
        <p>智能渲染</p>
        <span>立即前往</span>
      </div>
      <div class="item" @click="$router.push('/console/template')">
        <p>模板管理</p>
        <!-- <span>立即前往</span> -->
      </div>
    </section>
  </div>
</template>

<script>
export default {
  layout: "console"
};
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: scroll;
}

.list {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 40px;
  width: 1980px;
  max-width: 1980px;
  margin: 0 auto;

  @media screen and (max-width: 1980px) {
    width: calc(100% - 80px);
  }

  @media screen and (max-width: 768px) {
    padding: 20px;
  }

  .item {
    width: 45%;
    height: 300px;
    background-image: url(~assets/images/ai2.png),
      -webkit-linear-gradient(left bottom, rgb(131, 159, 219), rgb(225, 236, 255));
    background-position: calc(100% - 20px) calc(100% - 20px), 0 0;
    background-size: auto 160px, 100% 100%;
    background-repeat: no-repeat;
    // border: 1px solid #eee;
    box-sizing: border-box;
    cursor: pointer;
    padding: 40px;
    transition: all 0.4s;

    &:hover {
      box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.4);
      margin-top: -10px;
    }

    p {
      margin: 0;
      font-size: 50px;
      font-weight: bold;
      letter-spacing: 20px;
      color: rgb(51, 35, 139);
      text-shadow: 2px 2px 0 rgba(134, 113, 182, 0.4);
      font-style: italic;
      transition: inherit;
    }

    span {
      display: block;
      margin-top: 20px;
      font-size: 20px;
      color: rgb(226, 228, 243);

      &::after {
        display: inline-block;
        content: " ";
        margin-left: 10px;
        width: 13px;
        height: 13px;
        border-right: 2px solid rgb(226, 228, 243);
        border-top: 2px solid rgb(226, 228, 243);
        transform: rotate(45deg);
      }
    }

    @media screen and (max-width: 1000px) {
      width: 100%;
      margin-bottom: 30px;
      box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.4);

      &:hover {
        margin-top: 0px;
      }
    }

    @media screen and (max-width: 768px) {
      background-size: auto 200px, 100% 100%;

      p {
        font-size: 40px;
        letter-spacing: 10px;
      }

      &:nth-last-of-type() {
        margin-bottom: 0px;
      }
    }

    @media screen and (max-width: 480px) {
      background-size: auto 100px, 100% 100%;
    }
  }
}

</style>
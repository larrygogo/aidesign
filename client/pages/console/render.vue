<template>
  <div class="page">
    <div class="options-row">
      <div
        class="image-row"
        :style="`border-image: linear-gradient(to top, #00b04f6e ${upload}% ${upload}% , #eee ${upload}% ${100 - upload}%) 30 30;`"
      >
        <input class="input-file" type="file" accept="image/*" multiple @change="uploadImage" />
        <img v-if="image" :src="image" />
        <fa v-if="!image" :icon="['fal', 'plus']" size="4x" color="#eee" />
      </div>
      <div class="input-group">
        <div class="input-box">
          <input class="input" type="text" placeholder="主文案" />
        </div>
        <div class="input-box">
          <input class="input" type="text" placeholder="副文案" />
        </div>
        <div class="input-box">
          <input class="input" type="text" placeholder="行动点文案" />
        </div>
        <button class="render-btn" @click="loadingBtn">立即渲染</button>
      </div>
    </div>
    <div class="render-row">
      <div class="image-row">
        <div class="loding-row" :class="{ 'loading':  loading }">
          <p>AI Design</p>
          <span>正在智能渲染</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "console",
  data() {
    return {
      image: null,
      loading: false,
      upload: 0
    };
  },
  methods: {
    loadingBtn() {
      this.loading = !this.loading;
    },
    uploadImage(e) {
      let reader = new FileReader();
      if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = e => {
          this.image = e.target.result; //img base64
        };
      } else {
        this.image = null;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@keyframes LOADING {
  0% {
    color: #00b050;
  }
  100% {
    text-shadow: 10px 10px 0 #449bf8;
    color: #ffdd43;
  }
}
.page {
  display: flex;
  flex-direction: row;

  @media screen and (max-width: 1000px) {
    flex-direction: column;
  }

  .options-row {
    width: 40%;

    .render-btn {
      width: 100%;
      height: 50px;
      font-size: 24px;
      color: #fff;
      outline: none;
      background-color: #00b050;
      margin-top: 20px;
      transition: all 0.5s;
      font-weight: 300;
      letter-spacing: 10px;
      cursor: pointer;

      &:hover {
        box-shadow: 0 2px 20px rgba(52, 107, 55, 0.6);
      }
    }
    .image-row {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 3px dotted #eee;
      width: calc(100% - 6px);
      height: 300px;
      margin-bottom: 20px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: scale-down;
        background-image: linear-gradient(
            45deg,
            #eee 25%,
            transparent 0,
            transparent 75%,
            #eee 0
          ),
          linear-gradient(
            45deg,
            #eee 25%,
            transparent 0,
            transparent 75%,
            #eee 0
          );
        background-position: 0 0, 15px 15px;
        background-size: 30px 30px;
      }

      .input-file {
        cursor: pointer;
        opacity: 0;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }
    }

    .input-box {
      width: 100%;
      margin-bottom: 20px;

      .input {
        width: 100%;
        height: 50px;
        border: 3px solid #eee;
        outline: none;
        padding: 10px;
        box-sizing: border-box;
        line-height: 32px;
        font-size: 24px;
        caret-color: #bbb;
        color: #545454;
        transition: all 0.5s;

        &::placeholder {
          color: #bbb9b9;
          font-weight: 300;
          text-align: center;
        }

        &:focus {
          border-color: #00b04f6e;

          &::placeholder {
            color: #00b04f60;
          }
        }

        &:last-of-type {
          &::placeholder {
            letter-spacing: 10px;
          }
        }
      }
    }
  }

  .render-row {
    width: 60%;
    .image-row {
      height: 674px;

      .loding-row {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 500px;
        transform: all 1s;
        p {
          margin: 0;
          font-family: "Arvo-BoldItalic";
          font-size: 10vmin;
          text-align: center;
          color: #eee;
          letter-spacing: 5px;

          &.loading {
            color: #00b050;
            animation: LOADING 2s infinite alternate ease;
          }
        }
        span {
          opacity: 0;
          color: #4d647c;
          letter-spacing: 10px;
        }

        &.loading {
          p {
            color: #00b050;
            animation: LOADING 2s infinite alternate ease;
          }
          span {
            opacity: 1;
          }
        }
      }
    }
  }

  .options-row,
  .render-row {
    padding: 20px;
    @media screen and (max-width: 1000px) {
      width: calc(100% - 40px);
    }
  }
}
</style>
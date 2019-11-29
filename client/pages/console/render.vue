<template>
  <div class="page">
    <div class="options-row">
      <div
        class="image-row"
        :style="`border-image: linear-gradient(to top, #00cdac 0%, #8ddad5 ${upload}%, #eee ${upload}% ${100 - upload}%) 30 30;`"
      >
        <input class="input-file" type="file" accept="image/*" multiple @change="uploadImage" />
        <img v-if="image" :src="imageUrl" />
        <fa v-if="!image" :icon="['fal', 'plus']" size="4x" color="#eee" />
      </div>
      <div class="input-group">
        <div class="input-box">
          <input v-model="mainText" class="input" type="text" placeholder="主文案" />
        </div>
        <div class="input-box">
          <input v-model="subText" class="input" type="text" placeholder="副文案" />
        </div>
        <div class="input-box">
          <input v-model="descText" class="input" type="text" placeholder="行动点文案" />
        </div>
        <button class="render-btn" @click="render">立即渲染</button>
      </div>
    </div>
    <div class="render-row">
      <div class="image-row">
        <div class="loding-row" :class="{ 'loading':  loading }" v-if="!template">
          <p>AI Design</p>
          <span>正在智能渲染</span>
        </div>
        <div class="template">
          <img :src="template" alt="">
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
      imageUrl: null,
      image: null,
      loading: false,
      upload: 0,
      mainText: "",
      subText: "",
      descText: "",
      template: null
    };
  },
  methods: {
    loadingBtn() {
      this.loading = !this.loading;
    },
    uploadImage(e) {
      let formData = new FormData();
      if (e.target.files[0]) {
        let file = e.target.files[0];
        let name = file.name.split(".")[1] || null;
        if (name && ['png', 'jpg', 'jpeg'].includes(name)) {
          if (file.size > 1024 * 1024 * 30) {
            this.$alert("文件大小超过限制");
          } else {
            formData.append("file", file);
            let config = {
              headers: { "Content-Type": "multipart/form-data" },
              onUploadProgress: function(e) {
                console.log("进度：");
                console.log(e);
                if (e.lengthComputable) {
                  var rate = (this.uploadRate = e.loaded / e.total); //已上传的比例
                  if (rate < 1) {
                    //这里的进度只能表明文件已经上传到后台，但是后台有没有处理完还不知道
                    //因此不能直接显示为100%，不然用户会误以为已经上传完毕，关掉浏览器的话就可能导致上传失败
                    //等响应回来时，再将进度设为100%
                    this.upload = rate * 100;
                  }
                }
              }
            };
            this.upload = 0
            this.$axios
              .post("/api/image/upload", formData, config)
              .then(res => {
              
                if (res.data.success) {
                  this.imageUrl = '/uploads/runtime/' + res.data.data
                  this.image = res.data.data
                  this.upload = 100;
                }
              });
          }
        } else {
          this.$alert("文件类型错误");
          if (e.target.file) {
            delete e.target.file;
          }
        }
      } else {
        this.image = null;
      }
    },
    render() {
      this.loading = true
      this.template = null
      this.$axios.post('/api/template/render', {
        image: this.image, main_text: this.mainText, sub_text: this.subText, desc_text: this.descText
      }).then(res => {
        this.loading = false
        if(res.data.success) {
          this.template = res.data.data
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
@keyframes LOADING {
  0% {
    color: #0ba360;
  }
  100% {
    text-shadow: 10px 10px 0 #449bf8;
    color: #ffdd43;
  }
}
.page {
  display: flex;
  flex-direction: row;
  width: 1980px;
  max-width: 1980px;
  margin: 0 auto;

  @media screen and (max-width: 1980px) {
    width: calc(100% - 40px);
  }

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
      background-image: linear-gradient(to right, #0ba360, #3cba92);
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
        border: 1px solid #eee;
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
        &:hover {
          background-color: #f7f7f7;
        }
        &:focus {
          background-color: #fff;
          // border-color: #00b04f6e;
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);

          // &::placeholder {
          //   color: #00b04f60;
          // }
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
          font-size: 100px;
          text-align: center;
          color: #eee;
          letter-spacing: 5px;

          @media screen and (max-width: 1200px) {
            font-size: 80px;
          }

          @media screen and (max-width: 768px) {
            font-size: 10vmin;
          }

          &.loading {
            background-image: linear-gradient(to right, #0ba360, #3cba92);
            background-clip: text;
            color: transparent;
            // color: #00b050;
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

      .template {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 500px;

        img {
          width: 80%;
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
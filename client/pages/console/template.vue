<template>
  <div class="page">
    <div
      class="upload-btn"
      :class="{'show': showUpload}"
      @click="uploadBoxAction"
    >{{showUpload ? '收起上传区域' : '展开上传区域'}}</div>
    <div class="upload-row" :class="{'show': showUpload}">
      <div class="upload-box">
        <input class="input-file" type="file" multiple @change="uploadPSD" />
        <fa :icon="['fal', 'plus']" size="3x" color="#eee"></fa>
      </div>
      <div class="message-box">
        <p>PSD导入说明:</p>
        <p>源文件大小限制在30M以内;</p>
        <p>画布大小不超过2000*2000;</p>
      </div>
    </div>
    <div class="template-row">
      <h2 class="title">全部模板</h2>
      <div class="no-template" v-if="list.length < 1">
        <img src="~assets/images/warn.png" alt />
        <p>暂时没有任何模板</p>
      </div>
      <div class="template-list" v-if="list.length > 0">
        <div class="item" v-for="(item, index) in list" :key="index">
          <img :src="item.cover" alt />
          <p class="name">{{item.name}}</p>
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
      list: [],
      uploadRate: 0,
      showUpload: false
    };
  },
  mounted() {
    this.getAllTemplate();
  },
  methods: {
    uploadBoxAction() {
      this.showUpload = !this.showUpload;
    },
    uploadPSD(e) {
      let formData = new FormData();
      if (e.target.files[0]) {
        let file = e.target.files[0];
        let name = file.name.split(".")[1] || null;
        if (name && name === "psd") {
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
                    this.uploadRate = rate;
                  }
                }
              }
            };
            this.$axios
              .post("/api/template/upload", formData, config)
              .then(res => {
                  if(res.success) {
                      this.uploadRate = 1;
                  }
              });
          }
        } else {
          this.$alert("文件类型错误");
          if (e.target.file) {
            delete e.target.file;
          }
        }
      }
    },
    getAllTemplate() {
      this.$axios.get("/api/template/all").then(res => {
        if (res.data.success) {
          this.list = res.data.data;
        }
      });
    },
  }
};
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 20px;
  width: 1980px;
  max-width: 1980px;
  margin: 0 auto;

  @media screen and (max-width: 1980px) {
    width: calc(100% - 80px);
  }
  .upload-btn {
    height: 50px;
    color: rgb(77, 77, 77);
    text-align: center;
    font-size: 24px;
    letter-spacing: 10px;
    font-weight: 300;
    line-height: 50px;
    border: 1px solid #fff;
    background-image: linear-gradient(to right bottom, #fff, #fff);
    transition: all 0.5s;
    width: 500px;
    margin: 0 auto;
    cursor: pointer;

    &:hover {
      border: 1px solid #eee;
      //   box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
      background-image: linear-gradient(to right bottom, #fdfbfb, #ebedee);
    }

    @media screen and (max-width: 768px) {
      width: 100%;
      border: 1px solid #eee;
      background-image: linear-gradient(to right bottom, #fdfbfb, #ebedee);
    }

    &.show {
      width: 100%;
      border: 1px solid #eee;
      background-image: linear-gradient(to right bottom, #fdfbfb, #ebedee);
    }
    @media screen and (max-width: 768px) {
      &:hover {
        box-shadow: none;
      }
      .show {
        width: 80%;
      }
    }
  }
  .upload-row {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 500px;
    border: 1px solid #eee;
    border-top: 0px;
    box-sizing: border-box;
    height: 0;
    overflow: hidden;
    transition: all 0.5s;
    margin: 0 auto;

    @media screen and (max-width: 768px) {
      width: 100%;
    }

    &.show {
      height: 384px;
      width: 100%;
    }

    .upload-box {
      display: flex;
      position: relative;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 200px;
      min-width: 335px;
      border: 3px dotted #eee;
      background-color: #aaa;

      @media screen and (max-width: 480px) {
        width: 80%;
        min-width: 0;
      }

      input {
        cursor: pointer;
        opacity: 0;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }
    }

    .message-box {
      color: #aaa;
      min-width: 335px;
      @media screen and (max-width: 480px) {
        width: 80%;
        min-width: 0;
      }
      p {
        margin-top: 10px;
        margin-bottom: 0;
      }
    }
  }
  .template-row {
    text-align: center;

    .title {
      display: inline-block;
      font-family: "zihun100-ffxft";
      text-align: center;
      font-size: 50px;
      font-weight: 300;
      letter-spacing: 10px;
      background-image: linear-gradient(to right, #0ba360, #3cba92);
      background-clip: text;
      color: transparent;
      height: 50px;
      line-height: 50px;
      border-bottom: 10px solid #dbb9226e;
      margin: 80px 0;
    }

    .no-template {
      img {
        height: 400px;
      }
      p {
        --height: calc(1vh / 3);
        --width: calc(1vw / 3);
        --target: calc(var(--height) + var(--width));
        font-size: calc(var(--target) + 20px);
        letter-spacing: 5px;
      }
    }

    .template-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .item {
            width: 23%;
            margin-bottom: 30px;

            @media screen and (max-width: 1400px){
                width: 30%;
            }

            @media screen and (max-width: 1200px){
                width: 47%;
            }

            @media screen and (max-width: 768px){
                width: 100%;
            }
            img {
                display: block;
                width: 100%;
                transition: all .5s;
                cursor: pointer;
            }

            &:hover {
                img {
                    box-shadow: 2px 2px 20px rgba(0, 0, 0, .3);
                }
            }

            .name {
                color: #bbb;
            }
        }
    }
  }
}
</style>
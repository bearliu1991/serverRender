const mixin = {
  data() {
    return {
      baseImgRUL: process.env.VUE_APP_BASE_API2 + '/system/fileRequest',
      mixUploadUrl: '',
      videoUploadPercent: 0,
      videoFlag: false,
      imageUploadPercent: 0,
      imageFlag: false,
    }
  },
  methods: {
    beforeUpload(file) {
      const isJPG =
        file.type === 'image/jpeg' ||
        file.type === 'image/jpg' ||
        file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传图片必须是JPG/PNG 格式!')
      }

      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },

    handleSuccess(res, file, ...args) {
      // return false
      if (res.code === 200) {
        if (res.transCode === -1) {
          this.$message({
            type: 'error',
            message: res.message,
          })
          return false
        }
        if (args[2]) {
          this.$data[args[0]][args[2]] = file.size
        } else if (args[3]) {
          this.$data[args[0]][args[3]] = file.size
        }
        this.mixUploadUrl = res.result.result.replace(
          '/home/topsales/static',
          process.env.VUE_APP_BASE_API2
        )
        // this.$data[form][strImg] = URL.createObjectURL(file.raw)
        this.$data[args[0]][args[1]] = res.result.result.replace(
          '/home/topsales/static',
          process.env.VUE_APP_BASE_API2
        )
      }
      this.imageFlag = false
      this.imageUploadPercent = 0
    },
    handleVideoSuccess(res, file, ...args) {
      this.videoFlag = false
      this.videoUploadPercent = 0
      this.$data[args[0]][args[1]] = res.result.result.replace(
        '/home/topsales/static',
        process.env.VUE_APP_BASE_API2
      )
      if (args[2]) {
        // this.addForm.strMaterialsize
        this.$data[args[0]][args[2]] = file.size
      }
      // this.addForm.strMaterialsize = file.size
      // this.addForm.bigSizes = Math.floor(this.addForm.bigSizes * 1000) / 1000  // 小数取整后三位
      // if (res.status === 200) {
      // } else {
      //   this.$message.error('视频上传失败，请重新上传！');
      // }
    },
    uploadImageProcess(event, file, fileList) {
      this.imageFlag = true
      this.imageUploadPercent = parseInt(file.percentage.toFixed(0))
    },
  },
}

export default mixin

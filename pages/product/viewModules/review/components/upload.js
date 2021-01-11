import { emailRule } from '@assets/js/rules.js'
import { addressRule } from '../components/fromRules'
export default {
  data() {
    return {
      formData: {
        title: '',
      },
      imageUrl: false,
      fileList: [],
      emailRule,
      rules: addressRule,
      form: {
        rating: 1,
        account: '',
        content: '',

        email: '',
        files: [], // formData 图片/视频
        sku: 'SKU',
        spuId: 6,
        title: '',
      },
      list: [],
      // 图片预览对话框是否显示
      dialogVisible: false,
      disable: false,
      // 图片预览地址
      dialogImageUrl: '',
      // 图片上传
      upload: {
        // 上传的地址
        // url: process.env.VUE_APP_BASE_API + '/common/upload',
        // 上传图片个数限制
        limit: 5,
        multiple: true,
        outlineFileList: [], // 传输插件存储的附件路径内容，提交和回显时赋值使用
      },
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      // this.$api.comment.queryReviews()
      this.$api.comment.queryQAList().then((res) => {
        this.list = res.list
        const qas = []
        res.list.map((re) => {
          qas.push({
            answer: '',
            privacy: re.privacy,
            question: re.question,
            sortNum: re.sortNum,
          })
        })

        this.$set(this.form, 'qas', qas)
      })
    },
    handleuploadSuccess() {},
    beforeUpload() {},

    // 上传图片-图片预览
    handlePreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 图片移除事件
    handleOutlineRemove(file, fileList) {
      this.upload.outlineFileList = fileList
    },

    onUploadChange(file, fileList) {
      // console.log(file, fileList)
      const isIMAGE =
        file.raw.type === 'image/jpeg' ||
        file.raw.type === 'image/png' ||
        file.raw.type === 'image/gif'
      // const isLt1M = file.size / 1024 / 1024 < 1

      if (!isIMAGE) {
        // this.$message.error('上传文件只能是图片格式!')
        return false
      }
      if (fileList.length > 6) {
        return false
      }
      // if (!isLt1M) {
      //   this.$message.error('上传文件大小不能超过 1MB!')
      //   return false
      // }
      // this.form.files = new FormData()
      // for (let i = 0; i < fileList.length; i++) {
      //   // this.form.files.append('files', fileList[i])
      //   this.from.files.push(fileList[i].raw)
      // }
      // this.form.files = fileList
      console.log(this.form, 'this.fr')
      const reader = new FileReader()
      // const _this = this
      reader.readAsDataURL(file.raw)
      reader.onload = function (e) {}
    },
  },
}

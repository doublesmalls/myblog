<template>
  <div>
    <Upload :before-upload="upload" action :limit="1" ref="upload">
      <Button icon="ios-cloud-upload-outline">确定上传</Button>
    </Upload>
    <Button @click="upload" icon="ios-cloud-upload-outline">确定上传</Button>
  </div>
</template>

<script>
import { axios } from '@/utils/request'
export default {
  methods: {
    upload() {
      const formData = new FormData()
      const file = this.$refs.upload.$refs.input.value
      console.log(file)
      const headerConfig = {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
      if (!file) {
        // 若未选择文件
        alert('请选择文件')
        return
      }
      formData.append('image_url', file)
      axios
        .post('http://192.168.2.168:3000/api/addCover', formData, headerConfig)
        .then((res) => {
          console.log(res)
        })
      return false
    },
    handleUpload(file) {
      return false
    },
  },
}
</script>

<style>
</style>
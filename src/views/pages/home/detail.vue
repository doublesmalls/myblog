<template>
  <div>
    <div class="detail-box">
      <div class="detail-title">
        <h1>{{detailContent.title}}</h1>
        <h3>{{detailContent.date}}</h3>
        <h3>{{detailContent.author}}</h3>
      </div>
      <p class="detail-content" v-html="detailContent.content"></p>
    </div>
  </div>
</template>

<script>
import { getArticleById } from '@/api/project/articles.js'
export default {
  mounted() {
    this.init()
  },
  data() {
    return {
      detailId: '',
      detailContent: {},
    }
  },
  methods: {
    init() {
      this.detailId = this.$route.query.detailId
      getArticleById({ _id: this.detailId }).then((res) => {
        if (res.data.code === 200) {
          this.detailContent = res.data.data
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.detail-box {
  width: 1200px;
  margin: 40px auto;
  border-radius: 5px;
  .detail-title {
    text-align: center;
    margin-bottom: 20px;
    background-color: rgb(205, 233, 240);
    border-radius: 5px;
  }
  .detail-content {
    width: 1200px;
    height: 800px;
    overflow: scroll;
    background-color: rgb(234, 243, 245);
    padding: 25px;

    border-radius: 5px;
  }
}
</style>
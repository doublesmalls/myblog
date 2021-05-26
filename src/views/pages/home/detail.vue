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
    <Message :articleId="detailId" :articleTitle="detailContent.title"></Message>
  </div>
</template>

<script>
import Message from '@/components/Message.vue'
import { getArticleById } from '@/api/project/articles.js'
export default {
  mounted() {
    this.init()
  },
  components: {
    Message,
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
          window.scrollTo(0, 0)
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
    border-radius: 5px;
  }
  .detail-content {
    width: 1200px;
    overflow: scroll;
    padding: 25px;

    border-radius: 5px;
  }
}
</style>
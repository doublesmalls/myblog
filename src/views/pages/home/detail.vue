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
      this.userId = this.token
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
    background-color: rgba(205, 233, 240, 0.2);
    border-radius: 5px;
  }
  .detail-content {
    width: 1200px;
    overflow: scroll;
    background-color: rgba(234, 243, 245, 0.3);
    padding: 25px;

    border-radius: 5px;
  }
}
</style>
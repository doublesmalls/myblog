<template>
  <div>
    <div class="container">
      <div v-for="(item,index) in commentList" :key="index" class="comment-container">
        <Avatar shape="circle" icon="ios-person" :size="200" />
        {{item.username}}{{item.content}}{{item.date}}
      </div>

      <div class="intro-container">
        <Card :bordered="false">
          <p style="height:35px;" slot="title">
            <span style="margin-right:50px;font-size:16px;">推荐文章</span>
            <Button @click="handleClickWrite" shape="circle" class="intro-button" size="large" type="primary">写留言</Button>
          </p>

          <li v-for="(item,index) in recommendContent" :key="index">{{item.title}}</li>
        </Card>
      </div>
    </div>
    <Modal @on-ok="handleAddComment" v-model="commentModalVisible" title="写留言">
      <Input :rows="5" v-model="commentContent" type="textarea" />
    </Modal>
    <Page></Page>
  </div>
</template>

<script>
import { addComment, getCommentList } from '@/api/project/comment.js'
import { getArticleTopFive } from '@/api/project/articles.js'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      commentModalVisible: false,
      commentContent: '',
      commentList: [],
      recommendContent: [],
    }
  },
  mounted() {
    this.getComment()
    this.getArticleFive()
  },
  computed: {
    ...mapGetters(['userInfo', 'token']),
  },
  methods: {
    // 获取留言列表
    getComment() {
      getCommentList({ pageNo: 1, pageSize: 10 }).then((res) => {
        if (res.data.code === 200) {
          this.commentList = res.data.data
          console.log(this.commentList)
        }
      })
    },
    // 点击写留言
    handleClickWrite() {
      if (!this.token) {
        this.$Message.error(`请先进行登录`)
      } else {
        this.commentModalVisible = true
      }
    },
    // 格式化时间
    dateFormat(fmt, date) {
      let ret
      const opt = {
        'Y+': date.getFullYear().toString(), // 年
        'm+': (date.getMonth() + 1).toString(), // 月
        'd+': date.getDate().toString(), // 日
        'H+': date.getHours().toString(), // 时
        'M+': date.getMinutes().toString(), // 分
        'S+': date.getSeconds().toString(), // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
      }
      for (let k in opt) {
        ret = new RegExp('(' + k + ')').exec(fmt)
        if (ret) {
          fmt = fmt.replace(
            ret[1],
            ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, '0')
          )
        }
      }
      return fmt
    },
    // 确定新增留言
    handleAddComment() {
      console.log(this.userInfo)
      addComment({
        userId: this.token,
        username: this.userInfo.name,
        content: this.commentContent,
        date: this.dateFormat('YYYY-mm-dd HH:MM', new Date()),
      }).then((res) => {
        if (res.data.code === 200) {
          this.$Message.success(res.data.message)
        }
      })
    },
    // 获取前5个文章
    getArticleFive() {
      getArticleTopFive().then((res) => {
        if (res.data.code === 200) {
          this.recommendContent = res.data.data
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
li {
  list-style: none;
}
.container {
  width: 1200px;
  position: relative;
  margin: 20px auto;
  border-radius: 5px;
  .intro-container {
    position: absolute;
    right: 0;
    width: 330px;
    top: 0;
    border-radius: 5px;
    border: 1px solid #eeeeee9f;
    .intro-button {
      float: right;
    }
    li {
      padding: 5px;
      cursor: pointer;
    }
    li:hover {
      background-color: rgba(230, 239, 243, 0.4);
    }
  }
  .comment-container {
    width: 800px;
    height: 200px;
    margin-bottom: 20px;
    border-radius: 5px;
    border: 1px solid #eeeeee;
  }
}
</style>
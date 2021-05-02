<template>
  <div>
    <div class="container">
      <div v-for="(item,index) in commentList" :key="index" class="comment-container">
        <div>
          <div class="iconfont icon-yonghu"></div>
        </div>
        <div class="right-part">
          <span style="margin-right:20px;">{{item.username}}</span>
          <div class="content">{{item.content}}</div>
          <span class="date">{{item.date}}</span>
        </div>
      </div>

      <div class="intro-container">
        <Card :bordered="false">
          <p style="height:35px;" slot="title">
            <span style="margin-right:50px;font-size:16px;">推荐文章</span>
            <Button @click="handleClickWrite" shape="circle" class="intro-button" size="large" type="primary">写留言</Button>
          </p>

          <li v-for="(item,index) in recommendContent" :key="index" @click="handleJumpToDetail(item)">{{item.title}}</li>
        </Card>
      </div>
      <Page @on-change="handlePageChange" :total="total" :page-size="pageSize" show-total></Page>
    </div>
    <Modal @on-ok="handleAddComment" v-model="commentModalVisible" title="写留言">
      <Input :rows="5" v-model="commentContent" type="textarea" />
    </Modal>
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
      currentPage: 1,
      total: 1,
      pageSize: 5,
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
      getCommentList({ pageNo: this.currentPage, pageSize: 5 }).then((res) => {
        if (res.data.code === 200) {
          this.commentList = res.data.data
          this.total = res.data.total
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
      addComment({
        userId: this.token,
        username: this.userInfo.name,
        content: this.commentContent,
        date: this.dateFormat('YYYY-mm-dd HH:MM', new Date()),
      }).then((res) => {
        if (res.data.code === 200) {
          this.$Message.success(res.data.message)
          this.getComment()
        }
      })
    },
    // 获取前5个文章
    getArticleFive() {
      getArticleTopFive().then((res) => {
        if (res.data.code === 200) {
          this.recommendContent = res.data.data
          console.log(this.recommendContent)
        }
      })
    },
    // 跳往推荐详情
    handleJumpToDetail(item) {
      this.$router.push({
        name: 'Detail',
        query: {
          detailId: item._id,
        },
      })
    },
    // 切换页数
    handlePageChange(val) {
      this.currentPage = val
      this.getComment()
      window.scrollTo(0, 0)
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
  padding:10px;
  border-radius: 5px;
  .icon-yonghu {
    display: inline-block;
    width: 50px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 20px;
    border-radius: 50%;
    border: 1px solid #000;
    margin: 40px 20px 20px 20px;
  }
  .intro-container {
    position: fixed;
    right: 50px;
    width: 330px;
    top: 100px;
    border-radius: 5px;
    border: 1px solid #eeeeee9f;
    .intro-button {
      float: right;
      width: 80px;
      font-size: 12px;
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
    display: flex;
    border: 1px solid #eeeeee;
    .right-part {
      margin-top: 40px;
      line-height: 40px;
      position: relative;
    }
    .content {
      font-weight: bolder;
      position: absolute;
      top: 20px;
      width: 600px;
      height: 100px;
      overflow: scroll;
    }
    .date {
      position: absolute;
      width: 200px;
      bottom: 10px;
      left: 0px;
    }
  }
}
</style>
<template>
  <div style="height:100%">
    <div class="box">
      <div class="left-part">
        <div class="avatar">
          <img style="width:100%;border-radius:50%" src="@/assets/images/avatar.png" alt />
        </div>
        <div class="intro">
          <Form>
            <Col :span="16" :offset="4">
              <FormItem>
                <Input placeholder="搜索内容" v-model="paramsForm.searchContent" />
              </FormItem>
            </Col>
          </Form>
        </div>
      </div>
      <div class="right-part">
        <div class="article-item" v-for="(item,index) in articleList" :key="index">
          <h2 class="title">{{item.title}}</h2>
          <p class="content" v-html="item.content"></p>
          <span class="date">{{item.date}}</span>
        </div>
      </div>
      <Card class="news-comment" :border="false">
        <h3 style="margin-bottom:10px;">最新留言</h3>
        <ul>
          <li class="comment-item" v-for="(item,index) in commentList" :key="index">
            <div class="user">
              <div class="iconfont icon-yonghu"></div>
              <div style="font-size:10px">{{item.username}}</div>
            </div>
            <div class="content">{{item.content}}</div>
            <div class="time">{{item.date}}</div>
          </li>
        </ul>
      </Card>
    </div>
  </div>
</template> 

<script>
import { getArticleList } from '@/api/project/articles.js'
import { getTopThreeList } from '@/api/project/comment.js'
export default {
  mounted() {
    this.getArticle()
    this.getTopThree()
  },
  data() {
    return {
      paramsForm: {
        searchContent: '',
      },
      articleList: [],
      commentList: [],
    }
  },
  methods: {
    // 获取文章列表
    getArticle() {
      getArticleList({ pageNo: 1, pageSize: 10 }).then((res) => {
        if (res.data.code === 200) {
          this.articleList = res.data.data
          console.log(res.data.data)
        }
      })
    },
    // 获取前3个留言
    getTopThree() {
      getTopThreeList().then((res) => {
        if (res.data.code === 200) {
          this.commentList = res.data.data
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
.box {
  display: flex;
  height: 100%;
  position: relative;
  .left-part {
    width: 300px;
    height: 100vh;
    border-radius: 5px;
    position: fixed;
    background-color: rgb(212, 236, 238);
    .avatar {
      width: 130px;
      height: 130px;
      border-radius: 50%;
      margin: 20px auto;
    }
    .intro {
      width: 100%;
      height: 300px;
      position: absolute;
      bottom: 0;
    }
  }
  .right-part {
    margin-left: 300px;
    margin-top: 20px;
    position: relative;
    .article-item {
      width: 46vw;
      height: 210px;
      border-radius: 5px;
      margin-left: 20px;
      border: 1px solid #eeeeee;
      margin-bottom: 20px;
      .title {
        padding: 10px 0 10px 15px;
      }
      .content {
        width: 600px;
        height: 120px;
        overflow: scroll;
        margin-left: 15px;
      }
      .date {
        display: inline-block;
        margin-left: 15px;
        width: 200px;
        margin-top: 10px;
        font-weight: bolder;
      }
    }
  }
  .news-comment {
    width: 400px;
    height: 300px;
    right: 20px;
    top: 100px;
    position: fixed;
    .comment-item {
      height: 70px;
      margin-top: 10px;
      display: flex;
      position: relative;
      padding-bottom: 5px;
      border-bottom: 1px solid #eeeeee;
      .user {
        display: flex;
        flex-direction: column;
        align-items: center;
        .icon-yonghu {
          width: 50px;
          height: 50px;
          text-align: center;
          line-height: 50px;
          border: 1px solid #eeeeee;
          margin-right: 10px;
          border-radius: 50%;
          margin-left: 5px;
        }
      }
      .content {
        width: 180px;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .time {
        position: absolute;
        right: 10px;
        font-size: 10px;
        bottom: 5px;
      }
    }
  }
}
</style>
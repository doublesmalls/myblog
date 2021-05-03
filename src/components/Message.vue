<template>
  <div class="box">
    <div class="header">
      <span class="header-title">全部评论 ({{total}})</span>
    </div>
    <div class="content">
      <div style="width:700px;position: relative;margin-bottom:50px;">
        <Input :maxlength="100" clearable v-model="newMessage" :rows="5" show-word-limit placeholder="写下你的评论..." type="textarea" />
        <Button @click="handlePublish" class="publish-button" type="info" shape="circle">发布</Button>
      </div>
      <li v-for="(item,index) in messageList" :key="index" class="content-item">
        <div class="user">
          <div class="iconfont icon-yonghu"></div>
          <span class="username">{{item.username}}</span>
        </div>
        <div class="comment-content">{{item.content}}</div>
        <div class="date">{{item.date}}</div>
      </li>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { addMessage, getMessageList } from '@/api/project/message.js'
export default {
  props: {
    articleId: {
      required: true,
      type: String,
      default: '',
    },
    articleTitle: {
      required: true,
      type: String,
      default: '',
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.getList()
    })
  },
  data() {
    return {
      newMessage: '',
      messageList: [],
      total: 0,
    }
  },
  computed: {
    ...mapGetters(['token']),
  },
  methods: {
    // 获取评论列表
    getList() {
      getMessageList({
        articleId: this.articleId,
      }).then((res) => {
        if (res.data.code === 200) {
          this.messageList = res.data.data
          this.total = res.data.data.length
        }
      })
    },
    // 点击发布评论
    handlePublish() {
      if (!this.token) {
        this.$Message.error(`请先进行登录`)
      } else {
        if (!this.newMessage) {
          this.$Message.error(`评论不能为空`)
          return
        }
        addMessage({
          articleId: this.articleId,
          articleTitle: this.articleTitle,
          userId: this.token,
          username: this.$store.getters.userInfo.name,
          content: this.newMessage,
          date: this.dateFormat('YYYY-mm-dd HH:MM', new Date()),
        }).then((res) => {
          if (res.data.code === 200) {
            this.$Message.success(`发布成功`)
            this.getList()
            this.newMessage = ' '
          }
        })
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
  },
  computed: {
    ...mapGetters(['token']),
  },
}
</script>

<style lang="less" scoped>
li {
  list-style: none;
}
.box {
  width: 1200px;
  margin: 0 auto;
}
.header {
  height: 40px;
  .header-title {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    width: 200px;
    height: 100%;
    padding-left: 20px;
    font-size: 18px;
    font-weight: bolder;
    border-left: 5px solid rgb(172, 202, 216);
  }
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  .publish-button {
    position: absolute;
    bottom: -40px;
    right: 5px;
    width: 80px;
    font-size: 14px;
  }
  .content-item {
    position: relative;
    width: 900px;
    height: 130px;
    margin-top: 20px;
    border-radius: 5px;
    border-bottom: 1px solid #eeeeee;
    display: flex;
    .date {
      width: 200px;
      position: absolute;
      bottom: 10px;
      left: 140px;
      font-size: 12px;
    }
    .user {
      width: 120px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .icon-yonghu {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
        margin-left: 20px;
        width: 60px;
        height: 60px;
        border: 1px solid #eeeeee;
        font-size: 25px;
        border-radius: 50%;
      }
      .username {
        margin-top: 5px;
        margin-left: 20px;
        font-weight: bolder;
      }
    }
    .comment-content {
      font-size: 16px;
      width: 700px;
      padding: 15px;
      padding-top: 20px;
    }
  }
}
</style>
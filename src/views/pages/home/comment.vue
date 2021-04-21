<template>
  <div>
    <div class="container">
      <div class="comment-container"></div>
      <div class="comment-container"></div>
      <div class="comment-container"></div>
      <div class="comment-container"></div>
      <div class="comment-container"></div>

      <div class="intro-container">
        <div>
          <Button @click="handleClickWrite" shape="circle" class="intro-button" size="large" type="primary">写留言</Button>
        </div>
      </div>
    </div>
    <Modal @on-ok="handleAddComment" v-model="commentModalVisible" title="写留言">
      <Input :rows="5" v-model="commentContent" type="textarea" />
    </Modal>
  </div>
</template>

<script>
import { addComment, getCommentList } from '@/api/project/comment.js'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      commentModalVisible: false,
      commentContent: '',
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'token']),
  },
  methods: {
    // 获取留言列表
    getComment() {
      getCommentList().then((res) => {
        if (res.data.code === 200) {
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
  },
}
</script>

<style lang="less" scoped>
.container {
  width: 1200px;
  position: relative;
  margin: 20px auto;
  border-radius: 5px;
  .intro-container {
    position: absolute;
    right: 0;
    width: 330px;
    height: 400px;
    top: 0;
    border-radius: 5px;
    border: 1px solid #eeeeee9f;
    box-shadow: 2px 2px 3px #eeeeee;
    .intro-button {
      width: 200px;
      position: absolute;
      left: 50%;
      top: 20px;
      padding: 5px;
      border-bottom: 1px solid #eeeeee;
      transform: translateX(-50%);
    }
    .intro-button::after {
      content: '';
      width: 230px;
      height: 0;
      position: absolute;
      border-bottom: 1px solid #eeeeee;
      top: 50px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .comment-container {
    width: 800px;
    background-color: pink;
    height: 200px;
    margin-bottom: 20px;
    border-radius: 5px;
  }
}
</style>
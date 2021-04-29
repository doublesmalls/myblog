<template>
  <div>
    <Carousel arrow="never" :radius-dot="false" class="message-wrap" autoplay v-model="value2" loop>
      <CarouselItem class="message-box" v-for="k in Math.ceil(commentList.length/6)" :key="k">
        <li v-for="(item,index) in commentList.slice((k-1) * 6,k*6)" :key="index">
          <span class="username">{{item.username}}</span>
          <p class="content">{{item.content}}</p>
          <span class="date">{{item.date}}</span>
        </li>
      </CarouselItem>
    </Carousel>
    <Table border :columns="columns" :data="commentList">
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="show(row)">查看</Button>
        <Poptip transfer confirm title="确定删除这条记录吗" @on-ok="deleteCommentItem(row)">
          <Button type="error" size="small">删除</Button>
        </Poptip>
      </template>
    </Table>
  </div>
</template>

<script>
import { getAllComment, deleteComment } from '@/api/project/comment.js'
export default {
  mounted() {
    this.getList()
  },
  data() {
    return {
      value2: 0,
      listData: [],
      commentList: [],
      columns: [
        {
          title: '用户名',
          key: 'username',
          width: 100,
          fixed: 'left',
          align: 'center',
        },
        {
          title: '留言内容',
          key: 'content',
          align: 'center',
        },
        {
          title: '留言时间',
          key: 'date',
          align: 'center',
        },
        {
          title: '操作',
          key: 'action',
          slot: 'action',
          align: 'center',
          fixed: 'right',
        },
      ],
    }
  },
  methods: {
    // 获取列表
    getList() {
      getAllComment().then((res) => {
        if (res.data.code === 200) {
          this.commentList = res.data.data
        }
      })
    },
    // 删除列表
    deleteCommentItem(item) {
      deleteComment({ id: item._id }).then((res) => {
        if (res.data.code === 200) {
          this.$Message.success('删除留言成功')
          this.getList()
        }
      })
    },
    show(row) {
      this.$Modal.info({
        title: '留言信息',
        content: `用户名:${row.name}<br>内容:${row.content}<br>`,
      })
    },
  },
}
</script>

<style lang="less" scoped>
.message-wrap {
  display: flex;
  width: 1200px;
  height: 420px;
  flex-wrap: wrap;
}
.message-box {
  width: 1200px;
  height: 550px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  li {
    list-style: none;
    width: 260px;
    height: 150px;
    margin-left: 30px;
    margin-right: 40px;
    margin-top: 20px;
    border-radius: 5px;
    text-align: center;
    background-color: rgba(214, 238, 241,.4);
    position: relative;
    .username {
      font-size: 16px;
      width: 200px;
      height: 50px;
    }
    .content {
      font-size: 20px;
      margin-top: 10px;
    }
    .date {
      position: absolute;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>
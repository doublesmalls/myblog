<template>
  <div>
    <Table border :columns="columns1" :data="dataList">
      <template slot-scope="{ row, index }" slot="action">
        <Button shape="circle" type="info" size="small" style="margin-right: 5px" @click="show(row)">查看</Button>
        <Poptip transfer confirm title="确定删除这条记录吗" @on-ok="handleDeleteMessage(row)">
          <Button shape="circle" type="error" size="small">删除</Button>
        </Poptip>
      </template>
    </Table>
    <Page @on-change="handlePageChange" :current="currentPage" :page-size="pageSize" show-elevator style="margin-top:20px;" :total="total" />
  </div>
</template>

<script>
import { getAllMessage, deleteMessage } from '@/api/project/message.js'
export default {
  mounted() {
    this.getList()
  },
  data() {
    return {
      columns1: [
        {
          title: '用户名',
          key: 'username',
          align: 'center',
          tooltip: true,
        },
        {
          title: '文章名',
          key: 'articleTitle',
          align: 'center',
          tooltip: true,
        },
        {
          title: '内容',
          key: 'content',
          align: 'center',
          tooltip: true,
        },
        {
          title: '时间',
          key: 'date',
          align: 'center',
        },
        {
          title: '操作',
          slot: 'action',
          width: 150,
          align: 'center',
        },
      ],
      dataList: [],
      total: 0,
      currentPage: 1,
      pageSize: 10,
    }
  },
  methods: {
    // 获取评论列表
    getList() {
      getAllMessage({
        pageNo: this.currentPage,
        pageSize: this.pageSize,
      }).then((res) => {
        if (res.data.code === 200) {
          this.dataList = res.data.data
          this.total = res.data.total
        }
      })
    },
    show(row) {
      this.$Modal.info({
        title: '评论信息',
        content: `用户名:${row.username}<br>内容:${row.content}<br>`,
      })
    },
    // 删除评论
    handleDeleteMessage(item) {
      deleteMessage({ _id: item._id }).then((res) => {
        if (res.data.code === 200) {
          this.$Message.success('删除留言成功')
          this.getList()
        }
      })
    },
    handlePageChange(val) {
      this.currentPage = val
      this.getList()
    },
  },
}
</script>

<style lang="less" scoped>
.message-item {
  width: 1000px;
  height: 100px;
  background-color: pink;
}
</style>
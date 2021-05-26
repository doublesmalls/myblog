<template>
  <div>
    <Form style="margin:0 auto;width:500px;" ref="formInline" inline>
      <FormItem prop="user">
        <Input v-model="paramsForm.userName" style="width:200px" type="text" placeholder="用户名"></Input>
      </FormItem>
      <FormItem>
        <Button @click="search" type="primary">搜索</Button>
        <Button @click="reSet" style="margin-left:10px;">重置</Button>
      </FormItem>
    </Form>
    <Table border :columns="columns" :data="listData">
      <template slot-scope="{ row, index }" slot="roles">{{row.roles.toString()}}</template>
      <template slot-scope="{ row, index }" slot="action">
        <Poptip transfer confirm title="确定为该用户分配管理员吗" @on-ok="addManage(row)">
          <Button type="info" size="small" style="margin-right:5px">分配管理员</Button>
        </Poptip>
        <Button type="primary" size="small" style="margin-right: 5px" @click="show(row)">查看</Button>
        <Poptip transfer confirm title="确定删除这条记录吗" @on-ok="handleDelete(row)">
          <Button type="error" size="small">删除</Button>
        </Poptip>
      </template>
    </Table>
    <Page
      @on-change="handlePageChange"
      @on-page-size-change="handlePageSizeChange"
      style="margin-top:10px;"
      :page-size="paramsForm.pageSize"
      :current="paramsForm.pageNo"
      :total="paramsForm.total"
      show-sizer
    />
  </div>
</template>

<script>
import {
  getUserList,
  deleteUser,
  searchUser,
  addManagePerson,
} from '@/api/admin/user.js'
export default {
  mounted() {
    this.getList()
  },
  data() {
    return {
      paramsForm: {
        userName: '',
        pageSize: 10,
        total: 1,
        pageNo: 1,
      },
      columns: [
        {
          title: '用户名',
          key: 'name',
          width: 100,
          fixed: 'left',
          align: 'center',
        },
        {
          title: '用户密码',
          key: 'password',
          align: 'center',
        },
        {
          title: '注册时间',
          key: 'signTime',
          align: 'center',
        },
        {
          title: '角色',
          key: 'roles',
          align: 'center',
          slot: 'roles',
        },
        {
          title: '操作',
          key: 'action',
          slot: 'action',
          align: 'center',
          fixed: 'right',
        },
      ],
      listData: [],
    }
  },
  methods: {
    getList() {
      getUserList({
        pageSize: this.paramsForm.pageSize,
        pageNo: this.paramsForm.pageNo,
      }).then((res) => {
        if (res.data.code === 200) {
          this.listData = res.data.data
          this.paramsForm.total = res.data.total
        }
      })
    },
    handlePageChange(val) {
      this.paramsForm.pageNo = val
      this.getList()
    },
    handlePageSizeChange(val) {
      this.paramsForm.pageSize = val
      this.getList()
    },
    // 搜索用户名
    search() {
      searchUser({
        pageSize: this.paramsForm.pageSize,
        pageNo: this.paramsForm.pageNo,
        name: this.paramsForm.userName,
      }).then((res) => {
        if (res.data.code === 200) {
          this.listData = res.data.data
          this.paramsForm.total = res.data.total
        }
      })
    },
    // 重置
    reSet() {
      this.paramsForm.pageSize = 10
      this.paramsForm.pageNo = 1
      this.paramsForm.userName = ''
      this.getList()
    },
    show(row) {
      this.$Modal.info({
        title: '用户信息',
        content: `用户名:${row.name}<br>注册时间:${row.signTime}<br>`,
      })
    },
    handleDelete(row) {
      deleteUser({ id: row._id }).then((res) => {
        if (res.data.code === 200) {
          this.getList()
          this.$Message.success('删除成功')
        }
      })
    },
    // 分配管理员
    addManage(row) {
      addManagePerson({
        id: row._id,
      }).then((res) => {
        if (res.data.code === 200) {
          this.$Message.success('操作成功')
          this.getList()
        }
      })
    },
  },
}
</script>

<style>
</style>
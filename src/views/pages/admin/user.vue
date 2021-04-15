<template>
  <div>
    <Form style="margin:0 auto;width:500px;" ref="formInline" inline>
      <FormItem prop="user">
        <Input style="width:200px" type="text" placeholder="用户名"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary">搜索</Button>
      </FormItem>
    </Form>
    <Table border :columns="columns" :data="listData">
      <template slot-scope="{ row, index }" slot="roles">{{row.roles.toString()}}</template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="show(row)">查看</Button>
        <Poptip transfer confirm title="确定删除这条记录吗" @on-ok="handleDelete(row)">
          <Button type="error" size="small">删除</Button>
        </Poptip>
      </template>
    </Table>
  </div>
</template>

<script>
import { getUserList, deleteUser } from '@/api/admin/user.js'
export default {
  mounted() {
    this.getList()
  },
  data() {
    return {
      paramsForm: {
        userName: '',
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
      getUserList().then((res) => {
        if (res.data.code === 200) {
          this.listData = res.data.data
        }
        console.log(res)
      })
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
  },
}
</script>

<style>
</style>
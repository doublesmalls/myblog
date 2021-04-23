<template>
  <div>
    <div v-if="!name" class="submit">
      <Button @click="clickLogin" type="info" style="margin-right:10px;">登录</Button>
      <Button @click="clickSign" style="margin-right:10px;">注册</Button>
      <Avatar icon="ios-person" size="large" />
    </div>
    <div v-if="name" class="user-info">
      欢迎你:{{userInfo.name}}
      <Dropdown>
        <a href="javascript:void(0)">
          <Avatar style="margin-left:10px;" icon="ios-person" size="large" />
        </a>
        <DropdownMenu slot="list">
          <DropdownItem>
            <span @click="handlelogout">退出登录</span>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
    <Modal :width="400" footer-hide v-model="submitModalVisible" :title="titleText" @on-cancel="handleClose">
      <Form :model="paramsForm" ref="submitForm" :rules="paramsFormRules" :label-width="60">
        <FormItem prop="username" label="用户名">
          <Input v-model="paramsForm.username" type="text" />
        </FormItem>
        <FormItem prop="password" label="密码">
          <Input v-model="paramsForm.password" type="password" />
        </FormItem>
        <FormItem style="text-align:center" :label-width="0">
          <Button @click="handleSubmit" style="margin-right:10px;" type="info">确认</Button>
          <Button>取消</Button>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import { signUser, loginUser, getUserInfo } from '@/api/admin/user.js'
export default {
  data() {
    return {
      submitModalVisible: false,
      titleText: '登录',
      name: '',
      isShowLogin: true,
      paramsForm: {
        username: '',
        password: '',
        signTime: this.dateFormat('YYYY-mm-dd HH:MM', new Date()),
      },
      paramsFormRules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur',
          },
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  computed: {
    ...mapGetters(['token', 'userInfo']),
  },
  mounted() {
    if (this.userInfo) {
      this.name = this.userInfo.name
    }
  },
  methods: {
    ...mapActions(['login', 'getUserInfo', 'logout']),

    // 时间格式化
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
    // 点击登录
    clickLogin() {
      this.submitModalVisible = true
      this.titleText = '登录'
      this.$refs.submitForm.resetFields()
    },
    // 点击注册
    clickSign() {
      this.submitModalVisible = true
      this.titleText = '注册'
      this.$refs.submitForm.resetFields()
    },
    // 点击确认
    handleSubmit() {
      this.$refs['submitForm'].validate((valid) => {
        if (valid) {
          if (this.titleText === '注册') {
            signUser({
              name: this.paramsForm.username,
              pwd: this.paramsForm.password,
              signTime: this.paramsForm.signTime,
            }).then((res) => {
              if (res.data.code === 200) {
                this.submitModalVisible = false
                this.$Message.success('注册成功!')
              } else {
                this.$Message.error(`注册失败！${res.data.data}`)
              }
            })
          } else if (this.titleText === '登录') {
            this.login({
              name: this.paramsForm.username,
              pwd: this.paramsForm.password,
            }).then((res) => {
              if (res.data.code === 200) {
                this.submitModalVisible = false
                this.$Message.success('登录成功!')
                this.isShowLogin = false
                this.getUserInfo({ _id: this.token })
                this.name = this.userInfo.name
                console.log(this.name)
              } else {
                this.$Message.error(`登录失败！${res.data.data.message}`)
              }
            })
          } else {
            return
          }
        } else {
          return
        }
      })
    },
    // 关闭输入框
    handleClose() {
      this.$refs.submitForm.resetFields()
    },
    // 退出登录
    handlelogout() {
      this.logout().then((res) => {
        this.$Message.success('退出成功!')
        this.name = ''
        
      })
    },
  },
}
</script>

<style lang="less" scoped>
.submit {
  width: 220px;
  position: absolute;
  right: 20px;
}
.user-info {
  width: 220px;
  position: absolute;
  right: 20px;
}
</style>
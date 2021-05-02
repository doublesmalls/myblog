<template>
  <div>
    <div v-if="!modalVisible">
      <Button @click="jumpToAdd" style="margin:20px;" type="info">新增文章</Button>
      <List>
        <ListItem class="list-item" v-for="(item,index) in articleList" :key="index">
          <ListItemMeta avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar" :title="item.title" :description="item.date" />
          <template slot="action">
            <li></li>
          </template>
          <template slot="extra">
            <li>
              <Button style="margin-right:5px;" type="info" @click="handleEdit(item)">编辑</Button>
              <Poptip transfer confirm title="确定删除这条记录吗" @on-ok="handleDelete(item)">
                <Button>删除</Button>
              </Poptip>
            </li>
          </template>
        </ListItem>
      </List>
      <Page :page-size="pageSize" :current="pageNo" @on-change="handlePageChange" :total="total" size="small" show-elevator show-sizer />
    </div>
    <div v-if="modalVisible">
      <Form :model="paramsForm" :rules="paramsFormRules" ref="formCustom" :label-width="80">
        <FormItem prop="author" label="文章作者">
          <Input v-model="paramsForm.author" style="width:200px" type="text"></Input>
        </FormItem>
        <FormItem prop="title" label="文章标题">
          <Input v-model="paramsForm.title" style="width:250px" type="text"></Input>
        </FormItem>
        <FormItem label="文章标签" prop="tag">
          <Select v-model="paramsForm.tagValue" style="width:200px">
            <Option v-for="item in tagList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="内容" prop="content">
          <vue-editor style="height:400px;width:900px;" v-model="paramsForm.content" />
        </FormItem>
        <FormItem style="margin-top:100px;">
          <Button style="width:60px;margin-right:20px;" @click="handleSubmit()" type="info">确认</Button>
          <Button @click="handleCancel" style="width:60px;">取消</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
import {
  getArticleList,
  addArticle,
  deleteArticle,
  getArticleById,
  editArticle,
} from '@/api/admin/article.js'
export default {
  mounted() {
    this.getList()
  },

  data() {
    return {
      uploadData: {
        url: '', // 图片二进制的data的url
        articleId: '', // 这个详情的ID 后台与他绑在一起
      },
      articleList: [],
      total: 1,
      pageNo: 1,
      pageSize: 10,
      modalVisible: false,
      tagList: [
        {
          value: 'javascript',
          label: 'javascript',
        },
        {
          value: 'CSS',
          label: 'CSS',
        },
        {
          value: 'Vue.js',
          label: 'Vue.js',
        },
        {
          value: 'webpack',
          label: 'webpack',
        },
        {
          value: 'react.js',
          label: 'react.js',
        },
      ],
      // 0为新增，1为编辑
      actionMode: 0,
      editId: '',
      paramsForm: {
        content: '',
        author: '',
        title: '',
        tagValue: [],
      },
      paramsFormRules: {
        author: [{ required: true, message: '请输入作者', trigger: 'blur' }],
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
      },
      // 富文本配置
      setting: {
        menubar: false,
        toolbar:
          'undo redo | fullscreen | formatselect alignleft aligncenter alignright alignjustify | importword |link unlink | numlist bullist | image media table | fontselect fontsizeselect forecolor backcolor | bold italic underline strikethrough | indent outdent | superscript subscript | removeformat |',
        toolbar_drawer: 'sliding',
        quickbars_selection_toolbar:
          'removeformat | bold italic underline strikethrough | fontsizeselect forecolor backcolor',
        plugins: 'link image media table lists fullscreen quickbars importword',
        language: 'zh_CN', //本地化设置
        height: 350,
        branding: false,
      },
    }
  },
  methods: {
    handleBeforeUpload(file) {
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = (e) => {
        file.url = reader.result
        this.uploadData.url = file.url
      }
    },
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
    getList(pageNo, pageSize) {
      getArticleList({
        pageNo: this.pageNo,
        pageSize: this.pageSize,
      }).then((res) => {
        if (res.data.code === 200) {
          this.articleList = res.data.data
          this.total = res.data.total
        }
      })
    },
    handlePageChange(value) {
      this.pageNo = value
      this.getList(this.pageNo)
    },
    handleCancel() {
      this.modalVisible = false
      this.paramsForm.content = ''
      this.paramsForm.author = ''
      this.paramsForm.title = ''
      this.paramsForm.tagValue = ''
    },
    jumpToAdd() {
      this.modalVisible = true
      this.actionMode = 0
    },
    handleDelete(row) {
      deleteArticle({
        _id: row._id,
      }).then((res) => {
        if (res.data.code === 200) {
          this.$Message.success('删除文章成功')
          this.getList()
        }
      })
    },
    handleEdit(item) {
      this.modalVisible = true
      this.actionMode = 1
      getArticleById({ _id: item._id }).then((res) => {
        if (res.data.code) {
          this.paramsForm.author = res.data.data.author
          this.paramsForm.title = res.data.data.title
          this.paramsForm.tagValue = res.data.data.tag
          this.paramsForm.content = res.data.data.content
          this.editId = res.data.data._id
          console.log(res.data)
        }
      })
    },
    handleSubmit(row) {
      if (this.actionMode === 0) {
        this.$refs['formCustom'].validate((valid) => {
          if (valid) {
            if (this.paramsForm.content === '') {
              this.$Message.error('请输入文章内容!')
              return
            }
            addArticle({
              title: this.paramsForm.title,
              content: this.paramsForm.content,
              author: this.paramsForm.author,
              tag: this.paramsForm.tagValue,
              date: this.dateFormat('YYYY-mm-dd HH:MM', new Date()),
            }).then((res) => {
              if (res.data.code === 200) {
                this.$Message.success('新增文章成功')
                this.modalVisible = false
                this.$refs['formCustom'].resetFields()
                this.getList(1, 10)
              }
            })
          }
        })
      } else {
        this.$refs['formCustom'].validate((valid) => {
          if (valid) {
            if (this.paramsForm.content === '') {
              this.$Message.error('请输入文章内容!')
              return
            }
            editArticle({
              _id: this.editId,
              title: this.paramsForm.title,
              content: this.paramsForm.content,
              author: this.paramsForm.author,
              tag: this.paramsForm.tagValue,
              date: this.dateFormat('YYYY-mm-dd HH:MM', new Date()),
            }).then((res) => {
              if (res.data.code === 200) {
                this.$Message.success('编辑文章成功')
                this.modalVisible = false
                this.$refs['formCustom'].resetFields()
                this.getList(1, 10)
              }
            })
          }
        })
      }
    },
  },
}
</script>

<style lang="less" scoped>
</style>
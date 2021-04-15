<template>
  <div>
    <div v-if="!modalVisible">
      <Button style="margin:20px;" type="info">新增文章</Button>
      <List>
        <ListItem class="list-item" v-for="(item,index) in articleList" :key="index">
          <ListItemMeta avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar" :title="item.title" :description="item.date" />
          <template slot="action">
            <li>
              <span style="font-size:16px;" href>{{item.tag.toString()}}</span>
            </li>
          </template>
          <template slot="extra">
            <li>
              <a style="font-size:15px;" href>编辑</a>
            </li>
          </template>
        </ListItem>
      </List>
      <Page :page-size="pageSize" :current="pageNo" @on-change="handlePageChange" :total="total" size="small" show-elevator show-sizer />
    </div>
    <div v-if="modalVisible">
      <Form ref="formCustom" :label-width="80">
        <FormItem label="文章作者" prop="passwd">
          <Input v-model="paramsForm.author" style="width:200px" type="text"></Input>
        </FormItem>
        <FormItem label="文章标题" prop="passwdCheck">
          <Input style="width:250px" type="text"></Input>
        </FormItem>
        <FormItem label="文章标签" prop="age">
          <Select v-model="tagValue" style="width:200px">
            <Option v-for="item in tagList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
      </Form>
    </div>
    <!-- <vue-editor /> -->
  </div>
</template>

<script>
import { getArticleList } from '@/api/admin/article.js'
export default {
  mounted() {
    this.getList()
  },
  data() {
    return {
      articleList: [],
      total: 1,
      pageNo: 1,
      pageSize: 10,
      modalVisible: true,
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
      paramsForm: {
        content: '',
        author: '',
        title: '',
        tagValue: '',
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
    getList(pageNo, pageSize) {
      getArticleList({
        pageNo: this.pageNo,
        pageSize: this.pageSize,
      }).then((res) => {
        if (res.data.code === 200) {
          console.log(res.data)
          this.articleList = res.data.data
          this.total = res.data.total
          console.log(this.total)
        }
      })
    },
    handlePageChange(value) {
      console.log(value)
      this.pageNo = value
      this.getList(this.pageNo)
    },
  },
}
</script>

<style lang="less" scoped>
</style>
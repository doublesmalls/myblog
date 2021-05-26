<template>
  <div>
    <div class="listContainer">
      <List style="padding:20px" item-layout="vertical">
        <ListItem class="listItem" v-for="(item,index) in listData" :key="index">
          <ListItemMeta :avatar="item.avatar" :title="item.title" />
          <template slot="extra">
            <img src="@/assets/images/cover.jpg" style="width:220px;" alt />
          </template>
          <span @click="handleJumpToDetail(item)" class="detail">查看详情</span>
        </ListItem>
      </List>
      <Page @on-change="handlePageChange" :total="total" />
    </div>
  </div>
</template>

<script>
import { getArticleList } from '@/api/project/articles.js'
export default {
  data() {
    return {
      listData: [],
      total: 1,
      currentPage: 1,
    }
  },
  mounted() {
    this.getList(this.currentPage)
  },
  methods: {
    handlePageChange(val) {
      this.currentPage = val
      this.getList(this.currentPage)
    },
    //  获取文章列表
    getList(currentPage) {
      window.scrollTo(0, 0)
      getArticleList({
        pageNo: currentPage,
        pageSize: 10,
      }).then((res) => {
        if (res.data.code === 200) {
          this.listData = res.data.data
          this.total = res.data.total
        }
      })
    },
    // 跳往详情页
    handleJumpToDetail(item) {
      this.$router.push({
        name: 'Detail',
        query: {
          detailId: item._id,
        },
      })
    },
  },
}
</script>

<style lang="less" scoped>
.listContainer {
  width: 800px;
  margin: 20px auto;
  .listItem {
    position: relative;
    margin: 10px;
    margin-top: 20px;
    height: 240px;
    overflow: hidden;
    padding: 20px;
    border-radius: 5px;
    transition: all linear 0.3s;

    cursor: pointer;
  }
  .listItem:hover {
    transition: all linear 0.3s;
    transform: translateY(-10px;);
    background-color: rgba(220, 238, 240, 0.5);
  }
  .detail {
    color: rgb(120, 204, 204);
    position: absolute;
    bottom: 10px;
  }
}
</style>
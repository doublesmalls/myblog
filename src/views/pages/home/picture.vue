<template>
  <div>
    <div class="header">
      <Carousel style="height:100%;" autoplay v-model="value2" loop>
        <CarouselItem>
          <div class="demo-carousel">
            <img src="@/assets/images/banner1.jpg" alt />
          </div>
        </CarouselItem>
        <CarouselItem>
          <div class="demo-carousel">
            <img src="@/assets/images/banner2.jpg" alt />
          </div>
        </CarouselItem>
        <CarouselItem>
          <div class="demo-carousel">
            <img src="@/assets/images/banner3.jpg" alt />
          </div>
        </CarouselItem>
      </Carousel>
    </div>
    <div class="content">
      <waterfall :col="4" :data="dataList">
        <template>
          <li class="image-item" v-for="(item,index) in dataList" :key="index">
            <img :src="item.source" alt />
          </li>
        </template>
      </waterfall>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value2: 0,
      dataList: [
        { source: require('@/assets/images/source1.png') },
        { source: require('@/assets/images/source2.png') },
        { source: require('@/assets/images/source2.png') },
        { source: require('@/assets/images/source2.png') },
        { source: require('@/assets/images/source1.png') },
        { source: require('@/assets/images/source2.png') },
        { source: require('@/assets/images/source2.png') },
        { source: require('@/assets/images/source2.png') },
      ],
    }
  },
}
</script>

<style lang="less" scoped>
li {
  list-style: none;
}
.header {
  height: 350px;
  text-align: center;
  .demo-carousel {
    height: 350px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.content {
  width: 850px;
  margin: 0 auto;
  .image-item {
    width: 200px;
    border: 1px solid #eeeeee;
    padding: 5px;
    margin: 10px;
  }
  img {
    width: 100%;
    padding: 15px;
  }
}
</style>
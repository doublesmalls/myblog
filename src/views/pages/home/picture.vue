<template>
  <div>
    <div class="header">
      <swiper style="height:100%" ref="mySwiper" :options="swiperOptions">
        <swiper-slide>
          <img style="height:100%" src="@/assets/images/banner1.png" alt />
        </swiper-slide>
        <swiper-slide>
          <img src="@/assets/images/banner2.png" alt />
        </swiper-slide>
        <swiper-slide>
          <img src="@/assets/images/banner3.jpg" alt />
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination',
        },
        // Some Swiper option/callback...
        effect: 'coverflow',
        slidesPerView: 1,
        centeredSlides: true,
        coverflowEffect: {
          rotate: 30,
          stretch: 10,
          depth: 60,
          modifier: 2,
          slideShadows: true,
        },
      },
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper
    },
  },
  mounted() {
    this.swiper.slideTo(3, 1000, false)
  },
}
</script>

<style lang="less" scoped>
.header {
  width: 1200px;
  margin: 0 auto;
  height: 400px;
  text-align: center;
}
</style>
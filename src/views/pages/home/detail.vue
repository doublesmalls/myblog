<template>
  <div>
    <h3>{{detailContent.title}}</h3>
    <h2></h2>
  </div>
</template>

<script>
export default {
  mounted() {
    this.init()
  },
  data() {
    return {
      detailContent: {},
    }
  },
  methods: {
    init() {
      this.detailContent = this.$route.params.detailContent
    },
  },
}
</script>

<style lang="less" scoped>
</style>
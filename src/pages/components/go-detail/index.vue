<template>
  <view class="container" @click="clickHandle">
    <slot>
    
    </slot>
  </view>
</template>

<script>
export default {
  props:{
    list: Array,
    index: Number
  },
  methods:{
    clickHandle(){
      console.log("daod")
      getApp().globalData.imgList = this.list;
      getApp().globalData.imgIndex = this.index;
      uni.navigateTo({
        url:"/pages/imgDetail/index"
      })
    }
  },
};
</script>

<style>

</style>


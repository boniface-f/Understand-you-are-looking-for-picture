<template>
	<scroll-view
    scroll-y
    @scrolltolower="handleToLower"
    class="recommend_view">
		<!--推荐-->
                <!-- <view class="recommend_wrap">
            <view class="items"
            v-for="item in recommends"
            :key="item.id"
            >
                <img  mode="widthFix" :src="item.thumb">
            </view>
        </view> -->

        <view class="uni-padding-wrap">
            <view class="page-section swiper">
                <view class="page-section-spacing">
                    <swiper class="swiper" circular="true" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
                        <view class="recommend_wrap">
                            <view class="items"
                            v-for="item in recommends"
                            :key="item.id"
                            >
                                <swiper-item>
                                    <img mode="hightFix" :src="item.thumb" style="height:300rpx"/>
                                </swiper-item> 
                            </view> 
                        </view>
                    </swiper>
                </view>
            </view>
        </view>
        
        <!-- 日期 -->
        <view class="monthes_wrap">
            <view class="momthe_bar">
                <view class="month">
                    <text> {{monthes.DD}} / </text>
                {{monthes.MM}} 月
                </view>
                <view class="info">
                   {{monthes.title}}
                </view>
                <view class="more_have">
                    更多>
                </view>
            </view>
            <view class="monthes_content">
                <view
                    class="monthes_item"
                    v-for="(item) in monthes.items"
                    :key="item.id"  
                >
                    <image
                    mode="aspectFill"
                    :src="item.thumb+item.rule.replace('$<Height>',360)"
                    ></image>
                </view>
            </view>
        </view>
        <!-- 热门 开始 -->
        <view class="hots_wrap">
            <view class="hots_title">
                <text> 热门 </text>
            </view>
            <view class="hots_content">
                <view
                class="hot_item"
                v-for="(item) in hots"
                :key="item.id"
                >
                <image
                    mode="widthFix"
                    :src="item.thumb"
                ></image>
                </view>
            </view>
        </view>

    </scroll-view>
</template>

<script>
    import moment from "moment";
    export default {
        data() {
            return {
                recommends: [],
                monthes: {},
                hots: [],
                params:{
                    // 要获取几条
                    limit: 18,
                    // 关键字
                    order: "hot",
                    // 要跳过几条
                    skip: 0
                    },
                moreDate: true,
                indicatorDots: true,
                autoplay: true,
                interval: 2000,
                duration: 500
            }
        },
        mounted() {
            this.getList();
        },
        methods:{
            getList(){
                this.request({
                    url: "http://157.122.54.189:9088/image/v3/homepage/vertical",
                    data: this.params
                })
                .then(result=>{
                    if(result.res.vertical.length === 0){
                        this.moreDate = false;
                    }
                    if(this.recommends.length === 0){
                        this.recommends = result.res.homepage[1].items;
                        // 月份模块
                        this.monthes = result.res.homepage[2];
                        // 将时间戳 改成  18号/月  moment.js
                        this.monthes.MM = moment(this.monthes.stime).format("MM");
                        this.monthes.DD = moment(this.monthes.stime).format("DD");
                    }
                    this.hots = [...this.hots,...result.res.vertical];
                })
            },
            handleToLower(){
                if(this.moreDate){
                    this.params.skip += this.params.limit;
                    this.getList();
                }else{
                    uni.showToast({
                        title: "没有数据了",
                        icon: "none"
                    });
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
.recommend_view{
    height: calc(100vh - 36px);
}
.recommend_wrap1 {
    display: flex;
    flex-wrap: wrap;
  .items {
      width: 50%;
      border: 5rpx solid white;
  }
}


.monthes_wrap {
  .momthe_bar {
        display: flex;
        justify-content: space-between;
        padding: 20rpx;
    .month {
        color: $color;
        font-size: 30rpx;
        font-weight: 600;
        display: flex;
    }
    .info {
        color: gray;
        font-size: 36rpx;
    }
    .more_have{
        color: $color;
        font-size: 30rpx;
    }
  }
  view.monthes_content {
      display: flex;
      flex-wrap: wrap;
  view.monthes_item {
      width: 33.33%;
      border: 5rpx solid white;
  }
}

}

.hots_wrap {
  .hots_title {
    padding: 20rpx;
    text {
      border-left: 20rpx solid $color;
      padding-left: 20rpx;
      font-size: 34rpx;
      font-weight: 600;
    }
  }

  .hots_content {
    display: flex;
    flex-wrap: wrap;
    .hot_item {
      width: 33.33%;
      border: 5rpx solid #fff;
      image {
      }
    }
  }
}
</style>

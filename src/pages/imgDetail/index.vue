<template>
  <viwe class="container">

    <view class="user">
      <view class="uers_icon">
        <img :src="imgDetail.user.avatar" mode="widthFix"  alt="">
      </view>
      <view class="user_info">
        <view class="user_name">
          {{imgDetail.user.name}}
        </view>
        <view class="time">
          {{imgDetail.ageTime}}
        </view>
      </view>
    </view>

    <view class="thumb">
      <img :src="imgDetail.imgThumb" alt="">
    </view>

    <view class="user_rank">
      <view class="rank">
        <text class="iconfont icondianzan">{{imgDetail.rank}}</text>
      </view>
      <view class="user_collect">
        <text class="iconfont iconshoucang">收藏</text>
      </view>
    </view>

    <view class="album_about">
      <view class="about_text">相关</view>
      <view class="album_list"
      v-for="item in album"
      :key="item.id"
      >
        <view class="about_info">
            <view class="about_img">
              <img :src="item.cover" mode="aspectFill" alt="">
            </view>
            <view class="info_text">
              <view class="title">专辑</view>
              <view class="decr">>{{item.name}}</view>
              <text class="iconfont iconiconfontjiantou4"></text>
            </view>
        </view>
      </view>
    </view>

  </viwe>
</template>

<script>
import moment from 'moment'
moment.locale("zh-cn");
export default {
  data(){
    return{
      imgDetail:{},
      album:[],
      comment:[],
      hot:[]
    }
  },
  onLoad(){
    console.log(getApp().globalData);
    const {imgList , imgIndex} = getApp().globalData;
    this.imgDetail = imgList[imgIndex];
    this.imgDetail.imgThumb = this.imgDetail.thumb + this.imgDetail.rule.replace('$<Height>',360);
    this.imgDetail.ageTime = moment(this.imgDetail.atime * 1000).fromNow();
    this.getCommets(this.imgDetail.id);
  },
  methods:{
    getCommets(id){
      this.request({
        url: `http://157.122.54.189:9088/image/v2/wallpaper/wallpaper/${id}/comment`
      })
      .then(result=>{
        this.album = result.res.album;
        this.comment = result.res.comment;
        this.hot = result.res.hot;
      })
    }
  }
}
</script>

<style lang="scss" scoped>
view.user {
  display: flex;
  padding: 20rpx;
  view.uers_icon {
      padding: 0rpx 20rpx;
    image {
      width: 80rpx;
      border-radius: 50%;
    }
  }
  view.user_info {
    view.user_name {
      color:black;
      font-size: 36rpx;
    }
    view.time {
      font-size: 28rpx;
      color: gray;
    }
  }
}
.user_rank {
  display: flex;
  height: 80rpx;
  border-bottom: 5rpx solid #eee;
  .rank {
    display: flex;
    justify-content: center;
    align-items: center;

    flex: 1;
    .iconfont {
    }
  }

  .user_collect {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    .iconfont {
    }
  }
}
.album_about {
  padding: 20rpx;
  .about_text {
    font-size: 50rpx;
    padding: 10rpx 0;
  }

  .album_list {
    .about_info {
      display: flex;
      border-bottom: 5rpx solid lightgray;
      .about_img {
        flex: 1;
        padding: 10rpx;
        image {
          widows: 180rpx;
          height: 180rpx;
        }
      }

      .info_text {
        flex: 3;
        padding: 10rpx 0;
        padding-left: 20rpx;
        position: relative;
        .title {
          width: 100rpx;
          height: 50rpx;
          background-color: $color;
          color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .decr {
          color:#666;
        }

        .iconiconfontjiantou4 {
          font-size: 40rpx;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: 10%;
          color: #000;
        }
      }
    }
  }
}
</style>
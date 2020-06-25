<template>
  <viwe class="container">

    <view class="user" v-if="imgDetail.user.avatar">
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
      <swiper-action @swiperAction="handleSwiperAction">
        <img :src="imgDetail.thumb" alt="">
      </swiper-action>
    </view>

    <view class="user_rank">
      <view class="rank">
        <text class="iconfont icondianzan">{{imgDetail.rank}}</text>
      </view>
      <view class="user_collect">
        <text class="iconfont iconshoucang">收藏</text>
      </view>
    </view>

    <view class="album_about" v-if="album.length">
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

    <view
      class="comment hot"
      v-if="hot.length"
    >
      <view class="comment_title">
        <text class="iconfont iconhot1"></text>
        <text class="comment_text">最热评论</text>
      </view>
      <view class="comment_list">
        <view
          class="comment_item"
          v-for="item in hot"
          :key="item.id"
        >
          <!-- 用户信息 -->
          <view class="comment_user">
            <!-- 用户头像 -->
            <view class="user_icon">
              <image
                mode="widthFix"
                :src="item.user.avatar"
              ></image>
            </view>
            <!-- 用户名称 -->
            <view class="user_name">
              <view class="user_nickname">{{item.user.name}}</view>
              <view class="user_time">{{item.cnTime}}</view>
            </view>
            <!-- 用户徽章 -->
            <view class="user_badge">
              <image
                v-for=" item2 in  item.user.title"
                :key="item2.icon"
                :src="item2.icon"
              ></image>
            </view>
          </view>
          <!-- 评论数据 -->
          <view class="comment_desc">
            <view class="comment_content">{{item.content}}</view>
            <view class="comment_like">
              <text class="iconfont icondianzan">{{item.size}}</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view
      class="comment new"
      v-if="comment.length"
    >
      <view class="comment_title">
        <text class="iconfont iconpinglun"></text>
        <text class="comment_text">最新评论</text>
      </view>
      <view class="comment_list">
        <view
          class="comment_item"
          v-for="item in comment"
          :key="item.id"
        >
          <!-- 用户信息 -->
          <view class="comment_user">
            <!-- 用户头像 -->
            <view class="user_icon">
              <image
                mode="widthFix"
                :src="item.user.avatar"
              ></image>
            </view>
            <!-- 用户名称 -->
            <view class="user_name">
              <view class="user_nickname">{{item.user.name}}</view>
              <view class="user_time">{{item.cnTime}}</view>
            </view>
            <!-- 用户徽章 -->
            <view class="user_badge">
              <image
                v-for=" item2 in  item.user.title"
                :key="item2.icon"
                :src="item2.icon"
              ></image>
            </view>
          </view>
          <!-- 评论数据 -->
          <view class="comment_desc">
            <view class="comment_content">{{item.content}}</view>
            <view class="comment_like">
              <text class="iconfont icondianzan">{{item.size}}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  

  </viwe>
</template>

<script>
import moment from 'moment'
import swiperAction from "../components/swiper-action/index"
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
    const { imgIndex } = getApp().globalData;
    this.imgIndex = imgIndex;
    this.getData();
  },
  methods:{
    getData(){
      const { imgList } = getApp().globalData;
      this.imgDetail = imgList[this.imgIndex];
      this.imgDetail.cnTime = moment(this.imgDetail.atime * 1000).fromNow();
      this.getCommets(this.imgDetail.id);
    },
    getCommets(id){
      this.request({
        url: `http://157.122.54.189:9088/image/v2/wallpaper/wallpaper/${id}/comment`
      })
      .then(result=>{
        this.album = result.res.album;
        result.res.hot.forEach(v=>v.cnTime=moment(v.atime*1000).fromNow());
        result.res.comment.forEach(v=>v.cnTime=moment(v.atime*1000).fromNow());
        this.comment = result.res.comment;
        this.hot = result.res.hot;
        // console.log(result);
      })
    },
    handleSwiperAction(e) {
      const { imgList } = getApp().globalData;
      if (e.direction === "left" && this.imgIndex < imgList.length - 1) {
        this.imgIndex++;
        this.getData();
      } else if (e.direction === "right" && this.imgIndex > 0) {
        this.imgIndex--;
        this.getData();
      } else {
        uni.showToast({
          title: "没有数据了",
          icon: "none"
        });
      }
    }
  },
  components:{
    swiperAction
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

// 最热评论
.comment {
  .comment_title {
    padding: 15rpx;
    .iconfont {
      color: red;
      font-size: 40rpx;
    }

    .comment_text {
      font-weight: 600;
      font-size: 28rpx;
      color: #666;
      margin-left: 10rpx;
    }
  }

  .comment_list {
    .comment_item {
      border-bottom: 15rpx solid #eee;
      // 用户信息
      .comment_user {
        display: flex;
        padding: 20rpx 0;
        .user_icon {
          width: 15%;
          display: flex;
          justify-content: center;
          align-items: center;
          image {
            width: 90%;
          }
        }

        .user_name {
          flex: 1;
          .user_nickname {
            color: #777;
          }

          .user_time {
            color: #ccc;
            font-size: 24rpx;
            padding: 5rpx;
          }
        }

        .user_badge {
          image {
            width: 40rpx;
            height: 40rpx;
            display: inline-block;
          }
        }
      }
      // 评论数据
      .comment_desc {   
        display: flex;
        padding: 30rpx 0;
        .comment_content {
          flex: 1;
          padding-left: 15%;
          color: #000;
        }

        .comment_like {
          text-align: right;
          .icondianzan {
          }
        }
      }
    }
  }
}

// 最新评论
.new {
  .iconpinglun {
    color: aqua !important;
  }
}

// 下载

</style>
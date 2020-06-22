<template>
	<scroll-view 
	scroll-y
    @scrolltolower="handleToLower"
	class="content">
		<!-- 轮播图 -->
		<view class="album_swiper">
			<swiper
				autoplay
				indicator-dots
				circular
			>
				<swiper-item
				v-for="item in banner"
				:key="item.id"
				>
					<image :src="item.thumb"></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 专辑 -->
		<view class="album_wrap">
			<navigator class="album_item"
			v-for="item in album"
			:key="item.id"
			:url="`/pages/album/index?id=${item.id}`"
			>
				<view class="album_img">
					<image  mode="aspectFill" :src="item.cover" alt="">
				</view>
				<view class="alubm_info">
					<view class="ablum_title">
						{{item.name}}
					</view>
					<viwe class="alubm_text">
						{{item.desc}}
					</viwe>
					<view class="album_btn">
						<view class="album_attention">
							关注
						</view>
					</view>
				</view>
			</navigator>
		</view>

	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {
				params:{
					limit: 18,
					order: "new",
					skip: 0
				},
				banner: [],
				album: [],
				moreDate: true
			}
		},
		mounted(){
			uni.setNavigationBarTitle({title:"专辑"})
			this.getList()
		},
		methods:{
			getList(){
				this.request({
					url: "http://157.122.54.189:9088/image/v1/wallpaper/album",
        			data: this.params
				})
				.then(result=>{
					// console.log(result);
					if(this.banner.length === 0){
						this.banner = result.res.banner;
					}
					if(result.res.album.length === 0){
						this.moreDate = false;
					}
					this.album = [...this.album,...result.res.album];
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
.content {
  	height: calc(100vh - 36px);
}
.album_swiper {
	swiper {
		// 750rpx 326.0869565217392
		// height: calc(750rpx / 2.3 );
		height: 326.1rpx;
		image {
			height: 100%;
		}
	}
}

.album_wrap {
	overflow: hidden;
  	.album_item {
	  	padding: 10rpx 0;
	  	display: flex;
		border-bottom: 1rpx solid #ccc;
    	.album_img {
			flex: 1;
			padding: 10rpx;
     	image {
			width: 200rpx;
			height: 200rpx;
      }
    }

		.alubm_info {
			flex: 2;
			padding: 0 10rpx;
			overflow: hidden;
			.ablum_title {
				padding: 10rpx;
				font-size: 36rpx;
		}

		.alubm_text {
			display: inline;
			padding: 0 10rpx 10rpx;
			font-size: 24rpx;
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
		}

      	.album_btn {
			padding: 10rpx;
			display: flex;
			justify-content: flex-end;
			.album_attention {
				color: $color;
				border: 1rpx solid $color;
				padding: 10rpx;
        	}
      	}
    }
  }
}
</style>

<template>
    <scroll-view
        enable-flex
        scroll-y
        class="content"
        @scrolltolower="scrolltolowerhandle"
    >
        <view class="video_item"
        v-for="item in videowp"
        :key="item.id"
        @click="gotoInfo(item)"
        >
            <img :src="item.img" mode="widthFix">
        </view>
    </scroll-view>
</template>

<script>
export default {
    data() {
        return {
            videowp:[],
            hasMore: true
        }
    },
    props:{
        urlobj:Object
    },
    watch: {
        urlobj() {
            this.videowp=[];
            this.getList();
            this.hasMore = true;
        }
    },
    mounted() {
        this.getList();
    },
    methods: {
        getList() {
            this.request({
                url: this.urlobj.url,
                data: this.urlobj.params
            })
            .then(result=>{
                if(result.res.videowp.length === 0){
                    this.hasMore = false;
                    uni.showToast({
                        title: '没有更多数据了',
                        icon: 'none'
                    }); 
                    return;  
                }
                this.videowp = [...result.res.videowp,...this.videowp];
            })
        },
        scrolltolowerhandle(){
            if(this.hasMore){
                this.urlobj.params.skip += this.urlobj.params.limit;
                this.getList();
            }else{
                uni.showToast({
                    title: '没有更多数据了',
                    icon: 'none',
                });
                  
            }

        },
        gotoInfo(item){
            getApp().globalData.video=item;
            uni.navigateTo({
                url:"/pages/videoPlay/index"
            })
        }
    },
}
</script>

<style lang="scss" scoped>
.content {
    display: flex;
    flex-wrap: wrap;
    height: calc(100vh - 36px);
    .video_item {
        width: 33.33%;
        padding: 5rpx;
        image {

        }
  }
}
</style>
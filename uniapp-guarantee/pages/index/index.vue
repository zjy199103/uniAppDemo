<template>
	<view class="background">
		<view class="headview">
			<!-- 轮播图 -->
			<view class="banner">
				<swiper :indicator-dots="true" :autoplay="true" indicator-color="rgba(255,255,255, .5)"
					indicator-active-color="#ff372b" :interval="3000" :duration="500">
					<swiper-item v-for="(item,index) of swiper" :key="index">
						<view class="item">
							<image :src="item.imageUrl" class="img"></image>
							<view class="tag">
								{{ item.typeTitle }}
							</view>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<view class="">
		</view>
		<tabbar-view :current-active='this.currentActive' @changeActive='changeActive'></tabbar-view>
	</view>
</template>

<script>
	import {
		apiGetBanner
	} from '../../apis/index.js'
	export default {
		data() {
			return {
				swiper: [],
				currentActive: 0
			}
		},
		methods: {
			getBanner() {
				apiGetBanner().then(res => {
					this.swiper = res.banners;
					console.log(res);
				})
			},
			changeActive(current) {
				this.currentActive = current;
				console.log(this.currentActive);
				switch (current){
					case 0:
					uni.switchTab({
						url:'/pages/indexView/index.vue'
					})
						break;
					case 1:
					uni.switchTab({
						url:'/pages/projectView/projectView'
					})
						break;
					case 2:
					uni.switchTab({
						url:'/pages/messageView/messageView'
					})
						break;
					case 3:
					uni.switchTab({
						url:'/pages/mineView/mineView'
					})
						break;
					default:
						break;
				}
			}
		},
		onLoad() {
			this.getBanner()
		}
	}
</script>

<style lang="scss">
	
	.background {
		margin-bottom: 0px;
		width: 100%;
		background-color: rgb(242, 242, 242);
		position: relative;

		.headview {
			width: 100%;
			height: 240px;
			border-radius: var(--menu, 0px);
			background: linear-gradient(180deg, #1890FF 40.94%, rgba(24, 144, 255, 0.00) 97.75%);
			
			.banner {
				height: 140px;
				padding-left: 15px;
				padding-right: 15px;
				padding-bottom: 0px;
			
				.swiper {
					height: 140px;
				}
			
				.item {
					position: relative;
					display: block;
					width: 100%;
					height: 140px;
					margin: 0 auto;
					border-radius: 10rpx;
					overflow: hidden;
				}
			
				.img {
					display: block;
					width: 100%;
					height: 100%;
				}
			
				.tag {
					position: absolute;
					bottom: 0;
					right: 0;
					height: 34rpx;
					padding: 0 14rpx;
					line-height: 34rpx;
					color: #fff;
					background: #43a5f0;
					z-index: 10;
					border-top-left-radius: 14rpx;
				}
			}
			
		}

	}
</style>
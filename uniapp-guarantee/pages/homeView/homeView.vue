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
	</view>
</template>

<script>
	export default {
		onLoad() {
			console.log(swiper);
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		props: {
			swiper:{
				type: Array,
				default: function() {
					return []
				}
			}
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
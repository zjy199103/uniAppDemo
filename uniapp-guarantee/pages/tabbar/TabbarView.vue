<template>
	<view class="tabbar-view">
		<view class="u-flex custom-tabbar">
			<view class="u-flex-1 h100 bg-white menu-info zindex-1" @click="changeCurrentActive(0)">
				<i class="fas " :class="[ currentActive === 0 ? 'fa-home-select' : 'fa-home'  ]"></i>
				<view :class="[ currentActive === 0 ? 'tabbarTextSelect': 'tabbarTextUnselect' ]">首页</view>
			</view>
			<view class="u-flex-1 h100 bg-white menu-info zindex-1 left-tabbar-wrapper" @click="changeCurrentActive(1)">
				<i class="fas " :class="[ currentActive === 1 ? 'fa-project-select' : 'fa-project'  ]"></i>
				<view :class="[ currentActive === 1 ? 'tabbarTextSelect': 'tabbarTextUnselect' ]">项目</view>
			</view>
			<view class="h100 transparent-circle-wrapper" @click="changeCurrentActive(4)">
				<view class="transparent-circle"></view>
				<view class="bubble">
					<div class="add"></div>
				</view>
			</view>
			<view class="u-flex-1 h100 bg-white menu-info zindex-1 right-tabbar-wrapper" @click="changeCurrentActive(2)">
				<i class="fas " :class="[ currentActive === 2 ? 'fa-message-select' : 'fa-message'  ]"></i>
				<view :class="[ currentActive === 2 ? 'tabbarTextSelect': 'tabbarTextUnselect' ]">消息</view>
			</view>
			<view class="u-flex-1 h100 menu-info bg-white zindex-1" @click="changeCurrentActive(3)">
				<i class="fas " :class="[ currentActive === 3 ? 'fa-mine-select' : 'fa-mine'  ]"></i>
				<view :class="[ currentActive === 3 ? 'tabbarTextSelect': 'tabbarTextUnselect' ]">我的</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		props: [
			'currentActive',
		],
		setup(props, { emit }) {},
		name: 'TabbarView',
		data() {
			return {}
		},
		methods: {
			changeCurrentActive(index) {
				this.$emit('changeActive', index)
			}
		},
	}
</script>

<style scoped>
	@import '@/common/css/all.min.css';

	.tabbar-view {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 60px;
	}

	.tabbarTextUnselect {
		color: var(--text999, #999);
		font-family: PingFang SC;
		font-size: 12px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}

	.tabbarTextSelect {
		color: var(--primary, #1890FF);
		font-family: PingFang SC;
		font-size: 12px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}

	.zindex-1 {
		z-index: 1;
	}


	.bg-white {
		background-color: #FFFFFF;
	}


	.bubble {
		position: absolute;
		right: auto;
		width: 60px;
		height: 60px;
		bottom: 15px;
		border-radius: 100%;
		z-index: 1;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(336deg, rgba(74 152 248), rgba(68 142 247) 70.71%);

		.add {
			width: 3px;
			height: 3px;
			color: #fff;
			position: relative;
			/* border: solid 1px blue; //添加边框可以看到加号的位置在哪里 */
		}

		.add::before {
			content: '';
			position: absolute;
			left: 50%;
			top: 50%;
			width: 100%;
			transform: translate(-50%, -50%);
			border-top: 15px solid;
		}

		.add::after {
			content: '';
			position: absolute;
			left: 50%;
			top: 50%;
			height: 100%;
			transform: translate(-50%, -50%);
			border-left: 15px solid;
		}
	}

	.bubble>span {
		opacity: 1;
	}

	.menu-info {
		display: grid;
		justify-content: center;
		align-content: center;
	}

	.u-flex-1 {
		flex: 1;
	}

	.h100 {
		height: 100%;
	}

	.u-flex {
		display: flex;
		align-items: center;
	}

	.custom-tabbar {
		height: 60px;
		position: fixed;
		bottom: 0;
		width: 100%;

		.left-tabbar-wrapper {
			border-top-right-radius: 21px;
		}

		.right-tabbar-wrapper {
			border-top-left-radius: 21px;
		}

		.transparent-circle-wrapper {
			position: relative;
			width: 100px;

			.transparent-circle {
				position: absolute;
				left: -3px;
				top: -50px;
				width: 106px;
				height: 100px;
				border-radius: 50%;
				box-shadow: 0 156px 0 100px #ffffff;
			}
		}
	}
</style>
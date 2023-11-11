<template>
	<view class="tabbar-view">
		<view id="navbar">
			<view id="bubbleWrapper">
				<view id="bubble3" class="bubble ">
					<!-- <img class="addImg" src="@/static/tabbar/tabbar-addbtn.svg" /> -->
					<div class="add"></div>
				</view>
			</view>
			<view id="menuWrapper">
				<view class="menu-tabbar" @click="changeCurrentActive(0)">
					<view class="menu-info">
						<i class="fas " :class="[ currentActive === 0 ? 'fa-home-select' : 'fa-home'  ]"></i>
						<view :class="[ currentActive === 0 ? 'tabbarTextSelect': 'tabbarTextUnselect' ]">首页</view>
					</view>
				</view>
				<view class="menu-tabbar" @click="changeCurrentActive(1)">
					<view class="menu-info">
						<i class="fas " :class="[ currentActive === 1 ? 'fa-project-select' : 'fa-project'  ]"></i>
						<view :class="[ currentActive === 1 ? 'tabbarTextSelect': 'tabbarTextUnselect' ]">项目</view>
					</view>
				</view>
				<view class="menuElement">
					<i class="fas fa-bell"></i>
				</view>
				<view class="menu-tabbar" @click="changeCurrentActive(2)">
					<view class="menu-info">
						<i class="fas " :class="[ currentActive === 2 ? 'fa-message-select' : 'fa-message'  ]"></i>
						<view :class="[ currentActive === 2 ? 'tabbarTextSelect': 'tabbarTextUnselect' ]">消息</view>
					</view>
				</view>
				<view class="menu-tabbar" @click="changeCurrentActive(3)">
					<view class="menu-info">
						<i class="fas " :class="[ currentActive === 3 ? 'fa-mine-select' : 'fa-mine'  ]"></i>
						<view :class="[ currentActive === 3 ? 'tabbarTextSelect': 'tabbarTextUnselect' ]">我的</view>
					</view>
				</view>
			</view>
		</view>
		<view id="bgWrapper">
			<view id="bg"></view>
			<view id="bgBubble">
			</view>
		</view>
		<svg width="0" height="0">
			<defs>
				<filter id="goo">
					<feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur" id="blurFilter" />
					<feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -15"
						result="goo" />
					<feComposite in="SourceGraphic" in2="goo" operator="atop" />
				</filter>
			</defs>
		</svg>
	</view>
</template>

<script setup>

</script>
<script>
	export default {
		props: [
			'currentActive',
		],
		setup(props, {
			emit
		}) {},
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

	#navbar {
		width: 100%;
		height: 60px;
		background-color: #fff;
		position: absolute;
	}

	#bubbleWrapper {
		position: absolute;
		display: flex;
		justify-content: space-around;
		width: 100%;
		bottom: 25px;
	}

	.bubble {
		background-color: #fff;
		width: 50px;
		height: 50px;
		bottom: 85px;
		border-radius: 50%;
		z-index: 1;
		transform: translateY(120%);
	}

	.icon {
		opacity: 0;
	}

	#bubble3 {
		transform: translateY(0%);
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow:
			0 1px 3px rgba(0, 0, 0, 0.12),
			0 1px 2px rgba(0, 0, 0, 0.24);
		background: linear-gradient(336deg, rgba(74 152 248), rgba(68 142 247) 70.71%);
	}

	#bubble3>span {
		opacity: 1;
	}

	#bgWrapper {
		filter: url(#goo);
		width: 100%;
		height: 30px;
		position: absolute;
		bottom: 60px;
	}

	#bg {
		position: absolute;
		background-color: rgb(242 242 242);
		height: 100%;
		width: 50%;
		left: 25%;
	}

	#bgBubble {
		position: absolute;
		background-color: rgb(242 242 242);
		width: 70px;
		height: 70px;
		border-radius: 50%;
		bottom: -50px;
		left: 50%;
		transform: translateX(-50%);
	}

	#menuWrapper {
		position: absolute;
		width: 100%;
		display: flex;
		justify-content: space-around;
		height: 100%;
	}

	.menuElement {
		width: 20%;
		text-align: center;
		opacity: 0.4;
		cursor: pointer;
	}

	.menuElement:hover {
		opacity: 0.5;
	}

	#contentWrapper {
		position: absolute;
		top: 50%;
		width: 100%;
		transform: translateY(-50%);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	#contentWrapper h2 {
		color: #fff;
		font-family: sans-serif;
		font-weight: 400;
	}

	.content {
		display: none;
		opacity: 0;
	}

	.menu-tabbar {
		width: 20%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.menu-info {
		text-align: center;
	}

	.add {
		width: 2px;
		height: 2px;
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
		border-top: 10px solid;
	}

	.add::after {
		content: '';
		position: absolute;
		left: 50%;
		top: 50%;
		height: 100%;
		transform: translate(-50%, -50%);
		border-left: 10px solid;
	}
</style>
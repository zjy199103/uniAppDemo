<template>
	<view class="tabbar-view">
		<div id="navbar">
			<div id="bubbleWrapper">
				<div id="bubble3" class="bubble">
					<span class="icon"><i class="fas fa-bell"></i></span>
				</div>
			</div>
			<div id="menuWrapper">
				<div class="menu-tabbar" @click="changeCurrentActive(0)">
					<div class="menu-info">
						<i class="fas " :class="[ currentActive === 0 ? 'fa-home': ''  ]"></i>
						<div>首页</div>
					</div>
				</div>
				<div class="menu-tabbar" @click="changeCurrentActive(1)">
					<div class="menu-info">
						<i class="fas fa-project"></i>
						<div>项目</div>
					</div>
				</div>
				<div class="menuElement">
					<i class="fas fa-bell"></i>
				</div>
				<div class="menu-tabbar" @click="changeCurrentActive(2)">
					<div class="menu-info">
						<i class="fas fa-message"></i>
						<div>消息</div>
					</div>
				</div>
				<div class="menu-tabbar" @click="changeCurrentActive(3)">
					<div class="menu-info">
						<i class="fas fa-mine"></i>
						<div>我的</div>
					</div>
				</div>
			</div>
		</div>
		<div id="bgWrapper">
			<div id="bg"></div>
			<div id="bgBubble"></div>
		</div>
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
		props: ['currentActive'],
		setup(props, { emit }) {
		},
		name: 'TabbarView',
		data() {
			return {
			}
		},
		methods: {
			
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
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.icon {
		opacity: 0;
	}

	#bubble3 {
		transform: translateY(0%);
		box-shadow:
			0 1px 3px rgba(0, 0, 0, 0.12),
			0 1px 2px rgba(0, 0, 0, 0.24);
	}

	#bubble3>span {
		opacity: 0.7;
	}

	#bgWrapper {
		filter: url(#goo);
		width: 100%;
		height: 100px;
		position: absolute;
		bottom: 60px;
	}

	#bg {
		background-color: #ffcc80;
		width: 120%;
		height: 100%;
		margin-left: -10%;
	}

	#bgBubble {
		position: absolute;
		background-color: #ffcc80;
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
</style>
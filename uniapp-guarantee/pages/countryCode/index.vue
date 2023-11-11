<template>
	<view>
		<view class="search-input-wrap">
			<view class="search-input-view">
				<input class="search-input" v-model="countryZone" placeholder="请输入区号或者国家" placeholder-style="color:#B4BDD9" />
				<view v-if="filterName.length > 0" class="close-text-icon" @tap="clearInput()"></view>
			</view>
		</view>
		<view class="contract-list">
			<view class="table-tr" v-for="(item, index) in countryItem" :key="index" v-if="countryItem.length > 0">
				<text class="list-showName" style="white-space:nowrap;" @tap="gobackToRegister(item.zone)">{{item.en}}</text>
				<text class="list-showName" style="word-wrap:break-word;word-break:normal;" 
					@tap="gobackToRegister(item.zone)">
					{{item.cn}}
				</text>
				<text class="flex-view" @tap="gobackToRegister(item.zone)">+{{item.zone}}</text>
			</view>
			<view class="table-tr" v-if="countryItem.length <= 0">
				<text class="list-showName">抱歉，未找到匹配的区号！</text>
			</view>
		</view>
	</view>
</template>

<script>
	import countryList from './country.js'
	export default {
		data() {
			return {
				//搜索内容
				filterName: '',
				//国际区号
				countryItem: countryList.list,
				//区号
				countryZone: '',
				pageType: '',
			}
		},
		onLoad() {

		},
		onShow() {
	
		},
		computed: {
		},
		methods: {
			clearInput() {
				this.countryZone = '';
			},
			gobackToRegister(zone) {
				const that = this;
				let pages = getCurrentPages();
				let prevPage = pages[ pages.length - 2 ]
				prevPage.$vm.upDataCountryCode(zone);
				uni.navigateBack({
					delta: 1
				}) 
			},
			renderCountryData() {
				var newData = [];
				var array = countryList.list;
				if (this.filterName && this.filterName.length > 0) {
					for(var i = 0; i < array.length; i++) {
						var zone = array[i].zone;
						var chinese = array[i].cn;
						var english = array[i].en;
						if ((english && (english.toUpperCase().startsWith(this.filterName.toUpperCase()) || english.toUpperCase().indexOf(this.filterName.toUpperCase()) > 0))
							|| (zone && (zone.startsWith(this.filterName) || zone.indexOf(this.filterName) > 0)) 
							|| (chinese && (chinese.startsWith(this.filterName) || chinese.indexOf(this.filterName) > 0))) {
							var index = newData.length;
							newData[index] = {};
							newData[index].zone = array[i].zone;
							newData[index].cn = array[i].cn;
							newData[index].en = array[i].en;
						}
					}
				} else {
					newData = array;
				}
				this.countryItem = newData;
			},
		},
		watch: {
			countryZone(newValue, oldValue) {
				this.filterName = newValue.toUpperCase();
				this.renderCountryData();
			}
		}
	}
</script>

<style lang="scss" scoped >
	page {
		background-color: #FFFFFF;
	}
	.search-input-wrap {
		background-color: #FFFFFF;
		position: fixed;
		height: 76rpx;
		width: 100%;
		padding-bottom: 20rpx;
		border-bottom: 2rpx solid #EAEFFA;
		padding-top: 10rpx;
	}
	.search-input-view {
		margin: 0 auto;
		padding: 5rpx 0;
		display: flex;
		color: #203763;
		background: #EAEFFA;
		border-radius: 40rpx;
		width: 90%;
		justify-content: center;
		align-items: center;
		height: 70rpx;
	}
	
	.contract-list {
		margin: 96rpx 38rpx;
		display: inline-block;
		width: 90%;
	}
	
	.table-tr {
		border-bottom: 1rpx solid #EAEFFA;
		display: flex;
		font-size: 24rpx;
		padding: 20rpx;
	}
	
	.list-showName {
		color: #203763;
		margin-right: 20rpx;
	}
	
	.search-input {
		flex: 1;
		font-size: 28rpx;
		margin-top: 4rpx;
		text-indent: 20rpx;
	}
	
	.search-text-icon {
		width: 30rpx;
		height: 30rpx;
		color: #B4BDD9;
		padding-left: 30rpx;
		padding-top: 8rpx;
	}
	.close-text-icon {
		width: 30rpx;
		height: 30rpx;
		color: #B4BDD9;
		padding-top: 8rpx;
		padding-right: 30rpx;
	}
	
	.flex-view {
		flex: 1;
		text-align: right;
	}
</style>

<template>
	<view class="mainView">
		<view class="tabsArea">
			<u-tabs ref="tabs" :list="tabList" @click="tabChange"
				lineWidth="60" lineHeight="4"     
				:activeStyle="{
					color: '#333',
					transform: 'scale(1.05)'
        }"
        :inactiveStyle="{
					color: '#999',
        }"
				itemStyle="height: 40px;font-size: 16px;">
			</u-tabs>
		</view>

		<form autocomplete="off">
			<view :hidden="loginType !==1">
				<u-input v-model="phone" 
					customStyle="padding:0 0 10rpx 0;margin:36rpx 0;height:48rpx;"
					placeholder="请输入手机号" 
					placeholderStyle="margin-left:10rpx;font-size:24rpx;"
					border="bottom" 
					:maxlength="11" 
					clearable
				>
				<template slot="prefix">
					<view class="phonePre">
						<Icons name="phone" class="accountIcon"></Icons>
						<view class="selectCountryCode" @click="gotoPickcode">
							<view>+{{zone}}</view>
						</view>
					</view>
				</template>
				</u-input>
			</view>
			
			<view :hidden="loginType !==2">
				<u-input v-model="email" 
					customStyle="padding:0 0 10rpx 0;margin:36rpx 0;height:48rpx;"
					placeholder="请输入邮箱" 
					placeholderStyle="margin-left:10rpx;font-size:24rpx;"
					border="bottom" 
					clearable
				>
				<template slot="prefix">
					<Icons name="phone" class="accountIcon"></Icons>
				</template>
				</u-input>
			</view>

			<!-- 验证码 -->
			<view>
				<u-input v-model="verifyCode"
					customStyle="padding:0 0 10rpx 0;margin:36rpx 0;height:48rpx;"
					placeholder="请输入验证码" 
					placeholderStyle="margin-left:10rpx;font-size:24rpx;"
					border="bottom" clearable
				 >
					 <template slot="prefix">
						 <Icons name="lock" class="accountIcon"></Icons>
					 </template>
					<template slot="suffix">
						<u-code seconds="60" endText="获取验证码" change-text="重新获取（xs）" :keepRunning="true" 
							uniqueKey="login"
							style="color:#1890FF;"
							ref="uCode"
							@change="codeChange" >
						</u-code>
						<view 
							:style="'color:' + ((!phone||tips.indexOf('重新获取（')!==-1)?'#999999':'')" 
							class="btn-text" @tap="codeEvent">
								{{ tips }}
						</view>
					</template>
				</u-input>
			</view>
			
			<!-- 密码 -->
			<u-input v-model="password" 
				customStyle="padding:0 0 10rpx 0;margin:36rpx 0;height:48rpx;"
				placeholder="请输入密码" 
				:password="true"
				placeholderStyle="margin-left:10rpx;font-size:24rpx;"
				border="bottom" 
				clearable
			>
				<template slot="prefix">
					<Icons name="lock" class="accountIcon"></Icons>
				</template>
			</u-input>
			
			
			<!-- 密码确认 -->
			<u-input v-model="checkPassword" 
				customStyle="padding:0 0 10rpx 0;margin:36rpx 0;height:48rpx;"
				placeholder="请输入确认密码" 
				:password="true"
				placeholderStyle="margin-left:10rpx;font-size:24rpx;"
				border="bottom" 
				clearable
			>
				<template slot="prefix">
					<Icons name="lock" class="accountIcon"></Icons>
				</template>
			</u-input>
		</form>

		<view 
			@click="loginTypeEvent" class="login"
			:style="'background-color:' + ((phone || email) && ( (password && checkPassword) || verifyCode) ? '#1890FF':'#8CB7F9'  )"
		>
			提交
		</view>

	</view>
</template>

<script>
	import myInput from "../../components/u-input-pd/u-input.vue"
	export default {
		data() {
			return {
				phone:'',//手机号
				email:'',//邮箱
				zone:86,//国家区号
				userName: '', // 账号
				password: '', // 密码
				checkPassword:'', // 密码确认
				verifyCode: '', // 验证码
				tabList:[{
						name: '手机找回',
						value:1,
					}, {
						name: '邮箱找回',
						value:2,
				},],
				loginType: 1, // 登录方式: 1.密码登录  2. 验证码登录 
				passWordShow: false, // 是否显示密码
				imgsel: false, // 是否同意协议
				tips: "" // 倒计时文字
			};
		},
		components: {
			"my-Input": myInput
		},
		props: {
			oldLogin: {
				type: Object,
				default: {}
			}
		},
		created() {
			if(this.oldLogin.userName) this.userName = this.oldLogin.userName;
			if(this.oldLogin.password) this.password = this.oldLogin.password;
		},
		methods: {
			tabChange(item){
				this.loginType = item.value
				this.userName = '';
				if (this.loginType == 2) {
					this.password = "";
					this.verifyCode = "";
				} else {
					this.password = "";
					this.verifyCode = "";
				}
			},
			
			gotoPickcode() {
				uni.navigateTo({
					url:'/pages/countryCode/index'
				})
			},
			
			upDataCountryCode(code) {
				if(code) {
					this.zone = code;
				}
				this.$forceUpdate();
			},
			
			loginTypeEvent() {
				if (!(this.userName && (this.password || this.verifyCode))) {
					// uni.$tool.toast('请输入用户名和密码');
					return;
				}
				if (this.imgsel == false) {
					uni.$tool.toast('请勾选同意《用户协议》和《隐私条款》');
					return;
				}
				let params = {
					loginType: this.loginType,
				};

				if (params.loginType == 1) {
					// 账号密码登陆
					params.loginName = this.userName;
					params.password = this.password;
					
					login(params, (e) => {
						if(e.result.isLogged){
							uni.$tool.toast("登录成功", 2000,false);
							uni.switchTab({
								url: ""
							});
						}else if(e.code === 9918 && e.message == '需要短信验证码验证'){
							var phone = e.result;
							uni.navigateTo({
								url: '/page_login/DualVerify?phone=' + phone
							});
						}else{
							uni.$tool.toast("登录成功", 2000,false);
							uni.navigateTo({
								url: ``
							})
						}
						
					});
				} else {
					// 如果是验证码登陆
					params.telephone = this.userName;
					params.verifyCode = this.verifyCode;
					
					login(params, (e) => {
						uni.$tool.toast("登录成功", 2000,false);
						// 如果不是新用户
						if (e.result.isLogged) {
							uni.switchTab({
								url: ""
							});
						} else {
							uni.navigateTo({
								url: ``
							})
						}
					});
				}
			},

			codeChange(text) {
				this.tips = text;
			},
			
			/**
			 * 获取验证码
			 */
			codeEvent() {
				if (!this.userName) return;
				if (!this.$refs.uCode.canGetCode) return;
				if (this.userName.length != 11) {
					uni.$tool.toast('请输入正确手机号')
				} else {
					let params = {
						phone: this.userName
					}
					//校验手机是否存在
					// phoneExistCheckApi(params).then(res => {
					// 	if (res.code === 1000 && res.result == true) {
					// 		sendMsgCodeOpenApi(params).then(res => {
					// 			uni.$tool.toast(res.message, 1500, false);
					// 			this.$refs.uCode.start();
					// 		});
					// 	} else {
					// 		uni.$tool.toast('此账号无效或不受支持')
					// 	}
					// });
				}
			},

		}
	};
</script>

<style lang="scss" scoped>
	page{
		background: #fff !important;
	}
	.mainView {
		padding:0 60rpx;
		padding-top: var(--status-bar-height);
		.tabsArea{
			margin-top:130rpx;
			margin-bottom:100rpx;
			::v-deep .u-tabs__wrapper__nav__item{
				flex-grow: 1;
			}
			::v-deep.u-tabs__wrapper__nav__line{
				left: 15px;
			}
		}

		.gobalck {
			width: 100%;
			height: 200rpx;
			display: flex;
			align-items: center;
		}
		
		.phonePre{
			display: flex;
			align-items: center;
			.selectCountryCode{
				color: #1890FF;
				font-size: 24rpx;
			}
		}
		
		.accountIcon{
			width: 32rpx;
			height: 32rpx;
			margin-right: 4rpx;
		}
		
		.btn-text {
			font-family: 'PingFang SC';
			color: #1890FF;
			font-weight: 500;
			font-size: 24rpx;
		}
		
		.protocolText {
			color: #666;
			margin-top: 50rpx;
			font-size: 28rpx;
			display: flex;
			align-items: center;
		}
		
		.login {
			margin-top: 60rpx;
			height: 100rpx;
			font-size:32rpx;
			line-height: 100rpx;
			width: 100%;
			background-color: #0074ff;
			color: #ffffff;
			text-align: center;
			text-justify: auto;
			border-radius: 50rpx;
		}
	}
</style>

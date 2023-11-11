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
							:style="'color:' + ((!(phone || email)||tips.indexOf('重新获取（')!==-1)?'#999999':'')" 
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
		
		<!-- 协议 -->
		<view class="protocolText">
			<u-checkbox-group @change="checkboxChange">
				<u-checkbox shape="round" size="14px" 
				activeColor="#1890FF" iconSize="10px"  label=""></u-checkbox>
			</u-checkbox-group>
			<view>我已同意</view>
			<view @click="usegentevent" style="color:#1890FF;">《注册协议》</view>
		</view>

		<view 
			@click="loginTypeEvent" class="login"
			:style="'background-color:' + ((this.phone || this.email) && password && checkPassword && verifyCode && imgsel.length != 0 ? '#1890FF':'#8CB7F9'  )"
		>
			注册
		</view>
	</view>
</template>

<script>
import myInput from "../../components/u-input-pd/u-input.vue"
import {apiGetCode,apiRegister} from "@/apis/index.js"
	export default {
		data() {
			return {
				phone:'',//手机号
				email:'',//邮箱
				zone:86,//国家区号
				password: '', // 密码
				checkPassword:'', // 密码确认
				verifyCode: '', // 验证码
				tabList:[{
						name: '手机注册',
						value:1,
					}, {
						name: '邮箱注册',
						value:2,
				},],
				loginType: 1, // 注册方式: 1.手机注册  2. 邮箱注册 
				passWordShow: false, // 是否显示密码
				imgsel: [], // 是否同意协议
				tips: "" // 倒计时文字
			};
		},
		components: {
			"my-Input": myInput
		},
		methods: {
			checkboxChange(change){
				this.imgsel = change
			},
			tabChange(item){
				this.loginType = item.value
			
				if (this.loginType == 2) {
					this.phone = ''
				} else {
					this.email = ''
				}
				this.password = ''
				this.checkPassword = ''
				this.verifyCode = ''
			},
			
			gotoPickcode() {
				uni.navigateTo({
					url:'/pages/countryCode/index'
				})
			},
			
			upDataCountryCode(code) {
				if(code) {
					this.zone = zone;
				}
				this.$forceUpdate();
			},
			
			loginTypeEvent() {

				if (!(this.phone || this.email)) {
					this.loginType == 1 ? uni.$tool.toast('请输入手机号') : uni.$tool.toast('请输入邮箱')
					return;
				}
				if (!this.verifyCode) {
					uni.$tool.toast('请输入验证码');
					return
				}
				if (this.password != this.checkPassword) {
					uni.$tool.toast('密码不一致，请重新输入');
					return
				}
				if (!this.password || !this.checkPassword) {
					uni.$tool.toast('请输入密码');
					return
				}
				if (this.imgsel.length == 0) {
					uni.$tool.toast('请勾选同意《用户协议》和《隐私条款》');
					return
				}
				let params = {
					loginType: this.loginType,
				};

				if (params.loginType == 1) {
					// 手机号注册
					params.userPhone = this.phone
					params.areaCode = this.zone
					
				} else {
					// 邮箱注册
					params.userEmail = this.email
					
				}
				params.securityCode = this.verifyCode
				params.userPassword = this.password
				
				apiRegister(params).then(res => {
					console.log(res);
					if (res.code == 200) {
						uni.$tool.toast('注册成功')
						uni.navigateBack()
					}else {
						uni.$tool.toast('注册失败，请重试')
					}
				})
			},
			
			codeChange(text) {
				this.tips = text;
			},
			
			/**
			 * 获取验证码
			 */
			codeEvent() {
				var params = {}
				if (this.loginType == 1) {
					if (!this.phone) {
						uni.$tool.toast('请输入手机号')
						return
					}
					params.userPhone = this.phone
					params.areaCode = this.zone
				}else {
					if (!this.email || !uni.$tool.checkIsEmail(this.email)) {
						uni.$tool.toast('请输入正确邮箱')
						return
					}
					params.userEmail = this.email
				}
				if (!this.$refs.uCode.canGetCode) return;
				console.log(JSON.stringify(params));
				apiGetCode(params).then(res => {
					console.log(res);
					if (res.code == 200) {
						uni.$tool.toast("获取成功");
						this.$refs.uCode.start();
					}
				})
				
				// var xhr = new XMLHttpRequest();
				// xhr.open("GET", "http://192.168.3.119:11002/user/login/getSecCode", true);
				// xhr.setRequestHeader("Content-Type", "application/json");
				// xhr.setRequestHeader("language-Type", "TC");
				// xhr.onreadystatechange = function () {
				//     if (xhr.readyState === 4) { // 请求完成
				//             if (xhr.status === 200) {
				//                 console.log("Response:", xhr.responseText); // 请求成功
				//             } else {
				//                 console.error("Error:", xhr.status); // 请求失败
				//             }
				//     }
				// };
				// var data = JSON.stringify({ 
				// 	userEmail: 'zjyzorro@gmail.com',
				// });
				// xhr.send(data);

			},

			/**
			 * 协议
			 */
			usegentevent: function(e) {
				// let url = process.uniEnv.USERAGENT_URL
    //     // #ifdef APP-PLUS
    //     uni.navigateTo({
    //       url: "/pages/webview/webview?loadUrl=" + url + "&&title=用户协议",
    //     });
    //     // #endif
    //     // #ifndef APP-PLUS
    //     uni.navigateTo({
    //       url: "/pages/webview/webview1?loadUrl=" + url + "&&title=用户协议",
    //     });
    //     // #endif
			}
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

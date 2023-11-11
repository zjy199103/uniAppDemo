<template>
  <view class="mainView">
    <!--<view class="gobalck">
		<Icons name="leftArrow" class="backIcon"></Icons>
		<view>首页</view>
	</view> -->
    <view class="topArea">
      <Icons
        name="guaranteLogo"
        :background-image="true"
        class="topIcon"
      ></Icons>
      <text class="titleInfo">担保交易欢迎您</text>
      <text class="info">请登录您的账号</text>
    </view>

    <view class="tabsArea">
      <u-tabs
        ref="tabs"
        :list="tabList"
        @click="tabChange"
        lineWidth="60"
        lineHeight="4"
        :activeStyle="{
          color: '#333',
          transform: 'scale(1.05)',
        }"
        :inactiveStyle="{
          color: '#999',
        }"
        itemStyle="height: 40px;font-size: 16px;"
      >
      </u-tabs>
    </view>

    <form autocomplete="off">
      <view>
        <u-input
          v-model="userName"
          customStyle="padding:0 0 10rpx 0;margin:36rpx 0;height:48rpx;"
          :placeholder="loginType == 1 ? '请输入邮箱/手机号' : '请输入手机号'"
          placeholderStyle="margin-left:10rpx;font-size:24rpx;"
          border="bottom"
          :maxlength="loginType == 1 ? 188 : 13"
          clearable
        >
          <template slot="prefix">
            <Icons
              v-if="loginType == 1"
              name="account-circle"
              class="accountIcon"
            ></Icons>
            <view class="phonePre" v-if="loginType == 2">
              <Icons name="phone" class="accountIcon"></Icons>
              <view class="selectCountryCode" @click="gotoPickcode">
                <view>+{{ zone }}</view>
              </view>
            </view>
          </template>
        </u-input>
      </view>
      <!-- 密码 -->
      <view :hidden="loginType !== 1">
        <my-Input
          v-model="password"
          customStyle="padding:0 0 10rpx 0;margin:36rpx 0;height:48rpx;"
          placeholder="请输入密码"
          placeholderStyle="margin-left:10rpx;font-size:24rpx;"
          :password="!passWordShow"
          border="bottom"
          clearable
        >
          <template slot="prefix">
            <Icons name="lock" class="accountIcon"></Icons>
          </template>
          <template slot="suffix">
            <view
              @click="switchPassWordShow"
              style="width: 40rpx; height: 40rpx; font-size: 24rpx"
            >
              <image
                :hidden="passWordShow"
                style="width: 32rpx; height: 32rpx"
                src="@/static/login/eye-off.png"
              >
              </image>
              <image
                :hidden="!passWordShow"
                style="width: 32rpx; height: 32rpx"
                src="@/static/login/eye.png"
              >
              </image>
            </view>
          </template>
        </my-Input>
      </view>
      <!-- 验证码 -->
      <view :hidden="loginType !== 2">
        <u-input
          v-model="verifyCode"
          customStyle="padding:0 0 10rpx 0;margin:36rpx 0;height:48rpx;"
          placeholder="请输入验证码"
          placeholderStyle="margin-left:10rpx;font-size:24rpx;"
          border="bottom"
          clearable
        >
          <template slot="prefix">
            <Icons name="lock" class="accountIcon"></Icons>
          </template>
          <template slot="suffix">
            <u-code
              seconds="60"
              endText="获取验证码"
              change-text="重新获取（xs）"
              :keepRunning="true"
              uniqueKey="login"
              style="color: #1890ff"
              ref="uCode"
              @change="codeChange"
            >
            </u-code>
            <view
              :style="
                'color:' +
                (!userName || tips.indexOf('重新获取（') !== -1
                  ? '#999999'
                  : '')
              "
              class="btn-text"
              @tap="codeEvent"
            >
              {{ tips }}
            </view>
          </template>
        </u-input>
      </view>
    </form>

    <form autocomplete="off">
      <view>
        <u-input
          v-model="userName"
          customStyle="padding:0 0 10rpx 0;margin:36rpx 0;height:48rpx;"
          :placeholder="loginType == 1 ? '请输入邮箱/手机号' : '请输入手机号'"
          placeholderStyle="margin-left:10rpx;font-size:24rpx;"
          border="bottom"
          :maxlength="loginType == 1 ? 188 : 13"
          clearable
        >
          <template slot="prefix">
            <Icons
              v-if="loginType == 1"
              name="accountCircle"
              class="accountIcon"
            ></Icons>
            <view class="phonePre" v-if="loginType == 2">
              <Icons name="phone" class="accountIcon"></Icons>
              <view class="selectCountryCode" @click="gotoPickcode">
                <view>+{{ zone }}</view>
              </view>
            </view>
          </template>
        </u-input>
      </view>
      <!-- 密码 -->
      <view :hidden="loginType !== 1">
        <my-Input
          v-model="password"
          customStyle="padding:0 0 10rpx 0;margin:36rpx 0;height:48rpx;"
          placeholder="请输入密码"
          placeholderStyle="margin-left:10rpx;font-size:24rpx;"
          :password="!passWordShow"
          border="bottom"
          clearable
        >
          <template slot="prefix">
            <Icons name="lock" class="accountIcon"></Icons>
          </template>
          <template slot="suffix">
            <view
              @click="switchPassWordShow"
              style="width: 40rpx; height: 40rpx; font-size: 24rpx"
            >
              <image
                :hidden="passWordShow"
                style="width: 32rpx; height: 32rpx"
                src="https://cent-obs.obs.cn-south-1.myhuaweicloud.com/app/images/login/eye-off.png"
              >
              </image>
              <image
                :hidden="!passWordShow"
                style="width: 32rpx; height: 32rpx"
                src="https://cent-obs.obs.cn-south-1.myhuaweicloud.com/app/images/login/eye.png"
              >
              </image>
            </view>
          </template>
        </my-Input>
      </view>
      <!-- 验证码 -->
      <view :hidden="loginType !== 2">
        <u-input
          v-model="verifyCode"
          customStyle="padding:0 0 10rpx 0;margin:36rpx 0;height:48rpx;"
          placeholder="请输入验证码"
          placeholderStyle="margin-left:10rpx;font-size:24rpx;"
          border="bottom"
          clearable
        >
          <template slot="prefix">
            <Icons name="lock" class="accountIcon"></Icons>
          </template>
          <template slot="suffix">
            <u-code
              seconds="60"
              endText="获取验证码"
              change-text="重新获取（xs）"
              :keepRunning="true"
              uniqueKey="login"
              style="color: #1890ff"
              ref="uCode"
              @change="codeChange"
            >
            </u-code>
            <view
              :style="
                'color:' +
                (!userName || tips.indexOf('重新获取（') !== -1
                  ? '#999999'
                  : '')
              "
              class="btn-text"
              @tap="codeEvent"
            >
              {{ tips }}
            </view>
          </template>
        </u-input>
      </view>
    </form>

    <view
      @click="loginTypeEvent"
      class="login"
      :style="
        'background-color:' +
        (userName && (password || verifyCode) ? '#1890FF' : '#8CB7F9')
      "
    >
      登录
    </view>

    <view class="btn-area">
      <view @click="registerEvent" class="event-text">免费注册</view>
      <view @click="resetEvent" class="event-text">忘记密码</view>
    </view>
  </view>
</template>

<script>
// import {
// 	login
// } from '@/utils/login_manager.js';
// import {
// 	phoneExistCheckApi,
// 	sendMsgCodeOpenApi
// } from '@/api/common_api.js'
import myInput from "../../components/u-input-pd/u-input.vue";
import { apiLogin } from "@/apis/index.js";
import w_md5 from "@/js_sdk/zww-md5/w_md5.js";
export default {
  data() {
    return {
      userName: "", // 账号
      zone: 86, // 国家区号
      password: "", // 密码
      verifyCode: "", // 验证码
      tabList: [
        {
          name: "密码登录",
          value: 1,
        },
        {
          name: "验证码登录",
          value: 2,
        },
      ],
      loginType: 1, // 登录方式: 1.密码登录  2. 验证码登录
      passWordShow: false, // 是否显示密码
      tips: "", // 倒计时文字
    };
  },
  components: {
    "my-Input": myInput,
    w_md5,
  },
  props: {
    oldLogin: {
      type: Object,
      default: {},
    },
  },
  created() {
    if (this.oldLogin.userName) this.userName = this.oldLogin.userName;
    if (this.oldLogin.password) this.password = this.oldLogin.password;
  },
  methods: {
    tabChange(item) {
      this.loginType = item.value;
      this.userName = "";
      if (this.loginType == 1) {
        this.password = "";
        this.verifyCode = "";
      } else {
        this.password = "";
        this.verifyCode = "";
      }
    },

    gotoPickcode() {
      uni.navigateTo({
        url: "/pages/countryCode/index",
      });
    },

    upDataCountryCode(code) {
      if (code) {
        this.zone = code;
      }
      this.$forceUpdate();
    },

    loginTypeEvent() {
      if (!(this.userName && (this.password || this.verifyCode))) {
        uni.$tool.toast("请输入用户名和密码");
        return;
      }
      let params = {
        loginType: this.loginType,
      };

      if (params.loginType == 1) {
        // 账号密码登陆
        if (uni.$tool.checkIsEmail(this.userName)) {
          params.userEmail = this.userName;
        } else {
          params.userPhone = this.userName;
        }
        params.password = w_md5.hex_md5_16(this.password);
        console.log(params);

        apiLogin(params).then(res => {
          console.log(res);
          if (res.code > 10000 || res.code < 19000) {
            uni.$tool.toast(res.data.messageTC);
          } else if (res.code == 200) {
            uni.$tool.toast("登陆成功");
          } else {
            uni.$tool.toast("登陆失败，请重试");
          }
        });
        // login(params, (e) => {
        // 	if(e.result.isLogged){
        // 		uni.$tool.toast("登录成功",2000,false);
        // 		uni.switchTab({
        // 			url: ""
        // 		});
        // 	}else if(e.code === 9918 && e.message == '需要短信验证码验证'){
        // 		var phone = e.result;
        // 		//处理切换成验证码登录
        // 	}else{
        // 		uni.$tool.toast("登录成功", 2000,false);
        // 		uni.navigateTo({
        // 			url: ``
        // 		})
        // 	}
        // });
      } else {
        // 如果是验证码登陆
        params.telephone = this.userName;
        params.verifyCode = this.verifyCode;

        login(params, e => {
          uni.$tool.toast("登录成功", 2000, false);
          // 如果不是新用户
          if (e.result.isLogged) {
            uni.switchTab({
              url: "",
            });
          } else {
            uni.navigateTo({
              url: ``,
            });
          }
        });
      }
    },

    registerEvent() {
      uni.navigateTo({
        url: "/pages/registerView/register",
      });
    },
    /**
     * 忘记密码
     */
    resetEvent() {
      uni.navigateTo({
        url: "/pages/resetPasswordView/resetPassword",
      });
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
        uni.$tool.toast("请输入正确手机号");
      } else {
        let params = {
          phone: this.userName,
        };
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
    /**
     * 密码是否为明文
     */
    switchPassWordShow() {
      this.passWordShow = !this.passWordShow;
    },

    upDataCountryCode(code) {
      if (code) {
        this.zone = code;
      }
      this.$forceUpdate();
    },

    loginTypeEvent() {
      if (!(this.userName && (this.password || this.verifyCode))) {
        uni.$tool.toast("请输入用户名和密码");
        return;
      }
      let params = {
        loginType: this.loginType,
      };

      if (params.loginType == 1) {
        // 账号密码登陆
        params.loginName = this.userName;
        params.password = this.password;

        login(params, e => {
          if (e.result.isLogged) {
            uni.$tool.toast("登录成功", 2000, false);
            uni.switchTab({
              url: "",
            });
          } else if (e.code === 9918 && e.message == "需要短信验证码验证") {
            var phone = e.result;
            //处理切换成验证码登录
          } else {
            uni.$tool.toast("登录成功", 2000, false);
            uni.navigateTo({
              url: ``,
            });
          }
        });
      } else {
        // 如果是验证码登陆
        params.telephone = this.userName;
        params.verifyCode = this.verifyCode;

        login(params, e => {
          uni.$tool.toast("登录成功", 2000, false);
          // 如果不是新用户
          if (e.result.isLogged) {
            uni.switchTab({
              url: "",
            });
          } else {
            uni.navigateTo({
              url: ``,
            });
          }
        });
      }
    },

    registerEvent() {
      uni.navigateTo({
        url: "/pages/registerView/register",
      });
    },
    /**
     * 忘记密码
     */
    resetEvent() {
      uni.navigateTo({
        url: "/pages/resetPasswordView/resetPassword",
      });
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
        uni.$tool.toast("请输入正确手机号");
      } else {
        let params = {
          phone: this.userName,
        };
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
    /**
     * 密码是否为明文
     */
    switchPassWordShow() {
      this.passWordShow = !this.passWordShow;
    },
  },
};
</script>

<style lang="scss" scoped>
page {
  background: #fff !important;
}
.mainView {
  padding: 0 60rpx;
  padding-top: var(--status-bar-height);
  .topArea {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 100rpx;
    .topIcon {
      margin-top: 40rpx;
      margin-bottom: 30rpx;
    }
    .titleInfo {
      text-align: center;
      color: #333;
      font-size: 40rpx;
      font-weight: 500;
    }
    .info {
      text-align: center;
      color: #666;
      font-size: 24rpx;
      font-weight: 400;
    }
  }

  .tabsArea {
    ::v-deep .u-tabs__wrapper__nav__item {
      flex-grow: 1;
    }
    ::v-deep.u-tabs__wrapper__nav__line {
      left: 15px;
    }
  }

  .gobalck {
    width: 100%;
    height: 200rpx;
    display: flex;
    align-items: center;
  }
  .accountIcon {
    margin-right: 4rpx;
  }

  .phonePre {
    display: flex;
    align-items: center;
    .selectCountryCode {
      color: #1890ff;
      font-size: 24rpx;
    }
  }

  .btn-text {
    font-family: "PingFang SC";
    color: #1890ff;
    font-weight: 500;
    font-size: 24rpx;
  }

  .login {
    margin-top: 80rpx;
    height: 100rpx;
    font-size: 32rpx;
    line-height: 100rpx;
    width: 100%;
    background-color: #0074ff;
    color: #ffffff;
    text-align: center;
    text-justify: auto;
    border-radius: 50rpx;
  }

  .btn-area {
    margin-top: 60rpx;
    display: flex;
    justify-content: space-between;
    .event-text {
      color: #666;
      font-weight: 500;
      font-size: 28rpx;
    }
  }
}
</style>

<template>
  <view class="homeView">
    <view class="headview">
      <view class="topArea">
        <view class="iconArea">
          <Icons name="logo" class="topIcon"></Icons>
          <text class="logoName">担保交易</text>
        </view>
        <view class="searchArea">
          <view class="searchContent">
            <input
              class="uni-input"
              type="text"
              placeholder="搜索您想要的项目"
              placeholder-class="placeholderClass"
              @focus="showSearch"
            />
            <u-icon
              name="search"
              color="#fff"
              size="40"
              class="searchIcon"
            ></u-icon>
          </view>
          <view class="language"> 中 </view>
        </view>
      </view>

      <!-- 轮播图 -->
      <view class="banner">
        <swiper
          :indicator-dots="true"
          :autoplay="true"
          indicator-color="rgba(255,255,255, .5)"
          indicator-active-color="#ff372b"
          :interval="3000"
          :duration="500"
        >
          <swiper-item :key="1">
            <view class="item">
              <image src="/static/banner.png" class="img"></image>
              <view class="tag">
                {{ 123 }}
              </view>
            </view>
          </swiper-item>
          <!-- <swiper-item v-for="(item, index) of swiperList" :key="index">
            <view class="item">
              <image :src="item.imageUrl" class="img"></image>
              <view class="tag">
                {{ item.typeTitle }}
              </view>
            </view>
          </swiper-item> -->
        </swiper>
      </view>
    </view>
    <view class="entryArea">
      <view class="entryContent">
        <view class="entryItem">
          <image
            class="entryImage"
            src="/static/entry/visualAsserts.png"
          ></image>
          <text class="title">虚拟资产</text>
        </view>
        <view class="entryItem">
          <image class="entryImage" src="/static/entry/estate.png"></image>
          <text class="title">房产抵押</text>
        </view>
        <view class="entryItem">
          <image class="entryImage" src="/static/entry/trademark.png"></image>
          <text class="title">商标担保</text>
        </view>
        <view class="entryItem">
          <image class="entryImage" src="/static/entry/others.png"></image>
          <text class="title">其他担保</text>
        </view>
      </view>
      <view class="borderLine"></view>
      <view class="messageArea">
        <image class="new" src="/static/entry/new.png"></image>
        <view class="event">
          <text class="name">113****4145发布新担任务</text>
          <view class="detail">
            托管资金
            <text class="amount">100万</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      swiperList: [],
    };
  },
  methods: {
    showSearch() {},
  },
  props: {
    searchValue: "",
    swiper: {
      type: Array,
      defaults: [],
    },
  },
};
</script>

<style lang="scss" scoped>
page {
  background: #f2f2f2;
}
.homeView {
  width: 100%;
  position: relative;

  .headview {
    position: relative;
    height: 400rpx;
    padding: 0 30rpx 0;
    margin-bottom: 10rpx;
    border-radius: var(--menu, 0px);
    background: linear-gradient(
      180deg,
      #1890ff 40.94%,
      rgba(24, 144, 255, 0) 97.75%
    );

    .topArea {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100rpx;
      color: #fff;
      margin-bottom: 15rpx;
      .iconArea {
        display: flex;
        align-items: center;
        .topIcon {
          margin-right: 18rpx;
        }
        .logoName {
          font-size: 32rpx;
          font-weight: 400;
        }
      }
      .searchArea {
        display: flex;
        align-items: center;
        .searchContent {
          position: relative;
          width: 272rpx;
          margin-right: 20rpx;
          .uni-input {
            width: 100%;
            height: 56rpx;
            border-radius: 40rpx;
            background: rgba(255, 255, 255, 0.1);
            .placeholderClass {
              margin-left: 30rpx;
              color: rgba(255, 255, 255, 0.5);
              font-size: 20rpx;
            }
          }
          .searchIcon {
            position: absolute;
            right: 20rpx;
            top: 50%;
            transform: translateY(-50%);
          }
        }
        .language {
          font-size: 28rpx;
          font-weight: 500;
        }
      }
    }

    .banner {
      height: 280rpx;
      width: 100%;
      .swiper {
        height: 100%;
        width: 100%;
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
  .entryArea {
    margin: 0 30rpx 15rpx;
    padding: 30rpx 0 16rpx 0;
    border-radius: 20rpx;
    background: #fff;
    .entryContent {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .entryItem {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        .entryImage {
          width: 86rpx;
          height: 86rpx;
          margin-bottom: 22rpx;
        }
        .title {
          color: #333;
          font-size: 24rpx;
        }
      }
    }
    .borderLine {
      margin: 25rpx 32rpx 15rpx;
      border-bottom: 1rpx solid #ededed;
    }
    .messageArea {
      height: 42rpx;
      display: flex;
      margin: 0 32rpx;
      align-items: center;
      .new {
        width: 52rpx;
        height: 42rpx;
        margin-right: 25rpx;
      }
      .event {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 20rpx;
        color: #666;
        .amount {
          color: #ef4416;
        }
      }
    }
  }
}
</style>

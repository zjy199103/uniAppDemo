<template>
  <view>
    <view class="bg">
      <home-view v-if="currentActive === 0" :swiper="swiper"></home-view>
      <project-view v-else-if="currentActive === 1"></project-view>
      <message-view v-else-if="currentActive === 2"></message-view>
      <mine-view v-else-if="currentActive === 3"></mine-view>
    </view>
    <view class="">
      <tabbar-view
        :current-active="this.currentActive"
        @changeActive="changeActive"
      ></tabbar-view>
    </view>
  </view>
</template>

<script>
import homeView from "@/pages/homeView/homeView.vue";
import projectView from "@/pages/projectView/projectView.vue";
import messageView from "@/pages/messageView/messageView.vue";
import mineView from "@/pages/mineView/mineView.vue";

import { apiGetBanner } from "../../apis/index.js";

export default {
  onLoad() {
    this.getBanner();
  },
  data() {
    return {
      swiper: [],
      currentActive: 0,
    };
  },
  methods: {
    getBanner() {
      apiGetBanner().then(res => {
        this.swiper = res.banners;
      });
    },
    changeActive(current) {
      this.currentActive = current;
      console.log(this.currentActive);
    },
  },
  components: {
    homeView,
    projectView,
    messageView,
    mineView,
  },
};
</script>

<style>
.bg {
  width: 100%;
}
</style>

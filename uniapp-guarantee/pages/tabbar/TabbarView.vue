<template>
  <view>
    <div id="dowebok">
      <div id="navbar">
        <div id="bubbleWrapper">
          <div id="bubble1" class="bubble">
            <span class="icon"><i class="fas fa-home"></i></span>
          </div>
          <div id="bubble2" class="bubble">
            <span class="icon"><i class="fab fa-twitter"></i></span>
          </div>
          <div id="bubble3" class="bubble">
            <span class="icon"><i class="fas fa-bell"></i></span>
          </div>
          <div id="bubble4" class="bubble">
            <span class="icon"><i class="fas fa-user"></i></span>
          </div>
          <div id="bubble5" class="bubble">
            <span class="icon"><i class="fas fa-user"></i></span>
          </div>
        </div>
        <div id="menuWrapper">
          <div id="menu1" class="menuElement">
            <i class="fas fa-home"></i>
          </div>
          <div id="menu2" class="menuElement">
            <i class="fas fa-twitter"></i>
          </div>
          <div id="menu3" class="menuElement">
            <i class="fas fa-bell"></i>
          </div>
          <div id="menu4" class="menuElement">
            <i class="fas fa-user"></i>
          </div>
          <div id="menu5" class="menuElement">
            <i class="fas fa-user"></i>
          </div>
        </div>
      </div>
      <div id="bgWrapper">
        <div id="bg"></div>
        <div id="bgBubble"></div>
      </div>
    </div>
    <svg width="0" height="0">
      <defs>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur" id="blurFilter" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -15"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
  </view>
</template>

<script>
export default {
  name: 'TabbarView',
  data() {
    return {}
  },
  methods: {}
}
</script>

<style scoped>
@import '@/assets/all.min.css';

#dowebok {
  min-width: 100%;
  min-height: 100vh;
  background-color: #ffcc80;
  display: flex;
  margin: 0 auto;
  justify-content: flex-end;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  box-shadow:
    0 10px 20px rgba(0, 0, 0, 0.19),
    0 6px 6px rgba(0, 0, 0, 0.23);
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

#bubble3 > span {
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
}

.menuElement {
  width: 20%;
  height: 60px;
  line-height: 60px;
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
</style>

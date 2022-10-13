<template>
  <div class="echartBox">
    <div class="lineBox">
      <LineBox style="height: 100%" />
      <div class="bigScreen" @click="changeLine"></div>
    </div>
    <div class="lineBox">
      <mapBox style="height: 100%" />
      <div class="bigScreen" @click="changeMap"></div>
    </div>
    <div class="lineBox">
      <rank style="height: 100%" />
      <div class="bigScreen" @click="changeRank"></div>
    </div>
    <div class="lineBox">
      <stock style="height: 100%" />
      <div class="bigScreen" @click="changeStock"></div>
    </div>
    <div class="lineBox">
      <trend style="height: 100%" />
      <div class="bigScreen" @click="changeTrend"></div>
    </div>
    <div class="lineBox">
      <product style="height: 100%" />
      <div class="bigScreen" @click="changeProduct"></div>
    </div>
    <div class="reset" @click="changeCurrentTheme"></div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import LineBox from '@/components/line.vue'
import mapBox from '@/components/map.vue'
import rank from '@/components/rank.vue'
import stock from '@/components/stocks.vue'
import trend from '@/components/trend.vue'
import product from '@/components/hotProduct.vue'
export default {
  components: {
    LineBox,
    mapBox,
    rank,
    stock,
    trend,
    product
  },
  methods: {
    ...mapMutations([
      'changeShowLine',
      'changeShowTrend',
      'changeShowMap',
      'changeShowRank',
      'changeShowStock',
      'changeShowProduct',
      'changeTheme'
    ]),
    changeLine () {
      this.changeShowLine(1)
      this.$router.push('/line')
    },
    changeTrend () {
      this.changeShowTrend(1)
      this.$router.push('/trend')
    },
    changeMap () {
      this.changeShowMap(1)
      this.$router.push('/map')
    },
    changeRank () {
      this.changeShowRank(1)
      this.$router.push('/rank')
    },
    changeStock () {
      this.changeShowStock(1)
      this.$router.push('/stock')
    },
    changeProduct () {
      this.changeShowProduct(1)
      this.$router.push('/product')
    },
    changeCurrentTheme () {
      this.changeTheme()
    }
  }
}
</script>

<style lang="less">
.bigScreen {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-image: url(@/assets/img/全屏.png);
  background-repeat: no-repeat;
  background-position: center center;
  right: 0;
  top: 0;
  position: absolute;
}
.echartBox {
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  display: flex;
  background-color: black;
  .lineBox {
    width: 33%;
    position: relative;
    height: 40%;
  }
  .reset {
    position: absolute;
    top: 0;
    left: 50%;
    width: 50px;
    height: 50px;
    transform: translateX(-50%);
    border-radius: 50%;
    background-position: center center;
    background-repeat: no-repeat;
    background-image: url(@/assets/img/Reset.png);
  }
}
</style>

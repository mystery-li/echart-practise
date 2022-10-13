<template>
  <div  style="position: relative;">
    <div ref="trend"   :class="{currentContainer:!showTrend,container:showTrend}"></div>
    <div class="title" :class="{show:flag}" :style="titleFont"><ul><li v-for="item,index in title" :key="index"><i @click="changeTrend(item)"  > {{index===0?title[0].title:item.title}}</i></li></ul><img src="@/assets/img/下箭头.png" alt="" @click="flag = !flag"></div>
    <div class="bigScreen" @click="changeShowLine1"></div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      myChart: null,
      trendData: null,
      flag: true,
      nowValue: ['map'],
      title: [],
      only: true,
      timeArr: [],
      valueArr: [],
      titleFontSize: 20
    }
  },
  computed: {
    ...mapState(['showTrend', 'theme']),
    titleFont () {
      return {
        fontSize: this.titleFontSize + 'px'
      }
    }
  },
  methods: {
    ...mapMutations(['changeShowTrend']),
    initEchart () {
      this.myChart = this.echarts.init(this.$refs.trend, this.theme)
      const trendOption = {
        // 调整坐标
        grid: {
          left: '3%',
          top: '35%',
          right: '4%',
          bottom: '1%',
          containLabel: true
        },
        tooltip: {
          show: true,
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          // 坐标轴没有间隙
          boundaryGap: false
        },
        yAxis: {
          type: 'value'
        }
      }
      this.myChart.setOption(trendOption)
    },
    async getData () {
      const { data: res } = await axios({
        url: 'http://127.0.0.1:5500/trend',
        tpye: 'GET'
      })
      this.trendData = res
      this.updateData()
    },
    updateData () {
      if (this.only) {
        this.timeArr = this.trendData.common.month
        const title3 = {
          title: this.trendData.commodity.title,
          name: 'commodity'
        }
        const title2 = {
          title: this.trendData.seller.title,
          name: 'seller'
        }
        const title1 = {
          title: this.trendData[this.nowValue].title,
          name: 'map'
        }
        this.title.push(title1, title2, title3)
      }
      this.valueArr = this.trendData[this.nowValue].data
      const nameArr = this.valueArr.map(item => item.name)
      const colorArr1 = [
        'rgba(11,168,44,0.5)',
        'rgba(44,110,255,0.5)',
        'rgba(22,242,217,0.5)',
        'rgba(254,33,30,0.5)',
        'rgba(250,105,0,0.5)'
      ]
      const colorArr2 = [
        'rgba(11,168,44,0)',
        'rgba(44,110,255,0)',
        'rgba(22,242,217,0)',
        'rgba(254,33,30,0)',
        'rgba(250,105,0,0)'
      ]
      const seriedArr = this.valueArr.map((item, index) => {
        return {
          name: nameArr[index],
          type: 'line',
          data: item.data,
          // 设置相同的stack解决折线图重叠
          stack: 'trend',
          smooth: true,
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: colorArr1[index] // 0% 处的颜色
              }, {
                offset: 1, color: colorArr2[index] // 100% 处的颜色
              }],
              global: false // 缺省为 false
            }
          }
        }
      })
      console.log(seriedArr)
      const optionA = {
        legend: {
          left: 20,
          top: '15%',
          icon: 'circle',
          data: nameArr
        },
        xAxis: {
          data: this.timeArr
        },
        yAxis: {
          type: 'value'
        },
        series: seriedArr
      }
      this.myChart.setOption(optionA)
    },
    screenAdapter () {
      this.titleFontSize = Math.floor(this.$refs.trend.offsetWidth / 100 * 1.5)
      const adapterOption = {
        tooltip: {
          axisPointer: {
            // 适配柱
            lineStyle: {
              width: this.titleFontSize / 1.4
            }
          }
        },
        legend: {
          itemWidth: this.titleFontSize,
          itemHeight: this.titleFontSize,
          itemGap: this.titleFontSize,
          textStyle: {
            fontSize: this.titleFontSize
          }
        }
      }
      this.myChart.setOption(adapterOption)
      this.myChart.resize()
    },
    changeShowLine1 () {
      this.changeShowTrend(2)
      this.$router.go(-1)
    },
    // 修改数据
    changeTrend (item, index) {
      this.title.splice(index, 1)
      this.title.unshift(item)
      this.nowValue = item.name
      if (this.only) {
        this.only = false
      }
      this.updateData()
      this.flag = true
    }
  },
  mounted () {
    this.initEchart()
    this.getData()
    window.addEventListener('resize', this.screenAdapter)
  },
  destroyed () {
    window.removeEventListener('resize', this.screenAdapter)
  },
  watch: {
    theme () {
      // 销毁当前图表
      this.myChart.dispose()
      this.initEchart()
      this.getData()
      this.screenAdapter()
      this.updateData()
    }
  }
}
</script>

<style lang="less" scoped>
.currentContainer{
  width: 100%;
  height:100%
}
.container{
  width: 100vw;
  height: 100vh;
}
.bigScreen{
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
.title{
  cursor: pointer;
  position: absolute;
  display: flex;
  top: 0;
  color: white;
  text-align: center;
  line-height: 100px;
  left: 0;
  width: 200px;
  height: 100px;
  img{
    position: absolute;
    top: 50%;
    right: -10px;
    transform: translate(-50%,-50%);
    width: 20px;
    height: 20px;
  }
}
.show{
  overflow: hidden;
}
</style>

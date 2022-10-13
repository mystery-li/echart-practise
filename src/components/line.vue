<template>
  <div style="position: relative;">
    <div ref="bar" :class="{currentContainer:!showLine,container:showLine}" @click="changeShowLine1" ></div>
    <div class="bigScreen" @click="changeShowLine1"></div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'line',
  data () {
    return {
      myChart: null,
      barData: null,
      barValue: null,
      barName: null,
      totalPage: 0,
      currentPage: 1,
      timer: null
    }
  },
  methods: {
    ...mapMutations(['changeShowLine']),
    // 初始化echart
    initEchart () {
      this.myChart = this.echarts.init(this.$refs.bar, this.theme)
      const option = {
        title: {
          text: '商家销售量统计'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            z: 0
          }
        },
        legend: {
          data: ['销量']
        },
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'category'
        },
        series: [
          {
            name: '销量',
            type: 'bar',
            label: {
              show: true,
              position: 'right'
            },
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [{
                  offset: 0, color: '#5052EE' // 0% 处的颜色
                }, {
                  offset: 1, color: '#AB6EE5' // 100% 处的颜色
                }]
              }
            }
          }
        ]
      }
      this.myChart.setOption(option)
      // 事件
      this.myChart.on('mouseover', () => {
        clearInterval(this.timer)
      })
      this.myChart.on('mouseout', () => {
        this.currentAdd()
      })
    },
    // 获取线状图数据
    async getData () {
      const { data: res } = await axios({
        url: 'http://127.0.0.1:5500/seller',
        tpye: 'GET'
      })
      this.barData = res
      this.totalPage = this.barData.length % 5 === 0 ? this.barData.length / 5 : this.barData.length / 5 + 1
      this.setData()
    },
    // 配置线状图
    setData () {
      // 每一页的起始位置和末尾位置
      const start = (this.currentPage - 1) * 5
      const end = this.currentPage * 5
      const newBar = this.barData.slice(start, end)
      this.barValue = newBar.map(item => item.value)
      this.barName = newBar.map(item => item.name)
      const option = {
        yAxis: {
          data: this.barName
        },
        series: [
          {
            data: this.barValue
          }
        ]
      }
      this.myChart.setOption(option)
    },
    // 2秒换一次数据
    currentAdd () {
      this.timer = setInterval(() => {
        this.currentPage++
        if (this.currentPage > this.totalPage) {
          this.currentPage = 1
        }
        this.setData()
      }, 2000)
    },
    // 适配性
    screenAdapter () {
      const titleFontSize = this.$refs.bar.offsetWidth / 100 * 3.6
      const adapterOption = {
        tooltip: {
          axisPointer: {
            // 适配柱
            lineStyle: {
              width: titleFontSize / 1.4
            }
          }
        }
      }
      this.myChart.setOption(adapterOption)
      this.myChart.resize()
    },
    changeShowLine1 () {
      this.changeShowLine(2)
      this.$router.go(-1)
    }
  },
  mounted () {
    // 初始化echart
    this.initEchart()
    // 获取bar数据
    this.getData()
    // 每2秒钟换一次数据
    this.currentAdd()
    // 适配
    window.addEventListener('resize', this.screenAdapter)
  },
  destroyed () {
    window.removeEventListener('resize', this.screenAdapter)
    clearInterval(this.timer)
  },
  computed: {
    ...mapState(['showLine', 'theme'])
  },
  watch: {
    theme () {
      // 销毁当前图表
      this.myChart.dispose()
      this.initEchart()
      this.getData()
      this.screenAdapter()
      this.setData()
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
</style>

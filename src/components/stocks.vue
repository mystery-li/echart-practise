<template>
  <div>
    <div ref="stock" :class="{currentContainer:!showStock,container:showStock}" ></div>
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
      stockData: [],
      currentIndex: 0,
      timer: null,
      innerRadius: 120,
      outterRadius: 110
    }
  },
  methods: {
    ...mapMutations(['changeShowStock']),
    initEchart () {
      this.myChart = this.echarts.init(this.$refs.stock, this.theme)
      const option = {
        title: {
          text: '📕库存销售量'
        },
        tooltip: {
        },
        series: [
        ]
      }
      this.myChart.setOption(option)
    },
    async getData () {
      const { data: res } = await axios({
        url: 'http://127.0.0.1:5500/stock',
        tpye: 'GET'
      })
      this.stockData = res
      this.setData()
      this.changeCurrentIndex()
    },
    setData () {
      const centerArr = [
        ['18%', '40%'],
        ['50%', '40%'],
        ['82%', '40%'],
        ['34%', '75%'],
        ['66%', '75%']
      ]
      const colorArr = [
        ['#4FF778', '#0BA82C'],
        ['#E5DD45', '#E8B11C'],
        ['#E8821C', '#E55445'],
        ['#5052EE', '#AB6EE5'],
        ['#23E5E5', '#2E72BF']
      ]
      const newStockData = this.stockData.slice(this.currentIndex, this.currentIndex + 5)
      const seriesArr = newStockData.map((item, index) => {
        return {
          type: 'pie',
          // 形式外环半径和内环半径
          center: centerArr[index],
          radius: [this.outterRadius, this.innerRadius],
          label: {
            show: true,
            color: colorArr[index][0],
            position: 'center'
          },
          labelLine: {
            show: false
          },
          emphasis: {
            scale: false
          },
          data: [
            {
              value: item.sales,
              name: item.name + '\n' + item.sales,
              itemStyle: {
                color: new this.echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: colorArr[index][0]
                  },
                  {
                    offset: 1,
                    color: colorArr[index][1]
                  }
                ])
              }
            },
            {
              value: item.stock,
              name: item.name + '\n' + item.sales,
              itemStyle: {
                color: '#333843'
              }
            }
          ]
        }
      })
      const optionA = {
        series: seriesArr
      }
      this.myChart.setOption(optionA)
    },
    screenAdapter () {
      const titleFontSize = this.$refs.stock.offsetWidth / 100 * 3.6
      this.innerRadius = titleFontSize * 2
      this.outterRadius = titleFontSize * 1.125
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: titleFontSize / 2
          }
        },
        series: [
          {
            radius: [this.outterRadius, this.innerRadius],
            label: {
              fontSize: titleFontSize / 2
            }
          },
          {
            radius: [this.outterRadius, this.innerRadius],
            label: {
              fontSize: titleFontSize / 2
            }
          },
          {
            radius: [this.outterRadius, this.innerRadius],
            label: {
              fontSize: titleFontSize / 2
            }
          },
          {
            radius: [this.outterRadius, this.innerRadius],
            label: {
              fontSize: titleFontSize / 2
            }
          },
          {
            radius: [this.outterRadius, this.innerRadius],
            label: {
              fontSize: titleFontSize / 2
            }
          }
        ]
      }
      this.myChart.setOption(adapterOption)
      this.myChart.resize()
    },
    changeCurrentIndex () {
      this.timer = setInterval(() => {
        this.currentIndex += 5
        if (this.currentIndex === 10) {
          this.currentIndex = 0
        }
        this.setData()
      }, 2000)
    },
    changeShowLine1 () {
      this.changeShowStock(2)
      this.$router.go(-1)
    }
  },
  mounted () {
    this.initEchart()
    this.getData()
    window.addEventListener('resize', this.screenAdapter)
    this.myChart.on('mouseover', () => {
      clearInterval(this.timer)
    })
    this.myChart.on('mouseout', () => {
      this.changeCurrentIndex()
    })
  },
  destroyed () {
    window.removeEventListener('resize', this.screenAdapter)
    clearInterval(this.timer)
  },
  computed: {
    ...mapState(['showStock', 'theme'])
  },
  watch: {
    theme () {
      // 销毁当前图表
      clearInterval(this.timer)
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

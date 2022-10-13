<template>
  <div style="position: relative;">
    <div ref="rank" :class="{currentContainer:!showRank,container:showRank}" ></div>
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
      rankData: null,
      timer: null,
      index: 0
    }
  },
  methods: {
    ...mapMutations(['changeShowRank']),
    initRank () {
      this.myChart = this.echarts.init(this.$refs.rank, this.theme)
      const option = {
        title: {
          text: '📕地区销售排名'
        },
        tooltip: {
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            type: 'bar',
            barWidth: 50
          }
        ]
      }
      this.myChart.setOption(option)
      this.myChart.on('mouseover', () => {
        clearInterval(this.timer)
      })
      this.myChart.on('mouseout', () => {
        this.updateRankData()
      })
    },
    async getRankData () {
      const { data: res } = await axios({
        url: 'http://127.0.0.1:5500/rank',
        tpye: 'GET'
      })
      this.rankData = res
      this.rankData.sort((a, b) => {
        return b.value - a.value
      })
      this.setData()
      this.updateRankData()
    },
    setData () {
      const colorArr = [
        ['#0BA82C', '#4FF778'],
        ['#2E72BF', '#23E5E5'],
        ['#5052EE', '#AB6EE5']
      ]
      const rankData = this.rankData.slice(this.index, this.index + 11)
      const rankName = rankData.map(item => item.name)
      const rankValue = rankData.map(item => item.value)
      const setOption = {
        xAxis: {
          data: rankName
        },
        series: [
          {
            data: rankValue,
            itemStyle: {
              color: (arg) => {
                let targetColor = null
                if (arg.value > 300) {
                  targetColor = colorArr[0]
                } else if (arg.value > 200) {
                  targetColor = colorArr[1]
                } else {
                  targetColor = colorArr[2]
                }
                return new this.echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: targetColor[0]
                  },
                  {
                    offset: 1,
                    color: targetColor[1]
                  }
                ])
              }
            }
          }
        ]
      }
      this.myChart.setOption(setOption)
    },
    screenAdapter () {
      const titleFontSize = this.$refs.rank.offsetWidth / 100 * 3.6
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: titleFontSize
          }
        },
        series: [
          {
            barWidth: titleFontSize,
            itemStyle: {
              borderRadius: [titleFontSize / 2, titleFontSize / 2, 0, 0]
            }
          }
        ]
      }
      this.myChart.setOption(adapterOption)
      this.myChart.resize()
    },
    updateRankData () {
      this.timer = setInterval(() => {
        // 数据重置
        const data = this.rankData.shift()
        this.rankData.push(data)
        const newRankData = this.rankData.slice(this.index, this.index + 11)
        const rankName = newRankData.map(item => item.name)
        const rankValue = newRankData.map(item => item.value)
        const newOption = {
          xAxis: {
            data: rankName
          },
          series: [
            {
              data: rankValue
            }
          ]
        }
        this.myChart.setOption(newOption)
      }, 1000)
    },
    changeShowLine1 () {
      this.changeShowRank(2)
      this.$router.go(-1)
    }
  },
  mounted () {
    this.initRank()
    this.getRankData()
    window.addEventListener('resize', this.screenAdapter)
  },
  destroyed () {
    window.removeEventListener('resize', this.screenAdapter)
    clearInterval(this.timer)
  },
  computed: {
    ...mapState(['showRank', 'theme'])
  },
  watch: {
    theme () {
      // 销毁当前图表
      clearInterval(this.timer)
      this.myChart.dispose()
      this.initRank()
      this.getRankData()
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

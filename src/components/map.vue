<template>
  <div style="position: relative;">
    <div ref="map" :class="{currentContainer:!showMap,container:showMap}" ></div>
    <div class="bigScreen" @click="changeShowLine1"></div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState, mapMutations } from 'vuex'
import { getProvinceMapInfo } from '@/utils/map_utils.js'
export default {
  data () {
    return {
      myChart: null,
      chinaMap: [],
      scatterData: []
    }
  },
  methods: {
    ...mapMutations(['changeShowMap']),
    async initData () {
      this.myChart = this.echarts.init(this.$refs.map, this.theme)
      const { data: res } = await axios({
        url: 'http://127.0.0.1:5500/map',
        tpye: 'GET'
      })
      this.chinaMap = res
      console.log(res)
      this.echarts.registerMap('china', res)
      const mapOption = {
        title: {
          text: '📕商家分布',
          left: 20,
          top: 20
        },
        geo: {
          type: 'map',
          map: 'china',
          top: '5%',
          bottom: '5%',
          left: '20%',
          itemStyle: {
            areaColor: '#2E72BF',
            borderColor: '#333'
          }
        },
        legend: {
          left: '5%',
          bottom: '5%',
          orient: 'vertical'
        },
        tooltip: {}
      }
      this.myChart.setOption(mapOption)
      this.myChart.on('click', async (arg) => {
        console.log(1)
        const data1 = getProvinceMapInfo(arg.name)
        const { data: res } = await axios({
          url: `http://127.0.0.1:5500/provice?path=${data1.path}`,
          type: 'GET'
        })
        this.echarts.registerMap('china', res)
        const proviceMap = {
          geo: {
            type: 'map',
            map: 'china',
            top: '46%',
            left: '46%'
          }
        }
        this.myChart.setOption(proviceMap)
      }, true)
      this.$refs.map.addEventListener('dblclick', () => {
        this.initData()
      })
    },
    async getData () {
      const { data: res } = await axios({
        url: 'http://127.0.0.1:5500/changeMap',
        tpye: 'GET'
      })
      this.scatterData = res
      this.updateData()
    },
    updateData () {
      const legendArr = this.scatterData.map(item => item.name)
      const seriesArr = this.scatterData.map(item => {
        return {
          type: 'effectScatter',
          rippleEffect: {
            scale: 5,
            brushType: 'stroke'
          },
          name: item.name,
          data: item.children,
          // 在地图中如果想要使用散点图，就得添加这个。
          coordinateSystem: 'geo'
        }
      })
      const dataOption = {
        legend: {
          data: legendArr
        },
        series: seriesArr
      }
      this.myChart.setOption(dataOption)
    },
    screenAdapter () {
      const titleFontSize = this.$refs.map.offsetWidth / 100 * 3.6
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: titleFontSize
          }
        },
        legend: {
          itemWidth: titleFontSize / 2,
          itemHeight: titleFontSize / 2,
          itemGap: titleFontSize / 2,
          textStyle: {
            fontSize: titleFontSize / 2
          }
        }
      }
      this.myChart.setOption(adapterOption)
      this.myChart.resize()
    },
    changeShowLine1 () {
      this.changeShowMap(2)
      this.$router.go(-1)
    }
  },
  mounted () {
    this.initData()
    this.getData()
    window.addEventListener('resize', this.screenAdapter)
  },
  destroyed () {
    window.removeEventListener('resize', this.screenAdapter)
  },
  computed: {
    ...mapState(['showMap', 'theme'])
  },
  watch: {
    theme () {
      // 销毁当前图表
      this.myChart.dispose()
      this.initData()
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

<template>
  <div style="box-sizing: border-box; position: relative;" ref="box" >
    <div ref="product"  :class="{currentContainer:!showProduct,container:showProduct}">
    </div>
    <div class="bigScreen" @click="changeShowLine1"></div>
    <div class="leftBox" @click="changeProductData(false)"></div>
    <div class="rightBox" @click="changeProductData(true)"></div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      myChart: null,
      productData: null,
      currentProductTitle: '',
      index: 0,
      show: 0
    }
  },
  methods: {
    ...mapMutations(['changeShowProduct']),
    initData () {
      this.myChart = this.echarts.init(this.$refs.product, this.theme)
      const option = {
        legend: {
          icon: 'circle',
          left: '10%',
          bottom: '0',
          orient: 'vertical',
          itemWidth: 40,
          itemHeight: 30
        },
        title: {
          text: '📕热销商品销售金额占比统计'
        },
        tooltip: {
        }
      }
      this.myChart.setOption(option)
    },
    async getData () {
      const { data: res } = await axios({
        url: 'http://127.0.0.1:5500/hotproduct',
        tpye: 'GET'
      })
      this.productData = res
      this.currentProductTitle = this.productData[this.index].name
      console.log(res)
      this.setData(this.index)
    },
    setData (value) {
      const currentProductData = this.productData[value].children
      const productName = currentProductData.map(item => item.name)
      const productValue = currentProductData.map(item => {
        return {
          name: item.name,
          child: item.children,
          value: item.value
        }
      })
      const productOption = {
        legend: {
          data: productName
        },
        series: [
          {
            type: 'pie',
            data: productValue
          }
        ]
      }
      this.myChart.setOption(productOption)
    },
    screenAdapter () {
      const titleFontSize = this.$refs.product.offsetWidth / 100 * 3.6
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: titleFontSize
          }
        }
      }
      this.myChart.setOption(adapterOption)
      this.myChart.resize()
    },
    changeProductData (flag) {
      if (flag) {
        if (this.index === 2) {
          return 0
        } else {
          this.setData(++this.index)
        }
      } else {
        if (this.index === 0) {
          return 0
        } else {
          this.setData(--this.index)
        }
      }
    },
    changeShowLine1 () {
      this.changeShowProduct(2)
      this.$router.go(-1)
    }
  },
  mounted () {
    this.initData()
    this.getData()
    window.addEventListener('resize', this.screenAdapter)
    this.myChart.on('click', (params) => {
      const childData = params.data.child
      const productName1 = childData.map(item => item.name)
      const productValue1 = childData.map(item => {
        return {
          name: item.name,
          value: item.value
        }
      })
      const productOption = {
        legend: {
          data: productName1
        },
        series: [
          {
            type: 'pie',
            data: productValue1
          }
        ]
      }
      this.myChart.setOption(productOption)
    })
    this.$refs.box.addEventListener('dblclick', () => {
      this.setData(this.index)
    })
  },
  destroyed () {
    window.removeEventListener('resize', this.screenAdapter)
  },
  computed: {
    ...mapState(['showProduct', 'theme'])
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
div:nth-child(2){
  transform-origin: top left;
}
.leftBox{
  position: absolute;
  top: 50%;
  left: 0;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-image: url(@/assets/img/按钮_箭头向左.png);
  background-repeat: no-repeat;
  background-position: center center;
}
.rightBox{
  position: absolute;
  top: 50%;
  right: 0;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-image: url(@/assets/img/按钮-箭头向右.png);
  background-repeat: no-repeat;
  background-position: center center;
}
// div:nth-child(2)::before{
//   content: '';
//   position: absolute;
//   top: 50%;
//   left: 5%;
//   transform: rotate(45deg);
//   border-width: 20px;
//   border-style: solid;
//   border-color: transparent transparent lightcoral lightcoral;
//   z-index: 1;
// }
// div:nth-child(2)::after{
//   content: '';
//   position: absolute;
//   top: 50%;
//   right: 5%;
//   transform: rotate(225deg);
//   border-width: 20px;
//   border-style: solid;
//   border-color: transparent transparent lightcoral lightcoral;
//   z-index: 1;
// }
</style>

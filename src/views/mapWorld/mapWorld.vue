<template>
  <div>
    <div id="cesiumContainer"></div>
    <div class="rigth-menu">
      <!-- <div class="menu-item" @click="drawPoint">画点</div>
      <div class="menu-item" @click="drawPolygon">画面</div>
      <div class="menu-item" @click="drawLineString">画线</div>
      <div class="menu-item" @click="drawPoint">画圆</div> -->
    </div>

  </div>

</template>

<script>
import 'cesium/Build/Cesium/Widgets/widgets.css'
import * as Cesium from 'Cesium'
export default {
  data () {
    return {
      removeImageryLayers: []
    }
  },
  mounted () {
    const viewer = new Cesium.Viewer('cesiumContainer', {
      animation: false, // 是否显示动画控件
      homeButton: true, // 是否显示home键
      geocoder: false, // 是否显示地名查找控件        如果设置为true，则无法查询
      baseLayerPicker: false, // 是否显示图层选择控件
      timeline: false, // 是否显示时间线控件
      fullscreenButton: true, // 是否全屏显示
      scene3DOnly: true, // 如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
      infoBox: true, // 是否显示点击要素之后显示的信息
      sceneModePicker: false, // 是否显示投影方式控件  三维/二维
      navigationInstructionsInitiallyVisible: false,
      navigationHelpButton: false, // 是否显示帮助信息控件
      selectionIndicator: false, // 是否显示指示器组件
      // 加载谷歌卫星影像
      imageryProvider: new Cesium.UrlTemplateImageryProvider({ url: 'http://mt1.google.cn/vt/lyrs=s&hl=zh-CN&x={x}&y={y}&z={z}&s=Gali' })
    })
    viewer._cesiumWidget._creditContainer.style.display = 'none' //	去除版权信息
    const tileSet = new Cesium.Cesium3DTileset({
      // url: publicPath+'temporary/Production_5/Scene/Production_5.json',
      url: '../../../test.json',
      maximumScreenSpaceError: 1, // Temporary workaround for low memory mobile devices - Increase maximum error to 8.
      maximumNumberOfLoadedTiles: 1000
    })

    // var viewer = new Cesium.Viewer('cesiumContainer', {
    //   animation: true, // 是否显示动画控件
    //   baseLayerPicker: false, // 是否显示图层选择控件
    //   geocoder: true, // 是否显示地名查找控件
    //   timeline: false, // 是否显示时间线控件
    //   sceneModePicker: true, // 是否显示投影方式控件
    //   navigationHelpButton: false, // 是否显示帮助信息控件
    //   infoBox: true, // 是否显示点击要素之后显示的信息
    //   imageryProvider: new Cesium.WebMapTileServiceImageryProvider({
    //     url: 'http://t0.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=dc0808bdfa2766725788d4effa1ec2cd',
    //     layer: 'tdtBasicLayer',
    //     style: 'default',
    //     format: 'image/jpeg',
    //     tileMatrixSetID: 'GoogleMapsCompatible',
    //     show: false
    //   })
    // })
  },
  methods: {

  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
#cesiumContainer {
  width: 100%;
  height: 100%;
}
.cesium-viewer-bottom,
.cesium-viewer .cesium-widget-credits {
  display: none;
}
.rigth-menu {
  display: flex;
  flex-direction: column;
  position: absolute;
  justify-content: center;
  align-items: center;
  right: 20px;
  bottom: 20px;
  z-index: 99;
  color: #ffffff;
  flex-wrap: wrap-reverse;
}
.menu-item {
  background: rgba(0, 0, 0, 0.5);
  padding: 20px;
  margin-top: 30px;
}
</style>

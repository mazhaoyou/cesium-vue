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
let viewer = null
export default {
  data () {
    return {
      removeImageryLayers: [],
      czml: [{
        id: 'document',
        name: 'box',
        version: '1.0'
      }, {
        id: 'shape2',
        name: 'Red box with black outline',
        position: {
          cartographicDegrees: [-107.0, 40.0, 300000.0]
        },
        box: {
          dimensions: {
            cartesian: [400000.0, 300000.0, 500000.0]
          },
          material: {
            solidColor: {
              color: {
                rgba: [255, 0, 0, 128]
              }
            }
          },
          outline: true,
          outlineColor: {
            rgba: [0, 0, 0, 255]
          }
        }
      }]
    }
  },
  created () {
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      viewer = new Cesium.Viewer('cesiumContainer')
      const initialPosition = new Cesium.Cartesian3.fromDegrees(116.326512, 39.972485, 1000) /* eslint-disable */
      var homeCameraView = { destination: initialPosition }

      let _this = this
      viewer.dataSources.removeAll() // 删除之前所有引用的数据源
      //   viewer.dataSources.add(Cesium.CzmlDataSource.load('../static/simple.czml')).then(function (dataSource) {
      //     viewer.trackedEntity = dataSource.entities.getById('Satellite/ISS')
      //   })
      viewer.dataSources.removeAll() // 删除之前所有引用的数据源

      var dataSourcePromise = Cesium.CzmlDataSource.load("static/simple.czml")
      viewer.dataSources.add(dataSourcePromise)
      viewer.zoomTo(dataSourcePromise)
      viewer.scene.camera.setView(homeCameraView);

    }
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

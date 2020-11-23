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
      removeImageryLayers: []
    }
  },
  mounted () {
    viewer = new Cesium.Viewer('cesiumContainer', {
      terrainProvider: Cesium.createWorldTerrain()
    })

    viewer.scene.primitives.add(Cesium.createOsmBuildings())

    viewer.scene.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(116.326512, 39.972485, 100),
      orientation: {
        heading: Cesium.Math.toRadians(20),
        pitch: Cesium.Math.toRadians(-20)
      }
    })
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

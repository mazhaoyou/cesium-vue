<template>
  <div>

    <div id="cesiumContainer"></div>
    <div class="rigth-menu">
      <img src="../../assets/weixin.png" alt="">
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
      removeImageryLayers: [],
      viewer: ''
    }
  },
  mounted () {
    var viewer = new Cesium.Viewer('cesiumContainer')
    var scene = viewer.scene
    var position = Cesium.Cartesian3.fromDegrees(116.326512, 39.972485, 0.0)

    var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(
      Cesium.Cartesian3.fromDegrees(position))
    // var model = scene.primitives.add(Cesium.Model.fromGltf({
    //   url: '../../../data/CesiumAir/Cesium_Air.glb',
    //   modelMatrix: modelMatrix,
    //   scale: 200.0
    // }))
    var heading = Cesium.Math.toRadians(135)
    var pitch = 0
    var roll = 0
    var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll)
    var orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr)

    var entity = viewer.entities.add({
      position: position,
      orientation: orientation,
      model: {
        uri: '../../../CesiumMan/Cesium_Man.gltf',
        minimumPixelSize: 128,
        maximumScale: 20000
      }
    })
    viewer.trackedEntity = entity
    // var model = scene.primitives.add(Cesium.Model.fromGltf({
    //   url: '../../../CesiumMan/Cesium_Man.gltf', // 模型文件相对路径
    //   modelMatrix: modelMatrix,
    //   scale: 0.001// 调整模型在地图中的大小
    // }))
    // viewer.camera.flyTo({ // 设置视角
    //   destination: Cesium.Cartesian3.fromDegrees(116.326512, 39.972485, 1000.0)
    // })

    // Cesium.when(model.readyPromise).then(function (model) {
    //   model.activeAnimations.addAll({
    //     multiplier: 0.5
    //   })
    // }).otherwise(function (error) {
    //   console.log(error)
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

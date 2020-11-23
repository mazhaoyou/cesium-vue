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
  created () {
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      viewer = new Cesium.Viewer('cesiumContainer', {
        // baselLayerPicker: false,
        // homeButton: false,
        // timeline: false,
        // animation: false,
        // scene3DOnly: true
      })
      const initialPosition = new Cesium.Cartesian3.fromDegrees(116.326512, 39.972485, 1000) /* eslint-disable */
      var homeCameraView = { destination: initialPosition }
      //   viewer.dataSources.add(Cesium.GeoJsonDataSource.load('../../data/simplestyles.geojson', {
      //     stroke: Cesium.Color.HOTPINK,
      //     fill: Cesium.Color.PINK.withAlpha(0.5),
      //     strokeWidth: 3
      //   }));
      //   viewer.scene.camera.setView(homeCameraView);
      //贴出部分代码
      var promise = Cesium.GeoJsonDataSource.load('../../../test.json');
      promise.then(function (dataSource) {
        viewer.dataSources.add(dataSource);
        var entities = dataSource.entities.values;
        var colorHash = {};
        for (var i = 0; i < entities.length; i++) {
          var entity = entities[i];
          var name = entity.name;
          var color = colorHash[name];
          if (!color) {
            color = Cesium.Color.fromRandom({
              alpha: 1.0
            });
            colorHash[name] = color;
          }
          entity.polygon.material = color;
          entity.polygon.outline = false;
          entity.polygon.extrudedHeight = 5000.0;
        }
      });
      viewer.flyTo(promise);
      //viewer.zoomTo(promise)

      // var dataSourcePromise = Cesium.CzmlDataSource.load(this.czml)
      // viewer.dataSources.add(dataSourcePromise)
      // viewer.zoomTo(dataSourcePromise)
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

<template>
  <div>
    <div id="cesiumContainer"></div>
    <div class="rigth-menu">
      <div class="menu-item" @click="drawPoint">画点</div>
      <div class="menu-item" @click="drawPolygon">画面</div>
      <div class="menu-item" @click="drawLineString">画线</div>
      <div class="menu-item" @click="drawPoint">画圆</div>
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
    }
  },
  mounted () {
    /* eslint no-new: */
    // var url = 'http://mt1.google.cn/vt/lyrs=s&hl=zh-CN&x={x}&y={y}&z={z}&s=Gali'
    // var Google = new Cesium.UrlTemplateImageryProvider({ url: url })

    viewer = new Cesium.Viewer('cesiumContainer', {
      baselLayerPicker: false,
      homeButton: false,
      timeline: false,
      animation: false,
      scene3DOnly: true
    })
    // var terrain = new Cesium.createWorldTerrain({
    //   requestWaterMask: true,
    //   requestVertexNormals: true
    // })
    // viewer.terrainProvider = terrain// 加入世界地形图

    const initialPosition = new Cesium.Cartesian3.fromDegrees(116.326512, 39.972485, 1000) /* eslint-disable */
    // let modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(initialPosition)
    // let model = viewer.scene.primitives.add(Cesium.Model.fromGltf({
    //   url: '../../models/GroundVehicle/GroundVehicle.glb',
    //   modelMatrix: modelMatrix,
    //   scale: 200.0
    // }));
    var homeCameraView = { destination: initialPosition }
    viewer.scene.camera.setView(homeCameraView);

    var entity = viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(116.326512, 39.972485, 1000),
      point: {
        color: Cesium.Color.RED,    //点位颜色
        pixelSize: 10                //像素点大小
      },
      label: {
        text: '数码大厦',
        font: '14pt Source Han Sans CN',    //字体样式
        fillColor: Cesium.Color.BLACK,        //字体颜色
        backgroundColor: Cesium.Color.AQUA,    //背景颜色
        showBackground: true,                //是否显示背景颜色
        style: Cesium.LabelStyle.FILL,        //label样式
        outlineWidth: 2,
        verticalOrigin: Cesium.VerticalOrigin.CENTER,//垂直位置
        horizontalOrigin: Cesium.HorizontalOrigin.LEFT,//水平位置
        pixelOffset: new Cesium.Cartesian2(10, 0)            //偏移
      }
    });
    viewer.zoomTo(entity);    //居中到该点
    viewer._cesiumWidget._creditContainer.style.display = 'none'
    // var promise = viewer.dataSources.add(Cesium.GeoJsonDataSource.load('../../assets/simplestyles.geojson', {
    //   stroke: Cesium.Color.BLACK,
    //   fill: Cesium.Color.RED,
    //   strokeWidth: 3,
    //   markerSymbol: '?'
    // }));
    // viewer.flyTo(promise);
    // var redBox = viewer.entities.add({
    //   name: 'Red box with black outline',
    //   position: Cesium.Cartesian3.fromDegrees(116.326512, 39.972485, 10000),
    //   box: {
    //     dimensions: new Cesium.Cartesian3(116.326512, 39.972485, 10000),
    //     material: Cesium.Color.RED.withAlpha(0.5),
    //     outline: true,
    //     outlineColor: Cesium.Color.BLACK
    //   }
    // });

    // viewer.zoomTo(viewer.entities);
  },
  methods: {
    drawPoint: function () {
      var _this = this;
      //坐标存储
      var positions = [];
      var wgs84_positions = [];
      for (var i = 0; i < positions.length; i++) {
        var wgs84_point = _this.Cartesian3_to_WGS84({
          x: positions[i].x,
          y: positions[i].y,
          z: positions[i].z
        });
        wgs84_positions.push(wgs84_point);
      }

      var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

      //单击鼠标左键画点
      handler.setInputAction(function (movement) {
        var cartesian = viewer.scene.camera.pickEllipsoid(movement.position, viewer.scene.globe.ellipsoid);
        positions.push(cartesian);
        viewer.entities.add({
          position: cartesian,
          point: {
            color: Cesium.Color.RED,
            pixelSize: 5,
            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
          }
        });
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

      //单击鼠标右键结束画点
      handler.setInputAction(function (movement) {
        handler.destroy();
        callback(positions);
      }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    },
    // 画线
    drawLineString: function () {
      var _this = this
      var PolyLinePrimitive = (function () {
        function _ (positions) {
          this.options = {
            polyline: {
              show: true,
              positions: [],
              material: Cesium.Color.RED,
              width: 3
            }
          }
          this.positions = positions
          this._init()
        }

        _.prototype._init = function () {
          var _self = this
          var _update = function () {
            return _self.positions
          }
          // 实时更新polyline.positions
          this.options.polyline.positions = new Cesium.CallbackProperty(_update, false)
          viewer.entities.add(this.options)
        }
        return _
      })()

      var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
      var positions = []
      var poly = undefined
      // 鼠标左键单击画点
      handler.setInputAction(function (movement) {
        var cartesian = viewer.scene.camera.pickEllipsoid(movement.position, viewer.scene.globe.ellipsoid)
        if (positions.length == 0) {
          positions.push(cartesian.clone())
        }
        positions.push(cartesian)
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
      // 鼠标移动
      handler.setInputAction(function (movement) {
        var cartesian = viewer.scene.camera.pickEllipsoid(movement.endPosition, viewer.scene.globe.ellipsoid)
        if (positions.length >= 2) {
          if (!Cesium.defined(poly)) {
            poly = new PolyLinePrimitive(positions)
          } else {
            if (cartesian != undefined) {
              positions.pop()
              cartesian.y += (1 + Math.random())
              positions.push(cartesian)
            }
          }
        }
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
      // 单击鼠标右键结束画线
      handler.setInputAction(function (movement) {
        handler.destroy()
        callback(positions)
      }, Cesium.ScreenSpaceEventType.RIGHT_CLICK)
    },
    drawPolygon: function () {
      var floatingPoint;
      var activePolygon;
      var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
      handler.setInputAction(function (click) {
        var position = viewer.scene.pickPosition(click.position);
        if (Cesium.defined(location.cartesian)) {
          var cartesian = location.cartesian;
          if (activeShapePoints.length === 0) {
            floatingPoint = creatPoint(cartesian);
            activeShapePoints.push(cartesian);
            var dynamicPositions = new Cesium.CallbackProperty(function () {
              return activeShapePoints;
            }, false);
            activePolygon = createPolygon(dynamicPositions);
          }
          activeShapePoints.push(cartesian);
          creatPoint(cartesian);
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
      handler.setInputAction(function (movement) {
        if (Cesium.defined(floatingPoint)) {
          if (Cesium.defined(location.endPosition)) {
            floatingPoint.position.setValue(location.endPosition);
            activeShapePoints.pop();
            activeShapePoints.push(location.endPosition);
          }
        }
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
      handler.setInputAction(function (movement) {
        handler.destroy();
        for (var i = 0; i < Points.length; i++) {
          viewer.entities.remove(Points[i]);
        }
        Points = [];
      }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
      function createPolygon (positionData) {
        var polygon;
        polygon = viewer.entities.add({
          name: 'polygon',
          positions: positionData,
          polygon: {
            hierarchy: positionData,
            perPositionHeight: true,
            material: Cesium.Color.RED.withAlpha(0.7),
            outline: true,
            outlineColor: Cesium.Color.YELLOW.withAlpha(1)
          }
        });
        return polygon;
      }
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

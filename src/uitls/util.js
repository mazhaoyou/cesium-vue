	var oneLayer;

	addOneLayer(name) {
	  oneLayer = this.viewer.imageryLayers.addImageryProvider(
	    new Cesium.WebMapServiceImageryProvider({
	      url: urlRoot, //图层地址
	      layers: name,
	      parameters: {
	        service: "WMS",
	        format: "image/png",
	        transparent: true
	      }
	    })
	  )
	}

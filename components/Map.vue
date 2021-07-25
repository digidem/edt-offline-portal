<template>
  <div id="mapa" class="map" :style="{ height }">
    <client-only>
      <MglMap
        :mapStyle="mapStyle"
        :accessToken="token"
        :center="center"
        :zoom="zoom"
        :minZoom="1"
        :maxZoom="19"
        :maxBounds="false"
        :attributionControl="false"
        @load="onMapLoaded"
      >
        <MglGeolocateControl ref="geolocateControl" position="top-right" :trackUserLocation="true" />
        <MglMarker
          v-for="marker in markers"
          :key="marker.id"
          :coordinates="marker.coords"
          @mouseenter="handleEnter"
        >
          <div slot="marker" class="marker">
            <span>
              <v-icon :color="marker.color" size="22">{{ marker.icon }}</v-icon>
            </span>
          </div>
          <MglPopup :offset="35" anchor="bottom" class="popup">
            <div class="caption">
              <h3>{{ marker.nome }}</h3>
              <g-image
                :alt="marker.nome"
                v-show="marker.imagem"
                :src="marker.imagem || ''"
              />
              <!-- <p>{{ marker.descricao }}</p> -->
              <!-- <v-icon
                v-for="category in marker.allCat"
                :color="category.color"
                :key="category.id"
                size="22"
                class="pl-2"
                >{{ category.icon }}</v-icon
              > -->
            </div>
          </MglPopup>
        </MglMarker>
        <!-- TODO: Remove if NATIVE_LANDS if false -->
        <MglGeojsonLayer
          sourceId="native_land"
          :source="nativeGeoJsonSource"
          layerId="layer_native_land"
          :layer="nativeGeoJsonlayer"
          @mousemove="layerHover"
          @mouseleave="layerLeave"
          @mousedown="layerClick"
        />
        <MglGeojsonLayer
          sourceId="native_land_names"
          :source="nativeGeoJsonSource"
          layerId="layer_native_land_name"
          :layer="nativeGeoJsonlayerName"
        />
        <MglGeojsonLayer
          sourceId="terra_balaio"
          :source="geoJsonSource"
          layerId="layer_balaio"
          :layer="geoJsonlayer"
        />
      </MglMap>
    </client-only>
  </div>
</template>

<script>
// import placeHelper from "@theme/place-category-helper";

export default {
  components: {
    MglGeojsonLayer: () => {
      if (process.client) {
        return import("vue-mapbox")
          .then(m => m.MglGeojsonLayer)
          .catch();
      }
    },
  },
  props: {
    places: { type: Array, default: [] },
    height: { type: String, default: "500px" },
    token: String,
  },
  data() {
    return {
      map: null,
      hoveredStateId: null,
      markers: [],
      //precisamos puxar do ssb -22.895717028291195, -45.838459009922474
      defaultCoord: [0.232306, -66.632219],
      maxBounds: [],
      zoom: 13,
      mapStyle: this.token
        ? "mapbox://styles/hiurequeiroz/ckrau98ov3haa19kygrezgvbg"
        : {
            version: 8,
            sources: {
              "simple-tiles": {
                type: "raster",
                tiles: [
                  `${this.tileServer ||
                    "http://api-mapa.balaio.org"}/{z}/{x}/{y}.jpeg`,
                ],
                tileSize: 256,
              },
            },
            layers: [
              {
                id: "simple-tiles",
                type: "raster",
                source: "simple-tiles",
                minzoom: 10,
                maxzoom: 16,
              },
            ],
          },
      nativeGeoJsonSource: {
        type: "geojson",
        data: "/geojson/territories.geojson",
        generateId: true,
      },
      nativeGeoJsonlayerName: {
        id: "layer_native_land_name",
        type: "symbol",
        layout: {
          "text-field": ["get", "Name"],
          "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
          "text-size": 16,
          // "text-halo-blur": 4,
          // "text-color": "#000"
        },
      },
      nativeGeoJsonlayer: {
        id: "layer_native_land",
        type: "fill",
        paint: {
          "fill-opacity": [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            0.9,
            0.4,
          ],
          "fill-color": ["get", "color"],
        },
      },
      geoJsonSource: {
        type: "geojson",
        data: "/geojson/ti_balaio.geojson",
      },
      geoJsonlayer: {
        id: "terra_balaio_layer",
        type: "line",
        paint: {
          "line-color": "red",
          "line-width": 4,
        },
      },
    };
  },
  mounted() {
    console.log('TILE SERVER', this.tileServer)
  },
  computed: {
    center() {
      return this.defaultCoord;
    },
  },
  methods: {
    onMapLoaded(map) {
      console.log("MAP LOADED", map);
    },
    handleEnter({ map, marker }) {
      // map.easeTo({ center: marker._lngLat, zoom: this.$static.metadata.maxZoom, offset: [0, 300] });
    },
    layerHover({ mapboxEvent, map }) {
      if (mapboxEvent.features.length > 0) {
        if (this.hoveredStateId) {
          map.setFeatureState(
            { source: "native_land", id: this.hoveredStateId },
            { hover: false }
          );
        }
        this.hoveredStateId = mapboxEvent.features[0].id;
        map.setFeatureState(
          { source: "native_land", id: this.hoveredStateId },
          { hover: true }
        );
      }
    },
    layerLeave({ mapboxEvent, map }) {
      if (this.hoveredStateId) {
        map.setFeatureState(
          { source: "native_land", id: this.hoveredStateId },
          { hover: false }
        );
      }
      this.hoveredStateId = null;
    },
    layerClick({ mapboxEvent }) {
      const url = mapboxEvent.features[0].properties.description;
      // const win = window.open(url, "_blank");
      // win.focus();
    },
  },
};
</script>
<style>
.map,
map {
  background: grey;
  width: 100%;
}
.marker {
  width: 0;
  height: 0;
}

.marker span {
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 30px;
  height: 30px;
  color: #000;
  background: #fff;
  border: solid 2px;
  border-radius: 0 70% 70%;
  box-shadow: 0 0 2px #000;
  cursor: pointer;
  transform-origin: 0 0;
  transform: rotateZ(-135deg);
}
.marker span * {
  transform: rotateZ(135deg);
}
.popup {
  z-index: 999;
}
.button {
  position: absolute;
  bottom: 50px;
  right: 45vw;
  left: 45vw;
  width: 45vw;
}
.z-max {
  z-index: 99;
}
</style>

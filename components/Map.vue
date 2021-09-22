<template>
  <div id="mapa" class="map" :style="{ height }">
    <client-only>
      <div :class="`py-15px text-center z-99 bg-red-500 flex justify-around`">
        <span :v-if="nativelands">{{
          territoryInfo || "Selecione um território"
        }}</span>
        <div>
          <button
            :class="
              `${nativelands ? 'bg-red-300' : 'bg-gray-100'} rounded py-1 px-2`
            "
            @click="toggleNative"
          >
            Histórico
          </button>
        </div>
      </div>
      <MglMap
        :mapStyle="mapStyle"
        :accessToken="accessToken"
        :center="center"
        :zoom="zoom"
        :minZoom="1"
        :maxZoom="17"
        :attributionControl="false"
        @load="onMapLoaded"
      >
        <!-- <MglGeolocateControl
          ref="geolocateControl"
          position="top-right"
          :trackUserLocation="true"
        /> -->
        <MglMarker
          v-for="(place, key) in places"
          :key="key"
          :color="getRandomColor()"
          :coordinates="[place.lon, place.lat]"
          @mouseenter="handleEnter"
        >
          <MglPopup :offset="35" anchor="bottom" class="popup">
            <div class="caption">
              <h3 class="font-bold">{{ place.nome }}</h3>
              <p v-if="place.familias">Famílias: {{ place.familias }}</p>
              <p v-if="place.etnias">Etnias: {{ place.etnias }}</p>
            </div>
          </MglPopup>
        </MglMarker>
        <!-- TODO: Remove if NATIVE_LANDS if false -->
        <MglGeojsonLayer
          v-if="nativelands"
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
          sourceId="terra_koatinemo"
          :source="geoJsonSource"
          layerId="layer_koatinemo"
          :layer="geoJsonlayer"
        />
        <MglGeojsonLayer
          sourceId="terra_itunaitata"
          :source="geoJsonSourceItuna"
          layerId="layer_itunaitata"
          :layer="geoJsonlayerItuna"
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
          .then((m) => m.MglGeojsonLayer)
          .catch();
      }
    },
    MglMarker: () => {
      if (process.client) {
        return import("vue-mapbox")
          .then((m) => m.MglMarker)
          .catch();
      }
    },
    MglPopup: () => {
      if (process.client) {
        return import("vue-mapbox")
          .then((m) => m.MglPopup)
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
      nativelands: true,
      map: null,
      hoveredStateId: null,
      territoryInfo: null,
      //precisamos puxar do ssb -22.895717028291195, -45.838459009922474
      defaultCoord: [-66.632219, 0.232306],
      maxBounds: [
        -66.90009833136597,
        0.1864650000058674,
        -66.39184866864048,
        0.43502700001310757,
      ],
      zoom: 1,
      currentZoom: this.zoom,
      offline: false,
      mapStyle: {
        version: 8,
        sources: {
          "simple-tiles": {
            type: "raster",
            tiles: [
              `${process.env.tileServer ||
                "http://localhost:3000"}/{z}/{x}/{y}.jpeg`,
            ],
            tileSize: 256,
            attribution: "",
          },
        },
        layers: [
          {
            id: "simple-tiles",
            type: "raster",
            source: "simple-tiles",
            minzoom: 1,
            maxzoom: 18,
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
        glyphs: "mapbox://fonts/mapbox/{fontstack}/{range}.pbf",
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
            0.7,
            0.2,
          ],
          "fill-color": ["get", "color"],
        },
      },
      geoJsonSourceItuna: {
        type: "geojson",
        data: "/geojson/ti_itunaitata.geojson",
      },
      geoJsonlayerItuna: {
        id: "terra_itunaitata_layer",
        type: "line",
        paint: {
          "line-color": "orange",
          "line-width": 4,
        },
      },
      geoJsonSource: {
        type: "geojson",
        data: "/geojson/ti_koatinemo.geojson",
      },
      geoJsonlayer: {
        id: "terra_koatinemo_layer",
        type: "line",
        paint: {
          "line-color": "red",
          "line-width": 4,
        },
      },
    };
  },
  mounted() {
    console.log("TOKEN", this.token);
  },
  computed: {
    center() {
      return this.defaultCoord;
    },
    accessToken() {
      return this.token || null;
    },
  },
  methods: {
    toggleNative() {
      this.nativelands = !this.nativelands;
    },
    onMapLoaded({ map }) {
      console.log("MAP LOADED", map);
      map.on("zoomend", (e) => {
        this.currentZoom = e.target.getZoom();
      });
    },
    handleEnter({ map, marker }) {
      map.easeTo({ center: marker._lngLat, zoom: 14, offset: [0, 50] });
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
      this.territoryInfo = mapboxEvent.features[0].properties.Name;
      // const win = window.open(url, "_blank");
      // win.focus();
    },
    getRandomColor() {
      var letters = "0123456789ABCDEF";
      var color = "#";
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
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

.z-max {
  z-index: 99;
}
</style>

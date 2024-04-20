<template>
  <div id="mapa" class="map" :style="{ height }">
    <client-only>
      <MglMap
        :map-style="mapStyle"
        :access-token="accessToken"
        :center="center"
        :zoom="zoom"
        :min-zoom="1"
        :max-zoom="17"
        :attribution-control="false"
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
      </MglMap>
    </client-only>
  </div>
</template>

<script>
// import getLocalUrl from "@/libs/getLocalUrl";
function getLocalUrl() {
  return "http://192.168.42.1";
}

export default {
  components: {
    MglMarker: () => {
      if (process.client) {
        return import("vue-mapbox")
          .then((m) => m.MglMarker)
          .catch((error) =>
            console.error("Failed to load MglMarker component:", error)
          );
      }
    },
    MglPopup: () => {
      if (process.client) {
        return import("vue-mapbox")
          .then((m) => m.MglPopup)
          .catch((error) =>
            console.error("Failed to load MglPopup component:", error)
          );
      }
    },
  },
  props: {
    places: { type: Array, default: () => [] },
    height: { type: String, default: "500px" },
  },
  data() {
    return {
      token: null,
      nativelands: true,
      map: null,
      hoveredStateId: null,
      territoryInfo: null,
      // precisamos puxar do ssb -22.895717028291195, -45.838459009922474
      defaultCoord: [-45.83, -22.89],
      zoom: 10,
      currentZoom: this.zoom,
      mapeoObs: [],
    };
  },
  computed: {
    mapStyle() {
      const url = getLocalUrl();
      return (
        process.env.VUE_APP_OFFLINE_MAP_STYLE ||
        `${url}:8085/styles/terrastories-map/style.json`
      );
    },
    center() {
      return this.defaultCoord;
    },
    accessToken() {
      return (
        this.token ||
        process.env.VUE_APP_MAPBOX_DEFAULT_TOKEN ||
        "pk.eyJ1IjoibHVhbmRybyIsImEiOiJjanY2djRpdnkwOWdqM3lwZzVuaGIxa3VsIn0.jamcK2t2I1j3TXkUQFIsjQ"
      );
    },
  },
  mounted() {
    this.getMapeoObs();
  },
  methods: {
    async getMapeoObs() {
      const url = getLocalUrl();
      try {
        const res = await this.$axios(`${url}:3000/mapeo`);
        console.log("res", res);
        this.mapeoObs = res;
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
      }
    },
    toggleNative() {
      this.nativelands = !this.nativelands;
    },
    onMapLoaded({ map }) {
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
      // const url = mapboxEvent.features[0].properties.description
      this.territoryInfo = mapboxEvent.features[0].properties.Name;
      // const win = window.open(url, "_blank");
      // win.focus();
    },
    getRandomColor() {
      // This is a placeholder for a more sophisticated color generation logic
      // that ensures better contrast. You might want to replace this with
      // an actual implementation that suits your needs.
      const hue = Math.floor(Math.random() * 360);
      return `hsl(${hue}, 100%, 50%)`;
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

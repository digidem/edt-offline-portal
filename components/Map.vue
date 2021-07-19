<template>
  <div id="mapa" class="map" :style="{ height }"></div>
</template>

<script>
// import placeHelper from "@theme/place-category-helper";

export default {
  props: {
    places: { type: Array, default: [] },
    height: { type: String, default: "500px" },
    token: String,
  },
  data() {
    return {
      map: null,
      hoveredStateId: null,
      //precisamos puxar do ssb
      defaultCoord: [-47.46, -14.06],
    };
  },
  mounted() {
    // this.map = new window.mapboxgl.Map(this.mapStyle);
    const mapboxgl = require("mapbox-gl");
    this.token &&
      new mapboxgl.Map({
        accessToken: this.token,
        container: "mapa", // <div id="map"></div>
        style: "mapbox://styles/mapbox/streets-v9", // default style
        center: [-21.9270884, 64.1436456], // starting position as [lng, lat]
        zoom: 13,
      });
  },
  computed: {
    center() {
      return this.defaultCoord;
    },
    mapStyle() {},
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

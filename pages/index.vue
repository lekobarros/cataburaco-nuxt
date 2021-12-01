<template>
  <div id="viewDiv"></div>
</template>

<script>
import { loadModules } from 'esri-loader';
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState('global', ['listEvents']),
  },
  mounted() {
    loadModules(['esri/config', 'esri/Map', 'esri/views/MapView', 'esri/Graphic', 'esri/layers/GraphicsLayer'], {
      // use a specific version instead of latest 4.x
      url: 'https://js.arcgis.com/4.21/',
    }).then(([esriConfig, Map, MapView, Graphic, GraphicsLayer]) => {
      esriConfig.apiKey = process.env.ARCGIS_APIKEY

      const map = new Map({
        basemap: 'arcgis-topographic',
      });

      const view = new MapView({
        map: map,
        center: [-44.199029, -19.954542],
        zoom: 16,
        container: 'viewDiv',
      });

      const graphicsLayer = new GraphicsLayer();

      map.add(graphicsLayer);

      // Push PUC Minas
      let point = {
        type: 'point',
        longitude: -44.199029,
        latitude: -19.954542,
      };

      const simpleMarkerSymbol = {
        type: 'simple-marker',
        color: [205, 50, 200],
        outline: {
          color: [205, 50, 200],
          width: 10,
        },
      };

      const popupTemplate = {
        title: '{Name}',
        content: '{Description}',
      };

      const attributes = {
        Name: 'PUC Minas',
        Description: 'Universidade de Betim',
      };

      const pointGraphic = new Graphic({
        geometry: point,
        symbol: simpleMarkerSymbol,
        attributes,
        popupTemplate,
      });

      graphicsLayer.add(pointGraphic);

      // map with points
      this.listEvents.forEach((element) => {
        const point = {
          type: 'point',
          longitude: element.geoPos.longitude,
          latitude: element.geoPos.latitude,
        };

        const simpleMarkerSymbol = {
          type: 'simple-marker',
          color: [226, 119, 40],
          outline: {
            color: [255, 255, 255],
            width: 1,
          },
        };

        const popupTemplate = {
          title: '{Name}',
          content: '{Name} - {Description}',
        };

        const attributes = {
          Name: element.name,
          Description: element.observation ?? 'Sem descrição',
        };

        const pointGraphic = new Graphic({
          geometry: point,
          symbol: simpleMarkerSymbol,
          attributes,
          popupTemplate,
        });

        graphicsLayer.add(pointGraphic);
      });
    });
  },
};
</script>

<style scoped>
@import url('https://js.arcgis.com/4.2/esri/css/main.css');

#viewDiv {
  position: absolute;
  inset: 0 0 0 0;
}
</style>
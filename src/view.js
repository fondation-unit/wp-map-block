/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any
 * JavaScript running in the front-end, then you should delete this file and remove
 * the `viewScript` property from `block.json`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

import L from 'leaflet';
import france from './france.json';


const map = L.map('map-div', {
  attributionControl: false,
  scrollWheelZoom: false,
}).setView([46.642, 2.758], 6);


const mapStyle = {
  fillColor: '#8ea18c',
  fillOpacity: 1,
  color: '#ccdbc8',
  weight: 1
}

L.geoJSON(france, { style: mapStyle }).addTo(map);

const customIcon = L.icon({
  iconUrl: window.mapViewData.iconUrl,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  popupAnchor: [0, -12]
});

function onEachFeature(feature, layer) {
  if (feature.properties && feature.properties.popupContent) {
    layer.bindPopup(feature.properties.popupContent);
  }
}

function setGeojsonData(name, popupContent, latitude, longitude) {
  // Parse latitude and longitude to floats
  const lat = parseFloat(latitude.trim());
  const lng = parseFloat(longitude.trim());

  return {
    "type": "Feature",
    "properties": {
      "name": name,
      "amenity": name,
      "popupContent": popupContent
    },
    "geometry": {
      "type": "Point",
      "coordinates": [lng, lat] // GeoJSON coordinates uses [longitude, latitude] format
    }
  };
}

const geojsonData = window.mapViewData.geojsonData;
if (geojsonData) {
  geojsonData.map(data => {
    const geoData = setGeojsonData(data.name, data.name, data.latitude, data.longitude);

    L.geoJSON(geoData, {
      pointToLayer: function (feature, latlng) {
        return L.marker(latlng, { icon: customIcon });
      },
      onEachFeature: onEachFeature
    }).addTo(map);
  })
}

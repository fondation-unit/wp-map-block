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
  'color': '#8ea18c',
  'fillOpacity': '1',
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

function setGeojsonData(name, popupContent, coords) {
  const coordinates = coords.map(coord => parseFloat(coord.trim()));

  return {
    "type": "Feature",
    "properties": {
      "name": name,
      "amenity": name,
      "popupContent": popupContent
    },
    "geometry": {
      "type": "Point",
      "coordinates": coordinates
    }
  };
}


function fetchAndSetMap(uri, map) {
  fetch(uri, {
    method: "GET",
    headers: new Headers(),
    mode: "cors",
    cache: "default",
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      json.map(data => {
        const geojsonData = setGeojsonData(data.name, data.name, data.coords);

        L.geoJSON(geojsonData, {
          pointToLayer: function (feature, latlng) {
            return L.marker(latlng, { icon: customIcon });
          },
          onEachFeature: onEachFeature
        }).addTo(map);
      });
    });
}

// Usage data
fetchAndSetMap(window.mapViewData.dataUrl, map);

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

import * as L from 'leaflet';
import france from './france.json';


function gCustomIcon(marker: number) {
  if (!window.mapViewData) {
    console.error("window.mapViewData undefined.");
    return;
  }

  return L.icon({
    iconUrl: window.mapViewData.iconUrl + 'marker-' + marker + '.png',
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -12]
  });
}

function onEachFeature(feature: GeoJSON.Feature, layer: any) {
  if (feature.properties && feature.properties.popupContent) {
    layer.bindPopup(feature.properties.popupContent);
  }
}

function setGeojsonData(name: any, popupContent: any, latitude: any, longitude: any) {
  // Parse latitude and longitude to floats.
  const lat = parseFloat(latitude.trim());
  const lng = parseFloat(longitude.trim());

  return {
    type: "Feature",
    properties: {
      name: name,
      amenity: name,
      popupContent: popupContent,
      marker: 1 // Add a default marker in case of.
    },
    geometry: {
      type: "Point",
      coordinates: [lng, lat]
    }
  };
}

// Initialize.
const franceData: any = france;

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

const geojsonData = window.mapViewData.geojsonData;

L.geoJSON(franceData, { style: mapStyle }).addTo(map);

if (geojsonData && Array.isArray(geojsonData)) {
  geojsonData.forEach((data) => {
    // Convert the object to GeoJSON Feature format.
    const geoData = setGeojsonData(
      data.name, // Popup name
      data.name, // Popup content
      data.latitude,
      data.longitude
    ) as any;

    // Add GeoJSON data to the map.
    L.geoJSON(geoData, {
      pointToLayer: function (feature: GeoJSON.Feature, latlng: L.LatLng) {
        // Use custom icon based on the marker value.
        return L.marker(latlng, {
          icon: gCustomIcon(data.marker > 0 ? parseInt(data.marker) : 1)
        });
      },
      onEachFeature: onEachFeature
    }).addTo(map);
  });
}

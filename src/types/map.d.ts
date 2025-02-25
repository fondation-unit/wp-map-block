interface MapData {
    name: string;
    popupContent: string;
    latitude: string | number;
    longitude: string | number;
}

interface GeoJSONData {
    type: "FeatureCollection";
    features: GeoJSON.Feature[];
}

interface Window {
    mapViewData: {
        iconUrl: string;
        geojsonData: GeoJSONData;
    };
}

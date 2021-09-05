import React, { useRef, useEffect } from "react";
import { Map } from "maplibre-gl";
import { MapboxLayer } from "@deck.gl/mapbox";
import { ArcLayer } from "@deck.gl/layers";
import FlowMapLayer from "@flowmap.gl/core";
import "maplibre-gl/dist/maplibre-gl.css";
import "./Map.css";

const MapGL = () => {
  const mapContainer = useRef();

  useEffect(() => {
    const map = new Map({
      container: mapContainer.current,
      style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
    });

    map.on("load", () => {
      map.addLayer(
        new MapboxLayer({
          id: "deckgl-arc",
          type: ArcLayer,
          data: [
            {
              source: [-122.3998664, 37.7883697],
              target: [-122.400068, 37.7900503],
            },
          ],
          getSourcePosition: (d) => d.source,
          getTargetPosition: (d) => d.target,
          getSourceColor: [255, 208, 0],
          getTargetColor: [0, 128, 255],
          getWidth: 8,
        })
      );

      map.addLayer(
        new MapboxLayer({
          id: "deckgl-flow",
          type: FlowMapLayer,
          locations: [
            {
              id: 1,
              name: "New York",
              lat: 40.713543,
              lon: -74.011219,
            },
            { id: 2, name: "London", lat: 51.507425, lon: -0.127738 },
            {
              id: 3,
              name: "Rio de Janeiro",
              lat: -22.906241,
              lon: -43.180244,
            },
          ],
          flows: [
            { origin: 1, dest: 2, count: 42 },
            { origin: 2, dest: 1, count: 51 },
            { origin: 3, dest: 1, count: 50 },
            { origin: 2, dest: 3, count: 40 },
            { origin: 1, dest: 3, count: 22 },
            { origin: 3, dest: 2, count: 42 },
          ],
          getFlowMagnitude: (flow) => flow.count || 0,
          getFlowOriginId: (flow) => flow.origin,
          getFlowDestId: (flow) => flow.dest,
          getLocationId: (loc) => loc.id,
          getLocationCentroid: (location) => [location.lon, location.lat],
        })
      );
    });
  }, [mapContainer]);

  return <div ref={mapContainer} className="Map" />;
};

export default MapGL;

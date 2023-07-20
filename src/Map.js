import React, { useEffect, useState, useRef } from "react";
import { randomCircumferencePoint } from "./randomLocations";
import { Select } from "antd";
import "antd/dist/antd.css";
import mIcon from "./imgs/mIcon.png";
import mIcon2 from "./imgs/mIcon2.png";
import customStyles from "./customStyles";
import mcOptions from "./mcOptions";
import PopupContent from "./PopupContent";
import "overlapping-marker-spiderfier";
import MarkerClusterer from "@google/markerclustererplus";
const { Option } = Select;
const spiderConfig = {
  circleFootSeparation: 50,
  spiralLengthFacto: 30,
  keepSpiderfied: true,
  nearbyDistance: 50,
  legWeight: 2,
  spiderfiedShadowColor: false, //Set the color of the shadow underneath the spiderfied markers, or to false to disable
  markersWontMove: true, // we promise not to move any markers, allowing optimizations
  markersWontHide: true, // we promise not to change visibility of any markers, allowing optimizations
  basicFormatEvents: true // allow the library to skip calculating advanced formatting information
};
function MapApp(props) {
  /** DOM container where the map canvas gets rendered. */
  const mapContainer = useRef();
  const googleMap = useRef();
  const markersRefs = useRef({});
  const markerCluster = useRef();
  const infoWindowRef = useRef();
  const popRef = useRef();

  const [custStyle, setCustStyle] = useState("default");
  const [content, setContent] = useState("");

  const copyLocations = [...props.locations];
  const locMap = new Map();
  const lines = [];

  // add offset for same coords
  // copyLocations.forEach(loc => {
  //   let mapKey = loc.geo.lat+','+loc.geo.lng;
  // if (locMap.has(mapKey)) {
  //   locMap.set(mapKey,locMap.get(mapKey)+1);
  //   if(locMap.get(mapKey)>1) {
  //     let latLng = {lat:loc.geo.lat, lng:loc.geo.lng};
  //     loc.geo = randomCircumferencePoint(latLng,100);
  //     lines.push([latLng,loc.geo]);
  //   }
  // } else {
  //   locMap.set(mapKey,1);
  // }
  // });

  function drawLines(linesArr, map) {
    linesArr.forEach(lineArr => {
      let linePath = new window.google.maps.Polyline({
        path: lineArr,
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2
      });
      linePath.setMap(map);
    });
  }

  function handleChange(value) {
    console.log(`selected ${value}`);
    setCustStyle(value);
    googleMap.current.setOptions({ styles: customStyles[value] });
  }
  useEffect(() => {
    /** Create new google map. */
    googleMap.current = new window.google.maps.Map(mapContainer.current, {
      zoom: props.zoom,
      center: props.center
    });

    const markerSpiderfier = new window.OverlappingMarkerSpiderfier(
      googleMap.current,
      spiderConfig
    );
    infoWindowRef.current = new window.google.maps.InfoWindow({
      content: '<div id="infoWindow" />'
    });
    //init the default map style
    googleMap.current.setOptions({ styles: customStyles[custStyle] });
    // copyLocations.forEach(loc => {
    props.locations.forEach(loc => {
      markersRefs.current[loc.id] = new window.google.maps.Marker({
        position: { lat: loc.geo.lat, lng: loc.geo.lng }
        // icon: mIcon2 //custom icon for the marker
      });
      markersRefs.current[loc.id].addListener("click", e => {
        setContent(loc.id);
        infoWindowRef.current.setContent(popRef.current);
        infoWindowRef.current.open(
          googleMap.current,
          markersRefs.current[loc.id]
        );
      });
      markerSpiderfier.addMarker(markersRefs.current[loc.id]);
    });
    // drawLines(lines,googleMap.current);
    markerCluster.current = new MarkerClusterer(
      googleMap.current,
      Object.values(markersRefs.current),
      mcOptions
    );
  }, []);

  // reference to the DOM element where the map will be rendered
  return (
    <div id="mapApp">
      <div id="styleChanger">
        <Select
          defaultValue="default"
          style={{ width: 120 }}
          onChange={handleChange}
        >
          <Option value="default">Default</Option>
          <Option value="silver">Silver</Option>
          <Option value="dark">Dark Mode</Option>
          <Option value="retro">Retro</Option>
          <Option value="night">Night</Option>
        </Select>
      </div>
      <div ref={mapContainer} style={{ height: "100vh", width: "100vw" }} />
      <div style={{ display: "none" }}>
        <div ref={popRef}>
          <PopupContent styleTitle={custStyle} content={content} />
        </div>
      </div>
    </div>
  );
}

export default MapApp;

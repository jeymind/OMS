import React from "react";
import "./styles.css";
import Map from "./Map";
import mockData from "./mockData";

export default function App() {
  return (
    <div className="App">
      <Map
        zoom={3}
        center={{
          lat: -28.024,
          lng: 140.887
        }}
        locations={mockData}
      />
    </div>
  );
}

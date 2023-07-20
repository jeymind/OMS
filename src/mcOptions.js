import h30 from "./imgs/heart30.png";
import h40 from "./imgs/heart40.png";
import h50 from "./imgs/heart50.png";

const clusterStyles = [
  {
    url: h30,
    height: 26,
    width: 30,
    anchor: [4, 0],
    textColor: "#ff00ff",
    textSize: 10
  },
  {
    url: h40,
    height: 35,
    width: 40,
    anchor: [8, 0],
    textColor: "#ff0000",
    textSize: 11
  },
  {
    url: h50,
    width: 50,
    height: 44,
    anchor: [12, 0],
    textSize: 12
  }
];

const mcOptions = {
  gridSize: 50,
  styles: clusterStyles,
  maxZoom: 15
};

export default mcOptions;

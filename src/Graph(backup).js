import React, { useRef, useEffect, Fragment, useState } from "react";
import "./style.css";
import Plotly from "plotly.js";
import parsedDummy from "./sample.json";
import axios from "axios";

let shippedValues = {};
function parseValues(data = parsedDummy) {
  let values = {};
  // sample result =  {"engine_load" : [3.0,4,4,3,3,] ,"id": [1,2,3]}
  for (let dataPoints of data) {
    for (let data in dataPoints) {
      if (values[data]) {
        values[data].push(dataPoints[data]);
      } else {
        let temp = [];
        temp.push(dataPoints[data]);
        values[data] = temp;
      }
    }
  }
  return values;
}
const getFaults = async () => {
  const BASE_URL = "https://faultdetection.herokuapp.com/api/v1/get/";
  try {
    //TODO remove if not live
    // const res = await fetch(BASE_URL,{
    //   method:"GET",
    //   mode: 'no-cors' // 'cors' by default
    // });
    //const res = await axios.get(BASE_URL);
    //const { data } = await res;
    const valueArray = parseValues();
    shippedValues = { ...shippedValues, ...valueArray };
    return shippedValues;
  } catch (e) {
    console.log(e);
  }
};

function Graph({ type, x_values, y_values, range }) {
  const myDiv = useRef();

  let data = [
    {
      x: x_values,
      y: y_values.map((item) => Number(item)),
      mode: "lines",
      line: { color: "#80CAF6" },
    },
  ];
  useEffect(async () => {
    Plotly.newPlot(myDiv.current, data);
    console.log("x and y of", type, data[0].x, data[0].y);
  }, []);

  let avg = y_values.reduce((a, b) => a + b, 0) / y_values.length;

  return (
    <Fragment>
      <div id={type} className="title">
        {type}
      </div>
      <div id="myDiv" ref={myDiv} className="graph" />
      {avg < range[0] || avg > range[1] ? (
        <div className="red"> your {type} is at risk</div>
      ) : (
        <div className="green"> your {type} is good</div>
      )}
    </Fragment>
  );
}

const Graphs = () => {
  let values;

  let interest = {
    speed: [30, 100],
    engine_load: [45, 75],
    throttle_pos: [3.42, 9.85],
    intake_pressure: [5, 10],
    coolant_temp: [160, 190],
    fuel_pressure: [45, 55],
  };

  const renderGraphs = () => {
    let temp = [];
    for (let value in nowValue) {
      console.log(value);
      temp.push(value);
    }

    return temp.map((value) =>
      interest[value] ? (
        <Graph
          y_values={nowValue[value]}
          key={value}
          x_values={nowValue["time"]}
          type={value}
          range={interest[value]}
        />
      ) : null
    );
  };

  let [nowValue, SetNowValue] = useState();

  useEffect(async () => {
    values = await getFaults();
    SetNowValue(values);
  }, []);
  return (
    <Fragment>
      <br/>
      {nowValue ? (
        <Fragment>{renderGraphs()}</Fragment>
      ) : (
        <div className="loader"></div>
      )}
    </Fragment>
  );
};

export default Graphs;


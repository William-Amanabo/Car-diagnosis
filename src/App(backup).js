import React, { useRef, useEffect, Fragment, useState } from 'react';
import './style.css';
import Plotly from 'plotly.js';
import parsedDummy from './sample.json'

let shippedValues = {}
function parseValues (data = parsedDummy) {
  let values =  {}
  // sample result =  {"engine_load" : [3.0,4,4,3,3,] ,"id": [1,2,3]}
  for(let dataPoints of data ){
      for (let data in dataPoints){
        if (values[data] )
        {
          values[data].push(dataPoints[data])
        }
        else {
            let temp =  []
            temp.push(dataPoints[data])
            values[data] =  temp
      }

  }

}
return values

}
const getFaults =  async ()=>{
      const BASE_URL = 'https://faultdetection.herokuapp.com/api/v1/get/';
      try{
        //TODO remove if not live
      /* const res = await fetch(BASE_URL,{
        method:"GET"
      });
      const { data } =  await res.json(); */
      const valueArray =  parseValues();
      shippedValues = {...shippedValues , ...valueArray}
      return shippedValues

      } catch(e){
        console.log(e.message)
      }
}


function Graph({type , x_values , y_values}){
  const myDiv = useRef();
  const rand =  () => Math.random();
  let time = new Date();

  let arrayLength = 30
  let newArray = []
  
  for(let i = 0; i < arrayLength; i++) {
    let y = Math.round(Math.random()*10) + 1
    newArray[i] = y
  }

  let data = [
    {
      x: [x_values],
      y: [y_values],
      mode: 'lines',
      line: { color: '#80CAF6' }
    }
  ];
  useEffect(async () => {
    Plotly.newPlot(myDiv.current, [data]);

    let cnt = 0;
    console.log("x and y of",type,data)
    //await getFaults()

    let interval = setInterval(async function() {
      newArray = newArray.concat(y_values)
      newArray.splice(0, 1)

      // values =  await getFaults();
      // SetNowValue(values)

      let data_update = {
        y: [newArray],
        mode: 'lines',
      line: {color: '#80CAF6'}
      };
      Plotly.update(myDiv.current, data_update, [0]); 
      
      if (++cnt === 100) clearInterval(interval);
    }, 1000);
  }, []);



  return (<Fragment>
    <div id={type}>{type}</div>
      <div id="myDiv" ref={myDiv} />
  </Fragment>);
}


const App = () => {
  let values;

  const renderGraphs =  () => {
      let temp = []
      for( let value in nowValue){
        console.log(value)
        temp.push(value)
      }

      return temp.map((value)=><Graph y_values={nowValue[value] } key = {value} x_values={nowValue['time']} type= {value} />)

  }

  let [nowValue,SetNowValue] = useState();

    useEffect(async ()=>{
        values =  await getFaults();
        SetNowValue(values)
    },[])
    return (
      <Fragment>
        {nowValue ? <Fragment>{renderGraphs()}</Fragment>: <div>Loading...</div>}
      </Fragment>
    )
}


 const Appp =  () => {
  const myDiv = useRef();
  const rand =  () => Math.random();
  let time = new Date();

  let arrayLength = 30
  let newArray = []
  
  for(let i = 0; i < arrayLength; i++) {
    let y = Math.round(Math.random()*10) + 1
    newArray[i] = y
  }

  let data = [
    {
      x: [time],
      y: [newArray],
      mode: 'lines',
      line: { color: '#80CAF6' }
    }
  ];
  useEffect(async () => {
    Plotly.newPlot(myDiv.current, [data]);

    let cnt = 0;
    console.log("got to here")
    await getFaults()

    let interval = setInterval(function() {
      let time = new Date();

      // let update = {
      //   x:  [[time]],
      //   y: [[rand()]]
      //   }
      

      // let olderTime = time.setMinutes(time.getMinutes() - 1);
      // let futureTime = time.setMinutes(time.getMinutes() + 1);

      // let minuteView = {
      //   xaxis: {
      //     type: 'date',
      //     range: [olderTime, futureTime]
      //   }
      // };
      //change 1  set to id not the entire div
      let y = Math.round(Math.random()*10) + 1;
      newArray = newArray.concat(y)
      newArray.splice(0, 1)

      let data_update = {
        y: [newArray],
        mode: 'lines',
      line: {color: '#80CAF6'}
      };
      //Plotly.relayout(myDiv.current, minuteView);
      //console.log(Plotly)
      Plotly.update(myDiv.current, data_update, [0]);
      
      if (++cnt === 100) clearInterval(interval);
    }, 1000);
  }, []);

  return (
    <div>
      <div id="myDiv" ref={myDiv} />
    </div>
  );
}

export default App
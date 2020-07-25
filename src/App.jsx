import React, { useEffect } from 'react';

import KeplerGl from 'kepler.gl';
import keplerGlReducer from 'kepler.gl/reducers';
import {addDataToMap} from 'kepler.gl/actions';
import KeplerGlSchema from 'kepler.gl/schemas'

import useSwr from 'swr';
import {createStore, combineReducers, applyMiddleware} from 'redux';

import {taskMiddleware} from 'react-palm/tasks';
import {Provider, useDispatch} from 'react-redux';


// reducers allow the state to change from one value to a new one

const reducers = combineReducers({
  keplerGl: keplerGlReducer
});

// to store kepler state in
const store = createStore(reducers, {}, applyMiddleware(taskMiddleware));

function App() {
  return (
 <Provider store={store}>
<Map/>
 </Provider>
  );
}


 function Map(){
   const dispatch = useDispatch();
    const { data } = useSwr("covid", async () => {
    const response = await fetch(
      "https://pkgstore.datahub.io/core/covid-19/time-series-19-covid-combined_json/data/de9f002aced17e5021ce2fa57f324d8a/time-series-19-covid-combined_json.json"
    )
    const data = await response.json();
    return data;
    
    // .then(response => {
    //   return response.json();
    // })
    // .then(responseJson => {
    //   console.log(responseJson);
    // })
  });


// save current map data and config
const {datasets, config} = KeplerGlSchema.save(state.keplerGl.foo);
// mapToLoad = {datasets: [], config: {}};

// receive some new data
const newData = someNewData;
// newData = [{rows, fields}]

// match id with old datasets
const newDatasets = newData.map((d, i) => ({
  version: datasets[i].version,
  data: {
    ...datasets[i].data,
    allData: d.rows,
    fields: d.fields
  }
}));

// load config with new datasets
const mapToLoad = KeplerGlSchema.load(newDatasets, config);

this.props.dispatch(addDataToMap(mapToLoad));


useEffect(() => {
  
  // const sampleTripData = {
  //   fields: [
  //     {name: 'tpep_pickup_datetime', format: 'YYYY-M-D', type: 'timestamp'},
  //     {name: 'pickup_longitude', format: '', type: 'real'},
  //     {name: 'pickup_latitude', format: '', type: 'real'}
  //   ],
  //   rows: [
  //     [data.Date, data.Long, data.Lat],
   
  //   ]
  // };
   if (data) {
    dispatch(
 
      addDataToMap({
        datasets: {
          info: {
            label: 'COVID-19',
            id: 'covid19'
          },
          data: sampleTripData
          },
          option: {
          centerMap: true,
          readOnly: false
          },
          config: {}
        })
        )
      }
    }, [dispatch, data])

// console.log(data);



   return (
   <KeplerGl id="covid" 
   mapboxApiAccessToken = {process.env.REACT_APP_GEOSPATIAL_TOKEN}
   width={window.innerWidth}
   height={window.innerHeight}/>
   );
 }

export default App;

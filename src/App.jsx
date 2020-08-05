import React, { useEffect } from 'react';

import KeplerGl from 'kepler.gl';
import keplerGlReducer from 'kepler.gl/reducers';
import {addDataToMap} from 'kepler.gl/actions';
import KeplerGlSchema from 'kepler.gl/schemas'

import useSwr from 'swr';
import {createStore, combineReducers, applyMiddleware} from 'redux';

import {taskMiddleware} from 'react-palm/tasks';
import {Provider, useDispatch} from 'react-redux';


const reducers = combineReducers({
  keplerGl: keplerGlReducer
});


const store = createStore(reducers, {}, applyMiddleware(taskMiddleware));

export default function App() {
  return (
 <Provider store={store}>
<Map/>
 </Provider>
  );
}


const Map = () => {
   const dispatch = useDispatch();
    const { data } = useSwr("covid", async () => {
    const response = await fetch(
      "https://pkgstore.datahub.io/core/covid-19/time-series-19-covid-combined_json/data/de9f002aced17e5021ce2fa57f324d8a/time-series-19-covid-combined_json.json"
    )
    const data = await response.json();
    return data;   
  });


useEffect(() => {
if (data) {
  dispatch(
    addDataToMap({
      datasets: {
        info: {
          label: "COVID-19",
          id: "covid19"
        },
        data
      },
      option: {
        centerMap: true,
        readOnly: false
      },
      config: {}
    })
  );
}

}, [dispatch, data])
  
 return (
   <KeplerGl id="covid" 
   mapboxApiAccessToken = {process.env.REACT_APP_GEOSPATIAL_TOKEN}
   width={window.innerWidth}
   height={window.innerHeight}/>
   );
 }



import './App.css';
import React, { useState } from 'react'
import Navbar from './Component/Navbar';
import Newss from './Component/Newss';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

const App = () => {
  const pagesize = 5;
  const apikey = process.env.REACT_APP_NEWS_API;

  const [progress, setprogress] = useState(0)

 
    return (
      <BrowserRouter>

        <Navbar />

        <LoadingBar
          height= '3px'
          color= 'rgb(72 255 70 / 55%)'
          progress={  progress}
        />

        <Routes>

          <Route exact path="/" element={<Newss setprogress={  setprogress} apikey={  apikey} key="general" pagesize={  pagesize} country="in" category="General" />} />
          <Route exact path="/business" element={<Newss setprogress={  setprogress} apikey={  apikey} key="business" pagesize={  pagesize} country="in" category="Business" />} />
          <Route exact path="/entertainment" element={<Newss setprogress={  setprogress} apikey={  apikey} key="entertainment" pagesize={  pagesize} country="in" category="Entertainment" />} />
          <Route exact path="/general" element={<Newss setprogress={  setprogress} apikey={  apikey} key="general" pagesize={  pagesize} country="in" category="General" />} />
          <Route exact path="/health" element={<Newss setprogress={  setprogress} apikey={  apikey} key="health" pagesize={  pagesize} country="in" category="Health" />} />
          <Route exact path="/science" element={<Newss setprogress={  setprogress} apikey={  apikey} key="science" pagesize={  pagesize} country="in" category="Science" />} />
          <Route exact path="/sports" element={<Newss setprogress={  setprogress} apikey={  apikey} key="" pagesize={  pagesize} country="in" category="Sports" />} />

        </Routes>

      </BrowserRouter>
    )
  
}



export default App;
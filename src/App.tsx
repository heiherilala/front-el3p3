

import './App.css';
import './style/main.css';
import React, { useEffect, useState } from "react";
import "./style/main.css";
import "bootstrap-css-only/css/bootstrap.min.css"
import 'bootstrap-icons/font/bootstrap-icons.css'
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Recognition from './Pages/Recognition';
import Login from './Pages/Login';
import NavbarHeader from './Components/NavbarHeader';
import { ProjectUrl } from './constants';
import NewEvent from './Pages/NewEvent';
import ModifyEvent from './Pages/ModifyEvent';

function App() {
  return (
    <>
          <BrowserRouter>
            <Routes>
              <Route path="/" 
                  element={
                    <>
                        {Login()}
                    </>
                  }
              />
              <Route path="/recognition" 
                  element={
                    <>
                        {Recognition()}
                    </>
                  }
              />
              <Route path="/new-event" 
                  element={
                    <>
                        {NewEvent()}
                    </>
                  }
              />
              <Route path="/modify-event" 
                  element={
                    <>
                        {ModifyEvent()}
                    </>
                  }
              />
            </Routes>
            
          </BrowserRouter>
    </>
  );
}

export default App;

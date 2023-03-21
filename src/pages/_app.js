import React, { useState, useEffect } from "react";
import '../../styles/globals.css'
import Cookies from 'universal-cookie'

global.Cookies = new Cookies()

function MyApp({ Component, pageProps }) {
  return (
    <Component {...pageProps} />
  )
}

export default MyApp

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [coins, setCoins] = useState([]);
  const [erroMsg, setErrorMsg] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d"
      )
      .then((res) => {
        setCoins(res.data);
      })
      .catch((err) => {
        console.log(err);
        setErrorMsg(err);
      });
  }, []);

  return <div className="App"></div>;
}

export default App;

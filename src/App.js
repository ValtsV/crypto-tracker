import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Coin from "./components/Coin";

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d"
      )
      .then((res) => {
        setCoins(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        setErrorMsg(err);
      });
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="App">
      <div className="coin-search">
        <h1 className="coin-search-text">Search a currency</h1>
        <form>
          <input
            type="text"
            placeholder="Search..."
            className="coin-search-input"
            onChange={handleChange}
          />
        </form>
      </div>
      {errorMsg && <div>El servidor no quiere cooperar. Lo siento!</div>}
      <div className="main-container">
        {filteredCoins.map((coin) => {
          return (
            <Coin
              key={coin.id}
              coinName={coin.name}
              image={coin.image}
              symbol={coin.symbol}
              volume={coin.total_volume}
              price={coin.current_price}
              priceChange={coin.price_change_percentage_24h}
              marketcap={coin.market_cap}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;

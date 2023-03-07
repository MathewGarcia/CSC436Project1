import { useState, useEffect } from 'react'
import Convert from './components/Convert';
import './App.css'

function App() {

  const [inputCurrency, setInputCurrency] = useState(0);
  const [selected, setSelected] = useState("usd");

 const inputHandler = (e) => {
    setInputCurrency(e.target.value);
  }

  const selectionHandler = (e) => {
    setSelected(e.target.value);
  }
  return (
    <div className="App">

    <Convert inputCurrency={inputCurrency} setInputCurrency={setInputCurrency} selected = {selected}/>
    
    <div style={{}}>
    <label style={{color:'white'}}>Amount:</label>
    <input type = "text" onChange={inputHandler}/>
    <select name="currency" id="currency" onChange={selectionHandler}>
      <option value="usd"> USD </option>
      <option value="eur"> EUR </option>
      <option value="gbp"> GBP </option>
    </select>

    </div>



    </div>
  )
}

export default App

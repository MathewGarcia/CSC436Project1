import { useState, useEffect } from "react";
import './Convertcss.css';
import axios from 'axios';

function Convert({inputCurrency, setInputCurrency, selected}){

    const [bpiData, setBpiData] = useState({});
    const [conversionCurrency, setConversionCurrency] = useState(0);
    const [usdButtonName, setUSDButtonName] = useState('USD-BTC');
    const [eurButtonName, setEURButtonName] = useState('EUR-BTC');
    const [gbpButtonName, setGBPButtonName] = useState('GBP-BTC');
    const [error, setError] = useState('');
    const [dataDate, setDataDate] = useState(null);
    const [bTime, setbTime] = useState('');
    const [loading, setLoading] = useState(false);
    const [fetchTime, setFetchTime] = useState(0);
    const FIVE_MIN = 5*60*1000; //5 min in miliseconds

    const fetchAPIData = async () => {
        const {data:{bpi}} = await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json');
      setBpiData(bpi);
      if(localStorage.getItem('fetchTime') && Date.now() - localStorage.getItem('fetchTime') > FIVE_MIN){
      localStorage.setItem('fetchTime',Date.now());
      }
        setFetchTime(localStorage.getItem('fetchTime'));
    };
    
    const fetchAPITime = async () => {
        const {data:{time}} = await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json');
        setDataDate(time.updated);
        const date = new Date(time.updated);
        setbTime(date.toLocaleString());

        if(localStorage.getItem('fetchTime') && Date.now() - localStorage.getItem('fetchTime') >= FIVE_MIN || localStorage.getItem('localTime') === null || localStorage.getItem('localTime').length === 0){
            localStorage.setItem('localTime',date.toLocaleTimeString());
        }
    };

    useEffect(()=> {
        setLoading(true);
        fetchAPIData();
        fetchAPITime().finally(setLoading(false));
    },[]);



    const usdHandler = () => {
        if(selected === 'usd'){
        if(usdButtonName === 'USD-BTC'){
            setError('');
        setConversionCurrency(inputCurrency/parseFloat(bpiData.USD.rate_float));
        setUSDButtonName('BTC-USD');
        }
        else {
            setConversionCurrency(conversionCurrency*parseFloat(bpiData.USD.rate_float));

            setUSDButtonName('USD-BTC');
        }
     } else {
        setError('Please select the correct currency');
        setUSDButtonName('USD-BTC');
     }
    };

    const eurHandler = () => {
        if(selected === 'eur'){
            if(eurButtonName === 'EUR-BTC'){
            setError('');
        setConversionCurrency(inputCurrency/parseFloat(bpiData.EUR.rate_float,10.0));
        setEURButtonName('BTC-EUR');
        }
        else {
            setConversionCurrency(conversionCurrency*parseFloat(bpiData.EUR.rate_float));

            setEURButtonName('EUR-BTC');
        }
    }
    else {
        setError('Please select the correct currency');
        setEURButtonName('EUR-BTC');
        }
    };

    const gbpHandler = () => {
        if(selected === 'gbp'){
        if(gbpButtonName === 'GBP-BTC'){
            setError('');
        setConversionCurrency(inputCurrency/parseFloat(bpiData.GBP.rate_float,10.0));
        setGBPButtonName('BTC-GBP');
        }
        else {
            setConversionCurrency(conversionCurrency*parseFloat(bpiData.GBP.rate_float));

            setGBPButtonName('GBP-BTC');
        }
    }
    else {
        setError('Please select the correct currency ');
        setGBPButtonName('GBP-BTC');
      }
    };

    const refreshHandler = () =>{
        if(fetchTime && Date.now() - fetchTime > FIVE_MIN){
            fetchAPITime();
            fetchAPIData();
        }
        else {
            console.log(Date.now() - localStorage.getItem('fetchTime'));
            alert('You must wait 5 minutes before attempting to refetch data again');
        }
    };

    return (<div className = "Conversions">
        {loading && <p style={{color:'white'}}>Loading...</p>}
        {!loading && <>
        <div className="button-container">
            <img style = {{height:50}}src="https://media.tenor.com/Mfvl4UTuR2kAAAAS/bitcoin.gif" alt="" />
    <button type= 'btn' className="bg-black" onClick={usdHandler}>{usdButtonName} </button>
    <button type = 'btn' onClick = {eurHandler}> {eurButtonName} </button>
    <button type = 'btn' onClick = {gbpHandler}> {gbpButtonName} </button>
    <button type = 'btn' onClick={refreshHandler}>Refetch</button>
    </div>
    <h2> {selected.toUpperCase()} {bpiData[selected.toUpperCase()]?.rate_float}</h2>
    <small style={{color:'white'}}>{dataDate}</small>
    <small style={{color:'white'}}> {bTime}</small>
        <p style={{color:'white'}}>{conversionCurrency}</p>
        <p style={{color:'white'}}>{error}</p>
        <p style={{color:'white'}}>Last fetched time: {localStorage.getItem('localTime')}</p>
         </>}</div>

    )
    
}

export default Convert
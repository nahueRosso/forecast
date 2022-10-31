import './App.css'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import iso from "./2ISO1366.json"
import { Svg2 } from './components/Svg'
import CardSearch from "./components/CardSearch";
import CardData from "./components/CardDate";
import {photoMain, Clear1, Clear2, Clear3, Clouds1, Clouds2, Clouds3, Rain1, Rain2, Rain3, Snow1, Snow2, Snow3, Thunderstorm1, Thunderstorm2, Thunderstorm3 } from './assets'
import { Clouds, Wind, AnimationRain, AnimationClear, AnimationClouds, AnimationSnow, AnimationThunderstorm } from './assets/animated';
import Humidity from './assets/animated/humedad.svg'
import Arrow from './assets/animated/arrow.svg'
import MaxTemp from './assets/animated/min-temperature.svg'
import MinTemp from './assets/animated/max-temperature.svg'


function App() {

  const backgroundImg: any = { Clear: [Clear1(), Clear2(), Clear3()], Clouds: [Clouds1(), Clouds2(), Clouds3()], Rain: [Rain1(), Rain2(), Rain3()], Snow: [Snow1(), Snow2(), Snow3()], Thunderstorm: [Thunderstorm1(), Thunderstorm2(), Thunderstorm3()] }
  const [city, setCity] = useState("")
  const [country, setCountry] = useState("")
  const [input, setInput] = useState("")
  const [lon, setLon] = useState()
  const [lat, setLat] = useState()
  const [jsonFilter, setJsonFilter] = useState<any>()
  const [isoCountry, setIsoCountry] = useState<any>()
  const [api, setApi] = useState<any>([])
  const [principal, setPrincipal] = useState<any>({})
  const [temperatura, setTemperatura] = useState<any>([])
  const [temperaturaMax, setTemperaturaMax] = useState<any>([])
  const [temperaturaMin, setTemperaturaMin] = useState<any>([])
  const [vientoSpeed, setVientoSpeed] = useState<any>([])
  const [vientoDireccion, setVientoDireccion] = useState<any>([])
  const [humedad, setHumedad] = useState<any>([])
  const [nubes, setNubes] = useState<any>([])
  const [iconWeather, setIconWeather] = useState<any>("")
  const [nameCity, setNameCity] = useState()
  const [backImg, setBackImg] = useState(photoMain())
  
  const [themeOne, setThemeOne] = useState<any>("ff9e43")
  const [themeTwo, setThemeTwo] = useState<any>("f5f5f5")
  const [themeThree, setThemeThree] = useState<any>("51160e")
  
  
  const refMain = useRef<any>()
  const refCardsDate = useRef<any>()
  const refSearch = useRef<any>()
  const refDeployed = useRef<any>()


  useEffect(() => {
    const FuncionInput = (texto: any) => {
      if (!texto.includes(",")) {
        setCity((e: any) => e = texto.toLowerCase())
      }
      else { setCountry((e: any) => e = texto.toLowerCase().slice(city.length + 1).trim()) }
      return texto
    }
    (FuncionInput(input))
  }, [input])

  const isojson: any = iso

  useEffect(() => {
    isojson[0].nombre.find((e: any, index: any) => e.toLowerCase().includes(country) ? setJsonFilter(index) : "")
    setIsoCountry(isojson[1].iso2[jsonFilter])
  }, [jsonFilter, country])


  useEffect(() => {
    const getResponse = async () => {
      try {
        const results = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city},${isoCountry}&limit=5&appid=644841c97325ba3feba8c2697ed488ab`)

        setApi(results.data);
      } catch { (e: any) => console.log(e) }
    }
    getResponse()
  }, [city, isoCountry, input, lon, lat])


  useEffect(() => {
    const getResponse = async () => {
      try {
        const results = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=644841c97325ba3feba8c2697ed488ab`)
        setPrincipal(results.data.weather[0].main)
        setTemperatura(Math.ceil(results.data.main.temp - 273))
        setTemperaturaMax(Math.ceil(results.data.main.temp_max - 273))
        setTemperaturaMin(Math.floor(results.data.main.temp_min - 273))
        setVientoSpeed((results.data.wind.speed))
        setVientoDireccion((results.data.wind.deg))
        setHumedad((results.data.main.humidity))
        setNubes((results.data.clouds.all))
      } catch { (e: any) => console.log(e) }
    }
    getResponse()
  }, [lat, lon])

  useEffect(() => {
    if (principal == "Clear") {
      setIconWeather((e: any) => e = AnimationClear()), setBackImg(backgroundImg.Clear[Math.floor(Math.random() * 2.99)]),
      setThemeOne("00a8ff"), setThemeTwo("f5f5f5"), setThemeThree("487eb0")
    }
    if (principal == "Clouds") {
      setIconWeather(AnimationClouds()), setBackImg(backgroundImg.Clouds[Math.floor(Math.random() * 2.99)]),
      setThemeOne("d1ccc0"), setThemeTwo("f5f5f5"), setThemeThree("84817a")
    }
    else if (principal == "Snow") {
      setIconWeather((e: any) => e = AnimationSnow()), setBackImg(backgroundImg.Snow[Math.floor(Math.random() * 2.99)]),
      setThemeOne("f5f6fa"), setThemeTwo("222222"), setThemeThree("dcdde1")
    }
    else if (principal == "Rain" || principal == "Drizzle") {
      setIconWeather((e: any) => e = AnimationRain()), setBackImg(backgroundImg.Rain[Math.floor(Math.random() * 2.99)]),
      setThemeOne("7f8fa6"), setThemeTwo("f5f5f5"), setThemeThree("2f3640")
    }
    else if (principal == "Thunderstorm") {
      setIconWeather((e: any) => e = AnimationThunderstorm()), setBackImg(backgroundImg.Thunderstorm[Math.floor(Math.random() * 2.99)]),
      setThemeOne("706fd3"), setThemeTwo("f5f5f5"), setThemeThree("40407a")
    }

  }, [lon, lat, principal])

  
console.log(api)


  return (
    <>
      <div className='search' ref={refSearch} style={{background:`linear-gradient(to top,#${themeOne}33,#${themeThree})`}} >
        <div className='backgroundImage' style={{ backgroundImage: `url(${backImg})` }}> </div>
        <input className='searchInput firstInput' value={input} style={{ borderRadius: "0em " }} onChange={(e: any) => { setInput(e.target.value),(e.target.value)!=""?refDeployed.current.classList.toggle("active3",true):console.log("no") }} placeholder='Localidad, Pais' type="text" />
        {/* <input className='searchInput lastInput' style={stylosBordes} value={input} disabled type="text" /> */}

      </div>
      <div className='divCards' ref={refDeployed}>
        {api.map((e: any) => {
          // console.log(e)
          return <CardSearch refDeployed={refDeployed} refCardsDate={refCardsDate} refMain={refMain} setNameCity={setNameCity} setApi={setApi} setInput={setInput} setLon={setLon} setLat={setLat} lat1={e.lat} lon1={e.lon} country={e.country} name={e.name} state={e.state} />
        })}
      </div>
      <h2 className='nameCity'>{nameCity}</h2>

      <div ref={refMain} style={{ backgroundColor: `#${themeOne}88` }} className='mainBox'>
        <img src={iconWeather} alt="" />
        <h5 style={{ color: `#${themeTwo}` }}>{temperatura}°C</h5>
      </div>
      <Svg2 oneTheme={themeOne} />
      <div ref={refCardsDate} style={{background:`linear-gradient(to top,#${themeThree},#${themeOne}aa)`}} className='boxBottom_container'>
        <div className='boxBottom' ref={refCardsDate}>
          <CardData sty={themeTwo} icon={Clouds()} date={`${nubes} % de nubosidad`} />
          <CardData sty={themeTwo} icon={Wind()} date={`${vientoSpeed} Km/h`} />
          <CardData sty={themeTwo} icon={Humidity} date={`${humedad} % de humedad`} />
          <CardData sty={themeTwo} icon={Arrow} date={`Direccion del viento`} extra={vientoDireccion + 90} />
          <CardData sty={themeTwo} icon={MaxTemp} date={`${temperaturaMin}°C Min`} />
          <CardData sty={themeTwo} icon={MinTemp} date={`${temperaturaMax}°C Max`} />
        </div>
      </div>
    </>
  )
}

export default App

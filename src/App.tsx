import './App.css'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import iso from "./2ISO1366.json"
import { Svg2 } from './components/Svg'
import CardSearch from "./components/CardSearch";
import CardData from "./components/CardDate";
import { photoMain, Clear3, Clouds2, Rain1, Snow3, Thunderstorm2 } from './assets'
import { sunriseIcon, sunsetIcon, Clouds, Wind, AnimationRain, AnimationClear, AnimationClouds, AnimationSnow, AnimationThunderstorm } from './assets/animated';
import Humidity from './assets/animated/humedad.svg'
import Arrow from './assets/animated/arrow.svg'
import MaxTemp from './assets/animated/min-temperature.svg'
import MinTemp from './assets/animated/max-temperature.svg'


function App() {

  const backgroundImg: any = { Clear: [Clear3()], Clouds: [Clouds2()], Rain: [Rain1()], Snow: [Snow3()], Thunderstorm: [Thunderstorm2()] }
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
  const [timeZone, setTimeZone] = useState<any>()

  const [themeOne, setThemeOne] = useState<any>("ff9e43")
  const [themeTwo, setThemeTwo] = useState<any>("f5f5f5")
  const [themeThree, setThemeThree] = useState<any>("51160e")
  const [sunrise, setSunrise] = useState<any>()
  const [sunset, setSunset] = useState<any>()
  const [timeDay, setTimeDay] = useState<any>()

  let date: any = new Date()

  const refMain = useRef<any>()
  const refCardsDate = useRef<any>()
  const refSearch = useRef<any>()
  const refDeployed = useRef<any>()


  const convertidor = (time: any) => {

    let sunriser = new Date(time * 1000);

    let formattedTime = sunriser.getHours() + ':' + ("0" + sunriser.getMinutes()).substr(-2) + ':' + ("0" + sunriser.getSeconds()).substr(-2);

    return formattedTime
  }





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

        setTimeZone(`${((date.getHours()) + 3) + (results.data.timezone / 3600) > 24 ?
          (((date.getHours()) + 3) + (results.data.timezone / 3600) - 24 < 10 ?
            `0${((date.getHours()) + 3) + (results.data.timezone / 3600) - 24}` :
            Math.ceil(((date.getHours()) + 3) + (results.data.timezone / 3600) - 24)) :

          ((date.getHours()) + 3) + (results.data.timezone / 3600) < 0 ?
            (((date.getHours()) + 3) + (results.data.timezone / 3600) + 24 < 10 ?
              `0${((date.getHours()) + 3) + (results.data.timezone / 3600) + 24}` :
              Math.ceil(((date.getHours()) + 3) + (results.data.timezone / 3600) + 24)) :

            (((date.getHours()) + 3) + (results.data.timezone / 3600) < 10 ?
              `0${((date.getHours()) + 3) + (results.data.timezone / 3600)}` :
              Math.ceil(((date.getHours()) + 3) + (results.data.timezone / 3600)))}

                    : ${(date.getMinutes() < 10) ? `0${date.getMinutes()}` : date.getMinutes()} Hs`
        )

        setSunrise(convertidor(results.data.sys.sunrise))
        setSunset(convertidor(results.data.sys.sunset))
        setTimeDay(parseInt(convertidor(results.data.sys.sunrise)) < timeZone || parseInt(convertidor(results.data.sys.sunset)) > timeZone)


      } catch { (e: any) => console.log(e) }
    }
    getResponse()
  }, [lat, lon])

  useEffect(() => {
    if (principal == "Clear") {
      setIconWeather((e: any) => e = AnimationClear()), setBackImg(backgroundImg.Clear[0]),
        setThemeOne("00a8ff"), setThemeTwo("f5f5f5"), setThemeThree("487eb0")
    }
    if (principal == "Clouds") {
      setIconWeather(AnimationClouds()), setBackImg(backgroundImg.Clouds[0]),
        setThemeOne("d1ccc0"), setThemeTwo("f5f5f5"), setThemeThree("84817a")
    }
    else if (principal == "Snow") {
      setIconWeather((e: any) => e = AnimationSnow()), setBackImg(backgroundImg.Snow[0]),
        setThemeOne("f5f6fa"), setThemeTwo("222222"), setThemeThree("dcdde1")
    }
    else if (principal == "Rain" || principal == "Drizzle") {
      setIconWeather((e: any) => e = AnimationRain()), setBackImg(backgroundImg.Rain[0]),
        setThemeOne("7f8fa6"), setThemeTwo("f5f5f5"), setThemeThree("2f3640")
    }
    else if (principal == "Thunderstorm") {
      setIconWeather((e: any) => e = AnimationThunderstorm()), setBackImg(backgroundImg.Thunderstorm[0]),
        setThemeOne("706fd3"), setThemeTwo("f5f5f5"), setThemeThree("40407a")
    }

  }, [lon, lat, principal])



  return (
    <>
      <div className='search' ref={refSearch} style={{ background: `linear-gradient(to top,#${themeOne}33,#${themeThree})` }} >
        <div className='backgroundImage' style={{ backgroundImage: `url(${backImg})` }}> </div>
        <input className='searchInput firstInput' value={input} style={{ borderRadius: "0em " }} onChange={(e: any) => { setInput(e.target.value), (e.target.value) != "" ? refDeployed.current.classList.toggle("active3", true) : console.log("no") }} placeholder='Localidad, Pais' type="text" />

      </div>
      <div className='divCards' ref={refDeployed}>
        {api.map((e: any) => {
          return <CardSearch refDeployed={refDeployed} refCardsDate={refCardsDate} refMain={refMain} setNameCity={setNameCity} setApi={setApi} setInput={setInput} setLon={setLon} setLat={setLat} lat1={e.lat} lon1={e.lon} country={e.country} name={e.name} state={e.state} />
        })}
      </div>
      <h2 className='nameCity'>{nameCity}
        <br />
        <br />
        {timeZone}
      </h2>

      <div ref={refMain} style={{ backgroundColor: `#${themeOne}88` }} className='mainBox'>
        <img src={iconWeather} alt="" />
        <h5 style={{ color: `#${themeTwo}` }}>{temperatura}°C</h5>
      </div>
      <Svg2 oneTheme={themeOne} />
      <div ref={refCardsDate} style={{ background: `linear-gradient(to top,#${themeThree},#${themeOne}77)` }} className='boxBottom_container'>
        <div className='boxBottom' ref={refCardsDate}>
          <CardData sty={themeTwo} icon={Clouds()} date={`${nubes} % de nubosidad`} />
          <CardData sty={themeTwo} icon={Wind()} date={`${vientoSpeed} Km/h`} />
          <CardData sty={themeTwo} icon={Humidity} date={`${humedad} % de humedad`} />
          <CardData sty={themeTwo} icon={Arrow} date={`Direccion del viento`} extra={vientoDireccion + 90} />
          <CardData sty={themeTwo} icon={MaxTemp} date={`${temperaturaMin}°C Min`} />
          <CardData sty={themeTwo} icon={MinTemp} date={`${temperaturaMax}°C Max`} />
          <CardData sty={themeTwo} icon={sunriseIcon()} date={`${sunrise} Hs`} />
          <CardData sty={themeTwo} icon={sunsetIcon()} date={`${sunset} Hs`} />
        </div>
      </div>
    </>
  )
}

export default App

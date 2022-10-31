import '../styles/CardSearch.css'

const CardSearch = ({refDeployed,refCardsDate,refMain,setNameCity, setApi,setInput, setLat,setLon,lat1,lon1,country,name,state}:any) => {

  

const clickCard = (e:any) => {
  setLon(lon1)
  setApi([])
  setLat(lat1)
  setInput((e:any)=>e="")
  setNameCity(e.target.textContent)
//  setTimeout(() => {
//   setApi([])
//  }, 300);
refDeployed.current.classList.toggle("active3",false)
  refCardsDate.current.firstChild.classList.toggle("active",true)
  refMain.current.classList.toggle("active2",true)
 
}


  return (
    <div  className='cardContainer' onClick={(e)=>clickCard(e)}>
      <h2>{name}{!(state==undefined)?(", "+ state):""}{!(country==undefined)?(", " +country):""}</h2>
    </div>
  )
}

export default CardSearch

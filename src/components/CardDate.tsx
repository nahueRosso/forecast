import '../styles/CardDate.css'

const CardDate = ({sty,icon,date,extra}:any) => {
  return (
    <div className='containerDate'>
      <img className='' style={{height:"6em",transform:`rotate(${extra}deg)`}} src={icon}  />
      <h4 style={{color: `#${sty}`}}>{date}</h4>
    </div>
  )
}

export default CardDate

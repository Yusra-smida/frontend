import React,{useEffect, useState} from 'react'
import Navbar from '../navbar/Navbar'
import './mes_reservation.css'
function MesReservation() {
    const chef =JSON.parse(localStorage.getItem("chef"))
const [mesreserve,SetMesreserve]=useState([])
    const mes_Reservation=async()=>{
        console.log("id",(chef._id))
       
    
    
        const chef_id=chef._id
     
      
        
    
        await fetch('/reservation/reservation').then(res=>res.json()).then(data=>{
   
           console.log("data",data.result)
           const projet=data.result.filter(item =>item.chef._id===chef_id)
           console.log("filtre", projet)
       
            
           SetMesreserve(projet)
          
        
        
          })}
          
  useEffect(()=>{
    mes_Reservation()

   },[])

  return (
    <>
    <Navbar/>
    <div className="mes_reserve" >
        <h2>Listes Des mes  reservations <small></small></h2>



        <ul className="responsive-mes-reserve">
    <li className="table-header">
      <div className="col col-1"> Id</div>
  
      <div className="col col-2">projet</div>
      <div className="col col-3">code_materiel</div>
      <div className="col col-4">uls</div>
      <div className="col col-5">unite</div>
      <div className="col col-6">metre</div>
      <div className="col col-7">date</div>
      <div className="col col-8">etats</div>
     
    

    </li>
    {  
   

   mesreserve.map((reserve,index)=>(
  
     <li className="table-row"key={reserve._id}>
     <div className="col col-1" data-label="Id">{index}</div>

     <div className="col col-2" data-label="titre projet">{reserve.projet.titre_projet}</div>
     <div className="col col-3" data-label="code materiel">{reserve.materiel.code_materiel}</div>
     <div className="col col-4" data-label="uls"> {reserve.materiel.uls}</div>
     <div className="col col-5" data-label="unite"> {reserve.unite!==0 ?(
        <div key={index}>
    
        <p >{reserve.unite}</p>
     
      
      
     </div>
      ):(
        <div key={index}>
    
    <p  >-</p>
 
  
 </div>
      )
      
      }</div>
     <div className="col col-6" data-label="metre"> {reserve.metre!==0 ?(
        <div key={index}>
    
        <p >{reserve.metre} metre</p>
     
      
      
     </div>
      ):(
        <div key={index}>
    
    <p >-</p>
 
  
 </div>
      )
      
      } </div>
     <div className="col col-7" data-label="date ">{reserve.date_reservation}</div>
     <div className="col col-8" data-label="confirmation">{reserve.confirmer}</div>
  
   </li>
   ))
 }


  </ul>
        </div>
        </>
  )
}

export default MesReservation
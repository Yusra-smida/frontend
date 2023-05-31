import React ,{useEffect,useState} from 'react'
import Navbar from '../navbar/Navbar'
import './equipechef.css'
function Equipechef() {
    const[equipe,setEquipes]=useState([])
    const [role,SetRole]=useState()
    const chef =JSON.parse(localStorage.getItem("chef"))


    const equipechef=async()=>{
        console.log("id",(chef._id))
       
    
    
        const membre=chef._id
     
      
        
    
        await fetch('/equipe/findeq', {
          method: 'POST',
          headers: {
            Accept: 'application.json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({membre})
          
        }).then(res=>res.json()).then(data=>{
    console.log("equipechef",data.result)
            const role=data.result.membre
            for(let i=0;i<role.length;i++){
               // console.log(role[i].role)
               getRole(role[i].role)

            }
            setTimeout(() => {
                // console.log("msg",employe)
                setEquipes(data.result.membre)
                
            
               }, 1000);
            
          })
            
    
        
    
      
    
    
      }

const getRole=async(id)=>{
    try {
        await fetch('/role/role/'+id,{
          method:'get',
      
        }).then(res=>res.json()).then(data=>{
          console.log("role person",data.libelle)
       return SetRole(data.libelle)
      
      
        })
      } catch (error) {
        console.log(error)
      }

}
    
      useEffect(()=>{
        equipechef()
        console.log("effect role",role)
       },[])




  return (
    <>
    <Navbar/>
    <div className="container_equipe" >
    <h2>mon equipe {equipe.nom_equipe } </h2>
    <ul className="responsive-table-equipechef">
    <li className="table-header">
      <div className="col col-1"> Id</div>
      <div className="col col-2">nom</div>
      <div className="col col-3">prenom</div>
      <div className="col col-4">email</div>
      
     
    
    
    </li>
     {  
   

      equipe.map((m,index)=>(
     
        <li className="table-row"key={m._id}>
        <div className="col col-1" data-label="Id">{index}</div>
        <div className="col col-2" data-label="nom">{m.nom}</div>
        <div className="col col-3" data-label="prenom">{m.prenom}</div>
        <div className="col col-4" data-label="email">{m.email}</div>
    
      


      </li>
      ))
    } 


  </ul>

    </div>
    </>
  )
}

export default Equipechef
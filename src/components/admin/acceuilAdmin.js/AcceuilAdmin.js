import React, { useState } from 'react'
import DashboardAdmin from '../DashboardAdmin'
import './acceuiladmin.css'
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useEffect } from 'react';

  
function AcceuilAdmin() {

  const [employes,SetEmployes]=useState([])
  const [equipes,SetEquipe]=useState([])
  const [projet,SetProjet]=useState([])
  const [projetTermniner,SetprojetTerminer]=useState([])

  

const getAllProjet=async()=>{
  await fetch('/projet/projet').then(res=>res.json()).then(data=>{
   // console.log('data',data)
    let projet_terminer=[]

    SetProjet(data)
    projet_terminer.push(data)

 

  })
  

}
const getAllUser=async()=>{
 await fetch('/user/getusers').then(res=>res.json()).then(data=>{  
      SetEmployes(data)
      })
}
const getAllEquipe=async()=>{
  await fetch('/equipe/equipe').then(res=>res.json()).then(data=>{
   

  
    SetEquipe(data.result)
  
  
  
    
  })
}

useEffect(()=>{
  getAllProjet()
  getAllUser()
  getAllEquipe()
  SetprojetTerminer(projet.filter(item=>item.etat_projet==="terminer"))
},[projet])




  return (
    <>

<DashboardAdmin/>

    
     <div className="featured">
      <div className="featuredItem">
        <span className="featuredMoney">
          <PersonIcon fontSize="large" />
        </span>
        <div>
          <span className="featuredTitle">Employes</span>
          <span className="featuredMoneyRate">{employes.length} </span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredMoney">
          <GroupsIcon fontSize="large" />
        </span>
        <div>
          <span className="featuredTitle">Equipes</span>
          <span className="featuredMoneyRate"> {equipes.length} </span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredMoney">
          <AssignmentIcon fontSize="large" />
        </span>
        <div>
          <span className="featuredTitle">Projets</span>
          <span className="featuredMoneyRate">{projet.length}</span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredValider">
          <AssignmentTurnedInIcon fontSize="large" />
        </span>
        <div>
          <span className="featuredTitle">Projet Terminé</span>
          <span className="featuredMoneyRate">{projetTermniner.length} </span>
        </div>
      </div>
    </div>
   
   
    </>
  )
}


export default AcceuilAdmin
import React from 'react'
import Navbar from '../navbar/Navbar'
import './profil.css'
import image from '../../../assets/images/user.png'
function Profil() {
  const chef =JSON.parse(localStorage.getItem("chef"))
  return (

    <>
    <Navbar/>
    <div className="card">
            <div className="text">
                <img src={image} alt=""/>
                <h3>{chef.nom}  {chef.prenom}</h3>
                
                <p>{chef.email} </p>
                <p>{chef.role.libelle} </p>
                <p>{chef.adress} </p>
                
            </div>
            <div className="links">
                <a  href="https://codepen.io/l-e-e/"><i className="fab fa-codepen"></i></a>
                <a href="https://github.com/Leena26"><i className="fab fa-github"></i></a>
                <a  href="https://www.youtube.com/channel/UCPOyUi82bRcPTdpDuSHVNbw"><i className="fab fa-youtube"></i></a>
            </div>
        </div>
  
</>
  )
}

export default Profil
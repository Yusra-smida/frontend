import React from 'react'
import image from '../../../assets/images/user.png'
import Navbar from '../navbar/Navbar'

function Profilcol() {
    const col =JSON.parse(localStorage.getItem("collaborateur"))
  return (
    <>
    <Navbar/>
    <div className="card">
            <div className="text">
                <img src={image} alt=""/>
                <h3>{col.nom}  {col.prenom}</h3>
                
                <p>{col.email} </p>
                <p>{col.role.libelle} </p>
                <p>{col.adress} </p>
                
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

export default Profilcol
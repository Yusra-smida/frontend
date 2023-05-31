import React from 'react'
import { IoMdNotifications } from "react-icons/io";
import { GoThreeBars } from "react-icons/go";
import { IoIosMail } from "react-icons/io";
import { AiTwotoneAppstore } from "react-icons/ai";
import { GoSearch } from "react-icons/go";
import { Link } from 'react-router-dom';
import './style.css'
import img from '../../assets/images/logo_tt.png'
import image from '../../assets/images/userfin.png'
function DashboardAdmin() {
  const LogOut = () => {
    localStorage.removeItem("LoginAdmin");
    localStorage.removeItem("admin");
    window.location.href = "/";

  }
  return (
    <div>
      <input type="checkbox" id="checkbox" />
      <div className="topbarContainer">
        <div className="topbarLeft">
          <img src={img} alt="logouser" id="imglog" className="imageAdmin" />
          <p className="logo"> Espace Administrateur</p>
          <label htmlFor="checkbox" >
            <GoThreeBars className="menu" />
          </label>
        </div>
        <div className="topbarCenter">

          <IoMdNotifications className="IconItem" />
          <IoIosMail className="IconItem" />
          <AiTwotoneAppstore className="IconItem" />
        </div>
        <div className="topbarRight">
          {/* <div className="searchbar">
          <GoSearch className="Icon" />
          <input placeholder='Recherche' className='searchInput' />
        </div> */}
          <img src={image} className="topbarImg" alt="" />
        </div>
      </div>
      <div className="leftbarContainer">
        <aside className="sidebar" >
          <label htmlFor="nav-toggle"></label>
          <ul>

            <li>
              <Link to='/admin' className='active'>
                <i className={`fa-solid fa-house-user nav-logo-icon`}></i>
                <span className='nav-logo-name'> Accueil </span>
              </Link>
            </li>

            <li>
              <Link to='/employe'>
                <i className='fa-solid fa-video nav-link-icon'></i>
                <span className='nav-link-name'>Employes</span>
              </Link>
            </li>
            <li>
              <Link to='/role'>
                <i className="fa-solid fa-graduation-cap"></i>
                <span className='nav-link-name'>Roles</span>
              </Link>
            </li>
            <li>
              <Link to='/equipe'>
                <i className="fa-solid fa-graduation-cap"></i>
                <span className='nav-link-name'>Equipes</span>
              </Link>
            </li>
            <li>
              <Link to='/projet' >
                <i className='fa-solid fa-calendar-days nav-link-icon'></i>
                <span className='nav-link-name'>Projets</span>
              </Link>
            </li>
            <li>
              <Link to="/categories">
                <i className='fa-solid fa-circle-question nav-link-icon' ></i>
                <span className='nav-link-name'>Categories</span>
              </Link>
            </li>

            <li>
              <button type="button" className='btn' >Matériels  <span className="arrow"></span></button>
              <ul className="dropdown">
                <li><a href="/materiel" className='drop'>matériels </a></li>
                <li><a href="/reserve" className='drop'> matériels réservés </a></li>

              </ul>
            </li>




            <li onClick={() => {
              LogOut()
            }}>
              <Link to="/" className="out">
                <i className="fa fa-power-off" aria-hidden="true"></i>
                <span className='nav-link-name' >Déconnexion</span>
              </Link>
            </li>
          </ul>
        </aside>


      </div>
    </div>
  )
}

export default DashboardAdmin
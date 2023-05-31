import React ,{useContext}from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login  from './auth/Login'
import DashboardAdmin from './admin/DashboardAdmin';
import Acceuil from './chef_projet/Acceuil';
import Employe from './admin/employe/Employe';
import NotFound from './not_found/NotFound';
import Roles from './admin/roles/Roles';
import Equipe from './admin/equipe/Equipe';
import Projet from './admin/projet/Projet';
import Materiel from './admin/materiel/Materiel';
import Loading from './admin/loading/Loading'
import AcceuilAdmin from './admin/acceuilAdmin.js/AcceuilAdmin';
import Tache from './chef_projet/taches/Tache';
import Profil from './chef_projet/profil/Profil';
import Reservation from './chef_projet/reservation/Reservation';
import Categories from './admin/categorie/Categories';
import MatReserve from './admin/materiel_reserve/MatReserve';
import MesReservation from './chef_projet/reservation/MesReservation';
import Acceuilcollaborateur from './collaborateur/Acceuilcollaborateur';
import Profilcol from './collaborateur/profil_col/Profilcol';
import Equipechef from './chef_projet/mon_equipe/Equipechef';
function Pages() {
      const isloginAdmin=localStorage.getItem('LoginAdmin')
      const islogin=localStorage.getItem('Login')
      const islogincol=localStorage.getItem('Logincol')
  return (

    <Routes>
            {/* routes chef de projets*/}
          <Route path="/" element={<Login/>} />
          <Route path="/acceuil" element={islogin?<Acceuil/>:<NotFound/>} />
          <Route path="/taches" element={islogin?<Tache/>:<NotFound/>} />
          <Route path="/reservation" element={islogin?<Reservation/>:<NotFound/>} />
          <Route path="/profil" element={islogin?<Profil/>:<NotFound/>} />
          <Route path="/mes_reserve" element={islogin?<MesReservation/>:<NotFound/>} />
          <Route path="/mon_equipe" element={islogin?<Equipechef/>:<NotFound/>} />


          {/* routes collaborateur*/}
          <Route path="/collaborateur" element={islogincol?<Acceuilcollaborateur/>:<NotFound/>} />
          <Route path="/profilcol" element={islogincol?<Profilcol/>:<NotFound/>} />



            {/* routes admin*/}
          <Route path="/admin" element={isloginAdmin ?<AcceuilAdmin/>:<NotFound />} />
          <Route path="/employe" element={isloginAdmin ? <Employe/>:<NotFound /> } />
          <Route path="/categories" element={isloginAdmin ? <Categories/>:<NotFound /> } />
          <Route path="/equipe" element={isloginAdmin ? <Equipe/>:<NotFound /> } />
          <Route path="/role" element={isloginAdmin ? <Roles/>:<NotFound /> } />
          <Route path="/projet" element={isloginAdmin ? <Projet/>:<NotFound /> } />
          <Route path="/materiel" element={isloginAdmin ? <Materiel/>:<NotFound /> } />
          <Route path="/reserve" element={isloginAdmin ? <MatReserve/>:<NotFound /> } />
          <Route path="*" element={<NotFound/>} />
    </Routes>
  )
}
export default Pages;
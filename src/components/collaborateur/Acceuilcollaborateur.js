import React from 'react'
import Navbar from './navbar/Navbar'
import {BsPencilFill} from "react-icons/bs";
import { useState,useEffect } from 'react'
import '../chef_projet/taches/tache.css'

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import toast, { Toaster } from 'react-hot-toast';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
const initialState = {
  titre: '',
  description: '',
  data_debut: '',
  data_fin: '',
  priorite:1,
  etat_tache:'en_attente',
  titre_projet:'',
  _id: ''
}

const etat=[
  {id:"1",etat:"en_attente"},
  {id:"2",etat:"en_cours"},
  {id:"3",etat:"terminer"},
]


function Acceuilcollaborateur() {
    const col =JSON.parse(localStorage.getItem("collaborateur"))


    const [projets,SetProjets]=useState([])
    const[equipe,setEquipes]=useState([])
    const [id,SetId]=useState()
    const [open, setOpen] = useState(false);
    const [taches,setTache]=useState(initialState)
 
    const[ajouter,setAjouter]=useState(false);
   
  
    const handleOpen = () => {
     
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    
  
 
      const filterprojet=async()=>{
        console.log("nom_col",JSON.stringify(col._id))
        const membre=col._id
        await fetch('/equipe/findeq', {
          method: 'POST',
          headers: {
            Accept: 'application.json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({membre})
          
        }).then(res=>res.json()).then(data=>{
          console.log("equipe",data.result)
         // setLoad(true)
         SetId(data.result._id)
        fetch('/projet/projet').then(res=>res.json()).then(result=>{
           
          const projet=result.filter(item => item.equipe._id===data.result._id)
          
          projet.map((pro,index)=>(pro.tache.sort(function (a, b) {
            return a.priorite - b.priorite;
          })))
          console.log("projetfetch",projet)
          
          SetProjets(projet)
        
  
          
        })
          setTimeout(() => {
            // console.log("msg",employe)
            setEquipes(data.result)
     
        
           }, 1000);
      
          
        })
    
    
      }
    
  
    
   
      useEffect(()=>{
        filterprojet()
       //myProject()
       },[])
    
  
       const handleChangeInput = e =>{
    
  
        const {name, value} = e.target
        setTache({...taches, [name]:value})
        console.log("tache input",{taches})
      
      }
   
      
    const get_Taches=async(id)=>{
      try {
        await fetch('/tache/tache/'+id,{
          method:'get',
      
        }).then(res=>res.json()).then(data=>{
          console.log("getTache",data)
          setTache(data)
      
      
        })
      } catch (error) {
        console.log(error)
      }
    
    }
  
  
    const update_Tache=async(id)=>{
      try {
       
      
        await fetch('/tache/tache/'+id,{
          method:'put',
          headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({...taches}),
        }).then(res=>res.json()).then(async data=>{
         
          handleClose()
          toast.success(<b>Tache {taches.titre} modifier avec succès</b>)
          setTimeout(() => {
           // console.log("msg",employe)
           filterprojet()
          }, 300);
         
        })
    
     
      } catch (error) {
        console.log(error)
      }
    }
  
    
    return (
      <>
          <Navbar/>
      <div className="container_tache" >
      <h2>Mes Taches<small> Taches</small></h2>
      <Toaster
    position="top-center"
    reverseOrder={true}
  />
      <div>
        
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={{ ...style, width: 400 }}>
          <div className='Ajouter-form'>
          <form >
      <h3>Modifier etat tache</h3>
        
            
  
  <div className="row">
                      <label htmlFor="etat_tache">etat tache: </label>
                      <select name="etat_tache"  onChange={handleChangeInput}
                     
                      >
                          <option value="" >Please select etat tache</option>
                          {
                         
                         etat.map(e => (
                               
                                <option value={e.etat} key={e.id}  >
                                    {e.etat}
                                  
                                </option>
                    
                            ))
                          }
                      </select>
  
                  </div>
    
            <div className='row'>
            {ajouter && (<button type='button' onClick={()=>{update_Tache(taches._id)
                   
                    }}>Modifier tache</button>)}
                  
                  
              
           
            </div>
     
          </form>
  
      </div>
     
          </Box>
        </Modal>
      </div>
  
      
 
      <ul className="responsive-table-tache">
      
      <li className="table-header">
        <div className="col col-1"> Id</div>
        <div className="col col-2">titre</div>
        <div className="col col-3">description</div>
        <div className="col col-4">data_debut</div>
        <div className="col col-5">data_fin</div>
        <div className="col col-6">etat</div>
        <div className="col col-7">priorite</div>
        <div className="col col-8">projet</div>
      
        <div className="col col-9">Actions</div>
      </li>
      {  
     
  
        projets.map((pro,i)=>(pro.tache.map((t,index)=>(
  
          
          <li className="table-row"key={t._id}>
          <div className="col col-1" data-label="Id">{index}</div>
          <div className="col col-2" data-label="titre">{t.titre}</div>
          <div className="col col-3" data-label="description">{t.description}</div>
          <div className="col col-4" data-label="data_debut">{t.data_debut}</div>
          <div className="col col-5" data-label="data_fin">{t.data_fin}</div>
          <div className="col col-6" data-label="etat_tache">
            
            {t.etat_tache==="terminer" ?(
              <div key={i}>
          
              <p 
              style={{color:'#0EDC86'}} >{t.etat_tache}</p>
           
            
            
           </div>
            ):(
              <div key={i}>
          
          <p  style={{color:'#FF6E61'}} >{t.etat_tache}</p>
       
        
       </div>
            )
            
            }
  
          
          
          </div>
          <div className="col col-7" data-label="priorite">{t.priorite}</div>
          <div className="col col-8" data-label="projet">{t.titre_projet}</div>
          <div className="col col-9" data-label="Actions">
          <div className='row'>
          <BsPencilFill onClick={()=>{
            setAjouter(true)
            setTache(initialState)
            
            console.log("objet ",t._id)
            get_Taches(t._id)
            handleOpen()
          }}style={{color:'blue'}} />
          
      
        </div>
  
          </div>
        </li>
        
        ))
        
        ))
  
      }
  
  
    </ul>
  
  
      </div>
      </>
    
    )
  }

export default Acceuilcollaborateur
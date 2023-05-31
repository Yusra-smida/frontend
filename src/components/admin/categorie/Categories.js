import React, { useState,useEffect } from 'react'
import DashboardAdmin from '../DashboardAdmin'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import { BsXCircleFill ,BsPencilFill,BsPersonPlusFill,BsPersonFillGear} from "react-icons/bs";
import { BiCategoryAlt } from "react-icons/bi";
//import './roles.css'
import Loading from  '../loading/Loading'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const initialState = {
    type_cat:'',
  _id: ''
}


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
function Categories() {

const [categories,SetCategories]=useState([])
const [open, setOpen] = useState(false);
const [categorie, setCategorie] = useState(initialState)
const[ajouter,setAjouter]=useState(false);
const token=localStorage.getItem('token')

const handleChangeInput = e =>{
  

  const {name, value} = e.target
  setCategorie({...categorie, [name]:value})
}

const getAllCategroies= async()=>{
  try {
    await fetch('/categorie/categorie').then(res=>res.json()).then(data=>{
      console.log("categ",data)
     
      setTimeout(() => {
        // console.log("msg",employe)
        SetCategories (data)
       }, 1000);
    })
  } catch (error) {
    alert(error.response.data.msg)
  }

}
useEffect(()=>{
getAllCategroies()

},[])




const handleOpen = () => {
 
  setOpen(true);
};
const handleClose = () => {
  setOpen(false);
};

const deleteCategroie=(id)=>{
  try {
    confirmAlert({
      title: 'Confirmer la suppression',
      message: 'êtes-vous sûr de supprimer categorie....',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            fetch('/categorie/categorie/'+id,{
              method:'delete',
              headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                
              }}).then(res=>res.json()).then(data=>{
              console.log('supprimer',data)
            
              setTimeout(() => {
               
                toast.loading(' suppression...');
               
              }, 10);
             
              setTimeout(() => {
                toast.dismiss();
                toast.success(<b>supprimé {categorie.type_cat} avec succès </b>);
                 getAllCategroies()
               }, 1000);
            })
          }
        },
        {
          label: 'No',
          //onClick: () => alert('Click No')
        }
      ]
    });
  } catch (error) {
    alert(error.response.data.msg)
  }
}

const getCategorie =async(id)=>{
  try {
    await fetch('/categorie/categorie/'+id,{
      method:'get',
  
    }).then(res=>res.json()).then(data=>{
      //console.log("getuser",data)
      setCategorie(data)
  
  
    })
  } catch (error) {
    console.log(error)
  }
}



const handleSubmit = async e =>{
  e.preventDefault()
 

  console.log('role',{...categorie})
  console.log("token",token)

    try {
     await fetch('/categorie/categorie', {
        method:'post',
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          Authorization: token
        },
        body:JSON.stringify({
         ...categorie
        }),

       
    }).then(res=>res.json()).then(data=>{
      console.log("data",data)
  
        if (data.msg==='categorie created'){
          handleClose()
          toast.success(<b>categorie {data.result.type_cat} créer avec succès</b>)
          setTimeout(() => {
            // console.log("msg",employe)
            getAllCategroies()
           }, 300);
           return true
        }
        else{
          toast.error(data.msg)
          return false
        }
     
     
     
    })


  } catch (error) {
    alert(error.response.data.msg)
  
  }
}

const ModifierCategorie=async(id)=>{
 const {type_cat}=categorie
  if (type_cat===""){
    toast.error('Veuillez remplir toutes les informations')
    return false
  }

  try {
    await fetch('/categorie/categorie/'+id,{
      method:'put',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({...categorie}),
    }).then(res=>res.json()).then(async data=>{
     console.log("update a categorie",data)
     if (data.msg==='update a categorie'){
      handleClose()
      toast.success(<b>categorie {categorie.type_cat} modifier avec succès</b>)
      setTimeout(() => {
        // console.log("msg",employe)
        getAllCategroies()
       }, 300);
       return true
    }
    else{
      toast.error("catégorie existe")
      return false
    }
     
    })
   // window.location.reload()
  } catch (error) {
    alert(error.response.data.msg)
  }
 

}

  return (
    <>
    <DashboardAdmin />
    <div className="role" >
   
    <h2>Categories <small></small></h2>


    <div>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
        <div className='Ajouter-form'>
        <form  onSubmit={handleSubmit} >
       { ajouter ? (<h3>Ajouter categorie </h3>):(<h3>Modifier categorie </h3>)} 
        <input type='text' name="type_cat"required placeholder='cat' value={categorie.type_cat}
                   onChange={handleChangeInput}    />
          
      
          <div className='row'>
                {ajouter ?  (<button type='submit'>Ajouter</button>):(<button type='button' onClick={()=>{
                  ModifierCategorie(categorie._id)
                }}>Modifier</button>)
                
                }
            
         
          </div>
   
        </form>

    </div>
   
        </Box>
      </Modal>
    </div>





    <Toaster
  position="top-center"
  reverseOrder={true}
/>
    <BiCategoryAlt className='addrole' onClick={()=>{
        setAjouter(true)
        setCategorie(initialState)
      handleOpen()
    }}/>
    <ul className="responsive">
    <li className="table-header">
      <div className="col col-1"> Id</div>
      <div className="col col-2">categorie</div>
   
      <div className="col col-3">Actions</div>
    </li>

    {
      categories.map((cat,index)=>(
     
        <li className="table-row"key={cat._id}>
        <div className="col col-1" data-label="Id">{index}</div>
        <div className="col col-2" data-label="libelle">{cat.type_cat}</div>
        <div className="col col-3" data-label="Actions">
        <div className='row'>
        <BsPencilFill onClick={()=>{

            setAjouter(false)
            handleOpen()
          console.log("objet ",cat._id)
          getCategorie(cat._id)
        }}style={{color:'blue'}} />
          <BsXCircleFill onClick={()=>{
            deleteCategroie(cat._id)
          }}
         style={{color:'red'}}/>
    
      </div>

        </div>
      </li>
      ))
    }
    


  </ul>
      </div>
      {categories.length === 0 && <Loading/>}
    </>
  )
}

export default Categories
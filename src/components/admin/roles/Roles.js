import React, { useState,useEffect } from 'react'
import DashboardAdmin from '../DashboardAdmin'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import { BsXCircleFill ,BsPencilFill,BsPersonPlusFill,BsPersonFillGear} from "react-icons/bs";
import './roles.css'
import Loading from  '../loading/Loading'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const initialState = {
 libelle:'',
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
function Roles() {

const [roles,SetRoles]=useState([])
const [open, setOpen] = useState(false);
const [role, setRole] = useState(initialState)
const[ajouter,setAjouter]=useState(false);
const token=localStorage.getItem('token')

const handleChangeInput = e =>{
  

  const {name, value} = e.target
  setRole({...role, [name]:value})
}

const getAllRoles= async()=>{
  try {
    await fetch('/role/roles').then(res=>res.json()).then(data=>{
      console.log("roles",data)
     
      setTimeout(() => {
        // console.log("msg",employe)
        SetRoles(data)
       }, 1000);
    })
  } catch (error) {
    alert(error.response.data.msg)
  }

}
useEffect(()=>{
getAllRoles()

},[])




const handleOpen = () => {
 
  setOpen(true);
};
const handleClose = () => {
  setOpen(false);
};

const deleteRole=(id)=>{
  try {
    confirmAlert({
      title: 'Confirmer la suppression',
      message: 'êtes-vous sûr de supprimer role....',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            fetch('/role/role/'+id,{
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
                toast.success(<b>supprimé {role.libelle} avec succès </b>);
                 getAllRoles()
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

const getRole =async(id)=>{
  try {
    await fetch('/role/role/'+id,{
      method:'get',
  
    }).then(res=>res.json()).then(data=>{
      //console.log("getuser",data)
      setRole(data)
  
  
    })
  } catch (error) {
    console.log(error)
  }
}



const handleSubmit = async e =>{
  e.preventDefault()
 

  console.log('role',{...role})
  console.log("token",token)

    try {
     await fetch('/role/role', {
        method:'post',
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          Authorization: token
        },
        body:JSON.stringify({
         ...role
        }),

       
    }).then(res=>res.json()).then(data=>{
      console.log("data",data)
  
        if (data.msg==='role created'){
          handleClose()
          toast.success(<b>role {data.result.libelle} créer avec succès</b>)
          setTimeout(() => {
            // console.log("msg",employe)
            getAllRoles()
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

const ModifierRole=async(id)=>{
 const {libelle}=role
  if (libelle===""){
    toast.error('Veuillez remplir toutes les informations')
    return false
  }

  try {
    await fetch('/role/role/'+id,{
      method:'put',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({...role}),
    }).then(res=>res.json()).then(async data=>{
     console.log("role update",data)
     if (data.msg==='update a role'){
      handleClose()
      toast.success(<b>role {role.libelle} modifier avec succès</b>)
      setTimeout(() => {
        // console.log("msg",employe)
        getAllRoles()
       }, 300);
       return true
    }
    else{
      toast.error("role existe")
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
   
    <h2>Roles <small></small></h2>


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
       { ajouter ? (<h3>Ajouter Role </h3>):(<h3>Modifier Role </h3>)} 
        <input type='text' name="libelle"required placeholder='role' value={role.libelle}
                   onChange={handleChangeInput}    />
          
      
          <div className='row'>
                {ajouter ?  (<button type='submit'>Ajouter</button>):(<button type='button' onClick={()=>{
                  ModifierRole(role._id)
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
    <BsPersonFillGear className='addrole' onClick={()=>{
        setAjouter(true)
        setRole(initialState)
      handleOpen()
    }}/>
    <ul className="responsive">
    <li className="table-header">
      <div className="col col-1"> Id</div>
      <div className="col col-2">role</div>
   
      <div className="col col-3">Actions</div>
    </li>

    {
      roles.map((role,index)=>(
     
        <li className="table-row"key={role._id}>
        <div className="col col-1" data-label="Id">{index}</div>
        <div className="col col-2" data-label="libelle">{role.libelle}</div>
        <div className="col col-3" data-label="Actions">
        <div className='row'>
        <BsPencilFill onClick={()=>{
            setAjouter(false)
            handleOpen()
          console.log("objet ",role._id)
          getRole(role._id)
        }}style={{color:'blue'}} />
          <BsXCircleFill onClick={()=>{
            deleteRole(role._id)
          }}
         style={{color:'red'}}/>
    
      </div>

        </div>
      </li>
      ))
    }
    


  </ul>
      </div>
      {roles.length === 0 && <Loading/>}
    </>
  )
}

export default Roles
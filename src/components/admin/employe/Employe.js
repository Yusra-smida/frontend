import React, { useEffect, useState } from 'react'
import DashboardAdmin from '../DashboardAdmin'
import { BsXCircleFill, BsPencilFill } from "react-icons/bs";
import { IoIosPersonAdd } from "react-icons/io";
import './style.css'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Loading from '../loading/Loading';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { GoSearch } from "react-icons/go";
import { Alert, message } from 'antd';
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
  nom: '',
  prenom: '',
  email: '',
  role: '',
  adress: '',
  _id: ''
}

function Employe() {

  const token = localStorage.getItem('token')
  const [load, setLoad] = useState(false)
  const [ajouter, setAjouter] = useState(false);

  const [emp, setEmp] = useState(initialState)
  const [roles, setRoles] = useState([])
  const [employe, setEmploye] = useState([])
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([])
  const handleChangeInput = e => {


    const { name, value } = e.target
    setEmp({ ...emp, [name]: value })
  }

  const alertmsg = () => {
    setTimeout(() => {
      message.error("recherche invalide !")

    }, 10);
    // setTimeout(()=>{

    //   window.location.href="/employe"
    // },1000);
  }

  const filter = (param) => {
    if (!param) {
      setData(employe)
    } else {
      const array = employe.filter(({ nom }) => nom.indexOf(param) > -1)
      //console.log(array)
      if (array.length > 0) {
        //   setEmploye(newData);
        setData(array)
        return array
      } else {
        alertmsg()
      }

    }

  }

  const searchFilterFunction = async (e, text) => {
    const { name, value } = e.target

    filter(value)
  };



  const handleSubmit = async e => {
    e.preventDefault()
    console.log("empajouter", { ...emp })
    console.log("token", token)
    try {
      await axios.post('/user/Ajouter', { ...emp }, {
        headers: { Authorization: token }
      })
      handleClose()
      setTimeout(() => {
        // console.log("msg",employe)
        getAllUser()
      }, 100);
    } catch (error) {
      alert(error.response.data.msg)
    }


  }
  const handleOpen = () => {

    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const getAllUser = () => {
    fetch('/user/getusers').then(res => res.json()).then(data => {
      //console.log("employe", data)
      setLoad(true)
      setTimeout(() => {
        // console.log("msg",employe)
        setEmploye(data)
        setData(data)

      }, 1000);


    })
  }

  useEffect(() => {

    getAllUser()
  }, [])

  useEffect(() => {
    fetch('/role/roles').then(res => res.json()).then(data => {
      console.log("roles", data)
      setRoles(data)
    })
  }, [])

  const deletUser = (id) => {
    try {


      confirmAlert({
        title: 'Confirmer la suppression',
        message: 'êtes-vous sûr de supprimer cet utilisateur....',
        buttons: [
          {
            label: 'Yes',
            onClick: () => {

              fetch('/user/deletUser/' + id, {
                method: 'delete',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',

                }
              }).then(res => res.json()).then(data => {
                console.log('supprimer', data)
                setTimeout(() => {

                  getAllUser()
                }, 100);
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
  const getUser = async (id) => {
    try {
      await fetch('/user/getuserbyid/' + id, {
        method: 'get',

      }).then(res => res.json()).then(data => {
        //console.log("getuser",data)
        setEmp(data)


      })
    } catch (error) {
      console.log(error)
    }

  }

  const modifierUser = async (id) => {
    const { nom, prenom, email, password, adress } = emp
    console.log("Upadate user", { ...emp });
    if (nom === "") {
      toast.error('Veuillez remplir nom')
      return false
    }
    if (prenom === "") {
      toast.error('Veuillez remplir prenom')
      return false
    }
    if (email === "") {
      toast.error('Veuillez remplir email')
      return false
    }
    if (password === "") {
      toast.error('Veuillez remplir mot de pass')
      return false
    }
    if (adress === "") {
      toast.error('Veuillez remplir adresse')
      return false
    }

    try {
      await fetch('/user/updateUser/' + id, {
        method: 'put',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...emp }),
      }).then(res => res.json()).then(async data => {

        handleClose()
        setTimeout(() => {
          // console.log("msg",employe)
          getAllUser()
        }, 100);

      })
      // window.location.reload()
    } catch (error) {
      alert(error.response.data.msg)
    }


  }

  return (
    <>
      <DashboardAdmin />
      <div className="container">
        <h2>Listes Des Employes <small>{employe.length}</small></h2>

        <div>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box sx={{ ...style, width: 400 }}>
              <div className='Ajouter-form'>
                <form onSubmit={handleSubmit} >
                  {ajouter ? (<h3>Ajouter Employe </h3>) : (<h3>Modifier Employe </h3>)}
                  <input type='text' name="nom" required placeholder='Nom' value={emp.nom}
                    onChange={handleChangeInput} />
                  <input type='text' name="prenom" required placeholder='Prenom'
                    onChange={handleChangeInput} value={emp.prenom} />
                  <input type='email' name="email" required placeholder='Email'
                    onChange={handleChangeInput} value={emp.email} />
                  <input type='password' name="password" required placeholder='Password' autoComplete='on'
                    onChange={handleChangeInput} />
                  <input type='text' name="adress" required placeholder='adress'
                    value={emp.adress} onChange={handleChangeInput} />
                  <div className="row">
                    <label htmlFor="role">Roles: </label>
                    <select name="role" value={emp.role.libelle} onChange={handleChangeInput}

                    >
                      <option value="" >Please select a role</option>
                      {
                        roles.map(role => (
                          <option value={role._id} key={role._id} >
                            {role.libelle}

                          </option>

                        ))
                      }
                    </select>
                  </div>

                  <div className='row'>
                    {ajouter ? (<button type='submit'>Ajouter</button>) : (<button type='button' onClick={() => {
                      modifierUser(emp._id)
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
        <div className='addsearche'>
          <IoIosPersonAdd className='add' onClick={() => {
            setAjouter(true)
            setEmp(initialState)
            handleOpen()
          }} />
          <div className='divsearche'>
            <GoSearch className="Iconsearche" />
            <input type='text' name='searche'
              className='txtsearche'

              placeholder="Rechercher .."

              onChange={(text) => {

                searchFilterFunction(text)
              }}
              //onClear={(text) => searchFilterFunction('')}
              maxLength={15} />
          </div>

        </div>

        <ul className="responsive-table">
          <li className="table-header">
            <div className="col col-1"> Id</div>
            <div className="col col-2">Nom</div>
            <div className="col col-3">Prenom</div>
            <div className="col col-4">Email</div>
            <div className="col col-5">Role</div>
            <div className="col col-6">Adresse</div>
            <div className="col col-7">Actions</div>
          </li>
          {


            data.map((em, index) => (

              <li className="table-row" key={em._id}>
                <div className="col col-1" data-label="Id">{index}</div>
                <div className="col col-2" data-label="Nom">{em.nom}</div>
                <div className="col col-3" data-label="Prenom">{em.prenom}</div>
                <div className="col col-4" data-label="Email">{em.email}</div>
                <div className="col col-5" data-label="Role">{em.role.libelle}</div>
                <div className="col col-6" data-label="Adress">{em.adress}</div>
                <div className="col col-7" data-label="Actions">
                  <div className='row'>
                    <BsPencilFill onClick={() => {
                      setAjouter(false)
                      handleOpen()
                      console.log("objet ", em._id)
                      getUser(em._id)
                    }} style={{ color: 'blue' }} />
                    <BsXCircleFill onClick={() => {
                      deletUser(em._id)
                    }} style={{ color: 'red' }} />

                  </div>

                </div>
              </li>
            ))
          }


        </ul>
      </div>
      {employe.length === 0 && <Loading />}
    </>
  )
}

export default Employe
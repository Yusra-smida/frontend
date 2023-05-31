import React, { useEffect, useState } from 'react'
import DashboardAdmin from '../DashboardAdmin'
import './equipe.css'
import { BsXCircleFill, BsPencilFill, BsPeopleFill, BsPlus } from "react-icons/bs";

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


const styleUser = {
  position: 'absolute',
  top: '50%',
  left: '9%',





};


const initialState = {
  nom_equipe: '',
  membre: [],
  _id: ''
}

const state = {

  membres: [],

}

function Equipe() {
  let Arrayper = []

  const token = localStorage.getItem('token')
  const [open, setOpen] = useState(false);

  const [openUser, setOpenUser] = useState(false);
  const [getUserdetaill, setGetUserSDetaill] = useState([])
  const [getUserdetaillRole, setGetUserSDetaillRole] = useState()
  const [viewDetailUser, setViewDetailUser] = useState(false)
  const [ajouter, setAjouter] = useState(false);
  const [equip, setquip] = useState(initialState)
  const [detailUser, setDetailUser] = useState(state)
  const [membres, setMembres] = useState([])

  const [equipes, setEquipes] = useState([])
  const [User, setUser] = useState([]);
  const [view, SetView] = useState(false)
  const [Data, setData] = useState([])


  const getAllEquipe = () => {
    fetch('/equipe/equipe').then(res => res.json()).then(data => {
      console.log("equipe", data.result)
      // setLoad(true)
      setTimeout(() => {
        // console.log("msg",employe)
        setEquipes(data.result)
        setData(data.result)
      }, 1000);


    })
  }


  useEffect(() => {

    getAllEquipe()

  }, [])

  const getUserById = async (id) => {

    try {
      const { membres } = detailUser
      await fetch('/user/getuserbyid/' + id).then(res => res.json().then(data => {
        membres.push(data)
        // console.log("USrrrr",{...detailUser})

        setUser({ ...detailUser })

        //console.log("User fin by id",data)

      }))

    } catch (error) {
      console.log(error)
    }

  }

  const UserById = async (id) => {

    try {

      await fetch('/user/getuserbyid/' + id).then(res => res.json().then(data => {

        console.log("User fin by id", data.role.libelle)
        setGetUserSDetaillRole(data.role.libelle)
        setGetUserSDetaill(data)
        handleOpenUser()

      }))

    } catch (error) {
      console.log(error)
    }

  }
  const suprimeUserEquipe = async (id) => {



    const result = detailUser.membres.filter(u => u._id === id);

    const index = detailUser.membres.indexOf(result);

    detailUser.membres.splice(index, 1)
    equip.membre.splice(id, 1)
    setquip({ ...equip })
    setDetailUser({ ...detailUser })
    console.log('set Equipe', { ...equip })
  }


  const handleChangenom = e => {

    const { nom_equipe } = equip
    const { name, value } = e.target
    setquip({ ...equip, [name]: value })
    console.log("nom", { ...equip })

  }

  const handleChangeInput = e => {

    const { membre } = equip

    const { name, value } = e.target

    console.log("membre", value)


    Arrayper.push(value)
    membre.push(value)
    console.log("membre", { ...equip })
    if (Arrayper.length > 0) {
      let lastElement = Arrayper[Arrayper.length - 1];

      //console.log("last",lastElement);

      getUserById(lastElement)
      SetView(true)

    }


  }
  const handleOpen = () => {

    setOpen(true);
  };
  const handleClose = () => {

    setOpen(false);


  };

  const handleOpenUser = () => {

    setOpenUser(true);
  };
  const handleCloseUser = () => {

    setOpenUser(false);


  };

  const getallUser = async () => {
    try {
      await fetch('/user/getusers').then(res => res.json()).then(data => {
        console.log("all user", data)
        setMembres(data)
      })
    } catch (error) {

    }
  }

  useEffect(() => {

    getallUser()

  }, [])


  const handleSubmit = async e => {
    e.preventDefault()
    console.log("equipe envoye est ", { ...equip })

    try {
      await axios.post('/equipe/equipe', { ...equip }, {
        headers: { Authorization: token }
      })
      handleClose()
      setTimeout(() => {
        // console.log("msg",employe)
        getAllEquipe()
      }, 100);
    } catch (error) {
      alert(error.response.data.msg)
    }


  }

  const deleteEquipe = async (id) => {
    try {
      confirmAlert({
        title: 'Confirmer la suppression',
        message: 'êtes-vous sûr de supprimer equipe....',
        buttons: [
          {
            label: 'Yes',
            onClick: () => {
              fetch('/equipe/equipe/' + id, {
                method: 'delete',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',

                }
              }).then(res => res.json()).then(data => {
                console.log('supprimer', data)

                setTimeout(() => {

                  toast.loading(' suppression...');

                }, 10);

                setTimeout(() => {
                  toast.dismiss();
                  toast.success(<b>supprimé {equip.nom_equipe} avec succès </b>);
                  getAllEquipe()
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
  const getEquipebyId = async (id) => {
    try {
      await fetch('/equipe/equipe/' + id, {
        method: 'get',

      }).then(res => res.json()).then(data => {
        console.log("getuser", data)
        setquip(data)


      })
    } catch (error) {
      console.log(error)
    }
  }

  const Update_Eequipe = async (id) => {
    console.log("Update equipe", { ...equip })

    try {
      await fetch('/equipe/equipe/' + id, {
        method: 'put',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...equip }),
      }).then(res => res.json()).then(async data => {
        console.log("equipe update", data)
        if (data.msg === 'update a equipe') {
          handleClose()
          toast.success(<b>equipe {equip.nom_equipe} modifier avec succès</b>)
          setTimeout(() => {
            // console.log("msg",employe)
            getAllEquipe()
          }, 300);
          return true
        }
        else {
          toast.error("role existe")
          return false
        }

      })
      // window.location.reload()
    } catch (error) {
      alert(error.response.data.msg)
    }
  }


  const alertmsg = () => {
    setTimeout(() => {
      message.error("recherche invalide !")

    }, 10);
  }

  const filter = (param) => {
    if (!param) {
      setData(equipes)
    } else {
      const array = equipes.filter(({ nom_equipe }) => nom_equipe.indexOf(param) > -1)
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


  return (
    <>
      <DashboardAdmin />
      <div className="container_requipe">
        <h2>Listes Des Equipes <small></small></h2>

        <div>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box sx={{ ...style, width: 400 }}>
              <div className='Ajouter-form'>
                <form onSubmit={handleSubmit}  >
                  {ajouter ? (<h3>Ajouter Equipe </h3>) : (<h3>Modifier Equipe </h3>)}

                  <input type='text' name="nom_equipe" required placeholder="Nom d'equipe"
                    value={equip.nom_equipe} onChange={handleChangenom} />




                  <div className="row">
                    <label htmlFor="membre">Membres d'equipe: </label>
                    <select name="membre" onChange={handleChangeInput}

                    >
                      <option value="" >Please select les membres</option>
                      {

                        membres.map(memb => (

                          <option value={memb._id} key={memb._id}  >
                            {memb.nom}

                          </option>

                        ))
                      }
                    </select>

                  </div>
                  {
                    view ? (<div className='user'>{
                      detailUser.membres.map(u => (

                        <p className='perso' key={u._id}>
                          {u.nom}  <BsXCircleFill onClick={() => { suprimeUserEquipe(u._id) }} style={{ color: 'red' }} /><br /> {u.role.libelle}

                        </p>
                      ))} </div>) : (<div className='user'>{
                        equip.membre.map(e => (

                          <p className='perso' key={e._id}>
                            {e.nom}  <BsXCircleFill onClick={() => { suprimeUserEquipe(e._id) }} style={{ color: 'red' }} /><br />

                          </p>
                        ))} </div>)
                  }


                  <div className='row'>
                    {ajouter ? (<button type='submit'>Ajouter</button>) : (<button type='button' onClick={() => {
                      Update_Eequipe(equip._id)
                    }}>Modifier</button>)

                    }




                  </div>

                </form>

              </div>

            </Box>
          </Modal>
        </div>

        {
          viewDetailUser && (
            <div>

              <Modal
                open={openUser}
                onClose={handleCloseUser}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
                style={styleUser}
              >

                <div className="card_user">
                  <div className="text">

                    <h3>{getUserdetaill.nom}  {getUserdetaill.prenom}</h3>

                    <p>{getUserdetaill.email} </p>
                    <p>{getUserdetaillRole}  </p>
                    <p>{getUserdetaill.adress} </p>

                  </div>
                  <div className="links">
                    <a href="https://codepen.io/l-e-e/"><i className="fab fa-codepen"></i></a>
                    <a href="https://github.com/Leena26"><i className="fab fa-github"></i></a>
                    <a href="https://www.youtube.com/channel/UCPOyUi82bRcPTdpDuSHVNbw"><i className="fab fa-youtube"></i></a>
                  </div>
                </div>


              </Modal>
            </div>
          )
        }




        <Toaster
          position="top-center"
          reverseOrder={true}
        />


        <div className='addsearche'>
          <div>
            <BsPeopleFill className='addequipe' onClick={() => {

              handleOpen()
            }} />
            <BsPlus className='plus' onClick={() => {
              setAjouter(true)
              SetView(false)
              detailUser.membres.splice(detailUser.membres)
              equip.membre.splice(equip.membre)

              setDetailUser(state)
              setquip(initialState)

              handleOpen()
            }} />
          </div>

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
        <ul className="responsive-table-equipe">
          <li className="table-header">
            <div className="col col-1"> Id</div>
            <div className="col col-2">Nom_Equipe</div>
            <div className="col col-3">Membres d'equipe</div>
            <div className="col col-4">Actions</div>
          </li>
          {


            Data.map((em, index) => (

              <li className="table-row" key={em._id}>
                <div className="col col-1" data-label="Id">{index}</div>
                <div className="col col-2" data-label="nom_equipe">{em.nom_equipe}</div>
                <div className="col col-3" data-label="membres">{em.membre.map((mem, i) => (

                  <div key={i}>

                    <p onClick={() => {
                      console.log("hi")
                      UserById(mem._id)
                      setViewDetailUser(true)

                    }}>{mem.nom}</p>


                  </div>
                ))}

                </div>

                <div className="col col-4" data-label="Actions">
                  <div className='row'>
                    <BsPencilFill onClick={() => {
                      setAjouter(false)
                      handleOpen()
                      detailUser.membres.splice(detailUser.membres)
                      equip.membre.splice(equip.membre)
                      console.log("objet ", em._id)
                      getEquipebyId(em._id)
                    }} style={{ color: 'blue' }} />
                    <BsXCircleFill onClick={() => {
                      deleteEquipe(em._id)

                    }} style={{ color: 'red' }} />

                  </div>

                </div>
              </li>
            ))
          }



        </ul>
      </div>
      {equipes.length === 0 && <Loading />}
    </>
  )
}

export default Equipe
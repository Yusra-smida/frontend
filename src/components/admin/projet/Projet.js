import React, { useState, useEffect } from 'react'
import DashboardAdmin from '../DashboardAdmin'
import { BsXCircleFill, BsPencilFill, BsPersonPlusFill } from "react-icons/bs";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { GrProjects } from "react-icons/gr";
import './projet.css'
import Loading from '../loading/Loading';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
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
  titre_projet: '',
  description_projet: '',
  data_debut_projet: '',
  data_fin_projet: '',
  etat_projet: 'en_attente',
  equipe: '',
  tache: [],
  _id: ''
}



function Projet() {
  const [projets, SetProjets] = useState([])

  const [projet, SetProjet] = useState(initialState)
  const [open, setOpen] = useState(false);
  const [ajouter, setAjouter] = useState(false);
  const [load, setLoad] = useState(false)
  const [equipes, setEquipes] = useState([])
  const [view, setView] = useState(false)
  const [equipe, setEquipe] = useState()
  const [Data, setData] = useState([])
  const handleOpen = () => {

    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const getAllProjet = () => {
    fetch('/projet/all_projet').then(res => res.json()).then(data => {
      console.log("projet", data)
      setLoad(true)
      setTimeout(() => {
        // console.log("msg",proploye)
        SetProjets(data)
        setData(data)
      }, 1000);


    })

  }
  useEffect(() => {

    getAllProjet()
  }, [])

  useEffect(() => {
    fetch('/equipe/equipe').then(res => res.json()).then(data => {
      console.log("equipe", data)
      setEquipes(data.result)

    })
  }, [])

  const handleselectchange = e => {
    const { name, value } = e.target
    SetProjet({ ...projet, [name]: value })
    const id = value

    if (id !== '') {
      console.log('equipe', id)
      equipechnage(id)

    }
  }
  const handleChangeInput = e => {


    const { name, value } = e.target
    SetProjet({ ...projet, [name]: value })
    console.log("projet select", { projet })

  }

  const equipechnage = (id) => {
    try {
      fetch('/equipe/equipe/' + id).then(res => res.json()).then(data => {
        console.log("equipe by id", data)
        setEquipe(data.nom_equipe)
        setView(false)
      })

    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    console.log("empajouter", { ...projet })

    try {
      await axios.post('/projet/projet', { ...projet })
      handleClose()
      setTimeout(() => {
        // console.log("msg",employe)
        getAllProjet()
      }, 100);
    } catch (error) {
      alert(error.response.data.msg)
    }

  }


  const deletProjet = (id) => {
    try {


      confirmAlert({
        title: 'Confirmer la suppression',
        message: 'êtes-vous sûr de supprimer cet projet....',
        buttons: [
          {
            label: 'Yes',
            onClick: () => {

              fetch('/projet/projet/' + id, {
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
                  toast.success(<b>supprimé {projet.titre_projet} avec succès </b>);
                  getAllProjet()
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


  const getprojet = async (id) => {
    try {
      await fetch('/projet/projet/' + id, {
        method: 'get',

      }).then(res => res.json()).then(data => {
        console.log("getprojet", data)
        SetProjet(data)


      })
    } catch (error) {
      console.log(error)
    }

  }



  const updateprojet = async (id) => {
    try {
      const { titre_projet, description_projet, data_debut_projet, data_fin_projet, equipe } = projet
      if (titre_projet === "") {
        toast.error('Veuillez remplir titre')
        return false
      }
      if (description_projet === "") {
        toast.error('Veuillez remplir description_projet')
        return false
      }
      if (data_debut_projet === "") {
        toast.error('Veuillez remplir data_debut_projet')
        return false
      }
      if (data_fin_projet === "") {
        toast.error('Veuillez remplir data_fin_projet')
        return false
      }
      if (equipe === "") {
        toast.error('Veuillez choisir une equipe')
        return false
      }
      await fetch('/projet/projet/' + id, {
        method: 'put',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...projet }),
      }).then(res => res.json()).then(async data => {

        handleClose()
        toast.success(<b>projet {projet.titre_projet} modifier avec succès</b>)
        setTimeout(() => {
          // console.log("msg",employe)
          getAllProjet()
        }, 300);

      })


    } catch (error) {
      console.log(error)
    }
  }

  const alertmsg = () => {
    setTimeout(() => {
      message.error("recherche invalide !")

    }, 10);
  }

  const filter = (param) => {
    if (!param) {
      setData(projets)
    } else {
      const array = projets.filter(({ titre_projet }) => titre_projet.indexOf(param) > -1)
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
      <div className="container_projet" >
        <h2>Listes Des Projets <small>{projets.length} projets</small></h2>


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
                  {ajouter ? (<h3>créer projet</h3>) : (<h3>modifer projet </h3>)}
                  <input type='text' name="titre_projet" required placeholder='titre_projet'
                    onChange={handleChangeInput} value={projet.titre_projet} />
                  <input type='text' name="description_projet" required placeholder='description_projet'
                    onChange={handleChangeInput} value={projet.description_projet} />
                  <input type='date' name="data_debut_projet" required placeholder='data_debut_projet'
                    onChange={handleChangeInput} value={projet.data_debut_projet} />
                  <input type='date' name="data_fin_projet" required placeholder='data_fin_projet'
                    onChange={handleChangeInput} value={projet.data_fin_projet} />

                  <div className="row">
                    <label htmlFor="equipe">equipe: </label>
                    <select name="equipe"
                      onChange={handleselectchange} value={projet.equipe.nom_equipe}
                    >
                      <option value="" >Please select a equipe</option>
                      {
                        equipes.map(eq => (
                          <option value={eq._id} key={eq._id} >
                            {eq.nom_equipe}

                          </option>

                        ))

                      }

                    </select>
                  </div>
                  {
                    view ? (<div className='user'>



                      <p className='perso' key={projet._id}>
                        {projet.equipe.nom_equipe}

                      </p>
                    </div>) : (<div className='user'>



                      <p className='perso' >

                        {equipe}
                      </p>



                    </div>)
                  }

                  <div className='row'>
                    {ajouter ? (<button type='submit'>Ajouter</button>) : (<button type='button' onClick={() => {
                      updateprojet(projet._id)
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
          <div>
            <GrProjects className='add' onClick={() => {
              setAjouter(true)
              SetProjet(initialState)
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

        <ul className="responsive-table-projet">
          <li className="table-header">
            <div className="col col-1"> Id</div>
            <div className="col col-2">titre</div>
            <div className="col col-3">description</div>
            <div className="col col-4">data_debut</div>
            <div className="col col-5">data_fin</div>
            <div className="col col-6">etat</div>
            <div className="col col-7">equipe</div>
            <div className="col col-8">tache</div>

            <div className="col col-9">Actions</div>
          </li>
          {


            Data.map((pro, index) => (

              <li className="table-row" key={pro._id}>
                <div className="col col-1" data-label="Id">{index}</div>
                <div className="col col-2" data-label="Nom">{pro.titre_projet}</div>
                <div className="col col-3" data-label="Prenom">{pro.description_projet}</div>
                <div className="col col-4" data-label="proail">{pro.data_debut_projet}</div>
                <div className="col col-5" data-label="Role">{pro.data_fin_projet}</div>
                <div className="col col-6" data-label="etat_projet">{pro.etat_projet}</div>
                <div className="col col-7" data-label="nom_equipe">{pro.equipe.nom_equipe}</div>
                <div className="col col-8" data-label="tache">{pro.tache.map((t, i) => (
                  <div key={i}>

                    <h6>{t.titre}</h6>


                  </div>

                ))}</div>
                <div className="col col-9" data-label="Actions">
                  <div className='row'>
                    <BsPencilFill onClick={() => {
                      setAjouter(false)
                      handleOpen()
                      //console.log("objet ",pro._id)
                      getprojet(pro._id)
                      setView(true)
                    }} style={{ color: 'blue' }} />
                    <BsXCircleFill onClick={() => {
                      deletProjet(pro._id)
                    }} style={{ color: 'red' }} />

                  </div>

                </div>
              </li>
            ))
          }


        </ul>
      </div>
      {projets.length === 0 && <Loading />}
    </>

  )
}


export default Projet

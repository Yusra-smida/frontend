import React from 'react'
import Navbar from './navbar/Navbar'
import { useState, useEffect } from 'react'

import { BsPencilFill } from "react-icons/bs";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import Loading from '../admin/loading/Loading';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Alert, message } from 'antd';
import { GoSearch } from "react-icons/go";
import './acceuil.css'
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
  priorite: 1,
  etat_tache: 'en_attente',
  titre_projet: '',
  _id: ''
}

const initialStateprojet = {
  titre_projet: '',
  tache: [],
  etat_projet: "en_attente",
  _id: ''
}
const etat = [
  { id: "1", etat: "en_attente" },
  { id: "2", etat: "en_cours" },
  { id: "3", etat: "terminer" },
]
function Acceuil() {

  const chef = JSON.parse(localStorage.getItem("chef"))


  const [projets, SetProjets] = useState([])
  const [equipe, setEquipes] = useState([])

  const [open, setOpen] = useState(false);
  const [tacheopen, setTacheOpen] = useState(false);
  const [etat_open, setEtat_Open] = useState(false);
  const [taches, setTache] = useState(initialState)
  const [projet, SetProjet] = useState(initialStateprojet)
  const [ajouter, setAjouter] = useState(false);
  const [Data, setData] = useState([])
  const handleOpen = () => {

    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpentache = () => {

    setTacheOpen(true);
  };
  const handleClosetache = () => {
    setTacheOpen(false);
  };
  const handleOpenEtat = () => {

    setEtat_Open(true);
  };
  const handleClosEtat = () => {
    setEtat_Open(false);
  };

  const filterprojet = async () => {
    console.log("id", (chef._id))



    const membre = chef._id




    await fetch('/equipe/findeq', {
      method: 'POST',
      headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ membre })

    }).then(res => res.json()).then(data => {

      fetch('/projet/projet').then(res => res.json()).then(result => {

        const projet = result.filter(item => item.equipe._id === data.result._id)
        console.log("projetfetch", projet)

        SetProjets(projet)
        setData(projet)

        const idtache = projet.map((pro, index) => (pro.tache))
        for (let j = 0; j < idtache.length; j++) {
          console.log("idtache", idtache[j])
        }

      })
      setTimeout(() => {
        // console.log("msg",employe)
        setEquipes(data.result)


      }, 1000);

    })




  }

  useEffect(() => {
    filterprojet()

  }, [])


  const handleChangeInput = e => {


    const { name, value } = e.target
    setTache({ ...taches, [name]: value })
    console.log("projet select", { taches })

  }
  const handlechnageetatprojet = e => {
    const { name, value } = e.target
    SetProjet({ ...projet, [name]: value })
    console.log("eta projet", { [name]: value })
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

  const get_Taches = async (id) => {
    try {
      await fetch('/tache/tache/' + id, {
        method: 'get',

      }).then(res => res.json()).then(data => {
        console.log("getTache", data)
        setTache(data)


      })
    } catch (error) {
      console.log(error)
    }

  }
  const updateProjet = async (id) => {
    const { tache } = projet

    taches.titre_projet = projet.titre_projet
    const newTache = await fetch('/tache/tache', {
      method: 'POST',
      headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...taches })

    })

    const result = await newTache.json();
    console.log("result", result)
    tache.push(result.result._id)
    console.log("projet", { ...projet })
    await fetch('/projet/projet/' + id, {
      method: 'put',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...projet }),
    }).then(res => res.json()).then(async data => {
      console.log(data)
      handleClose()
      toast.success(<b>tache créer</b>)
      setTimeout(() => {
        // console.log("msg",employe)
        filterprojet()
      }, 300);
    })


  }


  const update_etatprojet = async (id) => {
    console.log("projet", projet.etat_projet)
    const etaProjet = projet.tache.filter(item => item.etat_tache === "terminer")
    console.log("filterr", etaProjet)
    console.log("length", projet.tache.length)
    if (etaProjet.length !== projet.tache.length) {

      if ((projet.etat_projet === "en_attente") || (projet.etat_projet === "en_cours")) {
        await fetch('/projet/projet/' + id, {
          method: 'put',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ ...projet }),
        }).then(res => res.json()).then(async data => {
          console.log(data)
          handleClosEtat()
          toast.success(<b>projet modifier</b>)
          setTimeout(() => {
            // console.log("msg",employe)
            filterprojet()
          }, 300);
        })
      }


      else {
        alert(" ce projet ne peut pas etre modifié en raison des taches incomplets")
        handleClosEtat()
        return false
      }

    }
    else {
      await fetch('/projet/projet/' + id, {
        method: 'put',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...projet }),
      }).then(res => res.json()).then(async data => {
        console.log(data)
        handleClosEtat()
        toast.success(<b>projet modifier</b>)
        setTimeout(() => {
          // console.log("msg",employe)
          filterprojet()
        }, 300);
      })
    }
  }
  const alertmsg = () => {

    toast.error("recherche invalide !")


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
      <Navbar />
      <div className="container_acceuil" >
        <h2>Listes Des Projets <small>{projets.length} projets</small></h2>



        {

          //affeche detaill tache 

        }



        <div>

          <Modal
            open={tacheopen}
            onClose={handleClosetache}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box sx={{ ...style, width: 600 }}>
              <div className='form_tache'>

                {!ajouter && (<h3>Detaill Tache {taches.titre}</h3>)}
                <table className='table'>
                  <tbody>
                    <tr>
                      <th>tache</th>
                      <th>description</th>
                      <th>data_debut</th>
                      <th>data_fin</th>
                      <th>priorite</th>
                      <th>etat_tache</th>
                    </tr>
                    <tr>
                      <td>{taches.titre}</td>
                      <td>{taches.description}</td>
                      <td>{taches.data_debut}</td>
                      <td>{taches.data_fin}</td>
                      <td>{taches.priorite}</td>
                      <td>{taches.etat_tache}</td>
                    </tr>

                  </tbody>
                </table>




              </div>

            </Box>
          </Modal>
        </div>

        {
          //modale eta projet 
        }

        <div>

          <Modal
            open={etat_open}
            onClose={handleClosEtat}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box sx={{ ...style, width: 400 }}>
              <div className='form_tache'>

                {!ajouter && (<h3>modifier etat projet</h3>)}




                <div className="row_projet">

                  <select name="etat_projet"
                    onChange={handlechnageetatprojet}
                  >
                    <option value="" >Please select etat projet</option>
                    {

                      etat.map(e => (

                        <option value={e.etat} key={e.id}  >
                          {e.etat}

                        </option>

                      ))
                    }
                  </select>
                  <button type='button' className='btn_modif' onClick={() => {
                    update_etatprojet(projet._id)
                  }}>Modifier etat projet</button>
                </div>













              </div>

            </Box>
          </Modal>
        </div>


        <ToastContainer
          position="top-center"
          reverseOrder={true}
        />


        {
          // modale creer tache 
        }

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
                  {ajouter ? (<h3>créer Taches</h3>) : (<h3>Modifier tache </h3>)}
                  <input type='text' name="titre" required placeholder='titre'
                    onChange={handleChangeInput} value={taches.titre} />
                  <input type='text' name="description" required placeholder='description'
                    onChange={handleChangeInput} value={taches.description} />
                  <input type='date' name="data_debut" required placeholder='data_debut'
                    onChange={handleChangeInput} value={taches.data_debut} />
                  <input type='date' name="data_fin" required placeholder='data_fin'
                    onChange={handleChangeInput} value={taches.data_fin} />
                  <input type='number' name="priorite" required placeholder='priorite'
                    onChange={handleChangeInput} value={taches.priorite} />
                  {!ajouter && <input type='text' name="etat_tache" required placeholder='etat_tache'
                    onChange={handleChangeInput} value={taches.etat_tache} />
                  }
                  <div className='row'>
                    {ajouter ? (<button type='button' onClick={() => {
                      updateProjet(projet._id)
                    }}>créer</button>) : (<button type='button' onClick={() => {


                    }}>Modifier tache</button>)}




                  </div>

                </form>

              </div>

            </Box>
          </Modal>
        </div>
        <div className='searchadd'>
          <div className='acceuilsearch'>
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
                <div className="col col-2" data-label="titre_projet">{pro.titre_projet}</div>
                <div className="col col-3" data-label="description_projet">{pro.description_projet}</div>
                <div className="col col-4" data-label="data_debut_projet">{pro.data_debut_projet}</div>
                <div className="col col-5" data-label="data_fin_projet">{pro.data_fin_projet}</div>
                <div className="col col-6"
                  onClick={() => {
                    getprojet(pro._id)
                    handleOpenEtat()
                  }} data-label="etat_projet">
                  {pro.etat_projet === "terminer" ? (
                    <div key={index}>

                      <p

                        style={{ color: '#0EDC86' }} >{pro.etat_projet}</p>



                    </div>
                  ) : (
                    <div key={index}>

                      <p style={{ color: '#FF6E61' }} >{pro.etat_projet}</p>


                    </div>
                  )




                  }</div>
                <div className="col col-7" data-label="equipe">{pro.equipe.nom_equipe}</div>
                <div className="col col-8" data-label="tache">{pro.tache.map((t, i) => (
                  t.etat_tache === "terminer" ? (<div key={i}>

                    <p onClick={() => {
                      setAjouter(false)
                      handleOpentache()
                      get_Taches(t._id)
                    }} style={{ color: '#0EDC86' }} >{t.titre}</p>



                  </div>) : (<div key={i}>

                    <p onClick={() => {
                      setAjouter(false)
                      handleOpentache()
                      get_Taches(t._id)
                    }} style={{ color: '#FF6E61' }} >{t.titre}</p>


                  </div>)




                ))}</div>
                <div className="col col-9" data-label="Actions">
                  <div className='row'>
                    <BsPencilFill onClick={() => {
                      setAjouter(true)
                      setTache(initialState)

                      console.log("objet ", pro._id)
                      getprojet(pro._id)
                      handleOpenEtat()
                    }} style={{ color: 'blue' }} />


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

export default Acceuil
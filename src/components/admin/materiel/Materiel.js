import React, { useState, useEffect } from 'react'
import DashboardAdmin from '../DashboardAdmin'
import './materiel.css'
import { BsXCircleFill, BsPencilFill, BsFillPlusCircleFill } from "react-icons/bs";
import Loading from '../loading/Loading';
import LoadingImg from '../loading/LoadingImg';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import axios from 'axios'

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
//import toast, { Toaster } from 'react-hot-toast';
import { Alert, message } from 'antd';
import { GoSearch } from "react-icons/go";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const initialState = {
  code_materiel: '',
  designation: '',
  categorie: '',
  uls: '',
  type: '',
  _id: ''
}

const Uls = [
  { id: "1", uls: "tunis" },
  { id: "2", uls: "manouba" },
  { id: "3", uls: "ben arous" },
  { id: "4", uls: "ariana" },
]

const Types = [
  { id: "1", type: "capex" },
  { id: "2", type: "opex" },

]

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

function Materiel() {

  const [materiles, SetMateriles] = useState([])

  const [loading, setLoading] = useState(false)
  const [materiel, setMateriel] = useState(initialState)
  const [open, setOpen] = useState(false);
  const [ajouter, setAjouter] = useState(false);
  const [categories, Setcategories] = useState([])
  const [categorie, Setcategorie] = useState()
  const [view, setView] = useState(false)
  const [ULS, setULs] = useState()
  const [TYPES, SetTypes] = useState()
  const [Data, setData] = useState([])
  const handleOpen = () => {

    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const getAllMateiel = async () => {

    fetch('/materiel/materiel').then(res => res.json()).then(data => {
      //console.log("materiel",data.result)
      //setLoad(true)
      //console.log("msg",data)
      setTimeout(() => {

        SetMateriles(data.result)
        setData(data.result)
      }, 1000);


    })
  }
  useEffect(() => {

    getAllMateiel()
  }, [])
  useEffect(() => {
    fetch('/categorie/categorie').then(res => res.json()).then(data => {
      console.log("categorie", data)
      Setcategories(data)

    })
  }, [])


  const handleChangeInput = e => {
    const { name, value } = e.target
    setMateriel({ ...materiel, [name]: value })
    console.log("mate", materiel)
  }


  const handleULStchange = e => {
    const { name, value } = e.target
    setMateriel({ ...materiel, [name]: value })
    console.log("mate", materiel)


    console.log('ULS', value)
    setULs(value)


  }

  const handleTypetchange = e => {
    const { name, value } = e.target
    setMateriel({ ...materiel, [name]: value })
    console.log("mate", materiel)


    console.log('ULS', value)
    SetTypes(value)


  }

  const handleselectchange = e => {
    const { name, value } = e.target
    setMateriel({ ...materiel, [name]: value })
    const id = value

    if (id !== '') {
      console.log('equipe', id)
      categoriechange(id)

    }
  }

  const categoriechange = (id) => {
    try {
      fetch('/categorie/categorie/' + id).then(res => res.json()).then(data => {
        console.log("categorie", data)
        Setcategorie(data.type_cat)
        setView(false)
      })

    } catch (error) {
      console.log(error)
    }
  }



  const handleSubmit = async e => {
    e.preventDefault()
    // console.log("empajouter",{...projet})

    try {
      await axios.post('/materiel/matereil', { ...materiel })
      handleClose()
      setTimeout(() => {
        // console.log("msg",employe)
        getAllMateiel()
      }, 100);
    } catch (error) {
      alert(error.response.data.msg)
    }

  }



  const deletMateriel = (id) => {
    try {


      confirmAlert({
        title: 'Confirmer la suppression',
        message: 'êtes-vous sûr de supprimer cet materiel....',
        buttons: [
          {
            label: 'Yes',
            onClick: () => {

              fetch('/materiel/matereil/' + id, {
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
                  toast.success(<b>supprimé {materiel.libelle} avec succès </b>);
                  getAllMateiel()
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

  const getmatById = async (id) => {
    try {
      await fetch('/materiel/materiel/' + id, {
        method: 'get',

      }).then(res => res.json()).then(data => {
        console.log("getmateriel", data.result)

        setMateriel(data.result)


      })
    } catch (error) {
      console.log(error)
    }

  }

  const updateMateriel = async (id) => {
    try {

      // await axios.put(`/materiel/materiel/${id}`, {...materiel, images} )
      await fetch('/materiel/materiel/' + id, {
        method: 'put',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...materiel }),
      }).then(res => res.json()).then(async data => {

        handleClose()
        toast.success(<b>projet {materiel.designation} modifier avec succès</b>)
        setTimeout(() => {
          // console.log("msg",employe)
          getAllMateiel()
        }, 300);

      })


    } catch (error) {
      console.log(error)
    }
  }

  const alertmsg = () => {

    toast.error("recherche invalide !")

  };


  const filter = (param) => {
    if (!param) {
      setData(materiles)
    } else {
      const array = materiles.filter(({ code_materiel }) => code_materiel.indexOf(param) > -1)
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
      <div className="container_materiel" >
        <h2>Listes Des materiels <small>{materiles.length}</small></h2>

        <div>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box sx={{ ...style, width: 400 }}>
              <div className='Ajouter-form'>
                <form onSubmit={handleSubmit}>
                  {ajouter ? (<h3>créer materiel</h3>) : (<h3>modifer materiel </h3>)}
                  <input type='text' name="code_materiel" required placeholder='code_materiel'
                    onChange={handleChangeInput} value={materiel.code_materiel} />
                  <input type='text' name="designation" required placeholder='designation'
                    onChange={handleChangeInput} value={materiel.designation} />

                  <div className="row">
                    <label htmlFor="uls">ULS :</label>
                    <select name="uls" onChange={handleULStchange}
                      value={materiel.uls}
                    >
                      <option value="" >Please select ULS</option>
                      {

                        Uls.map(u => (

                          <option value={u.uls} key={u.id}  >
                            {u.uls}

                          </option>

                        ))
                      }
                    </select>

                  </div>
                  {
                    view ? (<div className='user'>



                      <p className='perso' key={materiel._id}>
                        {materiel.uls}

                      </p>
                    </div>) : (<div className='user'>



                      <p className='perso' >

                        {ULS}
                      </p>



                    </div>)
                  }
                  <div className="row">
                    <label htmlFor="type">Types :</label>
                    <select name="type" onChange={handleTypetchange}
                      value={materiel.type}
                    >
                      <option value="" >Please select Type</option>
                      {

                        Types.map(t => (

                          <option value={t.type} key={t.id}  >
                            {t.type}

                          </option>

                        ))
                      }
                    </select>

                  </div>

                  {
                    view ? (<div className='user'>



                      <p className='perso' key={materiel._id}>
                        {materiel.type}

                      </p>
                    </div>) : (<div className='user'>



                      <p className='perso' >

                        {TYPES}
                      </p>



                    </div>)
                  }



                  <div className="row">
                    <label htmlFor="categorie">categorie: </label>
                    <select name="categorie"
                      onChange={handleselectchange}
                      value={materiel.categorie.type_cat}   >
                      <option value="" >Please select a categories</option>
                      {
                        categories.map(cat => (
                          <option value={cat._id} key={cat._id} >
                            {cat.type_cat}

                          </option>

                        ))

                      }

                    </select>
                  </div>

                  {
                    view ? (<div className='user'>



                      <p className='perso' key={materiel._id}>
                        {materiel.categorie.type_cat}

                      </p>
                    </div>) : (<div className='user'>



                      <p className='perso' >

                        {categorie}
                      </p>



                    </div>)
                  }


                  <div className='row'>
                    {ajouter ? (<button type='submit'>Ajouter</button>) : (<button type='button' onClick={() => {
                      updateMateriel(materiel._id)
                    }}>Modifier</button>)

                    }


                  </div>

                </form>

              </div>

            </Box>
          </Modal>
        </div>


        <ToastContainer
          position="top-center"
          reverseOrder={true}

        />




        <div className='addsearche'>
          <BsFillPlusCircleFill className='add_materiel' onClick={() => {
            setAjouter(true)
            setMateriel(initialState)

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
        <ul className="responsive-table-materiel">
          <li className="table-header">
            <div className="col col-1"> Id</div>
            <div className="col col-2">code_materiel</div>
            <div className="col col-3">designation</div>
            <div className="col col-4">categorie</div>
            <div className="col col-5">Uls</div>
            <div className="col col-6">type</div>

            <div className="col col-9">Actions</div>
          </li>
          {


            Data.map((mat, index) => (

              <li className="table-row" key={mat._id}>
                <div className="col col-1" data-label="Id">{index}</div>
                <div className="col col-2" data-label="code_materiel">{mat.code_materiel}</div>
                <div className="col col-3" data-label="libelle">{mat.designation}</div>
                <div className="col col-4" data-label="categorie">{mat.categorie.type_cat}</div>
                <div className="col col-5" data-label="ULS">{mat.uls}</div>
                <div className="col col-5" data-label="Types">{mat.type}</div>

                <div className="col col-9" data-label="Actions">
                  <div className='row'>
                    <BsPencilFill onClick={() => {
                      setAjouter(false)
                      handleOpen()
                      console.log("objet ", mat._id)
                      getmatById(mat._id)
                      setView(true)
                    }} style={{ color: 'blue' }} />
                    <BsXCircleFill onClick={() => {
                      deletMateriel(mat._id)
                    }} style={{ color: 'red' }} />

                  </div>

                </div>
              </li>
            ))
          }


        </ul>
      </div>
      {materiles.length === 0 && <Loading />}
    </>

  )
}

export default Materiel
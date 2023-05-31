import React,{useEffect,useState} from 'react'
import DashboardAdmin from '../DashboardAdmin'
import './matReserve.css'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import toast, { Toaster } from 'react-hot-toast';
const etat=[
  {id:"1",etat:"en_attente"},

  {id:"2",etat:"confirmer"},
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
const initialState = {

  confirmer:"en_attente",
  _id: ''
}
function MatReserve() {

    const [reservations,SetReservations]=useState([])
    const [reservation,SetReservation]=useState(initialState)
    const [etat_open, setEtat_Open] = useState(false);

    const handleOpenEtat = () => {
 
      setEtat_Open(true);
    };
    const handleClosEtat = () => {
      setEtat_Open(false);
    };



    const getAllreservation =async()=>{

        fetch('/reservation/reservation').then(res=>res.json()).then(data=>{
          //console.log("materiel",data.result)
          //setLoad(true)
          //console.log("msg",data)
          setTimeout(() => {
           
            SetReservations(data.result)
           }, 1000);
        
          
        })
      }
      useEffect(()=>{
    
        getAllreservation()
      },[])

      const handlechnagereservation = e =>{
        const {name, value} = e.target
        SetReservation({...reservation,[name]:value})
        console.log("eta reservation",{[name]:value})

        console.log(" reservation",{reservation})
      }

      const getReserve=async(id)=>{
        try {
          await fetch('/reservation/reservation/'+id,{
            method:'get',
        
          }).then(res=>res.json()).then(data=>{
            console.log("get resevation",data.result)
          
            SetReservation(data.result)
        
          })
        } catch (error) {
          console.log(error)
        }
      }

      const confirmation = async(id)=>{
console.log('reservation',reservation.confirmer)
await fetch('/reservation/reservation/'+id,{
  method:'put',
  headers:{
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body:JSON.stringify({...reservation}),
}).then(res=>res.json()).then(async data=>{
  console.log(data)
  handleClosEtat()
  toast.success(<b>confirmation </b>)
  setTimeout(() => {
    // console.log("msg",employe)
    getAllreservation()
   }, 300);
})
 
      }

  return (
    <>
    <DashboardAdmin />
        <div className="materiel_reserve" >
        <h2>Listes Des materiels reservée<small></small></h2>
        <Toaster
  position="top-center"
  reverseOrder={true}
/>
        <div>
      
      <Modal
        open={etat_open}
        onClose={handleClosEtat}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
        <div className='form_tache'>
      
<h3>modifier etat projet</h3>   


      
<div className="row_projet">
                  
                    <select name="confirmer" 
                  onChange={handlechnagereservation}
                    >
                        <option value="" >Please select confirmation</option>
                        {
                       
                       etat.map(e => (
                             
                              <option value={e.etat} key={e.id}  >
                                  {e.etat}
                                
                              </option>
                  
                          ))
                        }
                    </select>
                    <button type='button' className='btn_modif' onClick={()=>{
                confirmation(reservation._id)
                }}>confirmer</button>
                </div>
              
     
                
                
            
         
       
  


   
    

    </div>
   
        </Box>
      </Modal>
    </div>


        <ul className="responsive-materiel-reserve">
    <li className="table-header">
      <div className="col col-1"> Id</div>
      <div className="col col-2">chef</div>
      <div className="col col-3">projet</div>
      <div className="col col-4">code_materiel</div>
      <div className="col col-5">uls</div>
      <div className="col col-6">metre</div>
      <div className="col col-7">unite</div>
      <div className="col col-8">date</div>
      <div className="col col-9">etats</div>
     
    

    </li>
    {  
   

   reservations.map((reserve,index)=>(
  
     <li className="table-row"key={reserve._id}>
     <div className="col col-1" data-label="Id">{index}</div>
     <div className="col col-2" data-label="chef">{reserve.chef.nom}</div>
     <div className="col col-3" data-label="titre projet">{reserve.projet.titre_projet}</div>
     <div className="col col-4" data-label="code materiel">{reserve.materiel.code_materiel}</div>
     <div className="col col-5" data-label="uls"> {reserve.materiel.uls} </div>
     <div className="col col-6" data-label="unite">
       {reserve.unite!==0 ?(
        <div key={index}>
    
        <p >{reserve.unite}</p>
     
      
      
     </div>
      ):(
        <div key={index}>
    
    <p  >-</p>
 
  
 </div>
      )
      
      }
     
     
     
    </div>
     <div className="col col-7" data-label="metre"> {reserve.metre!==0 ?(
        <div key={index}>
    
        <p >{reserve.metre} metre</p>
     
      
      
     </div>
      ):(
        <div key={index}>
    
    <p >-</p>
 
  
 </div>
      )
      
      }</div>
     <div className="col col-8" data-label="date ">{reserve.date_reservation}</div>
     <div className="col col-9" data-label="confirmation"   
       onClick={()=>{

        getReserve(reserve._id)  
        handleOpenEtat()
}}
     >{reserve.confirmer}</div>
  
   </li>
   ))
 }


  </ul>
        </div>
        </>
  )
}

export default MatReserve
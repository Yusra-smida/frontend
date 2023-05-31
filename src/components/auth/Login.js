import React ,{useState}from 'react'
import './login.css'
import Loading from '../admin/loading/Loading'
import {Link}from 'react-router-dom'
import axios from 'axios'
import img from '../../assets/images/logo_tt.png'
function Login() {
  const [user,setUser]=useState({
    email:'',
    password:''
  })
  const [validation,setValidation]=useState(false);
const [erroremail,setErrorEmail]=useState("")
const [errormdp,setErrorMdp]=useState("")
const onChangeInput=e=>{
  const {name,value}=e.target;
  setUser({...user,[name]:value})
  
}
  
  const loginSubmit= async e=>{
    e.preventDefault()
    try {
    const {email,password}=user;
     if(email==="") {
      setErrorEmail("Erreur Email Champ Obligatoire")
      setValidation(false)
      return false
     }else{
      setErrorEmail('')
      setValidation(true)
   
     }
   if(password==="") {
    setErrorMdp("Erreur mot de passe Champ Obligatoire")
    setValidation(false)
    return false
   }else{
    setErrorMdp('')
    setValidation(true)
    console.log("user",{...user})
   }
      await fetch('/user/login',{
        method:'post',
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          email:email,
          password:password
        }),
      }).then(res=>res.json()).then(async data=>{
        
    
        if (data.msg==='Incorrect password'){
          alert("mot de passe  incorrect")
          return false
        }
     
        if(email!==data.email){
            alert("email incorrect")
            return false
        }
       
     
        if (data.role.libelle==="admin"){
        
          localStorage.setItem('LoginAdmin', true)
          localStorage.setItem('admin',JSON.stringify(data))
          localStorage.setItem('token',data.accessToken)
          window.location.href='/admin';
          return true
        }

        if (data.role.libelle==="chef projet"){
          localStorage.setItem('Login', true)
          localStorage.setItem('chef',JSON.stringify(data))
          window.location.href='/acceuil';
          return true
        }
        if (data.role.libelle==="collaborateur"){
          localStorage.setItem('Logincol', true)
          localStorage.setItem('collaborateur',JSON.stringify(data))
          window.location.href='/collaborateur';
          return true
        }

       
      })
      
    } catch (err) {
      alert(err.data.msg)
      
    }
  }
  return (

    <div className='login-form'>
       <h2>Login</h2>
       <div>
          <img src={img} alt="logouser" id="imglog" className="imagelog" />
        </div>
    <form onSubmit={loginSubmit}>
       
      <input type='email' name="email" placeholder='Email' 
                  value={user.email} onChange={onChangeInput}/>
                 {!validation && (<label style={{color:'red'}}>{erroremail}</label>)} 
      <input type='password' name="password" placeholder='Password' autoComplete='on'
                  value={user.password} onChange={onChangeInput}/>
                    {!validation && (<label style={{color:'red'}}>{errormdp}</label>)} 
      <div className='row'>
        <button type='submit'>Login</button>
      
      </div>

    </form>

</div>


    
  )
}

export default Login
import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';






const Landing = ()=>{
    return(
    <div>
         <img src="https://images4.alphacoders.com/223/223754.jpg" alt="Noimg" className='imagengrande'/>
         <Link to='/home/0' > <h1 className='entrar'>Entrar</h1> </Link>
    </div>
       
    )
}

export default Landing;
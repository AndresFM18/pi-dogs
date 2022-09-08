import React from 'react';
import {Link} from 'react-router-dom';
import './NavBar.css'




const NavBar = ()=>{
    return(
        <div className="barra-superior">
          
          <div class="logotipo">
                <img src="https://images.vexels.com/media/users/3/147761/isolated/preview/dfc335579a8cee164c3069d0548016f3-logotipo-de-aseo-de-perros.png" alt="noIMG"/>
          </div>
          <div className="menu-grande">
            <ul>
            
            <Link to="/create">Create </Link>

            <Link to="/home/0">Home</Link>
            </ul>
          <div>
          
          </div>
        </div>
          
          
        
     
      </div>
    )
}

export default NavBar;

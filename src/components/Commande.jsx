import React from "react";
import TableCom from "./TableCom";
import Add from '../img/add1.png';
import {Link} from "react-router-dom"
import NavBar from "./NavBar";


const Commande = () => {
    return (
        <>
         <div className="bodyStyle">
        </div>   
              <NavBar/>
            <div className="titreCom" data-aos="zoom-in" data-aos-duration="1900">
                <p>Liste Des Commandes</p>
            </div>
            
            <div className="infocom" data-aos="zoom-in" data-aos-duration="1900">
            <Link className="Add" to="/Addcom">
               <img src={Add} alt="Add" />
            </Link>
             </div>  
           
            <TableCom />
        </>
    );
}

export default Commande;

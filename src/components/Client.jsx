import React from "react";
import TableClient from "./TableClient"; // Assuming the file path is correct
import Add from '../img/add1.png';
import {Link} from "react-router-dom"
import NavBar from "./NavBar";



const Client = () => {
    return (
        <>
        <div className="bodyStyle">
        </div>       
            <NavBar/>
            <div className="titre" data-aos="zoom-in" data-aos-duration="1900">
                <p>Liste Des Clients</p>
            </div>
            
            <div className="infoCLI" data-aos="zoom-in" data-aos-duration="1900">
            <Link className="" to="/choices">
               <img src={Add} alt="Add" />
            </Link>
             </div>   
          
            <TableClient />
         
        </>
    );
}

export default Client;

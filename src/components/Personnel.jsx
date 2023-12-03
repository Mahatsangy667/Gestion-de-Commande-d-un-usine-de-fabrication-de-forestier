import React from "react";
import TablePersonnel from './tablePers';
import Add from '../img/add1.png';
import {Link} from "react-router-dom";
import HeadImage from "./HeadImage";
import home from "../img/home.png"


const Personnel = () => {
    return (
        <>
             <HeadImage/>
             <div className="bodyList">
        </div>  
     <nav className="titrepers">
      
       <div data-aos="flip-right" data-aos-duration="3000">
        <p>Listes Des Personnels</p>
       </div>
      </nav>
      <Link className="home" to="/About">
        <img src={home} alt="home" />
      </Link>
            <div className="infopers" data-aos="zoom-in" data-aos-duration="1900">
            <Link className="Add" to="/addPersonnel">
               <img src={Add} alt="Add" />
            </Link>
             </div>   
           
            <TablePersonnel />
        </>
    );
}

export default Personnel;

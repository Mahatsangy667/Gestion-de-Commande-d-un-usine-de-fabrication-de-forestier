import React from "react";
import TableBS from './TableBs';
import HeadImage from "./HeadImage";
import home from "../img/home.png";
import {Link} from "react-router-dom";

const Bs = () => {
    return (
        <>
        <HeadImage/>
        <div className="bodyStyle">
        </div>  
<nav className="titrepers">
 
  <div data-aos="flip-right" data-aos-duration="3000">
   <p>Listes Des Bons De Sorties</p>
  </div>
 </nav>
 <Link className="home" to="/About">
   <img src={home} alt="home" />
 </Link>
           
            <TableBS />
        </>
    );
}

export default Bs;

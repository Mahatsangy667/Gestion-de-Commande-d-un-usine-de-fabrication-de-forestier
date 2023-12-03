import React from "react";
import ListeODF from './TableOdf';
import HeadImage from "./HeadImage";
import home from "../img/home.png";
import {Link} from "react-router-dom";

const ODF = () => {
    return (
        <>
        <HeadImage/>
        <div className="bodyStyle">
        </div>  
<nav className="titrepers">
 
  <div data-aos="flip-right" data-aos-duration="3000">
   <p>Listes Des Ordres De Fabrication</p>
  </div>
 </nav>
 <Link className="home" to="/About">
   <img src={home} alt="home" />
 </Link>
    
            <ListeODF />
        </>
    );
}

export default ODF;

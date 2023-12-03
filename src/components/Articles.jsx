import React from "react";
import Article from "./TableArticle";
import Add from '../img/add1.png';
import {Link} from "react-router-dom"
import NavBar from "./NavBar";


const Articles = () => {
    return (
        <>
         <div className="bodyStyle">
        </div>   
              <NavBar/>
            <div className="titreCom" data-aos="zoom-in" data-aos-duration="1900">
                <p>Liste De Tous Les Articles</p>
            </div>
           
            <div className="infoarticles" data-aos="zoom-in" data-aos-duration="1900">
            <Link className="" to="/AddArticle">
               <img src={Add} alt="Add" />
            </Link>
             </div>   

            <Article/>
        </>
    );
}

export default Articles;

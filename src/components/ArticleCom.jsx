import React from "react";
import ArticleCommande from "./tableArtCommande";
import HeadImage from "./HeadImage";
import home from "../img/home.png";
import {Link} from "react-router-dom";

const ArticleCom = () => {
    return (
        <>
        <HeadImage/>
        <div className="bodyStyle">
     
<nav className="titrepers">
 
  <div data-aos="flip-right" data-aos-duration="3000">
   <p>Listes Des Articles Commandées</p>
  </div>
 </nav>
 <Link className="home" to="/About">
   <img src={home} alt="home" />
 </Link>
           
            <ArticleCommande />
            </div>  
        </>
    );
}

export default ArticleCom;

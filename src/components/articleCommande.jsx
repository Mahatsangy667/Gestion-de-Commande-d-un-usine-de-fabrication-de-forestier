import React from "react";
import TableArticleCom from './tableArticleCom';
import return2 from '../img/return2.png';
import { Link } from "react-router-dom";
import HeadImage from "./HeadImage";

const Client = () => {
    return (
        <>
        <HeadImage/>
        <div className="bodyList">
        </div>  
        <div className="BodyAdd">
          
          <nav className="titreArticle">
         
           <div data-aos="flip-right" data-aos-duration="3000">
          
            <p>Listes Des Articles Commandées</p>
            
                                    <hr></hr>
                                </div>
          </nav>
          <Link className="return" to="/Commande">
            <img src={return2} alt="Logout" />
          </Link>
          </div>
            <TableArticleCom />
        </>
    );
}

export default Client;

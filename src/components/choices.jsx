import React from "react";
import backG from '../img/back.jpg';
import maison from '../img/service.png';
import loginImg from '../img/cli.png';
import HeadImage from "./HeadImage";
import return2 from '../img/return2.png';
import { Link, useNavigate } from "react-router-dom";


// import loginClient from './Components/loginClient'
export default function Choices(){
    let navigate = useNavigate();
    function handleClick() {
        navigate('/Add')
    }
    let navigate1 = useNavigate();
    function handleClick1() {
        navigate1('/AddService')
    }
    return(
        <>
            
                <body className="Accueil">
                    
                    <img src={backG} id="background"/>  
                    <HeadImage />        
                                  
                    <div className=''>  
                    
                        <div className='container2' data-aos="zoom-out" data-aos-duration="1900">
                        <Link className="return2" to="/Client">
                       <img src={return2} alt="Retour" />
                    </Link>   
                            <div className='card1 floating1'>
                                <img src={loginImg} id='loginImg'/>
                                <div className='content1'>
                                <p id='sehatra'>Client</p>
                                </div>
                                <div className='content2'>
                                <p id='tongasoa'>Ajouter Un Nouveau Client Externe</p>
                                <button onClick={handleClick} className='btn_accueil btn1'>Cliquer</button>
                                </div>
                            </div>
                            <div className='card2 floating2'>
                                <img src={maison} id='maison'/>
                                <div className='content3'>
                                <p>Service Demandeur</p>
                                </div>
                                <div className='content4'>
                                <p>Ajouter Un Service Demandeur</p>
                                <button onClick={handleClick1} className='btn0 btn2'>Cliquer</button>
                                </div>
                            </div>
                        </div>
                        </div> 
                </body>
        </>
    )
}
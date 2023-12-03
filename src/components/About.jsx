import React, { useState, useEffect } from "react";
import appli from "../img/appli.png";
import rizier from "../img/rizier.png";
import image7 from "../img/image7.png";
import NavBar from "./NavBar";
import logoFA from "../img/logo.png";
import orange from "../img/orange-star.svg";
import axios from "axios"; 
import copy from "../img/copy.png";

function About() {
    const [currentTime, setCurrentTime] = useState(getCurrentTime());
    const [infototal, setInfototal] = useState([]);
    
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentTime(getCurrentTime());
      }, 1000);

      const loadUsers = async () => {
        try {
          const response = await axios.get("http://localhost/gestionCommande_PHP/getNombreCom.php");
          const jsonData = response.data;
          setInfototal(jsonData);
        } catch (error) {
          console.error("Erreur lors de la récupération des données : ", error);
        }
      };

      loadUsers(); // Charger les données dès que le composant est monté
  
      return () => {
        clearInterval(interval);
      };
    }, []);

    function getCurrentTime() {
      const now = new Date();
      return `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    }

    const infototalcom = infototal.totalCommandes;
    const infoencours = infototal.commandesEnCours;
    const infotermine = infototal.commandesTerminees;

  
    return (
    <> 
    <NavBar/>
        <div>
          <div className="about__fokontany__container">
            
          <div class="container">
           <div class="left">
            <div class="top">
                <div class="date-heur">
                    <p class="time"></p>
                </div>
                <div class="contents">
                    <div class="content">
                        <div class="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26" width="208" height="208">
                                <path
                                    d="M9 1C7.34375 1 6 2.34375 6 4C6 5.65625 7.34375 7 9 7C10.65625 7 12 5.65625 12 4C12 2.34375 10.65625 1 9 1 Z M 9 7C8.699219 7 8.394531 6.992188 8.09375 7.09375C8.695313 7.894531 9 8.898438 9 10C9 10.398438 8.90625 10.789063 8.90625 11.1875C9.707031 9.988281 11 9.199219 12.5 9C11.800781 7.800781 10.5 7 9 7 Z M 17 1C15.34375 1 14 2.34375 14 4C14 5.65625 15.34375 7 17 7C18.65625 7 20 5.65625 20 4C20 2.34375 18.65625 1 17 1 Z M 17 7C15.5 7 14.199219 7.800781 13.5 9C15 9.199219 16.292969 9.988281 17.09375 11.1875C17.09375 10.789063 17 10.398438 17 10C17 8.898438 17.304688 7.894531 17.90625 7.09375C17.605469 6.992188 17.300781 7 17 7 Z M 4 7C2.34375 7 1 8.34375 1 10C1 11.65625 2.34375 13 4 13C5.65625 13 7 11.65625 7 10C7 8.34375 5.65625 7 4 7 Z M 4 13C1.800781 13 0 14.800781 0 17L0 19.1875C0 19.1875 1 20 4 20C7 20 8 19.1875 8 19.1875L8 17C8 14.800781 6.199219 13 4 13 Z M 22 7C20.34375 7 19 8.34375 19 10C19 11.65625 20.34375 13 22 13C23.65625 13 25 11.65625 25 10C25 8.34375 23.65625 7 22 7 Z M 22 13C19.800781 13 18 14.800781 18 17L18 19.1875C18 19.1875 19 20 22 20C25 20 26 19.1875 26 19.1875L26 17C26 14.800781 24.199219 13 22 13 Z M 13 11C11.34375 11 10 12.34375 10 14C10 15.65625 11.34375 17 13 17C14.65625 17 16 15.65625 16 14C16 12.34375 14.65625 11 13 11 Z M 13 17C10.800781 17 9 18.800781 9 21L9 23.1875C9 23.1875 10 24 13 24C16 24 17 23.1875 17 23.1875L17 21C17 18.800781 15.199219 17 13 17Z"
                                    fill="#ffffff" />
                            </svg>
                        </div>
                        <div class="info">
                            <span>Total Commande</span>
                            <small>5300</small>
                        </div>
                    </div>
            
                    <div class="content">
                        <div class="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="512" height="512">
                                <path
                                    d="M16 4C9.9375 4 5 8.9375 5 15C5 18.410156 6.554688 21.449219 9 23.46875L9 25L7 25L7 28L25 28L25 25L23 25L23 23.46875C25.445313 21.449219 27 18.410156 27 15C27 8.9375 22.0625 4 16 4 Z M 16 6C20.980469 6 25 10.019531 25 15C25 17.265625 24.160156 19.332031 22.78125 20.90625C22.339844 19.796875 21.257813 19 20 19C19.800781 19 19.65625 19.117188 19.46875 19.15625C18.914063 17.960938 17.898438 17 16.5 17C16.324219 17 16.167969 17.007813 16 17.03125L16 12.59375L15.71875 12.28125L14 10.5625L14 9L12 9L12 10.5625L10.28125 12.28125L10 12.59375L10 18C9.175781 18 8.417969 18.332031 7.875 18.875C7.308594 17.703125 7 16.394531 7 15C7 10.019531 11.019531 6 16 6 Z M 15 7L15 9L17 9L17 7 Z M 18 9L18 11L20 11L20 9 Z M 21 11L21 13L23 13L23 11 Z M 13 12.4375L14 13.4375L14 18.375C13.988281 18.46875 13.988281 18.5625 14 18.65625L14 22L12 22L12 13.4375 Z M 18 13L18 15L20 15L20 13 Z M 21 15L21 17L23 17L23 15 Z M 16.5 19C17.292969 19 17.902344 19.597656 17.96875 20.375L19.5 21.15625C19.664063 21.058594 19.820313 21 20 21C20.566406 21 21 21.433594 21 22L16 22L16 19.09375C16.152344 19.039063 16.328125 19 16.5 19 Z M 10 20L10 21.65625C9.667969 21.355469 9.316406 21.066406 9.03125 20.71875C9.148438 20.296875 9.53125 20 10 20Z"
                                    fill="#ffffff" />
                            </svg>
                        </div>
                        <div class="info">
                            <span>Touristes</span>
                            <small>125</small>
                        </div>
                    </div>
            
                    <div class="content">
                        <div class="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="500" height="500">
                                <path
                                    d="M15.990234 3C15.570234 3.01 15.200547 3.2701562 15.060547 3.6601562L10.730469 15.789062L9.8300781 14.449219C9.6200781 14.129219 9.2491406 13.959766 8.8691406 14.009766C8.4891406 14.059766 8.1707812 14.319688 8.0507812 14.679688L2.7695312 30.509766C4.2495313 29.559766 5.9690625 29 7.7890625 29C11.639063 29 13.779766 30.299609 15.509766 31.349609C17.029766 32.269609 18.23 33 21 33L27 33C27.46 33 27.900312 33.020547 28.320312 33.060547L23.029297 19.400391L16.929688 3.640625C16.779687 3.250625 16.440234 2.99 15.990234 3 z M 37 8C34.794 8 33 9.794 33 12C33 14.206 34.794 16 37 16C39.206 16 41 14.206 41 12C41 9.794 39.206 8 37 8 z M 26 14C25.6 14 25.240078 14.239375 25.080078 14.609375L24.15625 16.767578L30.615234 33.447266C33.404234 34.156266 35.092781 35.611547 36.300781 36.810547L26.919922 14.609375C26.759922 14.239375 26.4 14 26 14 z M 42.984375 22 A 1.0001 1.0001 0 0 0 42.619141 22.076172C42.6145 22.078089 42.610074 22.080047 42.605469 22.082031 A 1.0001 1.0001 0 0 0 42.292969 22.292969L38.292969 26.292969 A 1.0001 1.0001 0 1 0 39.707031 27.707031L42 25.414062L42 28.585938L37.292969 33.292969 A 1.0001 1.0001 0 1 0 38.707031 34.707031L42 31.414062L42 39L44 39L44 31.414062L47.292969 34.707031 A 1.0001 1.0001 0 1 0 48.707031 33.292969L44 28.585938L44 25.414062L46.292969 27.707031 A 1.0001 1.0001 0 1 0 47.707031 26.292969L43.707031 22.292969 A 1.0001 1.0001 0 0 0 43.398438 22.083984C43.390662 22.080593 43.382877 22.077416 43.375 22.074219 A 1.0001 1.0001 0 0 0 42.998047 22 A 1.0001 1.0001 0 0 0 42.984375 22 z M 8.0332031 31.005859C5.9042031 30.984859 3.9526406 31.777438 2.4316406 33.273438C0.88564063 34.793438 0 36.901734 0 39.052734L0 46.960938L50 47L50 46C50 43.243 47.757 41 45 41L40 41C37.633 41 36.59625 39.948141 35.28125 38.619141C33.68825 37.006141 31.705 35 27 35L21 35C17.676 35 16.117703 34.057594 14.470703 33.058594C12.845703 32.073594 11.168203 31.057859 8.0332031 31.005859 z"
                                    fill="#ffffff" />
                            </svg>
                        </div>
                        <div class="info">
                            <span>Attraction</span>
                            <small>6</small>
                        </div>
                    </div>
            
                </div>
            </div>
              <div class="about">
              <div class="number_section">
                <div></div>
                <h1 data-aos="fade-right" data-aos-delay="900" data-aos-duration="1000" class="texte"> FANALAMANGA SA  
                <br/><span class ="txt_verte"><i>Vers une vision plus</i> <span class="txt_verte">verte </span>  
                            <img class="orange-star" id="mysvg" src={orange} />
                        </span>
                <div className="logoFa">
                <img src={logoFA} alt="logoFA" />
                </div>
                
                </h1>
            </div>
  
                <div data-aos="zoom-out-left" data-aos-duration="2888">
                    <div class="round">
                       <img src={appli} alt="chart" />
                    </div>
                    <p class="txt">GScom<span id="FSA">FSA</span> est une application web dédiée à la gestion de commande et de la production d'articles dans l'usine
                    de transformation forestière d'Analavoatra.
                    </p>
                </div>
              </div>

             

              <div class="descriptions__container">
                <div class="descriptions__navigation" data-aos="fade-up" data-aos-delay="200" data-aos-duration="250">
                   <span class="active"><p class="txt">About Fanalamnga SA</p></span>
                </div>
                <div class="descriptions">
                    <div class="description" data-aos="fade-up" data-aos-delay="200" data-aos-duration="200">
                        <div class="image__description">
                            <img src={rizier} alt="rizier" />
                        </div>
                        <div class="text">
                            <h5 class="txt">STELE COMMEMORATIVE </h5>
                            <p class="txt">Cette stèle a été élaboré à la suite  du 40ème Anniversaire de la FANALAMANGA SA ( 1975 - 2015 ) LE 07 Août 2015.</p>
                        </div>
                    </div>

                    <div class="description"  data-aos="fade-up" data-aos-delay="700" data-aos-duration="400">
                        <div class="image__description">
                           <img src={image7} alt="image7" />
                        </div>
                        <div class="text">
                            <h5 class="txt">PERIMETRE DE L'ENTREPRISE </h5>
                            <p class="txt">FANALAMANGA SA siège à Antsirinala.Elle fait partie de l’une plus grande société dans le District de Moramanga.</p>
                        </div>
                    </div>

                </div>
              </div>
           </div>

           <div class="right">
                <div class="top"  data-aos="fade-up" data-aos-delay="300" data-aos-duration="550">
                    <div class="date-heur">
                        <p class="time txt">{ currentTime }</p>
                    </div>
                  <div class="contents">
                    <div class="content floating1">
                        <div class="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26" width="208" height="208">
                                <path
                                    d="M9 1C7.34375 1 6 2.34375 6 4C6 5.65625 7.34375 7 9 7C10.65625 7 12 5.65625 12 4C12 2.34375 10.65625 1 9 1 Z M 9 7C8.699219 7 8.394531 6.992188 8.09375 7.09375C8.695313 7.894531 9 8.898438 9 10C9 10.398438 8.90625 10.789063 8.90625 11.1875C9.707031 9.988281 11 9.199219 12.5 9C11.800781 7.800781 10.5 7 9 7 Z M 17 1C15.34375 1 14 2.34375 14 4C14 5.65625 15.34375 7 17 7C18.65625 7 20 5.65625 20 4C20 2.34375 18.65625 1 17 1 Z M 17 7C15.5 7 14.199219 7.800781 13.5 9C15 9.199219 16.292969 9.988281 17.09375 11.1875C17.09375 10.789063 17 10.398438 17 10C17 8.898438 17.304688 7.894531 17.90625 7.09375C17.605469 6.992188 17.300781 7 17 7 Z M 4 7C2.34375 7 1 8.34375 1 10C1 11.65625 2.34375 13 4 13C5.65625 13 7 11.65625 7 10C7 8.34375 5.65625 7 4 7 Z M 4 13C1.800781 13 0 14.800781 0 17L0 19.1875C0 19.1875 1 20 4 20C7 20 8 19.1875 8 19.1875L8 17C8 14.800781 6.199219 13 4 13 Z M 22 7C20.34375 7 19 8.34375 19 10C19 11.65625 20.34375 13 22 13C23.65625 13 25 11.65625 25 10C25 8.34375 23.65625 7 22 7 Z M 22 13C19.800781 13 18 14.800781 18 17L18 19.1875C18 19.1875 19 20 22 20C25 20 26 19.1875 26 19.1875L26 17C26 14.800781 24.199219 13 22 13 Z M 13 11C11.34375 11 10 12.34375 10 14C10 15.65625 11.34375 17 13 17C14.65625 17 16 15.65625 16 14C16 12.34375 14.65625 11 13 11 Z M 13 17C10.800781 17 9 18.800781 9 21L9 23.1875C9 23.1875 10 24 13 24C16 24 17 23.1875 17 23.1875L17 21C17 18.800781 15.199219 17 13 17Z"
                                    fill="#ffffff" />
                            </svg>
                        </div>
                        <div class="info">
                            <span>Total commande</span>
                            <small>{infototalcom}</small>
                        </div>
                    </div>
                    
                    <div class="content floating1">
                        <div class="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="412" height="412">
                                <path
                                    d="M16 4C9.9375 4 5 8.9375 5 15C5 18.410156 6.554688 21.449219 9 23.46875L9 25L7 25L7 28L25 28L25 25L23 25L23 23.46875C25.445313 21.449219 27 18.410156 27 15C27 8.9375 22.0625 4 16 4 Z M 16 6C20.980469 6 25 10.019531 25 15C25 17.265625 24.160156 19.332031 22.78125 20.90625C22.339844 19.796875 21.257813 19 20 19C19.800781 19 19.65625 19.117188 19.46875 19.15625C18.914063 17.960938 17.898438 17 16.5 17C16.324219 17 16.167969 17.007813 16 17.03125L16 12.59375L15.71875 12.28125L14 10.5625L14 9L12 9L12 10.5625L10.28125 12.28125L10 12.59375L10 18C9.175781 18 8.417969 18.332031 7.875 18.875C7.308594 17.703125 7 16.394531 7 15C7 10.019531 11.019531 6 16 6 Z M 15 7L15 9L17 9L17 7 Z M 18 9L18 11L20 11L20 9 Z M 21 11L21 13L23 13L23 11 Z M 13 12.4375L14 13.4375L14 18.375C13.988281 18.46875 13.988281 18.5625 14 18.65625L14 22L12 22L12 13.4375 Z M 18 13L18 15L20 15L20 13 Z M 21 15L21 17L23 17L23 15 Z M 16.5 19C17.292969 19 17.902344 19.597656 17.96875 20.375L19.5 21.15625C19.664063 21.058594 19.820313 21 20 21C20.566406 21 21 21.433594 21 22L16 22L16 19.09375C16.152344 19.039063 16.328125 19 16.5 19 Z M 10 20L10 21.65625C9.667969 21.355469 9.316406 21.066406 9.03125 20.71875C9.148438 20.296875 9.53125 20 10 20Z"
                                    fill="#ffffff" />
                            </svg>
                        </div>
                        <div class="info">
                            <span>Commande En Cours</span>
                            <small>{infoencours}</small>
                        </div>
                    </div>
                    
                    <div class="content floating1">
                        <div class="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="500" height="500">
                                <path
                                    d="M15.990234 3C15.570234 3.01 15.200547 3.2701562 15.060547 3.6601562L10.730469 15.789062L9.8300781 14.449219C9.6200781 14.129219 9.2491406 13.959766 8.8691406 14.009766C8.4891406 14.059766 8.1707812 14.319688 8.0507812 14.679688L2.7695312 30.509766C4.2495313 29.559766 5.9690625 29 7.7890625 29C11.639063 29 13.779766 30.299609 15.509766 31.349609C17.029766 32.269609 18.23 33 21 33L27 33C27.46 33 27.900312 33.020547 28.320312 33.060547L23.029297 19.400391L16.929688 3.640625C16.779687 3.250625 16.440234 2.99 15.990234 3 z M 37 8C34.794 8 33 9.794 33 12C33 14.206 34.794 16 37 16C39.206 16 41 14.206 41 12C41 9.794 39.206 8 37 8 z M 26 14C25.6 14 25.240078 14.239375 25.080078 14.609375L24.15625 16.767578L30.615234 33.447266C33.404234 34.156266 35.092781 35.611547 36.300781 36.810547L26.919922 14.609375C26.759922 14.239375 26.4 14 26 14 z M 42.984375 22 A 1.0001 1.0001 0 0 0 42.619141 22.076172C42.6145 22.078089 42.610074 22.080047 42.605469 22.082031 A 1.0001 1.0001 0 0 0 42.292969 22.292969L38.292969 26.292969 A 1.0001 1.0001 0 1 0 39.707031 27.707031L42 25.414062L42 28.585938L37.292969 33.292969 A 1.0001 1.0001 0 1 0 38.707031 34.707031L42 31.414062L42 39L44 39L44 31.414062L47.292969 34.707031 A 1.0001 1.0001 0 1 0 48.707031 33.292969L44 28.585938L44 25.414062L46.292969 27.707031 A 1.0001 1.0001 0 1 0 47.707031 26.292969L43.707031 22.292969 A 1.0001 1.0001 0 0 0 43.398438 22.083984C43.390662 22.080593 43.382877 22.077416 43.375 22.074219 A 1.0001 1.0001 0 0 0 42.998047 22 A 1.0001 1.0001 0 0 0 42.984375 22 z M 8.0332031 31.005859C5.9042031 30.984859 3.9526406 31.777438 2.4316406 33.273438C0.88564063 34.793438 0 36.901734 0 39.052734L0 46.960938L50 47L50 46C50 43.243 47.757 41 45 41L40 41C37.633 41 36.59625 39.948141 35.28125 38.619141C33.68825 37.006141 31.705 35 27 35L21 35C17.676 35 16.117703 34.057594 14.470703 33.058594C12.845703 32.073594 11.168203 31.057859 8.0332031 31.005859 z"
                                    fill="#ffffff" />
                            </svg>
                        </div>
                        <div class="info">
                            <span>Commande Livrées</span>
                            <small>{infotermine}</small>
                        </div>
                    </div>

                  </div>
                </div>

                <div class="bottom" data-aos="fade-up" data-aos-delay="40" data-aos-duration="125">
                 <div  data-aos="zoom-out" data-aos-duration="1900">
                    <h5 class="tec">Siège de FANALAMANGA SA</h5>

                 </div>
                <div class="content"  data-aos="zoom-out" data-aos-duration="2000"  >
    
                </div>
                <div className="">
                        <div className="copy">
                            <img src={copy} alt="copy" />
                            <p id="">Copyright 2023 by Aroniaina & Mahatsangy</p>
                        </div>
                    </div>
                </div>
                </div>
            </div>
           </div>
        </div>
        
        </>
      )
   };



 export default About;
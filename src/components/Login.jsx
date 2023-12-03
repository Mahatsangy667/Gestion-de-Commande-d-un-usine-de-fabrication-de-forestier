import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import wave from "../img/wave.png";
import sarykely from "../img/sarykely.png";
import bg from "../img/bg.svg";

const Login = () => {
  const navigate = useNavigate();
  //Fonction toogle
   let pass = document.getElementById('password');
   let toog = document.getElementById('toogle');

  const showpass = () => {
    if(pass.type === 'password') {
      pass.setAttribute('type','text');
      toog.classList.add('hide');
    }
    else {
      pass.setAttribute('type','password');
      toog.classList.remove('hide');
    }
   }

  // État local pour les valeurs du formulaire
  const [matricule, setMatricule] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // Fonction de gestionnaire de soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Effectuez une requête AJAX pour vérifier les informations d'identification
      const response = await fetch("http://localhost/gestionCommande_PHP/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ matricule, password }),
      });

      if (response.status === 200) {
        // Les informations d'identification sont valides, redirigez l'utilisateur
        navigate("/about");
      } else {
        // Les informations d'identification sont incorrectes, affichez une erreur
        setError("Matricule ou mot de passe incorrect.");
      }
    } catch (error) {
      console.error("Erreur lors de la vérification des informations d'identification : ", error);
      setError("Une erreur s'est produite. Veuillez réessayer.");
    }
  };

  return (
    <>
      <body>
        <div>
          <img src={wave} className="wave" alt="wave" />
        </div>
        <div className="containerlogin">
        <div class="imglogin">
			<img src={bg} alt="bg" />
		</div>
          <div className="login-content ">
            <section></section>
            <div className="image-container" >
              <img className="sarykely" src={sarykely} alt="sarykely" />
            </div>

            <div className="form-Bg_login">
              <div className="tongasoa" data-aos="zoom-out-left" data-aos-duration="3000">
                <p id="tonga">Bienvenue!!<br /><br /></p>
                <div data-aos="flip-right" data-aos-duration="3000">
                  <hr></hr>
                </div>
                <p id="ampidiro">Entrer votre Matricule et votre Mot de passe</p>
              </div>
              <form className="form-header_login" onSubmit={handleSubmit}>
                <div className="ravinala"></div>
                <div className="isionline">
                  <p>GScom<span id="FSA">FSA</span></p>
                </div>
                <div  className="inputBox">
                  <input
                    type="text"
                    name="matricule"
                    value={matricule}
                    onChange={(e) => setMatricule(e.target.value)}
                    required // Champ obligatoire
                   id="matricule"/>
                  <span>Matricule</span>
                  
                </div>
                <div className="inputBox">
                  <input
                    type="password"
            
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    
                    required // Champ obligatoire
                    id="password"/>
                    <span>Password</span>
                    <div id="toogle" onClick={showpass}></div>
                </div>
                <div className="form-group_login">
                  <button type="submit" className="btn3 btn1"><b>Connexion</b></button>
                </div>
              </form>
              {error && <p className="error-message">{error}</p>}
            </div>
            
          </div>
        </div>
      </body>
    </>
  );
}

export default Login;

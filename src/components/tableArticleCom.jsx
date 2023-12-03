import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams,useNavigate } from "react-router-dom";
import Edit from '../img/Edit.png';
import Odf from '../img/odf.png';
import Modal from 'react-modal';
import XLSX from 'xlsx';
const customModalStyles = {
  content: {
    width: '300px',
    margin: 'auto',
    height: '200px',
    background: 'white'
  }
};



const ListeArticlesCommandes = () => {
  const { numCom } = useParams();
  const [articles, setArticles] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();

  
const generateExcelFile = () => {
  // Créez la feuille Excel
  const ws = XLSX.utils.json_to_sheet(articles);

  // Personnalisez la largeur des colonnes si nécessaire
  ws['!cols'] = [{ wch: 29 }, { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 15 }, { wch: 25 }, { wch: 15 }];

  // Ajoutez les entêtes améliorées du tableau à partir de la ligne 2
  XLSX.utils.sheet_add_json(ws, [
    {
      'Numéro De l\'Article commandé': 'Numéro De l\'Article commandé',
      'Quantité': 'Quantité',
      'Numéro du Commande': 'Numéro du Commande',
      'Code D\'Article': 'Code D\'Article',
      'Reste à  livré': 'Reste à livré'
    }
  ], { skipHeader: true, origin: 'A1' });

  // Créez un classeur
  const wb = XLSX.utils.book_new();

  // Ajoutez la feuille Excel au classeur
  XLSX.utils.book_append_sheet(wb, ws, "Commande Data");

  // Enregistrez le fichier Excel avec le titre personnalisé
  XLSX.writeFile(wb, "Liste_des_Articles_commandés.xlsx");
};

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const response = await axios.get(`http://localhost/gestionCommande_PHP/listeArticlesCom.php?numCom=${numCom}`);
        const jsonData = response.data;
        setArticles(jsonData);
      } catch (error) {
        console.error("Erreur lors de la récupération des articles commandés : ", error);
      }
    };

    loadArticles(); // Appelez la fonction ici

  }, [numCom]); // Ajoutez numCom comme dépendance
  const handleACClick = async (numArtCom) => {
    try {
      const response = await axios.post("http://localhost/gestionCommande_PHP/getExistingOdf.php", {
        numArtCom: numArtCom // Envoyez les données en tant qu'objet JavaScript
      });
  
      const articlesCount = response.data.count;
      console.log(articlesCount);
      if (articlesCount > 0) {
        setModalMessage("Cet article commandé a déjà un Ordre de Fabrication.");
        setModalIsOpen(true);
      } else {
        navigate(`/formODF/${numArtCom}`);
      }
    } catch (error) {
      console.error("Erreur lors de la vérification des articles commandés : ", error);
    }
  };
  
  return (

    <>
    <div className="search_Adminar">
    <input value="Excel"  className="btn btn-success mb-3" onClick={generateExcelFile}/>
  </div>
    <div className="tablearticle" data-aos="fade-right" data-aos-delay="1000" data-aos-duration="1000">
      <table className="content-tablearticle">
        <thead>
          <tr>
            <th>Numéro Article Commandé</th>
            <th>Quantité</th>
            <th>Code Article</th>
            <th>Reste à livré</th>
            <th>Actions</th>
            <th>Ordre De Fabrication</th>
          
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.numArtCom}>
              <td>{article.numArtCom}</td>
              <td>{article.quantite}</td>
              <td>{article.codeArticle}</td>
              <td>{article.quantiteALivre}</td>
              <td id="ovaina1">
                  <Link className ="Link" to={`/updateArticleCommande/${article.numArtCom}`}>
                    <img src={Edit} alt="Modifier"/>
                  </Link>
                 
              </td>
              <td id="ovaina">
              <img
                   src={Odf} alt="Générer ODF"
                    onClick={() => handleACClick(article.numArtCom)}
                  />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customModalStyles}
        contentLabel="Alert Modal"
      
      >
        <h2   className="alerte">Erreur:</h2>
        <p>{modalMessage}</p>
        <button id= "alerte"onClick={() => setModalIsOpen(false)}>Fermer</button>
      </Modal>
    </div>
    </>
  );
};

export default ListeArticlesCommandes;

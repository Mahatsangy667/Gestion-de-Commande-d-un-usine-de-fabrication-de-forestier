import React, { useState, useEffect } from "react";
import axios from "axios";
//import XLSX from 'xlsx';

const ListeArticlesCommandes = () => {
  const [articles, setArticles] = useState([]);
  const [chercher, setChercher] = useState("");

  


  useEffect(() => {
    const loadArticles = async () => {
      try {
        const response = await axios.get(`http://localhost/gestionCommande_PHP/listeArticlesComMen.php`);
        const jsonData = response.data;
        setArticles(jsonData);
      } catch (error) {
        console.error("Erreur lors de la récupération des articles commandés : ", error);
      }
    };

    loadArticles();
  }, []);

  const handleChange = (e) => {
    setChercher(e.target.value);
  };
  
  /*
  const generateExcelFile = () => {
    // Créez la feuille Excel
    const ws = XLSX.utils.json_to_sheet(articles);
  
    // Personnalisez la largeur des colonnes si nécessaire
    ws['!cols'] = [{ wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 15 }, { wch: 25 }, { wch: 15 }];
  
    // Ajoutez les entêtes améliorées du tableau à partir de la ligne 2
    XLSX.utils.sheet_add_json(ws, [
      {
        'Numéro De L\' Article': 'Numéro De L\' Article',
        'Numéro De Commande': 'Numéro De Commande',
        'Quantité': 'Quantité',
        'Reste à livrer': 'Reste à livrer',
        'Code Article': 'Code Article',
        'Depôt': 'Depôt',
       
      }
    ], { skipHeader: true, origin: 'A1' });
  
    // Créez un classeur
    const wb = XLSX.utils.book_new();
  
    // Ajoutez la feuille Excel au classeur
    XLSX.utils.book_append_sheet(wb, ws, "Commande Data");
  
    // Enregistrez le fichier Excel avec le titre personnalisé
    XLSX.writeFile(wb, "Liste_des_Commandes.xlsx");
  };
  */

  return (
    <>
      <div className="search_Adminpers">
    
        <select value={chercher} onChange={handleChange}>
          <option value="">Tous les dépôts</option>
          <option value="Menuiserie">Menuiserie</option>
          <option value="Scierie">Scierie</option>
        </select>
      </div>
      <div className="tablearticlecomande" data-aos="zoom-out-left" data-aos-delay="1000" data-aos-duration="1000">
        <table className="content-tablearticlecomande">
          <thead>
            <tr>
              <th>Numéro Article Commandé</th>
              <th>Numéro Du Commande</th>
              <th>Quantité</th>
              <th>Code Article</th>
              <th>Reste à livrer</th>
              <th>Depôt</th>
            </tr>
          </thead>
          <tbody>
            {articles
              .filter((article) => {
                if (chercher === "") {
                  return true; // Afficher tous les articles si rien n'est sélectionné
                }
                return article.depot === chercher;
              })
              .map((article) => {
                return (
                  <tr key={article.numArtCom}>
                    <td>{article.numArtCom}</td>
                    <td>{article.numCom}</td>
                    <td>{article.quantite}</td>
                    <td>{article.codeArticle}</td>
                    <td>{article.quantiteALivre}</td>
                    <td>{article.depot}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ListeArticlesCommandes;

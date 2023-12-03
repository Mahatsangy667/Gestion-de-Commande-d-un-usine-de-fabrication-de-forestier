import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Link, useParams, useNavigate } from "react-router-dom";
import return2 from '../img/return2.png';
import HeadImage from "./HeadImage";
import ajoucli from '../img/client.png';
import logoFA from "../img/logoFA.png";

const AssignerPersonnel = () => {
  const { numCom } = useParams();
  const navigate = useNavigate();
  let numBS;

  const [bonSortieData, setBonSortieData] = useState({
    quantiteLiv: "",
    dateLiv: "",
    numArtCom: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [articlesCommandes, setArticlesCommandes] = useState([]);

  useEffect(() => {
    fetchArticlesCommandes();
  }, [numCom]);

  const fetchArticlesCommandes = async () => {
    try {
      const response = await axios.get(`http://localhost/gestionCommande_PHP/listeArticlesCommandes.php?numCom=${numCom}`);
      setArticlesCommandes(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des articles commandés : ", error);
    }
  };

  const handleBonSortieChange = (e) => {
    const { name, value } = e.target;
    setBonSortieData({
      ...bonSortieData,
      [name]: value,
    });
  };

  const generateBonSortiePDF = async (bonSortieData) => {
    const doc = new jsPDF();
    try {
      const response = await axios.get(`http://localhost/gestionCommande_PHP/getBonDetail.php?numArtCom=${bonSortieData.numArtCom}`);
      const commandeDetails = response.data;
      console.log(commandeDetails);
      const {
        articles,
      } = commandeDetails;
      doc.setFont("Spy Agency");
    doc.setFontSize(11);
    doc.text("              FANALAMANGA SA", 10, 10);
    doc.text("                        DPCM", 10, 15);
    doc.text("SERVICE DE TRANSFORMATION", 10, 20);
    doc.text("                ANALAVOATRA", 10, 25);
    doc.addImage(logoFA,'PNG',172,2,30,30);
    doc.setFont('Spy Agency','bold');
    doc.setFontSize(16);
      doc.text(`                                              BON DE SORTIE     N° ${numBS}` , 10, 50);
      doc.setFont('Spy Agency','normal');
      doc.setFontSize(12);
      doc.text(`Quantité Livrée: ${bonSortieData.quantiteLiv}`, 10, 70);
      doc.text(`Date de Livraison: ${bonSortieData.dateLiv}`, 10, 80);
      doc.text(`Numéro de l'Article de Commande: ${bonSortieData.numArtCom}`, 10, 90);
      const M = "       .......";
      doc.text("Tableau des Articles:", 10, 120);
      const tableHeaders = ["Code Article", "Design", "Dimension", "Unité", "Quantité", "Magasinier"];
      const tableData = articles.map((article) => [
        article.codeArticle,
        article.design,
        article.dimension,
        article.unite,
        article.quantite,
        M,
      ]);

      doc.autoTable({
        head: [tableHeaders],
        body: tableData,
        startY: 135,
      });
      doc.text("Accordé par le Chef Chantier                                                                            Analavoatra le ", 10, 230);
      doc.text("Ce ..../..../.......                                                                                                   Le Menuisier Receptionnaire", 10, 240);
      doc.save("Bon_de_sortie.pdf");
    } catch (error) {
      console.error("Erreur lors de la récupération des données de la commande : ", error);
    }
  };

  const handleBonSortieSubmit = async (e) => {
    e.preventDefault();

    const selectedArticle = articlesCommandes.find((article) => article.numArtCom === bonSortieData.numArtCom);

    if (!selectedArticle) {
      setErrorMessage("Sélectionnez un article de commande valide.");
      return;
    }

    if (!bonSortieData.quantiteLiv || !bonSortieData.dateLiv || !bonSortieData.numArtCom) {
      setErrorMessage("Tous les champs sont obligatoires.");
      return;
    }

    if (parseInt(bonSortieData.quantiteLiv, 10) > selectedArticle.quantiteALivre) {
      setErrorMessage("La quantité livrée ne peut pas dépasser la quantité commandée.");
      return;
    }

    try {
      const bonSortieResponse = await axios.post("http://localhost/gestionCommande_PHP/addBS.php", bonSortieData);

      if (bonSortieResponse.data.numBS) {
        numBS = bonSortieResponse.data.numBS;
        console.log(numBS);

        setSuccessMessage(`Bon de Sortie (numéro ${numBS}) ajouté avec succès.`);

        // Effectuez la soustraction de quantité ici
        const newQuantiteALivre = selectedArticle.quantiteALivre - parseInt(bonSortieData.quantiteLiv, 10);

        // Mettez à jour la quantité à livrer dans la base de données
        const updateResponse = await axios.post("http://localhost/gestionCommande_PHP/updateQuantiteALivre.php", {
          numArtCom: bonSortieData.numArtCom,
          quantiteALivre: newQuantiteALivre,
        });

        if (updateResponse.data.message === "Quantité à livrer mise à jour avec succès.") {
          // Générez le PDF après la mise à jour
          generateBonSortiePDF(bonSortieData);
        } else {
          setErrorMessage("Erreur lors de la mise à jour de la quantité à livrer.");
        }

        setBonSortieData({
          quantiteLiv: "",
          dateLiv: "",
          numArtCom: "",
          numBS: "",
        });

        navigate("/Commande");
      } else {
        setErrorMessage("Erreur lors de l'ajout du Bon de Sortie.");
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du Bon de Sortie : ", error);
      setErrorMessage("Erreur lors de l'ajout du Bon de Sortie.");
    }
  };

  return (
    <>
      <HeadImage />
      <div className="BodyAdd">
        <nav className="titrecom">
          <div data-aos="flip-right" data-aos-duration="3000">
            <p>Faire Un Bon de Sortie</p>
            <hr></hr>
          </div>
        </nav>
        <Link className="return" to="/Commande">
          <img src={return2} alt="Logout" />
        </Link>
        <div className="get_in_touch">
          <form onSubmit={handleBonSortieSubmit}>
            <div className="container_addbs">
              <div className="contact-form_addbs rowww">
                <div className="form-field_addbs">
                  <label className="label_add" htmlFor="numArtCom">
                    L'Article à livrer:
                  </label>
                  <select
                    className="input-text"
                    id="numArtCom"
                    name="numArtCom"
                    value={bonSortieData.numArtCom}
                    onChange={handleBonSortieChange}
                    required
                  >
                    <option value="">Sélectionnez un article de commande</option>
                    {articlesCommandes.map((article) => (
                      <option key={article.numArtCom} value={article.numArtCom}>
                        {article.codeArticle} - Quantité: {article.quantiteALivre}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-field_addbs">
                  <label className="label_add" htmlFor="quantiteLiv">
                    Quantité Livrée:
                  </label>
                  <input
                    className="input-text"
                    type="number"
                    id="quantiteLiv"
                    name="quantiteLiv"
                    value={bonSortieData.quantiteLiv}
                    onChange={handleBonSortieChange}
                    required
                  />
                </div>
                <div className="form-field_addbs">
                  <label className="label_add" htmlFor="dateLiv">
                    Date de Livraison:
                  </label>
                  <input
                    className="input-text"
                    type="date"
                    id="dateLiv"
                    name="dateLiv"
                    value={bonSortieData.dateLiv}
                    onChange={handleBonSortieChange}
                    required
                  />
                </div>
              </div>
            </div>
            <input type="submit" value="Valider" className="btnbs" />
          </form>
          {successMessage && <p className="success-message">{successMessage}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
        <div className="content_imagecli">
          <img src={ajoucli} alt="client" />
        </div>
      </div>
    </>
  );
};

export default AssignerPersonnel;

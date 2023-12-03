import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import logoFA from "../img/logoFA.png";
import return2 from '../img/return2.png';
import HeadImage from "./HeadImage";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ajoucli from '../img/client.png';
const FormODF = () => {
  const { numArtCom } = useParams();
  const navigate = useNavigate();

  const [nombrePersonnel, setNombrePersonnel] = useState(0);
  const [personnelData, setPersonnelData] = useState([]);
  const [devis, setDevis] = useState("");
  const [delaiFab, setDelaiFab] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedPersonnel, setSelectedPersonnel] = useState(Array(0).fill(""));
  const [assignedPersonnelSet, setAssignedPersonnelSet] = useState(new Set());

  const loadPersonnel = async () => {
    try {
      const response = await axios.get("http://localhost/gestionCommande_PHP/getAllPersonnel.php");
      setPersonnelData(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des données du personnel : ", error);
    }
  };

  useEffect(() => {
    loadPersonnel();
  }, []);

  const handleNombrePersonnelChange = (e) => {
    const number = parseInt(e.target.value, 10);
    setNombrePersonnel(number);
    setSelectedPersonnel(Array(number).fill(""));
  };

  const handlePersonnelChange = (index, value) => {
    const updatedData = [...selectedPersonnel];
    updatedData[index] = value;
    setSelectedPersonnel(updatedData);
  };

  const generatePDF = async (numOrdFab) => {
    const doc = new jsPDF();

    try {
      const response = await axios.get(`http://localhost/gestionCommande_PHP/getCommandeDetails.php?numArtCom=${numArtCom}`);
      const commandeDetails = response.data;
      const {
        numRef,
        typeRef,
        dateCom,
        nomClient,
        prenomClient,
        articles,
        delaiFab,
      } = commandeDetails;

      const dateCommande = new Date(dateCom);
   
   console.log(dateCommande);
    
  /* const jourliv = datelivre.getDate().toString().padStart(2,'0');
    const moisliv = datelivre.getMonth().toString().padStart(2,'0');
    const anneeliv = datelivre.getFullYear().toString();

    const datelive = `${jourliv}-${moisliv}-${anneeliv}`;*/


    const jour = dateCommande.getDate().toString().padStart(2,'0');
    const mois = dateCommande.getMonth().toString().padStart(2,'0');
    const annee = dateCommande.getFullYear().toString();

    const dateFormate = `${jour}-${mois}-${annee}`;
    dateCommande.setDate(dateCommande.getDate() + parseInt(delaiFab, 10));
    const jour1 = dateCommande.getDate().toString().padStart(2,'0');
    const mois2 = dateCommande.getMonth().toString().padStart(2,'0');
    const annee3 = dateCommande.getFullYear().toString();

    const dateliv = `${jour1}-${mois2}-${annee3}`;
    const doc = new jsPDF();
    
    doc.setFont("Spy Agency");
    doc.setFontSize(11);
    doc.text("              FANALAMANGA SA", 10, 10);
    doc.text("                        DPCM", 10, 15);
    doc.text("SERVICE DE TRANSFORMATION", 10, 20);
    doc.text("                ANALAVOATRA", 10, 25);

     

    doc.addImage(logoFA,'PNG',172,2,30,30);

    doc.setFont('Spy Agency','bold');
    doc.setFontSize(16);
      doc.text("                                              ORDRE DE FABRICATION" + `                   N° ${numOrdFab}  `, 10, 54);

      doc.setFont('Spy Agency','normal');
      doc.setFontSize(12);
      doc.text(`Référence:  `+  `${typeRef} `    + ` ${numRef}                                                                                              Date de Commande: ${dateFormate}`, 10, 64);
      doc.text(`Nom du Demandeur: ${nomClient} ${prenomClient}`, 10,72);

      doc.text("Personnels Assignés:", 10, 79);

      const assignedPersonnelResponse = await axios.get(`http://localhost/gestionCommande_PHP/getAssignedPersonnel.php?numOrdFab=${numOrdFab}`);

      if (Array.isArray(assignedPersonnelResponse.data) && assignedPersonnelResponse.data.length > 0) {
        assignedPersonnelResponse.data.forEach((personnel, index) => {
          doc.text(`${index + 1}. ${personnel.nomEmp} ${personnel.prenomEmp}`, 20, 90 + index * 10);
        });
      } else {
        console.warn("Aucun personnel assigné trouvé pour cet ordre de fabrication.");
      }
      doc.text("Tableau des Articles:", 10, 130);
      const tableHeaders = ["Code Article", "Désignation", "Dimension", "Unité", "Quantité", "N° Devis"];
      const tableData = articles.map((article) => [
        article.codeArticle,
        article.design,
        article.dimension,
        article.unite,
        article.quantite,
        article.numDevis,
      ]);

      doc.autoTable({
        head: [tableHeaders],
        body: tableData,
        startY: 144,
      });

      doc.setFontSize(10);
      doc.text(`Délai de Fabrication (en jours): ${delaiFab}                                                                                                        Date de Livraison: ${dateliv}`, 10, 166);
 
      doc.text("Accordé par le Chef de Service Transformation                                                                                              Analavoatra le ", 10, 230);
      doc.text("Ce ..../..../.......                                                                                                                                        Le Responsable de Fabrication", 10, 240);
      doc.save("Ordre De Fabrication" + ` ${numOrdFab}`+".pdf");
    } catch (error) {
      console.error("Erreur lors de la récupération des données de la commande : ", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const areAllFieldsFilled = selectedPersonnel.every((personnel) => personnel !== "");

      if (!areAllFieldsFilled) {
        setErrorMessage("Veuillez sélectionner un personnel pour chaque champ.");
        return;
      }

      const ordreFabData = {
        numArtCom,
        numDevis: devis,
        delaiFab,
      };

      const ordreFabResponse = await axios.post("http://localhost/gestionCommande_PHP/addOrdreFab.php", ordreFabData);
      const numOrdFab = ordreFabResponse.data.numOrdFab;

      selectedPersonnel.forEach((numMatricule) => assignedPersonnelSet.add(numMatricule));
      if (assignedPersonnelSet.size > 0) {
        // Convert assigned personnel set to an array
        const assignedPersonnelData = [...assignedPersonnelSet].map((numMatricule) => ({
          numOrdFab,
          numMatricule,
        }));
        // Ajoutez les personnels assignés à la base de données
        await axios.post("http://localhost/gestionCommande_PHP/addPersonnelAssigne.php", assignedPersonnelData);

        // Maintenant que les personnels sont assignés, générez le PDF
        setSuccessMessage("Personnel assigné et ordre de fabrication créé avec succès.");
        await generatePDF(numOrdFab);
        navigate("/Commande");
      } else {
        setErrorMessage("Aucun personnel assigné. Veuillez sélectionner au moins un personnel.");
      }
    } catch (error) {
      console.error("Erreur lors de l'assignation du personnel : ", error);
      setErrorMessage("Erreur lors de l'assignation du personnel.");
    }
  };

  return (
    <>
    <HeadImage/>
    <div className="BodyAdd">
      
      <nav className="titreodf">
     
       <div data-aos="flip-right" data-aos-duration="3000">
      
        <p>Assigné les personnels et générer l'ODF</p>
        
                                <hr></hr>
                            </div>
      </nav>
      <Link className="return" to="/Commande">
        <img src={return2} alt="Retour" />
      </Link>
    <div className="get_in_touch">
      <form onSubmit={handleSubmit}>
      <div className="container">
            <div className="contact-form_addodf rowww">
              <div className="form-field_addodf">
          <label htmlFor="nombrePersonnel" >Nombre de Personnel à Assigner:</label>
          <input
            type="number"
            id="nombrePersonnel"
            value={nombrePersonnel}
            onChange={handleNombrePersonnelChange}
            required
            className="nbr"
          />
        </div>
        {Array.from({ length: nombrePersonnel }).map((_, index) => (
          <div key={index} className="form-field_add">    
            <select
              id={`personnel-${index}`}
              value={selectedPersonnel[index]}
              onChange={(e) => handlePersonnelChange(index, e.target.value)}
              required
              className="input-text"
            >
              <option value="">Sélectionner un personnel</option>
              {personnelData.map((personnel) => (
                <option key={personnel.numMatricule} value={personnel.numMatricule}>
                  {personnel.nomEmp} {personnel.prenomEmp}
                </option>
              ))}
            </select>
          </div>
        ))}
        <div className="form-field_addodf">
          <label htmlFor="devis">Numéro de Devis:</label>
          <input
            type="number"
            id="devis"
            value={devis}
            onChange={(e) => setDevis(e.target.value)}
            required
            className="input2"
          />
        </div>
        <div className="form-field_addodf">
          <label htmlFor="delaiFab" >Délai de Fabrication (en jours):</label>
          <input
            type="number"
            id="delaiFab"
            value={delaiFab}
            onChange={(e) => setDelaiFab(e.target.value)}
            required
            className="input"
          />
        </div>
        <div className="form-field_addodf">
        <input type="submit" value="Valider" className="btn6" />
        </div>
        </div>
        </div>
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

export default FormODF;


import  "./css/style.css";
import  "./css/Login.css";
import  "./css/about.css";
import  "./css/responsive.css";
import  "./css/Client.css";
import  "./css/Commande.css";
import  "./css/Commodif.css";
import  "./css/nav.css";
import  "./css/acceuil.css";
import 'aos/dist/aos.css';
import AOS from 'aos';
import {BrowserRouter , Routes, Route} from "react-router-dom";
import About from "./components/About";
import Client from "./components/Client";
import Add from "./components/AddClient";
import UpdateCli from "./components/EditClient";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Commande from "./components/Commande";
import AddCommande from "./components/AddCom";
import UpdateCommande from "./components/UpdateCom";
import AddArticleCom from "./components/AddArticlesCom";
import AC from './components/articleCommande';
import UpdateArtCom from './components/updateArtCom';
import Personnel from './components/Personnel';
import AddPersonnel from "./components/addPersonnel";
import UpdatePersonnel from "./components/updatePersonnel";
import ODF from "./components/ODF";
import FormODF from "./components/FormODF";
import Login from "./components/Login";
import AssignerPersonnel from "./components/AddBs";
import Bs from "./components/Bs";
import ArticleCom from "./components/ArticleCom";
import Articles from "./components/Articles";
import AddArticle from "./components/Addarticle";
import Choices from "./components/choices"
import AddService from "./components/AddService";
AOS.init()
const App = () => (
  <div className="App">
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/About" element={<About />} />
      <Route path="/Client" element={<Client />} />
      <Route path="/Add" element={<Add />} />
      <Route path="/AddService" element={<AddService />} />
      <Route path="/AddCom" element={<AddCommande />} />
      <Route path="/AddArticle" element={<AddArticle />} />
      <Route path="/Commande" element={<Commande />} />
      <Route path="/updateCli/:codeClient" element={<UpdateCli />} />
      <Route path="/updateCom/:numCom" element={<UpdateCommande />} />
      <Route path="/AC/:numCom" element={<AddArticleCom />} />
      <Route path="/articleCommande/:numCom" element={<AC />} />
      <Route path="/updateArticleCommande/:numArtCom" element={<UpdateArtCom />} />
      <Route path="/Personnel" element={<Personnel />} />
      <Route path="/addPersonnel" element={<AddPersonnel />} />
      <Route path="/updatePersonnel/:numMatricule" element={<UpdatePersonnel />} />
      <Route path="/ODF" element={<ODF/>} />
      <Route path="/Bs" element={<Bs/>} />
      <Route path="/formODF/:numArtCom" element={<FormODF />} />
      <Route path="/addBS/:numCom" element={<AssignerPersonnel />} />
      <Route path="/ArticleCom" element={<ArticleCom/>} />
      <Route path="/Articles" element={<Articles/>} />
      <Route path="/choices" element={<Choices/>} />
    </Routes>
  </BrowserRouter>
</div>
     
);

export default App;
 
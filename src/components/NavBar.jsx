import React from "react";
import darkMode from "../img/darkMode.png" 
import Menu32 from "../img/Menu_16.png"
import {Link} from "react-router-dom"
import close from "../img/cross.png"
class NavBar extends React.Component {
    state = {
      isActive : false
    }
    toogleMenu = () => {
        this.setState(prevState=> ({isActive : !prevState.isActive}));
    };
    closMenu = () => {
        this.setState({isActive : false});
    };
     toggleDarkMode = () => {
        const sun = document.querySelector('.light-mode');
        const moon = document.querySelector('.dark-mode');
        const cssRoot = document.documentElement.style;
    
        if (sun.classList.contains('active')) {
          sun.classList.add('inactive');
          sun.classList.remove('active');
          if (moon.classList.contains('inactive')) {
            moon.classList.add('active');
            moon.classList.remove('inactive');
          }
          cssRoot.setProperty('--bg-color', '#000000');
          cssRoot.setProperty('--txt-color', '#ffffff');
          cssRoot.setProperty('--header-bg', '#004E64');
          cssRoot.setProperty('--logo-style', '#FFFFFF');
          cssRoot.setProperty('--header-icons', '#ffffff');
          cssRoot.setProperty('--right-bg', '#004E64');
          cssRoot.setProperty('--bright', '#bdbdbd');
        } else {
          sun.classList.add('active');
          sun.classList.remove('inactive');
          if (moon.classList.contains('active')) {
            moon.classList.add('inactive');
            moon.classList.remove('active');
          }
          cssRoot.setProperty('--bg-color', '#ffffff');
          cssRoot.setProperty('--txt-color', '#000000');
          cssRoot.setProperty('--header-bg', '#F7F5F6');
          cssRoot.setProperty('--logo-style', '#000000');
          cssRoot.setProperty('--header-icons', '#636363');
          cssRoot.setProperty('--right-bg', '#ffffff');
          cssRoot.setProperty('--bright', '#626262');
        }
      }
      
    render() {
        const {isActive} = this.state;
        return (
           
            <body>

<div class="toggleMenu">
        <div class={`var ${isActive ? 'active' : ""}`}>
            <div  className="close-btn" >
                <img src={close} alt="close" onClick={this.closMenu} />
                </div>
                <Link to="/ArticleCom" data-text="Article Commandé">Article Commandé</Link>
            <Link to="/ODF" data-text="Ordre de Fabrication">Ordre de Fabrication</Link>
            <Link to="/Bs" data-text="Bon Sortie">Bon Sortie</Link>
            <Link to="/Personnel" data-text="Personnel">Personnel</Link>
            <Link to="/" data-text="Déconnexion">Déconnexion</Link>
        </div>
    </div>
        
            <header>
                <div class="container header__contents">
                    <div class="left">
                        <div class="logo">
                        <p>GScom<span id="FSA">FSA</span></p>
                        </div>
                        <div class="navigation">
                            <div class="textnav" >
                               <Link id="navlink" to="/About" >Acceuil</Link>
                            </div>
                            <div class="textnav">
                            <Link  id="navlink" to="/Client" >Client</Link>
                            </div>
                            <div class="textnav">
                            <Link id="navlink" to="/Commande" >Commande</Link>
                            </div>
                            <div class="textnav">
                            <Link id="navlink" to="/Articles" >Articles</Link>
                            </div>
                        
                        </div>
                    </div>

                    <div class="right">
                <div class="light__dark-mode" >
                    <div class="light-mode active " onClick={this.toggleDarkMode}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="480" height="480">
                            <path
                                d="M14.984375 0.98632812 A 1.0001 1.0001 0 0 0 14 2L14 5 A 1.0001 1.0001 0 1 0 16 5L16 2 A 1.0001 1.0001 0 0 0 14.984375 0.98632812 z M 5.796875 4.7988281 A 1.0001 1.0001 0 0 0 5.1015625 6.515625L7.2226562 8.6367188 A 1.0001 1.0001 0 1 0 8.6367188 7.2226562L6.515625 5.1015625 A 1.0001 1.0001 0 0 0 5.796875 4.7988281 z M 24.171875 4.7988281 A 1.0001 1.0001 0 0 0 23.484375 5.1015625L21.363281 7.2226562 A 1.0001 1.0001 0 1 0 22.777344 8.6367188L24.898438 6.515625 A 1.0001 1.0001 0 0 0 24.171875 4.7988281 z M 15 8 A 7 7 0 0 0 8 15 A 7 7 0 0 0 15 22 A 7 7 0 0 0 22 15 A 7 7 0 0 0 15 8 z M 2 14 A 1.0001 1.0001 0 1 0 2 16L5 16 A 1.0001 1.0001 0 1 0 5 14L2 14 z M 25 14 A 1.0001 1.0001 0 1 0 25 16L28 16 A 1.0001 1.0001 0 1 0 28 14L25 14 z M 7.9101562 21.060547 A 1.0001 1.0001 0 0 0 7.2226562 21.363281L5.1015625 23.484375 A 1.0001 1.0001 0 1 0 6.515625 24.898438L8.6367188 22.777344 A 1.0001 1.0001 0 0 0 7.9101562 21.060547 z M 22.060547 21.060547 A 1.0001 1.0001 0 0 0 21.363281 22.777344L23.484375 24.898438 A 1.0001 1.0001 0 1 0 24.898438 23.484375L22.777344 21.363281 A 1.0001 1.0001 0 0 0 22.060547 21.060547 z M 14.984375 23.986328 A 1.0001 1.0001 0 0 0 14 25L14 28 A 1.0001 1.0001 0 1 0 16 28L16 25 A 1.0001 1.0001 0 0 0 14.984375 23.986328 z"
                                fill="#FFD166" />
                        </svg>
                    </div>
                    <div class="dark-mode inactive" onClick={this.toggleDarkMode}>
                        <img src={darkMode} alt="darkMode" />
                    </div>
                </div>
               
                <div id="menu-btn" className={`menu-btn ${isActive ? 'fa-times' : ""}`} onClick={this.toogleMenu}>
                   <img src={Menu32} alt="Menu"/>
                </div>
            </div>
                </div>
            </header>
          
        </body>
        )
    }
}
export default NavBar;
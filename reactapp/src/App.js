import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar";
import {Container} from "react-bootstrap";
import Accueil from "./components/Accueil";
import Inscrire from "./components/Inscrire";
import Connecter from "./components/Connecter";
import Calendrier from "./components/Calendrier";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

//deploiement : https://tp2-deploiement-react-sm-tr.vercel.app/

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Navbar/>
            <Container className='navBar'>
                <Routes>
                    <Route exact path="/inscrire" element={<Inscrire/>}/>
                    <Route exact path="/connecter" element={<Connecter/>} />
                    <Route exact path="/" element={<Accueil/>}/>
                    <Route path="/calendrier" element={<Calendrier />} />
                </Routes>
            </Container>
        </BrowserRouter>
    </div>
  );
}

export default App;

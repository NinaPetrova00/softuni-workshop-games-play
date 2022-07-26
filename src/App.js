
import './App.css';
import { Edit } from './components/Edit/Edit';
import { Header } from './components/Header/Header';
import { Home } from './components/Home/Home';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { Create } from './components/Create/Create';
import { Catalogue } from './components/Catalogue/Catalogue';
import { Routes, Route } from 'react-router-dom'
import { Details } from './components/Details/Details';

function App() {
    return (
        <div id="box">
            <Header />
            <main id="main-content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route paht="/create" element={<Create />} />
                    <Route path="/edit" element={<Edit />} />
                    <Route path="/details" element={<Details />} />
                    <Route path="/catalogue" element={<Catalogue />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;

import './App.css';

import { Edit } from './components/Edit/Edit';
import { Header } from './components/Header/Header';
import { Home } from './components/Home/Home';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { Create } from './components/Create/Create';
import { Catalogue } from './components/Catalogue/Catalogue';
import { Details } from './components/Details/Details';
import * as gameService from './services/gameService';

import { useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom'

function App() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        gameService.getAll()
            .then(result => {
                setGames(result);
            });
    }, []);

    return (
        <div id="box">
            <Header />
            <main id="main-content">
                <Routes>
                    <Route path="/" element={<Home games={games} />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route paht="/create" element={<Create />} />
                    <Route path="/edit" element={<Edit />} />
                    <Route path="/catalogue" element={<Catalogue games={games} />} />
                    <Route path="/catalogue/:gameId" element={<Details games={games} />} />
                </Routes>
            </main>
        </div>
    );
};

export default App;

import './App.css';

import { useEffect, useState, lazy, Suspense } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom'
import uniqid from 'uniqid';

import * as gameService from './services/gameService';
import { AuthContext } from './contexts/AuthContext';

import { Edit } from './components/Edit/Edit';
import { Header } from './components/Header/Header';
import { Home } from './components/Home/Home';
import { Login } from './components/Login/Login';
import { Logout } from './components/Logout/Logout';
import { CreateGame } from './components/CreateGame/CreateGame';
import { Catalogue } from './components/Catalogue/Catalogue';
import { Details } from './components/Details/Details';

import { Register } from './components/Register/Register';
// import ('./components/Register/Register');
//const Register = lazy(() => import('./components/Register/Register'));

function App() {
    const [games, setGames] = useState([]);
    const [auth, setAuth] = useState({});

    const navigate = useNavigate();

    const userLogin = (authData) => {
        setAuth(authData);
    };

    const userLogout = () => {
        setAuth({}); //make the object null
    }
    const addComment = (gameId, comment) => {
        setGames(oldState => {
            const game = oldState.find(g => g._id == gameId);

            const comments = game.comments || [];
            comments.push(comment);

            return [
                ...oldState.filter(g => g._id !== gameId),
                { ...game, comments }
            ]
        });
    };

    const addGameHandler = (gameData) => {
        setGames(oldState => [
            ...oldState,
            {
                ...gameData,
                _id: uniqid(),
            },
        ]);

        navigate('/catalogue');
    };

    useEffect(() => {
        gameService.getAll()
            .then(result => {
                setGames(result);
            });
    }, []);

    return (
        <AuthContext.Provider value={{ user: auth, userLogin, userLogout }}>
            <div id="box">
                <Header />
                <main id="main-content">
                    <Routes>
                        <Route path="/" element={<Home games={games} />} />
                        <Route path="/login" element={<Login />} />

                        {/* <Route path="/register" element={
                            <Suspense fallback={<span>Loading...</span>}>
                                <Register />
                            </Suspense>
                        } /> */}
                        <Route path="/register" element={<Register />} />
                        <Route path="/logout" element={<Logout />} />
                        <Route path="/create" element={<CreateGame addGameHandler={addGameHandler} />} />
                        <Route path="/edit" element={<Edit />} />
                        <Route path="/catalogue" element={<Catalogue games={games} />} />
                        <Route path="/catalogue/:gameId" element={<Details games={games} addComment={addComment} />} />
                    </Routes>
                </main>
            </div>
        </AuthContext.Provider>
    );
};

export default App;

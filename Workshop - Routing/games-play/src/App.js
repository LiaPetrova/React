import { lazy, Suspense, useEffect, useState } from "react";

import "./App.css";

import * as gameService from "./services/gameService";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Catalog } from "./components/Catalog/Catalog";
import { Create } from "./components/Create/Create";
import Header from "./components/Header";
import { Home } from "./components/Home/Home";
import { Login } from "./components/Login/Login";
import { GameDetails } from "./components/GameDetails.js/GameDetails";
import { AuthProvider } from "./contexts/AuthContext";
import { Logout } from "./components/Logout/Logout";
import { GameContext } from "./contexts/GameContext";
import { Edit } from "./components/Edit/Edit";

const Register = lazy(() => import('./components/Register/Register'));

function App() {
    
    const [games, setGames] = useState([]);
    const navigate = useNavigate();
   
    const gameAdd = (gameData) => {
        setGames(state => {
            return [
                gameData,
                ...state
            ]
        });

        navigate('/catalog');
    };

    const gameEdit = (gameData) => {
        setGames(games => games.map(x => x._id === gameData._id ? gameData : x));
    }

    const addComment = (gameId, comment) => {
        setGames(state => {
            const game = games.find(x => x._id === gameId);
            const comments = game.comments || [];
            comments.push(comment);

            return [
                ...state.filter(x => x._id !== game._id),
                { ...game, comments }
            ]
        })
    };

    useEffect(() => {
        gameService.getAll()
            .then(result => {
                setGames(result)
            })
    }, []);

    return (
        <AuthProvider>
            <div id="box">
                <Header />

                <GameContext.Provider value={{ games, gameAdd, gameEdit }}>
                <main id="main-content">
                    <Routes>
                        <Route path="/" element={<Home games={games} />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/logout" element={<Logout />} />
                        <Route path="/register" element={
                            <Suspense fallback={<span>Loading...</span>} >
                                <Register />
                            </Suspense>
                        } />
                        <Route path="/create" element={<Create/>} />
                        <Route path="/catalog" element={<Catalog/>} />
                        <Route path="/catalog/:gameId" element={<GameDetails
                         addComment={addComment} />} />
                         <Route path="/games/:gameId/edit" element={<Edit/>} />

                    </Routes>

                </main>

                </GameContext.Provider>

                {/* Edit Page ( Only for the creator )*/}
                {/*  */}

            </div>
        </AuthProvider>
    );
}

export default App;

import { lazy, Suspense, useEffect, useState } from "react";
import uniqid from 'uniqid';

import "./App.css";

import * as gameService from "./services/gameService";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Catalog } from "./components/Catalog/Catalog";
import { Create } from "./components/Create/Create";
import Header from "./components/Header";
import { Home } from "./components/Home/Home";
import { Login } from "./components/Login/Login";
import { GameDetails } from "./components/GameDetails.js/GameDetails";
import { AuthContext } from "./contexts/AuthContext";

const Register = lazy(() => import('./components/Register/Register'));

function App() {

    const [games, setGames] = useState([]);
    const [auth, setAuth] = useState({});
    const navigate = useNavigate();

    const userLogin = (authData) => {
        setAuth(authData);
    }

    const addGameHandler = (gameData) => {
        setGames(state => {
            return [
                ...state,
                {
                    ...gameData,
                    _id: uniqid()
                }
            ]
        });

        navigate('/catalog');
    };

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
        <AuthContext.Provider value={{auth, userLogin}}>
            <div id="box">
                <Header />

                <main id="main-content">
                    <Routes>
                        <Route path="/" element={<Home games={games} />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={
                            <Suspense fallback={<span>Loading...</span>} >
                                <Register />
                            </Suspense>
                        } />
                        <Route path="/create" element={<Create addGameHandler={addGameHandler} />} />
                        <Route path="/catalog" element={<Catalog games={games} />} />
                        <Route path="/catalog/:gameId" element={<GameDetails games={games} addComment={addComment} />} />

                    </Routes>

                </main>

                {/* Edit Page ( Only for the creator )*/}
                {/* <section id="edit-page" className="auth">
        <form id="edit">
          <div className="container">
            <h1>Edit Game</h1>
            <label htmlFor="leg-title">Legendary title:</label>
            <input type="text" id="title" name="title" defaultValue />
            <label htmlFor="category">Category:</label>
            <input type="text" id="category" name="category" defaultValue />
            <label htmlFor="levels">MaxLevel:</label>
            <input
              type="number"
              id="maxLevel"
              name="maxLevel"
              min={1}
              defaultValue
            />
            <label htmlFor="game-img">Image:</label>
            <input type="text" id="imageUrl" name="imageUrl" defaultValue />
            <label htmlFor="summary">Summary:</label>
            <textarea name="summary" id="summary" defaultValue={""} />
            <input
              className="btn submit"
              type="submit"
              defaultValue="Edit Game"
            />
          </div>
        </form>
      </section> */}

            </div>
        </AuthContext.Provider>
    );
}

export default App;

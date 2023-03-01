import { lazy, Suspense } from "react";

import "./App.css";

import { Route, Routes } from "react-router-dom";
import { Catalog } from "./components/Catalog/Catalog";
import { Create } from "./components/Create/Create";
import Header from "./components/Header";
import { Home } from "./components/Home/Home";
import { Login } from "./components/Login/Login";
import { GameDetails } from "./components/GameDetails.js/GameDetails";
import { AuthProvider } from "./contexts/AuthContext";
import { Logout } from "./components/Logout/Logout";
import { GameProvider } from "./contexts/GameContext";
import { Edit } from "./components/Edit/Edit";
import { PrivateRoute } from "./components/common/PrivateRoute";
import { PrivateGuard } from "./components/common/PrivateGuard";
import { GameOwner } from "./components/common/GameOwner";

const Register = lazy(() => import('./components/Register/Register'));

function App() {


    return (
        <AuthProvider>
            <div id="box">
                <Header />

                <GameProvider>
                    <main id="main-content">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={
                                <Suspense fallback={<span>Loading...</span>} >
                                    <Register />
                                </Suspense>
                            } />
                            <Route path="/create" element={
                                <PrivateRoute>
                                    <Create />
                                </PrivateRoute>
                            } />

                            <Route element={<PrivateGuard />}>
                                <Route path="/logout" element={<Logout />} />
                            </Route>

                            <Route path="/games/:gameId/edit" element={
                                <GameOwner>
                                    <Edit />
                                </GameOwner>} />
                            <Route path="/catalog" element={<Catalog />} />
                            <Route path="/catalog/:gameId" element={<GameDetails />} />

                        </Routes>

                    </main>

                </GameProvider>

                {/* Edit Page ( Only for the creator )*/}
                {/*  */}

            </div>
        </AuthProvider>
    );
}

export default App;

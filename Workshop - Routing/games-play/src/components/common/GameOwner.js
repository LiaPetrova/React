import { useContext } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext"
import { GameContext } from "../../contexts/GameContext";

export const GameOwner = ({ children }) => {
    const { user, isAuthenticated } = useAuthContext();
    const { gameId } = useParams();
    const { selectGame } = useContext(GameContext);

    const game = selectGame(gameId);

    if (!isAuthenticated && game._ownerId !== user._id) {
        return <Navigate to={'/catalog'} replace/>;
    }

    return children ? children : <Outlet />;
}
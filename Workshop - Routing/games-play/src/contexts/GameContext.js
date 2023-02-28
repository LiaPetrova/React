import { createContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import * as gameService from "../services/gameService";


export const GameContext = createContext();

const gameReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_GAMES':
            return action.payload.map(x => ({ ...x, comments: [] }));
        case 'ADD_GAME':
            return [action.payload, ...state];
        case 'EDIT_GAME':
        case 'FETCH_GAME_DETAILS':
            return state.map(x => x._id === action.gameId ? action.payload : x);
        case 'ADD_COMMENT':
            return state.map(x => x._id === action.gameId ? { ...x, comments: [...x.comments, action.payload] } : x);
        case 'REMOVE_GAME':
            return state.filter(x => x._id !== action.gameId);
        default:
            return state;
    }
};

export const GameProvider = ({
    children
}) => {

    const [games, dispatch] = useReducer(gameReducer, []);
    const navigate = useNavigate();


    useEffect(() => {
        gameService.getAll()
            .then(result => {
                const action = {
                    type: 'ADD_GAMES',
                    payload: result
                };
                dispatch(action);
            })
    }, []);

    const fetchGameDetails = (gameId, gameDetails) => {
        dispatch({
            type: 'FETCH_GAME_DETAILS',
            payload: gameDetails,
            gameId
        });
    };

    const selectGame = (gameId) => {
        return games.find(x => x._id === gameId) || {};
    }


    const gameAdd = (gameData) => {
        dispatch({
            type: 'ADD_GAME',
            payload: gameData
        });

        navigate('/catalog');
    };

    const gameEdit = (gameId, gameData) => {
        dispatch({
            type: 'EDIT_GAME',
            payload: gameData,
            gameId
        });
    };

    const gameRemove = (gameId) => {
        dispatch({
            type: 'REMOVE_GAME',
            gameId
        });
    };

    const addComment = (gameId, comment) => {
        dispatch({
            type: 'ADD_COMMENT',
            payload: comment,
            gameId
        });
        // setGames(state => {
        //     const game = games.find(x => x._id === gameId);
        //     const comments = game.comments || [];
        //     comments.push(comment);
        //     console.log(comments);
        //     return [
        //         ...state.filter(x => x._id !== game._id),
        //         { ...game, comments }
        //     ];
        // });
    };

    return (
        <GameContext.Provider value=
            {{
                games,
                gameAdd,
                gameEdit,
                addComment,
                fetchGameDetails,
                selectGame,
                gameRemove
            }}>
            {children}
        </GameContext.Provider>
    )
}
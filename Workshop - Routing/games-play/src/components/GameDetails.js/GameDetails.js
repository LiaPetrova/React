import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GameContext } from "../../contexts/GameContext";
import * as gameService from '../../services/gameService';
import * as commentService from '../../services/commentService';
import { useAuthContext } from "../../contexts/AuthContext";

export const GameDetails = () => {

    const navigate = useNavigate();
    const { addComment, fetchGameDetails, selectGame, gameRemove } = useContext(GameContext);
    const { gameId } = useParams();
    const game = selectGame(gameId);

    const { user } = useAuthContext();

    const [comment, setComment] = useState('');
    const [errors, setErrors] = useState('');

    const isOwner = game._ownerId === user._id;



    useEffect(() => {
        (async () => {
            const gameDetails = await gameService.getOne(gameId);
            const gameComments = await commentService.getByGameId(gameId);

            fetchGameDetails(gameId, { ...gameDetails, comments: gameComments.map(x => `${x.user.email}: ${x.text}`) });
        })();
    }, []);

    const onChange = (e) => {
        setComment(e.target.value);
    };

    const addCommentHandler = (e) => {
        e.preventDefault();

        commentService.create(gameId, comment)
            .then(result => {
                addComment(gameId, comment);
            });
        setComment('');
    };

    const gameRemoveHandler = () => {
        const confirmation = window.confirm('Are you sure you want to delete this game?');
        if (confirmation) {
            gameService.remove(gameId)
                .then(() => {
                    gameRemove(gameId);
                    navigate('/');
                });

        }
    };

    const lengthValidator = (e, minLength, maxLength = Number.MAX_SAFE_INTEGER) => {
        const value = e.target.value;
        const inputName = e.target.name.slice(0, 1).toUpperCase() + e.target.name.slice(1);
        let errorMessage = '';

        if (value.length < minLength) {
            errorMessage = `${inputName} must be at least ${minLength} characters long.`
        } else if (value.length > maxLength) {
            errorMessage`${inputName} can't be longer than ${maxLength} characters long.`
        }

        // setErrors(state => ({
        //     ...state,
        //     [e.target.name]: errorMessage
        // }));
        setErrors(errorMessage);
    };


    return (
        <section id="game-details">
            <h1>Game Details</h1>
            <div className="info-section">
                <div className="game-header">
                    <img className="game-img" src={game.imageUrl} />
                    <h1>{game.title}</h1>
                    <span className="levels">MaxLevel: {game.maxLevel}</span>
                    <p className="type">{game.category}</p>
                </div>
                <p className="text">
                    {game.summary}
                </p>
                <div className="details-comments">
                    <h2>Comments:</h2>

                    {game.comments
                        ? <ul>
                            {game.comments.map(x =>
                                <li key={x} className="comment">
                                    <p>{x}</p>
                                </li>)}
                        </ul>
                        : <p className="no-comment">No comments.</p>
                    }


                </div>
                {/* Edit/Delete buttons ( Only for creator of this game )  */}
                {isOwner &&
                    <div className="buttons">
                        <Link to={`/games/${gameId}/edit`} className="button">Edit</Link>

                        <button onClick={gameRemoveHandler} className="button">
                            Delete
                        </button>
                    </div>
                }

            </div>

            {/* Add Comment ( Only for logged-in users, which is not creators of the current game ) */}
            <article className="create-comment">
                <label>Add new comment:</label>
                <form className="form" onSubmit={addCommentHandler}>

                    <textarea
                        name="comment"
                        placeholder="Comment......"
                        value={comment}
                        onChange={onChange}
                        onBlur={(e) => lengthValidator(e, 2)}
                    />

                    {errors &&
                        <div className="error" style={{ color: 'darkred' }}>{errors}</div>
                    }

                    <input
                        className="btn submit"
                        type="submit"
                        defaultValue="Add Comment"
                    />
                </form>
            </article>
        </section>
    );
};
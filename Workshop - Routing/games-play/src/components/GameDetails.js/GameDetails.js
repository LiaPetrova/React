import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GameContext } from "../../contexts/GameContext";
import * as gameService from '../../services/gameService';
import * as commentService from '../../services/commentService';

export const GameDetails = () => {

    const { addComment, fetchGameDetails, selectGame } = useContext(GameContext);
    const { gameId } = useParams();
    const game = selectGame(gameId);

    const [comment, setComment] = useState('');
    const [errors, setErrors] = useState('');



    useEffect(() => {
        (async () => {
            const gameDetails = await gameService.getOne(gameId);
            const gameComments = await commentService.getByGameId(gameId);

            fetchGameDetails(gameId, {...gameDetails, comments: gameComments.map(x => `${x.user.email}: ${x.text}`)});
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
            })
        setComment('');
    }

    const lengthValidator = (e, minLength, maxLength = Number.MAX_SAFE_INTEGER) => {
        const value = e.target.value;
        const inputName = e.target.name.slice(0,1).toUpperCase() + e.target.name.slice(1);
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
                                <li key={x._id} className="comment">
                                    <p>{x}</p>
                                </li>)}
                        </ul>
                        : <p className="no-comment">No comments.</p>
                    }


                </div>
                {/* Edit/Delete buttons ( Only for creator of this game )  */}
                <div className="buttons">
                    <Link to={`/games/${gameId}/edit`} className="button">Edit</Link>

                    <a href="#" className="button">
                        Delete
                    </a>
                </div>
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
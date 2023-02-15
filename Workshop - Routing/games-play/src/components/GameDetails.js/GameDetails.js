import { useState } from "react";
import { useParams } from "react-router-dom";

export const GameDetails = ({
    games,
    addComment
}) => {

    const { gameId } = useParams();
    const [comment, setComment] = useState({
        username: '',
        comment: ''
    });

    const onChange = (e) => {
        setComment(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    };

    const addCommentHandler = (e) => {
        e.preventDefault();

        const commentData = `${comment.username}: ${comment.comment}`;
        addComment(gameId, commentData);
        setComment({
            username: '',
            comment: ''
        });
    }

    const game = games.find(x => x._id === gameId);
    console.log(game);
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
                                <li className="comment">
                                    <p>{x}</p>
                                </li>)}
                        </ul>
                        : <p className="no-comment">No comments.</p>
                    }


                    {/* Display paragraph: If there are no games in the database */}
                </div>
                {/* Edit/Delete buttons ( Only for creator of this game )  */}
                <div className="buttons">
                    <a href="#" className="button">
                        Edit
                    </a>
                    <a href="#" className="button">
                        Delete
                    </a>
                </div>
            </div>
            {/* Bonus */}
            {/* Add Comment ( Only for logged-in users, which is not creators of the current game ) */}
            <article className="create-comment">
                <label>Add new comment:</label>
                <form className="form" onSubmit={addCommentHandler}>
                    <input
                        type="text"
                        value={comment.username}
                        placeholder="John Doe"
                        onChange={onChange}
                        name="username"
                    />
                    <textarea
                        name="comment"
                        placeholder="Comment......"
                        value={comment.comment}
                        onChange={onChange}
                    />

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
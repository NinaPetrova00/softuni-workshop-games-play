import { useState } from 'react';
import { useParams } from 'react-router-dom';

export const Details = ({
    games,
    addComment
}) => {
    const { gameId } = useParams();

    const [comment, setComment] = useState({
        username: '',
        comment: ''
    });

    const [error, setError] = useState({
        username: '',
        comment: ''
    });

    const game = games.find(g => g._id == gameId);

    const addCommentHandler = (ev) => {
        ev.preventDefault();

        const userComment = `${comment.username}: ${comment.comment}`;

        addComment(gameId, userComment);
    };

    const onChange = (ev) => {
        setComment(oldState => ({
            ...oldState,
            [ev.target.name]: ev.target.value
        }));
    };

    const validateUsername = (ev) => {
        const username = ev.target.value;

        let errorMessage = '';

        if (username.length < 4) {
            errorMessage = 'Username must be longer than 4 characters!';
        } else if (username.length > 10) {
            errorMessage = 'Username must be shorter than 10 characters!';
        }

        setError(oldState => ({
            ...oldState,
            username: errorMessage
        }));
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
                <p className="text">{game.summary} </p>

                <div className="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                        {game.comments?.map(c =>
                            <li className="comment">
                                <p>{c}</p>
                            </li>
                        )}
                    </ul>
                    {!game.comments &&
                        <p className="no-comment">No comments.</p>
                    }

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

            <article className="create-comment">
                <label>Add new comment:</label>
                <form className="form" onSubmit={addCommentHandler}>
                    <input
                        type="text"
                        name="username"
                        placeholder="John Doe"
                        onChange={onChange}
                        onBlur={validateUsername}
                        value={comment.username}
                    />
                    {error.username &&
                        <div style={{ color: 'red' }}>{error.username}</div>
                    }
                    <textarea
                        name="comment"
                        placeholder="Comment......"
                        onChange={onChange}
                        value={comment.comment}
                    />

                    <input
                        className="btn submit"
                        type="submit"
                        value="Add Comment"
                    />
                </form>
            </article>
        </section>
    );
};
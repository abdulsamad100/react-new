import { useState } from "react";
import Square from "./Square";

const Board = () => {
    const [xIsNext, setXIsNext] = useState(true);
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [endGame, setEndGame] = useState({
        gameover: false,
        winner: {
            name: "",
        },
    });

    const handleClick = (i) => {
        if (squares[i] || endGame.winner.name || endGame.gameover) return;

        const squaresCopy = [...squares];
        squaresCopy[i] = xIsNext ? "X" : "O";
        setSquares(squaresCopy);
        setXIsNext(!xIsNext);

        const winner = calculateWinner(squaresCopy);
        if (winner) {
            setEndGame({
                gameover: true,
                winner: { name: winner },
            });
        } else if (squaresCopy.every((sq) => sq !== null)) {
            setEndGame({ gameover: true, winner: { name: "" } });
        }
    };

    function calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }

    const rows = [0, 3, 6];

    return (
        <>
            {!endGame.winner.name && !endGame.gameover && <p className="turn">Your Turn: {xIsNext ? "X" : "O"}</p>}
            {endGame.winner.name && <h1 className="winner"> Winner is: {endGame.winner.name}</h1>}
            {!endGame.winner.name && endGame.gameover && <h1 className="game-over">Game is Over!</h1>}

            {rows.map((rowIndex) => (
                <div key={rowIndex} className="board-row">
                    <Square value={squares[rowIndex]} handleClick={() => handleClick(rowIndex)} />
                    <Square value={squares[rowIndex + 1]} handleClick={() => handleClick(rowIndex + 1)} />
                    <Square value={squares[rowIndex + 2]} handleClick={() => handleClick(rowIndex + 2)} />
                </div>
            ))}
            <br />
            <button onClick={() => { location.reload() }}>Reset</button>
        </>
    );
};

export default Board;

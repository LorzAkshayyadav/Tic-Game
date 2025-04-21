import { useEffect, useRef, useState } from 'react';
import Board from './Board';
import toast from 'react-hot-toast';
import { useLocation, useParams } from 'react-router-dom';
import './Game.css';
import ReactCanvasConfetti from 'react-canvas-confetti';

export default function Game() {
  const refConfetti = useRef(null);

  const getInstance = (instance) => {
    refConfetti.current = instance;
  };

  // Fire confetti
  const fireConfetti = () => {
    if (refConfetti.current) {
      refConfetti.current({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.6 },
      });
    } else {
      console.log("Confetti instance is not available");
    }
  };

  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const location = useLocation();
  const { roomId } = useParams();
  const { username } = location.state || {};

  const hasWelcomed = useRef(false);

  useEffect(() => {
    if (!hasWelcomed.current && username && roomId) {
      toast.success(`Welcome ${username}, Enjoy the game!`);
      hasWelcomed.current = true;
    }
  }, [username, roomId]);

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }
  useEffect(() => {
    const winner = calculateWinner(currentSquares);
    if (winner) {
      console.log(`${winner} is the winner!`); 
      toast.success(`${winner} wins the game! 🎉`);
    }
  }, [currentSquares]);

  function resetGame() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  }

  function Moves({ move }) {
    const winner = calculateWinner(currentSquares);
    const gameOver = winner || move === 9;

    return (
      <div className="moves">
        {!gameOver ? (
          <>
            <button
              className="redo"
              onClick={() => jumpTo(move - 1)}
              disabled={move === 0}
            >
              Undo
            </button>
            <button
              className="redo"
              onClick={() => jumpTo(move + 1)}
              disabled={move === history.length - 1}
            >
              Redo
            </button>
          </>
        ) : (
          <button className="redo" onClick={resetGame}>
            New Game
          </button>
        )}
      </div>
    );
  }

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

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        <Moves move={currentMove} />
      </div>
    </div>
  );
}

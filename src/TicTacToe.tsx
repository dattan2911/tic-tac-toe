import { useState } from "react";

const TicTacToe = () => {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [score, setScore] = useState<{ X: number; O: number }>({ X: 0, O: 0 });

  const handleClick = (index: number) => {
    if (board[index] || calculateWinner(board)) return;
    const newBoard = [...board];
    const currentPlayer = isXNext ? "X" : "O";
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const winner = calculateWinner(newBoard);
    if (winner) {
      setScore((prevScore) => ({
        ...prevScore,
        [winner as "X" | "O"]: prevScore[winner as "X" | "O"] + 1,
      }));
    }
  };

  const calculateWinner = (squares: (string | null)[]) => {
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
    for (const [a, b, c] of lines) {
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(board);
  const status = winner
    ? `🎉 Winner: ${winner}`
    : `Next player: ${isXNext ? "X" : "O"}`;

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-8 bg-gray-100 max-h-screen justify-center">
      <h1 className="text-4xl font-bold text-blue-600">Tic Tac Toe</h1>
      <p className="text-xl font-semibold text-gray-700">{status}</p>
      <div className="p-4 bg-white rounded-lg shadow-md text-lg font-semibold">
        <p>
          Score:
          <span className="text-red-500"> X - {score.X} </span>|{" "}
          <span className="text-blue-500">O - {score.O} </span>
        </p>
      </div>
      <div className="grid grid-cols-3 gap-3 bg-white p-4 rounded-lg shadow-md">
        {board.map((cell, index) => (
          <button
            key={index}
            className="w-24 h-24 flex items-center justify-center border-2 border-gray-500 text-3xl font-bold bg-gray-200 hover:bg-gray-300 rounded-lg"
            onClick={() => handleClick(index)}
          >
            {cell}
          </button>
        ))}
      </div>
      <button
        className="px-6 py-3 bg-red-500 text-white rounded-lg text-lg font-semibold hover:bg-red-700 shadow-lg"
        onClick={resetGame}
      >
        Restart Game
      </button>
    </div>
  );
};

export default TicTacToe;

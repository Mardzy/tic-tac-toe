import React, { MouseEvent, useEffect, useState } from "react";

import { Flex } from "./ui/atom";

import logo from "./logo.svg";
import "./App.css";

const initialGridState: string[] = ["", "", "", "", "", "", "", "", ""];

const hasWon = (board: string[], player: string) => {
  const magicSquare: number[] = [8, 1, 6, 3, 5, 7, 4, 9, 2];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      for (let k = 0; k < board.length; k++) {
        if (i !== j && i !== k && j !== k) {
          if (
            board[i] === player &&
            board[j] === player &&
            board[k] === player
          ) {
            if (magicSquare[i] + magicSquare[j] + magicSquare[k] === 15) {
              return true;
            }
          }
        }
      }
    }
  }
  return false;
};

function App() {
  const [gridState, setGridState] = useState<string[]>(initialGridState);
  const [toggleMove, setToggleMove] = useState<boolean>(true);
  const [player, setPlayer] = useState<string>(toggleMove ? "X" : " O");
  const [count, setCount] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [gameResult, setGameResult] = useState<string>("");

  const handleClick = (
    { currentTarget: { innerText } }: MouseEvent<HTMLButtonElement>,
    gridPosition: number
  ) => {
    setGridState((prevState) => {
      let result = prevState;
      if (!innerText && !isGameOver) {
        setCount(count + 1);
        setPlayer(!toggleMove ? "X" : "O");
        setToggleMove(!toggleMove);
        result[gridPosition] = player;
      }
      return result;
    });
  };

  useEffect(() => {
    const playerOStatus = hasWon(gridState, "O");
    const playerXStatus = hasWon(gridState, "X");

    if (playerOStatus || playerXStatus || count === 9) {
      setIsGameOver(true);
      if (playerOStatus) {
        setGameResult("Player O has won!");
      } else if (playerXStatus) {
        setGameResult("Player X has won!");
      } else {
        setGameResult("We have a DRAW!");
      }
    }
  }, [count, gridState, player]);

  return (
    <Flex className="bg-black h-screen justify-center">
      <Flex className="flex-col items-center md:w-1/2 lg:w-1/5">
        <h1 className="text-white text-3xl mt-10">Tic Tac Toe</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <Flex className="flex-col items-center mt-5 py-10 bg-blue-400">
          <div className="grid grid-cols-3 gap-1 bg-black w-4/5">
            {gridState?.map((item, i) => (
              <button
                className="bg-white h-10 py-10 flex items-center justify-center"
                key={i}
                onClick={(e) => handleClick(e, i)}
              >
                {item}
              </button>
            ))}
          </div>
          <button
            className="bg-amber-400 p-3 mt-5"
            onClick={() => {
              setGridState(["", "", "", "", "", "", "", "", ""]);
              setCount(0);
              setIsGameOver(false);
              setGameResult("");
            }}
          >
            Reset Game
          </button>
        </Flex>
        <h3 className="text-white text-2xl mt-10">{gameResult}</h3>
      </Flex>
    </Flex>
  );
}

export default App;

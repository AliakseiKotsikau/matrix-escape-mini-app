// grid-game.ts
'use client';

import SelectedCell from "@/types/SelectedCell";
import { useState, useEffect } from "react";

// Helper function to generate the grid
const generateGrid = (n: number): number[][] => {
    return Array.from({ length: n }, () =>
        Array.from({ length: n }, () => Math.round(Math.random()))
    );
};

// Check if the selected cells match the sequence
const validateSelectedCells = (
    selectedCells: SelectedCell[],
    sequence: number[]
): boolean => {
    // Extract values from selected cells
    const selectedValues = selectedCells.map((cell) => cell.value);

    // Check if the selected values match the sequence
    return selectedValues.every((val, idx) => val === sequence[idx]);
};

const GridGame = () => {
    const [grid, setGrid] = useState<number[][]>([]);
    const [sequence, setSequence] = useState<number[]>([]);
    const [selectedCells, setSelectedCells] = useState<SelectedCell[]>([]);
    const [message, setMessage] = useState<string>("");

    const gridSize = 5;
    const seqLength = 3;

    useEffect(() => {
        setGrid(generateGrid(gridSize));
        setSequence(Array.from({ length: seqLength }, () => Math.round(Math.random())));
        setSelectedCells([]);
        setMessage("");
    }, []);

    const startGame = () => {
        setGrid(generateGrid(gridSize));
        setSequence(Array.from({ length: seqLength }, () => Math.round(Math.random())));
        setSelectedCells([]);
        setMessage("");
    }

    const toggleCellSelection = (row: number, col: number, cellValue: number) => {
        checkSelection();
        if (selectedCells.length < sequence.length) {
            let newSelectedCell: SelectedCell = {
                position: [row, col],
                value: cellValue
            }
            setSelectedCells([...selectedCells, newSelectedCell]);
        }
    };


    const checkSelection = () => {

        if (validateSelectedCells(selectedCells, sequence)) {
            setMessage("Correct sequence! You found it!");
        } else {
            setMessage("Incorrect sequence. Try again!");
        }
    };

    const checkThatRowOrColumnSame = (row: number, col: number) => {
        return selectedCells.every((cell) => cell.position[0] === row || cell.position[1] === col);
    }

    return (
        <div className="p-4 min-h-screen flex flex-col items-center justify-center">
            <p className="mt-4 pb-10 text-center text-lg font-bold">Find the sequence: {sequence.join(", ")}</p>
            <div
                className={`grid grid-cols-${gridSize} gap-2 mt-4 w-full`}
                style={{
                    gridTemplateColumns: `repeat(${gridSize}, 1fr)`, // Ensure a constant number of columns
                }}
            >
                {grid.map((row, rowNumber) =>
                    row.map((cellValue, cellNumber) => {
                        const isSelected = selectedCells.some((cell) => cell.position[0] === rowNumber && cell.position[1] === cellNumber);
                        const isOnSameVerticalOrHorizontal = checkThatRowOrColumnSame(rowNumber, cellNumber);
                        return (
                            <div
                                key={`${rowNumber}-${cellNumber}`}
                                onClick={() => toggleCellSelection(rowNumber, cellNumber, cellValue)}
                                className={`flex items-center justify-center border cursor-pointer
              ${isSelected ? isOnSameVerticalOrHorizontal? "bg-green-400" : "bg-red-400" : "bg-green-900"}
              aspect-square`}
                            >
                                <span
                                    className={`text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold ${isSelected ? "text-black" : "text-white"
                                        }`}
                                >
                                    {cellValue}
                                </span>
                            </div>
                        );
                    })
                )}
            </div>

            {/* <div className={`grid grid-cols-${gridSize} gap-2 mt-4 w-full max-w-md sm:max-w-lg md:max-w-xl`}>
                {grid.map((row, i) =>
                    row.map((cell, j) => {
                        const isSelected = selectedCells.some(([r, c]) => r === i && c === j);
                        return (
                            <div
                                key={`${i}-${j}`}
                                onClick={() => toggleCellSelection(i, j)}
                                className={`flex items-center justify-center border cursor-pointer
              ${isSelected ? "bg-green-400" : "bg-green-900"}
              w-full aspect-square`} // Ensures cells are square and adjust dynamically
                            >
                                <span
                                    className={`text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold ${isSelected ? "text-black" : "text-white"}`}
                                >
                                    {cell}
                                </span>
                            </div>
                        );
                    })
                )}
            </div> */}
            <button
                onClick={startGame}
                className="mt-4 ml-2 px-4 py-2 bg-gray-500 text-white rounded"
            >
                Start
            </button>
            <p className="mt-4 text-green-600">{message}</p>
        </div>
    );
};

export default GridGame;

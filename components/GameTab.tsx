// grid-game.ts
'use client';

import { useState, useEffect } from "react";

// Helper function to generate the grid
const generateGrid = (n: number): number[][] => {
    return Array.from({ length: n }, () =>
        Array.from({ length: n }, () => Math.round(Math.random()))
    );
};

// Check if the selected cells match the sequence
const validateSelectedCells = (
    grid: number[][],
    selectedCells: [number, number][],
    sequence: number[]
): boolean => {
    if (selectedCells.length !== sequence.length) return false;

    // Extract values from selected cells
    const selectedValues = selectedCells.map(([row, col]) => grid[row][col]);

    // Check if the selected values match the sequence
    return selectedValues.every((val, idx) => val === sequence[idx]);
};

const GridGame = () => {
    const [grid, setGrid] = useState<number[][]>([]);
    const [sequence, setSequence] = useState<number[]>([]);
    const [selectedCells, setSelectedCells] = useState<[number, number][]>([]);
    const [message, setMessage] = useState<string>("");

    const gridSize = 5; // NxN grid
    const seqLength = 3; // Length of the sequence

    useEffect(() => {
        setGrid(generateGrid(gridSize));
        setSequence(Array.from({ length: seqLength }, () => Math.round(Math.random())));
        setSelectedCells([]);
        setMessage("");
    }, []);

    const toggleCellSelection = (row: number, col: number) => {
        setSelectedCells((prev) => {
            const cellIndex = prev.findIndex(([r, c]) => r === row && c === col);
            if (cellIndex > -1) {
                // Deselect if already selected
                return prev.filter((_, index) => index !== cellIndex);
            }
            // Add new selection and ensure it is a tuple of [number, number]
            const newSelection: [number, number][] = [...prev, [row, col] as [number, number]];
            return newSelection.slice(-seqLength); // Limit selection to sequence length
        });
    };


    const checkSelection = () => {
        if (validateSelectedCells(grid, selectedCells, sequence)) {
            setMessage("Correct sequence! You found it!");
        } else {
            setMessage("Incorrect sequence. Try again!");
        }
    };

    return (
        <div className="p-4 min-h-screen flex flex-col items-center justify-center">
            <p className="mt-4 pb-10 text-center text-lg font-bold">Find the sequence: {sequence.join(", ")}</p>
            <div className={`grid grid-cols-${gridSize} gap-2 mt-4 w-full max-w-md sm:max-w-lg md:max-w-xl`}>
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
            </div>
            <button
                onClick={checkSelection}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
                Check Sequence
            </button>
            <button
                onClick={() => {
                    setGrid(generateGrid(gridSize));
                    setSequence(Array.from({ length: seqLength }, () => Math.round(Math.random())));
                    setSelectedCells([]);
                    setMessage("");
                }}
                className="mt-4 ml-2 px-4 py-2 bg-gray-500 text-white rounded"
            >
                New Game
            </button>
            <p className="mt-4 text-green-600">{message}</p>
        </div>
    );
};

export default GridGame;

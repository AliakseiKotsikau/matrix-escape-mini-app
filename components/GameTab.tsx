// grid-game.ts
'use client';

import SelectedCell from "@/types/SelectedCell";
import { useState, useEffect } from "react";

const generateGrid = (n: number): number[][] => {
    return Array.from({ length: n }, () =>
        Array.from({ length: n }, () => Math.round(Math.random()))
    );
};

const validateSelectedCells = (
    selectedCells: SelectedCell[],
    sequence: number[]
): boolean => {
    // Check if the selected values match the sequence
    return selectedCells.every((cell, idx) => cell.value === sequence[idx]);
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

    const toggleCellSelection = (selectedCellPosition: number[], cellValue: number) => {
        if (selectedCells.length < sequence.length) {
            const newSelectedCell = createSelectedCellObject(selectedCellPosition, cellValue);

            let newSelectedCellsArray = [];

            const cellAlreadyIsInArray = selectedCells.some(cell => arePositionsSame(cell.position, selectedCellPosition));

            if (cellAlreadyIsInArray) {
                newSelectedCellsArray = selectedCells.filter(cell => !(arePositionsSame(cell.position, selectedCellPosition)));
            } else {
                newSelectedCellsArray = [...selectedCells, newSelectedCell];
            }

            setSelectedCells(newSelectedCellsArray);

            if (newSelectedCellsArray.length === sequence.length) {
                checkSelection(newSelectedCellsArray);
            }
        }
    }

    const checkSelection = (cellsToCheck: SelectedCell[]) => {
        if (validateSelectedCells(cellsToCheck, sequence)) {
            setMessage("Correct sequence! You found it!");
        } else {
            setMessage("Incorrect sequence. Try again!");
        }
    };

    const arePositionsSame = (firstPosition: number[], secondPosition: number[]) => {
        return firstPosition[0] === secondPosition[0] && firstPosition[1] === secondPosition[1];
    }

    const createSelectedCellObject = (selectedCellPosition: number[], cellValue: number): SelectedCell => {
        return {
            position: selectedCellPosition,
            value: cellValue
        };
    }

    const checkThatRowOrColumnSameToPreviouslySelectedCell = (previousCell: SelectedCell | undefined, row: number, col: number) => {
        if (!previousCell) return false;

        const [prevRow, prevCol] = previousCell.position;

        // Check for vertical or horizontal neighbors
        const isVerticalNeighbor = Math.abs(prevRow - row) === 1 && prevCol === col;
        const isHorizontalNeighbor = Math.abs(prevCol - col) === 1 && prevRow === row;

        return isVerticalNeighbor || isHorizontalNeighbor;
    }


    return (
        <div className="p-4 flex flex-col items-center justify-center h-full">
            <p className="mt-4 pb-10 text-center text-lg font-bold">Find the sequence: {sequence.join(", ")}</p>
            <div
                className={`grid grid-cols-${gridSize} gap-2 mt-4 w-full`}
                style={{
                    gridTemplateColumns: `repeat(${gridSize}, 1fr)`, // Ensure a constant number of columns
                }}
            >
                {grid.map((row, rowNumber) =>
                    row.map((cellValue, cellNumber) => {
                        const isSelected = selectedCells.some(cell => arePositionsSame(cell.position, [rowNumber, cellNumber]));

                        // Check if the cell is in the same row or column as all other selected cells
                        const isOnSameVerticalOrHorizontal =
                            checkThatRowOrColumnSameToPreviouslySelectedCell(selectedCells.at(-2), rowNumber, cellNumber);

                        // Check if it's the last selected cell
                        const isLastSelected =
                            selectedCells.at(-1)?.position[0] === rowNumber &&
                            selectedCells.at(-1)?.position[1] === cellNumber;

                        const isFirstSelected =
                            selectedCells.at(0)?.position[0] === rowNumber &&
                            selectedCells.at(0)?.position[1] === cellNumber;

                        // Determine the class for the cell
                        const cellClass = isSelected
                            ? isLastSelected && !isFirstSelected ? (isOnSameVerticalOrHorizontal ? "bg-green-400" : "bg-red-400") : "bg-green-400"
                            : "bg-green-900";

                        return (
                            <div
                                key={`${rowNumber}-${cellNumber}`}
                                onClick={() => toggleCellSelection([rowNumber, cellNumber], cellValue)}
                                className={`flex items-center justify-center border cursor-pointer ${cellClass} aspect-square`}
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
            <button
                onClick={startGame}
                className="mt-4 ml-2 px-4 py-2 bg-gray-500 text-white rounded"
            >
                Start
            </button>
            <p
                className="mt-4 text-green-600"
                style={{
                    minHeight: "1.5rem", // Fixed height to prevent movement
                    visibility: message ? "visible" : "hidden", // Keeps the space but hides the message when empty
                }}
            >
                {message}
            </p>
        </div>
    );
};

export default GridGame;

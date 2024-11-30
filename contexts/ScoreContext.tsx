'use client'

import { createContext, useContext, useState } from 'react'


type GameScoreType = {
    score: number
    setScore: (score: number) => void
    increaseBy: (increment: number) => void
}

const GameScoreContext = createContext<GameScoreType | undefined>(undefined)

export function GameScoreProvider({ children }: { children: React.ReactNode }) {
    const [score, setScore] = useState<number>(0);

    const increaseBy = (increment: number) => {
        setScore(score + increment);
    }

    return (
        <GameScoreContext.Provider value={{ score, setScore, increaseBy }}>
            {children}
        </GameScoreContext.Provider>
    )
}

export function useGameScore() {
    const context = useContext(GameScoreContext)
    if (context === undefined) {
        throw new Error('useNewContext must be used within a NewProvider')
    }
    return context
}
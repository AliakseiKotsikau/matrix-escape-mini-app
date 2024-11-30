'use client';

import { useGameScore } from "@/contexts/ScoreContext";

const HomeTab = () => {
    const {score} = useGameScore();

    return (
        <div className={`px-4 pb-24 transition-all duration-300 flex items-center justify-center text-center h-full`}>
            <div className="pt-8 space-y-1">
                <h1 className="text-4xl font-bold text-green-700 pb-20">MATRIX EXCAPE</h1>
                <div className="text-white-500 text-4xl pt-20">
                    <div>{score} Sequences</div>
                </div>
            </div>
        </div>
    );
};

export default HomeTab;
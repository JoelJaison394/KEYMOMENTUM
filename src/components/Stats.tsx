import React from "react";

interface CustomStatsProps {
  status: string;
  wpm: number;
  countDown: number;
  statsCharCount: {
    correct: number;
    incorrect: number;
    missing: number;
    accuracy: number;
  };
  rawKeyStrokes: number;
}

const CustomStats: React.FC<CustomStatsProps> = ({
  status,
  wpm,
  countDown,
  statsCharCount,
  rawKeyStrokes,
}) => {
  return (
    <div className="mt-4">
      <div className="flex flex-row">
        <h3 className="mr-4">WPM: {Math.round(wpm)}</h3>
        {status === "finished" && (
          <h4 className="mr-4">Accuracy: {Math.round(statsCharCount.accuracy)} %</h4>
        )}
        {status === "finished" && (
          <div className="mr-4">
            <h4>
              Char:{" "}
              <span className="correct-char-stats">{statsCharCount.correct}</span>/
              <span className="incorrect-char-stats">{statsCharCount.incorrect}</span>/
              <span className="missing-char-stats">{statsCharCount.missing}</span>/
              <span className="correct-char-stats">{statsCharCount.correct}</span>/
              <span className="incorrect-char-stats">{statsCharCount.incorrect}</span>
            </h4>
          </div>
        )}
        {status === "finished" && (
          <h4>Raw KPM: {Math.round((rawKeyStrokes / countDown) * 60.0)}</h4>
        )}
      </div>
    </div>
  );
};

export default CustomStats;

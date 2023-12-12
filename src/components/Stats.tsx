import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import MEDAL1 from "../assets/Icons/MEDAL-1.svg";
import MEDAL2 from "../assets/Icons/MEDAL-2.svg";
import MEDAL3 from "../assets/Icons/MEDAL-3.svg";
import MEDAL4 from "../assets/Icons/MEDAL-4.svg";
import MEDAL5 from "../assets/Icons/MEDAL-5.svg";
import { useSettings } from "../context/SettingsContext";

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
  const { resetGame  } = useSettings();
  const onclose = () => {
    resetGame(0);
  }
  return (
    <div className="fixed w-full inset-0 flex items-center justify-center bg-opacity-50 bg-blur backdrop-filter backdrop-blur-md">
      <div className="bg-[#0e0e03c5] w-4/6 p-8 rounded-lg space-y-4 text-white">
        <div className="flex justify-end">
          <button onClick={onclose} className="text-gray-600">
            <AiOutlineClose size={24} />
          </button>
        </div>
        <h3>Your Performance</h3>
        <div className="flex">
          <div className="w-96">
            {wpm < 8 ? (
              <img src={MEDAL5} alt="" />
            ) : wpm < 15 ? (
              <img src={MEDAL4} alt="" />
            ) : wpm < 20 ? (
              <img src={MEDAL3} alt="" />
            ) : wpm < 30 ? (
              <img src={MEDAL2} alt="" />
            ) : (
              <img src={MEDAL1} alt="" />
            )}
          </div>
          <div className="">
            <div>
              <h4>WPM: {Math.round(wpm)}</h4>
            </div>
            {status === "finished" && (
              <div>
                <h4>Accuracy: {Math.round(statsCharCount.accuracy)} %</h4>
              </div>
            )}
            {status === "finished" && (
              <div>
                <h4>
                  Char:{" "}
                  <span className="correct-char-stats">
                    {statsCharCount.correct}
                  </span>
                  /
                  <span className="incorrect-char-stats">
                    {statsCharCount.incorrect}
                  </span>
                  /
                  <span className="missing-char-stats">
                    {statsCharCount.missing}
                  </span>
                </h4>
              </div>
            )}
            {status === "finished" && (
              <div>
                <h4>
                  Raw KPM: {Math.round((rawKeyStrokes / countDown) * 60.0)}
                </h4>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomStats;

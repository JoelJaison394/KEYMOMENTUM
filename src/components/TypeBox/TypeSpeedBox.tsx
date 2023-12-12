import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { wordsGenerator } from "../../utils/wordsGenerator";
import useCapsLockStatus from "../../hooks/useCapsLockStatus";
import { useSettings } from "../../context/SettingsContext";
import { useStats } from "../../context/StatsContext";
import { GrPowerReset } from "react-icons/gr";
import { PiWarningDiamondBold } from "react-icons/pi";
import { motion } from "framer-motion";

interface TypingGameProps {}

const TypingGame: React.FC<TypingGameProps> = () => {
  const {
    difficulty,
    timeRange,
    timeRemaining,
    isGameRunning,
    setStartTime,
    startTime,
    endTime,
    setEndTime,
    setIsGameRunning,
    resetGame,
    userInputArray,
    setUserInputArray
} = useSettings();
  const { updateAccuracy, updateWPM, updateCorrectCharsTyped } = useStats();
  const [userInput, setUserInput] = useState<string>("");
  const [sentence, setSentence] = useState<string>("");
  const capsLockIsOn = useCapsLockStatus();
  const sentenceContainerRef = useRef<HTMLDivElement>(null);
  const [unmatchedcharNum, setUnmatchedcharNum] = useState<number>(0);
  useEffect(() => {
    console.log("Updated sentence:", sentence);
  }, [sentence]);

  useEffect(() => {
    const calculateWordCount = (baseCount: number, multiplier: number) => {
      return baseCount + multiplier * 10;
    };

    const baseCount = 100; 
    let wordCount;

    if (difficulty === 0) {
      wordCount = calculateWordCount(baseCount, timeRange / 30);
    } else if (difficulty === 1) {
      wordCount = calculateWordCount(baseCount + 10, timeRange / 30);
    } else if (difficulty === 2) {
      wordCount = calculateWordCount(baseCount, timeRange / 30 + 3);
    } else if (difficulty === 3) {
      wordCount = calculateWordCount(baseCount - 25, timeRange / 30 + 5);
    }

    setSentence(
      wordsGenerator(wordCount || 0, difficulty, "ENGLISH_MODE")
        .map((word) => (typeof word.val === "string" ? word.val : word.val.val))
        .join(" ")
    );
  }, [difficulty, timeRange]);


  useEffect(() => {

    if(userInputArray.length === 0){
        setUserInput("");
    }
  }, [userInputArray]);

  const handleReset = () => {
    setSentence(
        wordsGenerator(100, difficulty, "ENGLISH_MODE")
          .map((word) => (typeof word.val === "string" ? word.val : word.val.val))
          .join(" ")
      );
      
    resetGame(0);
  };



  const charactersMatch = (char1: string, char2: string) => {
    const lowerChar1 = char1.toLowerCase();
    const lowerChar2 = char2.toLowerCase();
    if (lowerChar1 === lowerChar2) {
      return;
    } else {
      setUnmatchedcharNum(unmatchedcharNum + 1);
    }

    return;
  };

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (timeRemaining !== null && timeRemaining !== 0) {
        const input = e.target.value;
        setUserInput(input);

        if (!userInputArray.length) {
          initializeGame();
        }

        setUserInputArray([...input]);
        setIsGameRunning(true);
        const lastUserInputChar: string = userInput.charAt(
          userInput.length - 1
        );
        if (userInput.length > 0 && userInput.length <= sentence.length) {
          const char = sentence.charAt(userInput.length - 1);
          charactersMatch(char, lastUserInputChar);
        } else if (userInput.length > sentence.length) {
          const char = sentence.charAt(sentence.length - 1);
          charactersMatch(char, lastUserInputChar);
        }

        if (sentenceContainerRef.current) {
          sentenceContainerRef.current.scrollTop =
            sentenceContainerRef.current.scrollHeight;
        }
      }
    },
    [userInputArray, timeRemaining]
  );

  useEffect(() => {
    if (timeRemaining === 0) {
      updateWPM(Math.round((userInputArray.length / 5) * (60 / timeRange)));
      const correctCharCount = userInput.length - unmatchedcharNum;
      updateCorrectCharsTyped(correctCharCount);
      updateAccuracy((correctCharCount / userInput.length) * 100);
    }
  }, [timeRemaining]);

  const initializeGame = () => {
    if (!isGameRunning) {
      if (startTime === null) {
        setStartTime(Math.floor(Date.now() / 1000));
      }
      console.log(startTime);
      if (endTime === null) {
        setEndTime(Math.floor(Date.now() / 1000) + timeRange);
      }
    }
    console.log("start time", startTime, "end time", endTime);
  };

  const renderSentence = useMemo(() => {
    const sentenceString = sentence;
    console.log("sentenceString - : ", sentenceString);
    const userInputString = userInputArray.join("");

    return (
      <div>
        {sentenceString.split("").map((char, index) => (
          <span
            key={index}
            style={{
              display: "inline-block",
              whiteSpace: "pre",
              color: char === userInputString[index] ? "white" : "grey",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>
    );
  }, [sentence, userInputArray]);

  return (
    <div className="h-70vh my-4 flex flex-col items-center justify-center bg-black text-white">
        <div className="h-8 m-5">
        {capsLockIsOn && (
        <motion.span
          animate={{
            opacity: [1, 0],
            transition: { duration: 2, repeat: Infinity },
          }}
        >
          <PiWarningDiamondBold size={34} className="text-[#1595DC]"/>
        </motion.span>
      )}
        </div>


      <div>
        {timeRemaining !== -1 && (
          <p className="text-xl">Time Remaining: {timeRemaining}s</p>
        )}
      </div>
      <div
        className="w-full flex P-5 justify-center h-auto overflow-hidden items-center"
        ref={sentenceContainerRef}
      >
        <p className="text-2xl  w-10/12">{renderSentence}</p>
      </div>
      <input
        className="bg-gray-800 text-4xl text-white p-2 rounded w-1/2 h-20 mt-8 "
        type="text"
        value={userInput}
        onChange={handleInputChange}
        placeholder="Type here..."
      />
      <div className="mt-10">
        <button
          className="h-auto p-3 bg-[#282828] rounded-2xl mx-4 flex justify-center items-center cursor-pointer hover:bg-[#484848] mb-5"
          onClick={handleReset}
        >
          <motion.div
            whileTap={{ scale: 0.95, rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <GrPowerReset
              size={34}
              className="text-[#1595DC]"
              onClick={handleReset}
            />
          </motion.div>
        </button>
      </div>
    </div>
  );
};

export default TypingGame;

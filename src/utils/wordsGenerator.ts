import randomWords from 'random-words';
import { COMMON_WORDS, CommonWord } from './WordsMostCommon';
import { randomIntFromRange } from './randomUtils';

const ENGLISH_MODE = "ENGLISH_MODE" as const;

type LanguageMode = typeof ENGLISH_MODE | "other";

export interface Word {
  val: string | CommonWord;
}

const wordsGenerator = (wordsCount: number, difficulty: number, languageMode: LanguageMode): Word[] => {
  if (languageMode === ENGLISH_MODE) {
    if (difficulty === 0) {
      const randomIndices: number[] = Array.from({ length: wordsCount }, () => randomIntFromRange(0, COMMON_WORDS.length - 1));
      const EnglishWordList: Word[] = randomIndices.map((index) => ({ val: COMMON_WORDS[index] }));
      return EnglishWordList;
    } else if (difficulty === 1) {
      return randomWords({ exactly: wordsCount, maxLength: 7 }).map((val) => ({ val }));
    } else if (difficulty === 2) {
      const capitalizeWords = (words: string[]): Word[] => {
        return words.map((word) => ({ val: word.charAt(0).toUpperCase() + word.slice(1) }));
      };
      return capitalizeWords(randomWords({ exactly: wordsCount, maxLength: 7 }));
    } else if (difficulty === 3) {
      const specialCharacters = ['!', '@', '#', '$', '%', '^', '&', '*'];
      const randomIndices: number[] = Array.from({ length: wordsCount * 2 - 1 }, () => randomIntFromRange(0, specialCharacters.length - 1));
      const wordsWithSpecialChars: Word[] = randomIndices.map((value, index) =>
        index % 2 === 0
          ? { val: randomWords({ exactly: 1, maxLength: 7 })[0] } // Word
          : { val: specialCharacters[value] } // Special Character
      );
      return wordsWithSpecialChars;
    }
  }
  return Array.from({ length: wordsCount }, () => ({ val: "something" }));
};

export { wordsGenerator };

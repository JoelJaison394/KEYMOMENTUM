// WordsMostCommon.ts
import EnglishMostFrequentWords from '../static/data/EnglishMostFrequentWords.json';

export type CommonWord = {
  key: string;
  val: string;
};

const COMMON_WORDS: CommonWord[] = Object.values(EnglishMostFrequentWords);

export { COMMON_WORDS };


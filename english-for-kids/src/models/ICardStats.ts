import { CardStatsProps } from '../shared/constants';

interface ICardStats {
  word: string;
  translation: string;
  category: string;
  [CardStatsProps.clicks]: number;
  [CardStatsProps.correctClicks]: number;
  [CardStatsProps.wrongClicks]: number;
  [CardStatsProps.error]: number;
}

export default ICardStats;

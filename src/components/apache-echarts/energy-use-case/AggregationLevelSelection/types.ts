import type { Aggregations } from '~/utils/timeseries';

export type AggregationLevelButtonClick = (event: Event) => void;

export type AggregationLevelSelectionClick = (
  selectedAggregation: Aggregations,
  isYearLevelClick: boolean
) => void;

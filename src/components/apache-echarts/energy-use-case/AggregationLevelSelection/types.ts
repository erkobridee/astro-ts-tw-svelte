import type { Aggregations } from '~/utils/timeseries';

export const AggregationLevelSelectionLayout = {
  YEAR: 'YEAR',
  MONTH: 'MONTH',
  DAY: 'DAY'
} as const satisfies Record<string, string>;

export type AggregationLevelSelectionLayoutKey =
  keyof typeof AggregationLevelSelectionLayout;
export type AggregationLevelSelectionLayouts =
  (typeof AggregationLevelSelectionLayout)[AggregationLevelSelectionLayoutKey];

export type AggregationLevelSelectionClick = (
  selectedAggregation: Aggregations,
  selectedLayout: AggregationLevelSelectionLayouts
) => void;

export type AggregationLevelButtonClick = (event: Event) => void;

export interface AggregationLevelButtonsGroupItem {
  label: string;
  isSelected: boolean;
  onclick: AggregationLevelButtonClick;
}

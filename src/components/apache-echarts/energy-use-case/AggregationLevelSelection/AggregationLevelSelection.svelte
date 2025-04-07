<script lang="ts">
  import type { EnergyTypes, Aggregations } from '~/utils/timeseries';
  import type {
    AggregationLevelSelectionLayouts,
    AggregationLevelSelectionClick,
    AggregationLevelButtonsGroupItem
  } from './types';

  import AggregationLevelButtonsGroup from './AggregationLevelButtonsGroup.svelte';

  import { EnergyType, Aggregation } from '~/utils/timeseries';
  import { AggregationLevelSelectionLayout } from './types';

  export let energyType: EnergyTypes;
  export let aggregation: Aggregations;
  export let layout: AggregationLevelSelectionLayouts =
    AggregationLevelSelectionLayout.YEAR;

  export let onclick: AggregationLevelSelectionClick;

  //--------------------------------------------------------------------------//

  let yearLevelButtons: AggregationLevelButtonsGroupItem[] = [];
  let monthLevelButtons: AggregationLevelButtonsGroupItem[] = [];
  let dayLevelButtons: AggregationLevelButtonsGroupItem[] = [];

  $: updateUI(energyType, aggregation, layout);

  const updateUI = (
    energyType: EnergyTypes,
    aggregation: Aggregations,
    layout: AggregationLevelSelectionLayouts
  ) => {
    const isYearLevel = layout === AggregationLevelSelectionLayout.YEAR;
    monthLevelButtons = [];
    dayLevelButtons = [];

    yearLevelButtons = [
      {
        label: 'Months',
        isSelected: isYearLevel && aggregation === Aggregation.MONTH,
        onclick: onInnerClick(
          Aggregation.MONTH,
          AggregationLevelSelectionLayout.YEAR
        )
      },
      {
        label: 'Weeks',
        isSelected: isYearLevel && aggregation === Aggregation.WEEK,
        onclick: onInnerClick(
          Aggregation.WEEK,
          AggregationLevelSelectionLayout.YEAR
        )
      }
    ];

    if (layout === AggregationLevelSelectionLayout.MONTH) {
      monthLevelButtons = [
        {
          label: 'Weeks',
          isSelected: aggregation === Aggregation.WEEK,
          onclick: onInnerClick(
            Aggregation.WEEK,
            AggregationLevelSelectionLayout.MONTH
          )
        }
      ];

      if (
        ([Aggregation.DAY, Aggregation.HOUR] as string[]).includes(aggregation)
      ) {
        monthLevelButtons.push({
          label: 'Days',
          isSelected: aggregation === Aggregation.DAY,
          onclick: onInnerClick(
            Aggregation.DAY,
            AggregationLevelSelectionLayout.MONTH
          )
        });
      }

      if (energyType === EnergyType.GAS && aggregation === Aggregation.HOUR) {
        monthLevelButtons.push({
          label: 'Hours',
          isSelected: aggregation === Aggregation.HOUR,
          onclick: onInnerClick(
            Aggregation.HOUR,
            AggregationLevelSelectionLayout.MONTH
          )
        });
      }
    }

    if (layout === AggregationLevelSelectionLayout.DAY) {
      dayLevelButtons = [
        {
          label: 'Hours',
          isSelected: aggregation === Aggregation.HOUR,
          onclick: onInnerClick(
            Aggregation.HOUR,
            AggregationLevelSelectionLayout.DAY
          )
        },
        {
          label: 'Minutes',
          isSelected: aggregation === Aggregation.MINUTES,
          onclick: onInnerClick(
            Aggregation.MINUTES,
            AggregationLevelSelectionLayout.DAY
          )
        }
      ];
    }
  };

  //--------------------------------------------------------------------------//

  const onInnerClick =
    (
      selectedAggregation: Aggregations,
      layout: AggregationLevelSelectionLayouts
    ) =>
    (_: Event) =>
      onclick(selectedAggregation, layout);
</script>

<div class="flex flex-col gap-4 md:flex-row md:items-center">
  <AggregationLevelButtonsGroup label="Year" list={yearLevelButtons} />

  <AggregationLevelButtonsGroup label="Month" list={monthLevelButtons} />

  <AggregationLevelButtonsGroup label="Day" list={dayLevelButtons} />
</div>

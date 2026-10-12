<script lang="ts">
  import type { EnergyTypes, Aggregations } from '~/utils/timeseries';
  import type {
    AggregationLevelSelectionLayouts,
    AggregationLevelSelectionClick,
    AggregationLevelButtonsGroupItem
  } from './types';

  import { untrack } from 'svelte';

  import AggregationLevelButtonsGroup from './AggregationLevelButtonsGroup.svelte';

  import { EnergyType, Aggregation } from '~/utils/timeseries';
  import { AggregationLevelSelectionLayout } from './types';

  //--------------------------------------------------------------------------//

  interface AggregationLevelSelectionProps {
    energyType: EnergyTypes;
    aggregation: Aggregations;
    layout: AggregationLevelSelectionLayouts;
    onclick: AggregationLevelSelectionClick;
  }

  let {
    energyType,
    aggregation,
    layout = AggregationLevelSelectionLayout.YEAR,
    onclick
  }: AggregationLevelSelectionProps = $props();

  //--------------------------------------------------------------------------//

  let yearLevelButtons = $state<AggregationLevelButtonsGroupItem[]>([]);
  let monthLevelButtons = $state<AggregationLevelButtonsGroupItem[]>([]);
  let dayLevelButtons = $state<AggregationLevelButtonsGroupItem[]>([]);

  //---//

  const onInnerClick =
    (
      selectedAggregation: Aggregations,
      layout: AggregationLevelSelectionLayouts
    ) =>
    (_: Event) =>
      onclick(selectedAggregation, layout);

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

    if (
      (
        [
          AggregationLevelSelectionLayout.MONTH,
          AggregationLevelSelectionLayout.DAY
        ] as string[]
      ).includes(layout)
    ) {
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
        }
      ];

      if (aggregation === Aggregation.MINUTES) {
        dayLevelButtons.push({
          label: 'Minutes',
          isSelected: aggregation === Aggregation.MINUTES,
          onclick: onInnerClick(
            Aggregation.MINUTES,
            AggregationLevelSelectionLayout.DAY
          )
        });
      }
    }
  };

  $effect(() => {
    const currentEnergyType = energyType;
    const currentAggregation = aggregation;
    const currentLayout = layout;

    untrack(() => {
      updateUI(currentEnergyType, currentAggregation, currentLayout);
    });
  });
</script>

<div class="flex flex-col gap-4 md:flex-row md:items-center">
  <AggregationLevelButtonsGroup label="Year" list={yearLevelButtons} />

  <AggregationLevelButtonsGroup label="Month" list={monthLevelButtons} />

  <AggregationLevelButtonsGroup label="Day" list={dayLevelButtons} />
</div>

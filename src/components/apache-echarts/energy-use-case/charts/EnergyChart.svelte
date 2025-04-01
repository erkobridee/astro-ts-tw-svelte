<script lang="ts">
  /* eslint-disable */

  import type { TimeSerie, Units, Aggregations } from '~/utils/timeseries';
  import type { TimeSerieBarClick } from './common';

  import { Unit, Aggregation } from '~/utils/timeseries';

  import { COLOR_DEFAULT, DEFAULT_TIMESERIE_CLICK } from './common';

  //--------------------------------------------------------------------------//

  export let unit: Units = Unit.UNDEFINED;
  export let aggregation: Aggregations = Aggregation.UNDEFINED;

  export let color: string = COLOR_DEFAULT;

  export let timeseries: TimeSerie[] = [];

  export let onclick: TimeSerieBarClick = DEFAULT_TIMESERIE_CLICK;

  //--------------------------------------------------------------------------//

  let xAxisData: any[] = [];
  let series: any[] = [];

  //--------------------------------------------------------------------------//

  const xAxisLabelFormatter = (params: any) => undefined;

  const tooltipFormatter = (params: any) => undefined;

  // TODO: check if it's needed
  const onChartClick = () => undefined;

  // it should use the BaseColumnsChart
</script>

<div class="relative grow">
  <strong>TODO:</strong> define the ConsumptionCharts component UI
</div>

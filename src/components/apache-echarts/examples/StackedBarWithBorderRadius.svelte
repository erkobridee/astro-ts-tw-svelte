<script lang="ts">
  import type { EChartsOption, BarSeriesOption } from 'echarts';

  import ECharts from '~/components/apache-echarts/ECharts';

  //---//

  const WEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  //---//

  const EMPTY_ENTRY = '-';

  // DATA[/* stack */][/* series */]
  const DATA = {
    stack_a: {
      a: [120, 200, 150, 80, 70, 110, 130],
      b: [10, 46, 64, EMPTY_ENTRY, 0, EMPTY_ENTRY, 0],
      c: [30, EMPTY_ENTRY, 0, 20, 10, EMPTY_ENTRY, 0]
    },

    stack_b: {
      d: [30, EMPTY_ENTRY, 0, 20, 10, EMPTY_ENTRY, 0],
      e: [10, 20, 150, 0, EMPTY_ENTRY, 50, 10]
    }
  };

  const buildSeries = () => {
    const series: BarSeriesOption[] = [];

    for (const [stack, serie] of Object.entries(DATA)) {
      for (const [name, data] of Object.entries(serie)) {
        series.push({
          type: 'bar',
          stack,
          name,
          data,
          emphasis: {
            itemStyle: {
              // https://echarts.apache.org/en/option.html#series-bar.emphasis.itemStyle.color
              color: 'inherit'
            }
          }
        });
      }
    }

    return series;
  };

  //---//

  const LABEL_COLOR = '#71717a';
  const LINE_COLOR = '#a3a3a3';
  const LINE_STYLE = {
    type: [1, 3],
    color: LINE_COLOR
  };

  //---//

  const DEFAULT_RADIUS_BORDER = 10;

  const buildItemStyleBorderRadius = (
    topBorder = 0,
    bottomBorder = 0
  ): BarSeriesOption['itemStyle'] => ({
    borderRadius: [topBorder, topBorder, bottomBorder, bottomBorder]
  });

  //---//

  type StackInfo = Record<
    string,
    {
      stackStart: number[];
      stackEnd: number[];
    }
  >;

  // map to know which bar entry needs to have the border radius
  const buildStackInfo = (series: BarSeriesOption[]) => {
    const stackInfo: StackInfo = {};

    if (!series) {
      return stackInfo;
    }

    for (let i = 0; i < series[0].data!.length; ++i) {
      for (let j = 0; j < series.length; ++j) {
        const stackName = series[j].stack;
        if (!stackName) {
          continue;
        }
        if (!stackInfo[stackName]) {
          stackInfo[stackName] = {
            stackStart: [],
            stackEnd: []
          };
        }

        const info = stackInfo[stackName];
        const data = series[j].data![i];

        if (data && data !== EMPTY_ENTRY) {
          if (info.stackStart[i] == null) {
            info.stackStart[i] = j;
          }

          info.stackEnd[i] = j;
        }
      }
    }

    return stackInfo;
  };

  // add the border radius to the specific data entry that needs to render it
  const addBorderRadiusToStackedBars = (
    series: BarSeriesOption[]
  ): EChartsOption['series'] => {
    const stackInfo = buildStackInfo(series);

    for (let i = 0; i < series.length; ++i) {
      const data = series[i].data!;
      const info = stackInfo[series[i].stack!];
      for (let j = 0; j < series[i].data!.length; ++j) {
        // const isStart = info.stackStart[j] === i;
        const isEnd = info.stackEnd[j] === i;

        // there is no equivalente typescrit type for the structure below
        // but it's acceptable
        // https://echarts.apache.org/examples/en/editor.html?c=bar-stack-borderRadius&lang=ts
        data[j] = {
          value: data[j],
          itemStyle: buildItemStyleBorderRadius(
            isEnd ? DEFAULT_RADIUS_BORDER : 0
          )
        } as any;
      }
    }

    return series;
  };

  //---//

  const tooltip: EChartsOption['tooltip'] = {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
      // https://echarts.apache.org/en/option.html#tooltip.axisPointer.z
      z: 0,
      shadowStyle: {
        color: 'rgba(150,150,150,0.1)'
      }
    }
  };

  const grid: EChartsOption['grid'] = {
    containLabel: true,
    left: 10,
    right: 10,
    top: 10,
    bottom: 10
  };

  const xAxis: EChartsOption['xAxis'] = {
    type: 'category',
    data: WEEK_DAYS,
    axisLabel: {
      color: LABEL_COLOR
    },
    axisTick: {
      show: false,
      alignWithLabel: true
    },
    axisLine: {
      // https://echarts.apache.org/en/option.html#yAxis.axisLine.lineStyle.type
      lineStyle: LINE_STYLE
    },
    splitLine: {
      show: true,
      lineStyle: LINE_STYLE,
      showMinLine: false,
      showMaxLine: false,
      interval: 2
    }
  };

  const yAxis: EChartsOption['yAxis'] = {
    type: 'value',
    position: 'right',
    axisLabel: {
      inside: true,
      verticalAlign: 'bottom',
      padding: [0, -10, 2, 0],
      color: LABEL_COLOR,
      showMaxLabel: false
    },
    splitLine: {
      // https://echarts.apache.org/en/option.html#yAxis.splitLine.lineStyle.type
      lineStyle: LINE_STYLE,
      showMaxLine: false
    }
  };

  const series: EChartsOption['series'] =
    addBorderRadiusToStackedBars(buildSeries());

  //---//

  const options: EChartsOption = {
    tooltip,
    grid,
    xAxis,
    yAxis,
    series
  };
</script>

<div class="relative grow">
  <div class="absolute top-0 right-0 bottom-0 left-0">
    <ECharts id="stacket-columns-plus-markline" {options}></ECharts>
  </div>
</div>

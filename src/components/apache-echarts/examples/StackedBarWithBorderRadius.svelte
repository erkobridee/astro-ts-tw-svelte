<script lang="ts">
  /*
    Another approach possible to stack bars
    https://stackoverflow.com/questions/77415824/echarts-stacked-bar-chart-setting-borderradius-on-topmost-bar-only/77436099#77436099
  */

  import type { EChartsOption, BarSeriesOption } from 'echarts';

  import * as echarts from 'echarts';

  import ECharts from '~/components/apache-echarts/ECharts';

  import {
    WEEK_DAYS,
    LABEL_COLOR,
    LINE_STYLE,
    DEFAULT_RADIUS_BORDER,
    buildBarItemStyleBorderRadius
  } from '~/components/apache-echarts/common';

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

    const emphasis: BarSeriesOption['emphasis'] = {
      itemStyle: {
        // https://echarts.apache.org/en/option.html#series-bar.emphasis.itemStyle.color
        color: 'inherit'
      }
    };

    for (const [stack, serie] of Object.entries(DATA)) {
      for (const [name, data] of Object.entries(serie)) {
        series.push({
          type: 'bar',
          stack,
          name,
          data,
          emphasis
        });
      }
    }

    series.push({
      type: 'bar',
      name: 'f',
      data: [10, 20, 30, EMPTY_ENTRY, 50, 60, 70],
      emphasis
    });

    return series;
  };

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

    for (let i = 0; i < series[0].data!.length; ++i) {
      for (let j = 0; j < series.length; ++j) {
        const serie = series[j];

        const stackName = serie.stack;
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
        const data = serie.data![i];

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
  const addBorderRadiusToBars = (
    series: BarSeriesOption[]
  ): EChartsOption['series'] => {
    const stackInfo = buildStackInfo(series);

    for (let i = 0; i < series.length; ++i) {
      const serie = series[i];

      if (!serie.stack) {
        serie.itemStyle = buildBarItemStyleBorderRadius(DEFAULT_RADIUS_BORDER);

        continue;
      }

      const data = serie.data!;
      const dataLength = data.length;

      const info = stackInfo[serie.stack];

      for (let j = 0; j < dataLength; ++j) {
        // const isStart = info.stackStart[j] === i;
        const isEnd = info.stackEnd[j] === i;

        // there is no equivalente typescrit type for the structure below
        // but it's acceptable
        // https://echarts.apache.org/examples/en/editor.html?c=bar-stack-borderRadius&lang=ts
        data[j] = {
          value: data[j],
          itemStyle: buildBarItemStyleBorderRadius(
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

  const series: EChartsOption['series'] = addBorderRadiusToBars(buildSeries());

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
    <ECharts id="stacked-bar-with-border-radius" init={echarts.init} {options}
    ></ECharts>
  </div>
</div>

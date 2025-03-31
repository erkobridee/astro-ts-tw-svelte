<script lang="ts">
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

  const DATA = {
    direct: [320, 332, 301, 334, 390, 330, 320],

    // stack: Ads
    email: [120, 132, 101, 134, 90, 230, 210],
    unionAds: [220, 182, 191, 234, 290, 330, 310],
    videoAds: [150, 232, 201, 154, 190, 330, 410],

    // stack: Search Engine
    searchEngine: [862, 1018, 964, 1026, 1679, 1600, 1570],
    baidu: [620, 732, 701, 734, 1090, 1130, 1120],
    google: [120, 132, 101, 134, 290, 230, 220],
    bing: [60, 72, 71, 74, 190, 130, 110],
    others: [62, 82, 91, 84, 109, 110, 120]
  };

  //---//

  const BAR_SERIES_EMPHASIS: BarSeriesOption['emphasis'] = {
    focus: 'series',
    itemStyle: {
      // https://echarts.apache.org/en/option.html#series-bar.emphasis.itemStyle.color
      color: 'inherit'
    }
  };

  const BAR_SERIES_ITEM_STYLE: BarSeriesOption['itemStyle'] =
    buildBarItemStyleBorderRadius(DEFAULT_RADIUS_BORDER);

  //---//

  const legend: EChartsOption['legend'] = {
    top: 5
  };

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
    left: '3%',
    right: '4%',
    bottom: '3%',
    top: '8%',
    containLabel: true
  };

  const xAxis: EChartsOption['xAxis'] = {
    type: 'category',
    data: WEEK_DAYS,
    boundaryGap: true,
    axisLabel: {
      color: LABEL_COLOR
    },
    axisTick: {
      show: false
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
      interval: 1
    }
  };

  const yAxis: EChartsOption['yAxis'] = {
    type: 'value',
    position: 'right',
    axisLabel: {
      inside: false,
      verticalAlign: 'bottom',
      padding: [0, 0, 2, 0],
      showMaxLabel: false
    },
    splitLine: {
      // https://echarts.apache.org/en/option.html#yAxis.splitLine.lineStyle.type
      lineStyle: LINE_STYLE,
      showMaxLine: false
    }
  };

  const series: EChartsOption['series'] = [
    {
      name: 'Direct',
      type: 'bar',
      itemStyle: BAR_SERIES_ITEM_STYLE,
      emphasis: BAR_SERIES_EMPHASIS,
      data: DATA.direct
    },
    {
      name: 'Email',
      type: 'bar',
      stack: 'Ad',
      emphasis: BAR_SERIES_EMPHASIS,
      data: DATA.email
    },
    {
      name: 'Union Ads',
      type: 'bar',
      stack: 'Ad',
      emphasis: BAR_SERIES_EMPHASIS,
      data: DATA.unionAds
    },
    {
      name: 'Video Ads',
      type: 'bar',
      stack: 'Ad',
      emphasis: BAR_SERIES_EMPHASIS,
      data: DATA.videoAds
    },
    {
      name: 'Search Engine',
      type: 'bar',
      data: DATA.searchEngine,
      itemStyle: BAR_SERIES_ITEM_STYLE,
      emphasis: BAR_SERIES_EMPHASIS,
      markLine: {
        label: {
          position: 'end',
          distance: 10
        },
        lineStyle: {
          type: 'dashed'
        },
        data: [[{ type: 'min' }, { type: 'max' }]]
      }
    },
    {
      name: 'Baidu',
      type: 'bar',
      barWidth: 5,
      stack: 'Search Engine',
      emphasis: BAR_SERIES_EMPHASIS,
      data: DATA.baidu
    },
    {
      name: 'Google',
      type: 'bar',
      stack: 'Search Engine',
      emphasis: BAR_SERIES_EMPHASIS,
      data: DATA.google
    },
    {
      name: 'Bing',
      type: 'bar',
      stack: 'Search Engine',
      emphasis: BAR_SERIES_EMPHASIS,
      data: DATA.bing
    },
    {
      name: 'Others',
      type: 'bar',
      stack: 'Search Engine',
      emphasis: BAR_SERIES_EMPHASIS,
      data: DATA.others
    }
  ];

  //---//

  const options: EChartsOption = {
    legend,
    tooltip,
    grid,
    xAxis,
    yAxis,
    series
  };
</script>

<div class="relative grow">
  <div class="absolute top-0 right-0 bottom-0 left-0">
    <ECharts id="stacket-columns-plus-markline" init={echarts.init} {options}
    ></ECharts>
  </div>
</div>

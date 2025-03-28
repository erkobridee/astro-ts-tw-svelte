<script lang="ts">
  // https://echarts.apache.org/handbook/en/basics/release-note/5-3-0/#formatting-of-values-in-tooltip

  // https://stackoverflow.com/questions/76624531/echarts-default-value-tooltip-formatter-for-pie-chart
  // https://echarts.apache.org/examples/en/editor.html?code=PYBwLglsB2AEC8sDeAoWtJgDYFMBcya6GOAHmAQOQBKOAZjgE5OzB2wCGsA6jgEYBnCGByUANEXQCArnxHkqAMQ4BrHLAAiHMB3GTYuOhViUAxjmgjGlIgF8J6MMGBZIIAqmIZGEAOa-mKmEcAFs9LzpgRhDtKwAKEA5GDhCBAEpCL3RmMGlGOAADABIkROTUgDoBJggcAQA5FJxbAB4-RgA-ErKUgQqYxjVGW26k3oroJtaBRLgBMABPXHgAIjosYG0CH18ACzAAblgB3whoAFpDYwAmAAYQUhWOtq7SscqANw4saWaWgHo-B1YHFRuU-iAmOZLLYAKRpAEzDjQDoFA76Wx2BwGHABaAAEw8-iitUsVA-TEgpm-4WIVyoVxs6HsRGqPjqBAA2vpPFlJiF8CYAIKmcwCASwRSMYBhbFeRaQqggWq0rzJfEQaQCKgAVlusNVxHx2g4XP0XiQsC-P0FAEZbgAWAAcYlg_MFlAAyjgkqZdrAAKLQU7QUSwFlZYiW62_AgAdgAzDrXe6qBoIMxTGBKOG5Vlo99Y7AdU7bimmlQAzEIFgcxHI8grYXBc6HeWBVQAKrQKBwIX4gR1vMWps2ggJ25lt0VkwANQg-JwwFg_cH4fNsAAusPYKEQLsOEJtZkG8EQp7FrgiQ3iAID_jgAB3ABCP0YBHtO68d44D8fAHk6DoaowAADQIMsN2_e8nwAYRcKIqEYXw-A4OIpww11bgqHU0iZBtMUjQjiGIzcUFsA4gA

  import ECharts, {
    type EChartsOption
  } from '~/components/apache-echarts/ECharts';

  //---//

  const WEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const DATA = {
    evaporation: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6],
    precipitation: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6],
    temperature: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3]
  };

  //---//

  const options: EChartsOption = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {},
    xAxis: [
      {
        type: 'category',
        data: WEEK_DAYS,
        axisPointer: {
          type: 'shadow',
          label: {
            // https://echarts.apache.org/en/option.html#xAxis.axisPointer.label.formatter
            formatter: 'Day of week: {value}'
          }
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: 'Precipitation',
        alignTicks: true,
        axisLabel: {
          formatter: '{value} ml'
        }
      },
      {
        type: 'value',
        name: 'Temperature',
        axisLabel: {
          formatter: '{value} °C'
        }
      }
    ],
    series: [
      {
        name: 'Evaporation',
        type: 'bar',
        tooltip: {
          valueFormatter: (value) => value + ' ml'
        },
        data: DATA.evaporation
      },
      {
        name: 'Precipitation',
        type: 'bar',
        tooltip: {
          valueFormatter: (value) => value + ' ml'
        },
        data: DATA.precipitation
      },
      {
        name: 'Temperature',
        type: 'line',
        yAxisIndex: 1,
        tooltip: {
          valueFormatter: (value) => value + ' °C'
        },
        data: DATA.temperature
      }
    ]
  };
</script>

<div class="relative grow">
  <div class="absolute top-0 right-0 bottom-0 left-0">
    <ECharts id="formatting-tooltip-values" {options}></ECharts>
  </div>
</div>

<script lang="ts">
  // base sample
  // https://echarts.apache.org/examples/en/editor.html?c=bar-drilldown&lang=ts&code=JYOwLgpgTgZghgYwgAgCJzHAkpAtsgbwChlkA3OAGwFcIAuZEa3AI2gG4TkBzKAe2oAHLABMGAZzBRQ3TgF8ifQWGB8QyALyEuADwCCO4OIbFSpERjgMA2gHI9IYLirjbAGmS2AYlGrAwrh62AMJwUK4AulxyblwAngZGJjFcFpgA4vxCogy27lxwjs4qaqjUUBiqIACqgmn0yACsAAzNsaTi0MAQxtpmyGBxgg22LGH5_cBinuJUPRNmaVbI1lz9pv1mFDQNje2bpLwCwtO2hU4utmtmKQcbB9u0DABM-wdH2acwvv6u16S3Tb3TaPBoAFjemw-J1yCDCfwOCn6EWQcHEaEsOAguGsEUh1EcZGgs0oABUKiBxP4qiZ_sgICA4CxKBBplJaJDzMAyFMIABlAAWcGGsMoaggV36SOQCjknCICDUkmQImklEoIj4AHcQOhMJoVlxgUtMsccp5zs5KIFrksbHS7KEAu5kGC8Q7bKg-NxAshnu6Do7tb6AIwBzZ2QUQCCCF3-zkrWwABWAPpdYeuUQB-2NllNn1y3z8zshdsNgfsgkELN9boTdgA8hTuPMPP7M9Ec7a81kYZ44eEFuZLPaK6S-HE-JgXXWPQ3hpQ4-H-nYAGp8SgAa3EWrgLZAS47AKIEXluDiwSFUDAADo1AAKWwISjABCbl0wAkIErqe8QIngAAlH0yDADAyB_gBt5LMBwIUFAyDiNQLB6nABqqsA6qajqqE3jAoAiPen4gN-VQQTBIH9FAEBgOU6hLDeJq9qImgaFokEMtBliouiqFYrggE3tCoicFKgGiWYYEQQAhEhKGWLBdLUbRUAgBJx79Oel5hLenRgPOP4ADwQAgV4BDeACi2nXuIBlVAAfPewKkPohi9M5iwjohyG4QxziCERX4_hB_jYopBxUTRdGgXg1jNKedIAoBdKAv0nTSD0tIRQMQwjGMUBDpsUy5CSraJSqPZmtMcm-ZVnwJsOmASD5liMa1_mBSRwX3qFAmURFynRb11hhupmxyIBDXIAS3LElQ5KFFSP5Zdl9KMsyrIMOyEBTVyPIiPyQoiv2YogBK5XSlKCa8MKAqvqOEUef0gzHbYkA6GAhUHCyMBgAwLS7QMSgvG05UdIMLIratAwQB9uQAEKIO-gOkDAahgHywAAF4NCGAAcYMyoDajPq-m4MMRpFqBB4XQ8gWlmTeel2WoxmmTp4iWdZAQsyAjlKD-HjbeJhOXeNdJZjcIvHhN7BAA

  import type {
    EChartsType,
    EChartsOption,
    ECElementEvent,
    BarSeriesOption
  } from 'echarts';

  import { onMount } from 'svelte';

  import ECharts from '~/components/apache-echarts/ECharts';

  import {
    DEFAULT_RADIUS_BORDER,
    buildBarItemStyleBorderRadius
  } from '~/components/apache-echarts/common';

  //---//

  interface DataItem {
    value: number;
    groupId: string;
  }

  //---//

  const BAR_SERIES_EMPHASIS: BarSeriesOption['emphasis'] = {
    itemStyle: {
      // https://echarts.apache.org/en/option.html#series-bar.emphasis.itemStyle.color
      color: 'inherit'
    }
  };

  const BAR_SERIES_ITEM_STYLE: BarSeriesOption['itemStyle'] =
    buildBarItemStyleBorderRadius(DEFAULT_RADIUS_BORDER);

  //---//

  const DRILLDOWN_DATA = [
    {
      dataGroupId: 'animals',
      data: [
        ['Cats', 4],
        ['Dogs', 2],
        ['Cows', 1],
        ['Sheep', 2],
        ['Pigs', 1]
      ]
    },
    {
      dataGroupId: 'fruits',
      data: [
        ['Apples', 4],
        ['Oranges', 2]
      ]
    },
    {
      dataGroupId: 'cars',
      data: [
        ['Toyota', 4],
        ['Opel', 2],
        ['Volkswagen', 2]
      ]
    }
  ];

  //---//

  const BASE_BAR_SERIE: BarSeriesOption = {
    type: 'bar',
    id: 'sales',

    itemStyle: BAR_SERIES_ITEM_STYLE,
    emphasis: BAR_SERIES_EMPHASIS,

    universalTransition: {
      enabled: true,
      divideShape: 'clone'
    }
  };

  const optionsLevel0Data: DataItem[] = [
    {
      value: 5,
      groupId: 'animals'
    },
    {
      value: 2,
      groupId: 'fruits'
    },
    {
      value: 4,
      groupId: 'cars'
    }
  ];

  const optionsLevel0: EChartsOption = {
    xAxis: {
      data: ['Animals', 'Fruits', 'Cars']
    },
    yAxis: {},

    dataGroupId: '',
    animationDurationUpdate: 500,

    series: {
      ...BASE_BAR_SERIE,

      // https://developer.mozilla.org/en-US/docs/Web/CSS/cursor
      cursor: 'zoom-in',

      data: optionsLevel0Data
    }
  };

  //---//

  let options: EChartsOption = optionsLevel0;
  let notMerge: boolean = false;

  let chart: EChartsType;

  //---//

  // https://echarts.apache.org/handbook/en/concepts/event/
  const onChartClick = (event: ECElementEvent) => {
    console.log('onChartClick', event);

    if (!event.data) {
      return;
    }

    const groupId = (event.data as DataItem).groupId;

    if (!groupId) {
      return;
    }

    const subData = DRILLDOWN_DATA.find((data) => data.dataGroupId === groupId);

    if (!subData) {
      return;
    }

    const drillDownData = subData.data;

    // merge the new options definition with the previous one
    notMerge = false;
    options = {
      xAxis: {
        data: drillDownData.map((item) => item[0])
      },

      series: {
        ...BASE_BAR_SERIE,

        dataGroupId: subData.dataGroupId,

        // https://developer.mozilla.org/en-US/docs/Web/CSS/cursor
        cursor: 'default',

        data: drillDownData.map((item) => item[1])
      },

      graphic: [
        {
          type: 'text',
          left: 50,
          top: 20,
          style: {
            text: 'Back',
            fontSize: 18
          },
          onclick: () => {
            // redefine the chart options without merging it with the previous options definition
            notMerge = true;
            options = optionsLevel0;
          }
        }
      ]
    };
  };

  onMount(() => {
    // https://echarts.apache.org/en/api.html#echartsInstance.on
    chart.on('click', onChartClick);

    console.log('BarDrilldown - mounted', { chart });

    return () => {
      // https://echarts.apache.org/en/api.html#echartsInstance.off
      chart.off('click', onChartClick);

      console.log('BarDrilldown - destroyed', { chart });
    };
  });
</script>

<div class="relative grow">
  <div class="absolute top-0 right-0 bottom-0 left-0">
    <ECharts id="stacket-columns-plus-markline" {options} {notMerge} bind:chart
    ></ECharts>
  </div>
</div>

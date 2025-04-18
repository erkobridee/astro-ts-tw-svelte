# Apache ECharts

> Apache ECharts is a powerful, interactive charting and data visualization library for browser

- [[GitHub] apache/echarts](https://github.com/apache/echarts)

- [Apache ECharts](https://echarts.apache.org/en/index.html)

  - [Options - Chart Configuration](https://echarts.apache.org/en/option.html)

  - [API](https://echarts.apache.org/en/api.html)

    - [registerTheme](https://echarts.apache.org/en/api.html#echarts.registerTheme)

      ```js
      echarts.registerTheme('customTheme', customThemeObject);
      const chart = echarts.init(dom, 'customTheme');
      ```

    - [registerLocale](https://echarts.apache.org/en/api.html#echarts.registerLocale)

      - [echarts/src/i18n at release · apache/echarts](https://github.com/apache/echarts/tree/release/src/i18n)

        ```js
        // CL - Custom Language
        echarts.registerLocale('CL', langObject);
        echarts.init(DomElement, null, {
          locale: 'CL'
        });
        ```

- [[Bug] Support on CSS Variables for color property on charts #19743 - apache/echarts](https://github.com/apache/echarts/issues/19743)

  - This feature won't be added since Canvas doesn't recognize the CSS variables currently. It's suggested to use `window.getComputedStyle(DOM).getPropertyValue('--the-css-var')` to get real color values before calling `setOption`. ([comment link](https://github.com/apache/echarts/issues/19743#issuecomment-2012376099))

<!--
custom tooltips

https://webdevpuneet.com/customized-line-area-chart-apache-echarts/

https://stackoverflow.com/questions/63901955/echart-series-with-different-tooltip#64297059

https://stackoverflow.com/questions/79006209/echarts-line-series-to-custom-tooltip-to-group-some-lines-together-and-show-tool
-->

## Handbook

- [Best Practices - Web Accessibility](https://echarts.apache.org/handbook/en/best-practices/aria)

### Basics

- [Using ECharts as an NPM Package](https://echarts.apache.org/handbook/en/basics/import) - on this page is also shown how to customize and reduce the output bundle size uzing only a set of components from the Apache ECharts components

  - [Shrinking Bundle Size](https://echarts.apache.org/handbook/en/basics/import#shrinking-bundle-size)

    - it need to have only one definition on the project, if there's any import like `import * as echarts from 'echarts';` that will bundle all the lib

### Concepts

- [Chart Container and Size](https://echarts.apache.org/handbook/en/concepts/chart-size)

- [Style](https://echarts.apache.org/handbook/en/concepts/style)

  - [Theme Builder | Apache ECharts](https://echarts.apache.org/en/theme-builder.html)

- [Dataset](https://echarts.apache.org/handbook/en/concepts/dataset)

  - data configurations

    - [on axis and series](https://echarts.apache.org/handbook/en/concepts/dataset#define-data-under-series)

      - as an one dimensional array

    - [on dataset](https://echarts.apache.org/handbook/en/concepts/dataset#define-data-in-dataset)

      - like CSV array, where the first row define the columns names and from the first row defines the data of each column

      - object array, this one needs to have the dataset dimensions definitions which will map the attributes from the object inside of the array

- [Axis](https://echarts.apache.org/handbook/en/concepts/axis)

- [Event and Action](https://echarts.apache.org/handbook/en/concepts/event)

  - [API - events](https://echarts.apache.org/en/api.html#events)

  - [How to change the cursor on the series? #5588 - apache/echarts](https://github.com/apache/echarts/issues/5588)

    - [series-bar.cursor - options Apache ECharts Docs](https://echarts.apache.org/en/option.html#series-bar.cursor)

### How to guides

- [Basic Bar Chart](https://echarts.apache.org/handbook/en/how-to/chart-types/bar/basic-bar)

- [Stacked Bar Chart](https://echarts.apache.org/handbook/en/how-to/chart-types/bar/stacked-bar)

- [Asynchronous Data Loading and Dynamic Update](https://echarts.apache.org/handbook/en/how-to/data/dynamic-data/) - [Example](https://echarts.apache.org/examples/en/editor.html?c=doc-example%2Ftutorial-dynamic-data)

## Examples

- [Examples | Apache ECharts](https://echarts.apache.org/examples/en/index.html)

  - [Basic Bar](https://echarts.apache.org/examples/en/editor.html?c=bar-simple)

  - [Stacked Bar with borderRadius](https://echarts.apache.org/examples/en/editor.html?c=bar-stack-borderRadius)

  - [Stacked Column Chart](https://echarts.apache.org/examples/en/editor.html?c=bar-stack)

  - [Rainfall vs Evaporation](https://echarts.apache.org/examples/en/editor.html?c=bar1) - with marke lines

  - [Dynamic Data](https://echarts.apache.org/examples/en/editor.html?c=dynamic-data)

  - [Bar Chart Drilldown Animation](https://echarts.apache.org/examples/en/editor.html?c=bar-drilldown)

  - [Bar Chart Multi-level Drilldown](https://echarts.apache.org/examples/en/editor.html?c=bar-multi-drilldown)

### JSFiddle

- ECharts - custom x ax : [v0](https://jsfiddle.net/erkobridee/rtkuL18y) | [v255](https://jsfiddle.net/erkobridee/rtkuL18y/255/)

### CodePen

- [Line Chart with padding between the y axis labels - Apache ECharts Demo](https://codepen.io/erkobridee/pen/jEOKpBe)

- [Stacked Bar with borderRadius - Apache ECharts Demo](https://codepen.io/erkobridee/pen/ZYEoKgN)

- [Stacked Column Chart - Apache ECharts Demo](https://codepen.io/erkobridee/pen/yyLEjdM)

## Svelte integration

- [[GitHub] bherbruck/svelte-echarts](https://github.com/bherbruck/svelte-echarts) - Apache ECharts wrapper for Svelte

- [[GitHub] spren9er/tilez-echarts](https://github.com/spren9er/tilez-echarts) - Apache ECharts component for Svelte layout engine [tilez](https://github.com/spren9er/tilez)

### Reference only

- [[GitHub] liyuanqiu/echarts-for-svelte](https://github.com/liyuanqiu/echarts-for-svelte) - A very simple echarts(v3.0 & v4.0) wrapper

- [[GitHub] PaulusElektrus/Svelte-eCharts](https://github.com/PaulusElektrus/Svelte-eCharts)

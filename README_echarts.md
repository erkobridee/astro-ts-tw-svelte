# Apache ECharts

> Apache ECharts is a powerful, interactive charting and data visualization library for browser

- [[GitHub] apache/echarts](https://github.com/apache/echarts)

- [Apache ECharts](https://echarts.apache.org/en/index.html)

  - [Options - Chart Configuration](https://echarts.apache.org/en/option.html)

  - [API](https://echarts.apache.org/en/api.html)

## Handbook

- [Best Practices - Web Accessibility](https://echarts.apache.org/handbook/en/best-practices/aria)

### Basics

- [Using ECharts as an NPM Package](https://echarts.apache.org/handbook/en/basics/import) - on this page is also shown how to customize and reduce the output bundle size uzing only a set of components from the Apache ECharts components

### Concepts

- [Chart Container and Size](https://echarts.apache.org/handbook/en/concepts/chart-size)

- [Style](https://echarts.apache.org/handbook/en/concepts/style)

- [Dataset](https://echarts.apache.org/handbook/en/concepts/dataset)

  - data configurations

    - [on axis and series](https://echarts.apache.org/handbook/en/concepts/dataset#define-data-under-series)

      - as an one dimensional array

    - [data on dataset](https://echarts.apache.org/handbook/en/concepts/dataset#define-data-in-dataset)

      - like CSV array, where the first row define the columns names and from the first row defines the data of each column

      - object array, this one needs to have the dataset dimensions definitions which will map the attributes from the object inside of the array

- [Axis](https://echarts.apache.org/handbook/en/concepts/axis)

- [Event and Action](https://echarts.apache.org/handbook/en/concepts/event)

### How to guides

- [Basic Bar Chart](https://echarts.apache.org/handbook/en/how-to/chart-types/bar/basic-bar)

- [Stacked Bar Chart](https://echarts.apache.org/handbook/en/how-to/chart-types/bar/stacked-bar)

## Examples

- [Examples | Apache ECharts](https://echarts.apache.org/examples/en/index.html)

  - [Basic Bar](https://echarts.apache.org/examples/en/editor.html?c=bar-simple)

  - [Stacked Bar with borderRadius](https://echarts.apache.org/examples/en/editor.html?c=bar-stack-borderRadius)

  - [Stacked Column Chart](https://echarts.apache.org/examples/en/editor.html?c=bar-stack)

  - [Rainfall vs Evaporation](https://echarts.apache.org/examples/en/editor.html?c=bar1) - with marke lines

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

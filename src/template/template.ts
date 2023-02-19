export const mdxString = `

# {{name}} - {{enName}}


<section id="overview-graph-detail-content">


</section>

<section id="chart-property-graph-detail">

  <ChartProps />

</section>

`

export const templateString = `
# {{name}} - {{enName}}


<section id="overview-graph-detail-content">

![chart-overview]({{representativePicture}})

{{overview}}

</section>

## 图表属性

<!-- 自动识别，勿修改 -->
<section id="chart-property-graph-detail">

  <ChartProps />

</section>

## 图表详解

### 元素构成

<section id="chart-detail-graph-detail-content">

{{constitution}}

</section>

### 适用场景

<section id="appropriate-scene-graph-detail">

{{appropriateScene}}

</section>

### 不适用场景

<section id="unappropriate-scene-graph-detail">

{{unAppropriateScene}}

</section>

## 相似图形

<!-- 自动识别，勿修改 -->
<div id="resemble-chart-graph-detail"></div>

<SimilarCharts/>

## 设计案例

<div id="design-case-graph-detail"></div>

<DesignCaseContainer>
  {{DesignCase}}
</DesignCaseContainer>

## 使用场景

<div id="usage-scene-graph-detail-content"></div>

{{usageScene}}

## 制作教程

<!-- 制作教程大类有：BI 工具 / 代码库 / 设计软件，请依次按照顺序填写 -->

<div id="production-tutorial-graph-detail"></div>

{{productionTutorial}}


## 专项工具

<div id="specialty-tool-graph-detail"></div>

{{specialTool}}

## 学习资源

<div id="learning-resource-graph-detail"></div>

{{learningResource}}

## 参考文献

<div id="reference-graph-detail"></div>

<Reference>
  {{reference}}
</Reference>

## 贡献者

<div id="contributor-graph-detail"></div>

<!-- 默认读取github commit记录，非commit可以在data中可以自定义 -->

{{contributors}}
`
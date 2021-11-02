export const mdxString = `

# {{name}} - {{enName}}


<section id="overview-graph-detail-content">

![chart-overview](//i.ibb.co/tXs7fG8/f816563e72cd53bd178c95560497f29a.png)

面积图，或称区域图，是一种随有序变量的变化，反映数值变化的统计图表，原理与[折线图](<http://www.tuzhidian.com:3000/chart?id=5c56e1b34a8c5e048189c693>)相似。而面积图的特点在于，折线与自变量坐标轴之间的区域，会由颜色或者纹理填充。

面积图也可用于多个系列数据的比较。这时，面积图的外观看上去类似层叠的山脉，在错落有致的外形下表达数据的总量和趋势。相较于[折线图](<http://www.tuzhidian.com:3000/chart?id=5c56e1b34a8c5e048189c693>)，面积图不仅可以清晰地反映出数据的趋势变化，也能够强调不同类别的数据间的差距对比。但它的劣势在于，填充会让形状互相遮盖，反而看不清变化。一种解决方法，是使用有透明度的颜色，来“让”出覆盖区域。


</section>

## 图表属性

<!-- 自动识别，勿修改 -->
<section id="chart-property-graph-detail">

  <ChartProps />

</section>

## 图表详解

### 元素构成

<section id="chart-detail-graph-detail-content">

![null](//i.ibb.co/744nz6L/1549126400621-63f16a96-22e1-415f-865b-0319041aeb12.jpg)



</section>

### 适用场景

<section id="appropriate-scene-graph-detail">

想要体现在连续自变量下，一组或多组数据的趋势变化以及相互之间的对比，同时也能够观察到数据总量的变化趋势：

例如，位移=速度（平均速度或微速度）x 时间：s=v\*t; 那么如果我们的 x 轴是时间 t，y 轴是每个时刻的速度 v，使用面积图，不仅可以观察速度随时间变化的趋势，还可以根据面积大小来感受位移距离的长度变化。



</section>

### 不适用场景

<section id="unappropriate-scene-graph-detail">

（1）自变量不是顺序性的变量，这种情况下并不适合用面积图。例如下图（Highcharts, no date

）中展示的是小张和小潘的五种水果的销量对比，但是因为横轴是五种不同类的水果，他们之间不存在连续的序列关系，所以整体并不能达到趋势分析的效果，仅仅显示了不同水果的销量对比。因此，当自变量不存在连续序列关系时，仅仅需要体现类别之间的比较，使用柱状图更加合适。

![null](//i.ibb.co/VVg17wm/1547797386342-28407ec2-49d8-4567-b0e6-a9e47e82e4df.png)

![null](<//i.ibb.co/JrNYSmt/1548240757524-521af458-9850-497f-a4bb-4fd8b734a5dd.png>)

（2）多系列数据比较时，填充会导致折线被覆盖，难以辨别。这时可使用有透明度的颜色进行填充。但这种方法并不完美，因为半透明颜色叠加后，会改变原有的颜色。比如下图（镝次元数据传媒实验室, 2017

）中，橙色叠加半透明的蓝色，变成了暗黄色。换句话说，这也增加了视觉上需要辨认的颜色。当数据系列很多时，很可能让人眼花缭乱。这时，回归简单的折线图反而是更好的选择。

![null](<//i.ibb.co/cNKw2Ps/1548655808446-17f7ed66-f829-460e-9ee3-2e199371e0c7.png?x-oss-process=image/resize,w_716>)



</section>

## 相似图形

<!-- 自动识别，勿修改 -->
<div id="resemble-chart-graph-detail"></div>

<SimilarCharts/>

## 设计案例

<div id="design-case-graph-detail"></div>

<DesignCaseContainer>
  
<DesignCaseItem
    description="潮汐预测，采用不规则的坐标系，使用海蓝色为基础色调进行配色，通过透明度的调整使图形更富有美感。"
    link="http://www.joanangdesign.com/"
    image="//i.ibb.co/QdxRXkp/346ff944cb6911dc5521095aa5a6008f.png"
/>
            
<DesignCaseItem
    description="25年中交通事故的统计数据的可视化，通过颜色和面积区域的宽度来展示事故的数量、分布和发展状况，整体配色具有层次感和视觉吸引力。"
    link="https://dribbble.com/shots/5471757-Data-Viz-Area-Chart"
    image="//i.loli.net/2021/11/02/OW9ip6NwjlAUe3v.png"
/>
            
</DesignCaseContainer>

## 使用场景

<div id="usage-scene-graph-detail-content"></div>

1）以下案例取自商业周刊，通过面积图呈现某个时间段股票价格的变化情况。以下表格列出了在该时间段内每月的股票价格：

![null](//i.ibb.co/5sz982z/1550136131616-8391f653-28d0-416d-b0ce-e7b7d4a25f5a.png)



## 制作教程

<!-- 制作教程大类有：BI 工具 / 代码库 / 设计软件，请依次按照顺序填写 -->

<div id="production-tutorial-graph-detail"></div>

<ProductionTutorials
  data={{
  "BI工具": {
    "Excel": [
      {
        "linkText": "Excel绘制多种风格面积图",
        "link": "https://zhuanlan.zhihu.com/p/23509455"
      },
      {
        "linkText": "Excel仿制带时间趋势线的双色填充面积图（设计案例3）",
        "link": "http://www.sohu.com/a/119815492_468636"
      }
    ],
    "Power BI": [
      {
        "linkText": "用PowerBI制作面积图",
        "link": "https://www.jianshu.com/p/41654868f9c6"
      }
    ],
    "Tableau": [
      {
        "linkText": "",
        "link": "https://onlinehelp.tableau.com/current/pro/desktop/en-us/qs_area_charts.htm"
      }
    ],
    "QlikView": []
  },
  "代码库": {
    "ECharts": [
      {
        "linkText": "官方实例",
        "link": "https://echarts.baidu.com/examples/editor.html?c=area-basic"
      }
    ],
    "AntV": [
      {
        "linkText": "基础面积图",
        "link": "https://antv.alipay.com/zh-cn/g2/3.x/demo/area/basic.html?theme=dark"
      },
    ],
    "D3": [
      {
        "linkText": "基础面积图",
        "link": "https://beta.observablehq.com/@mbostock/d3-area-chart"
      }
    ],
    "matplotlib": [
      {
        "linkText": "案例及代码",
        "link": "https://python-graph-gallery.com/area-plot/"
      }
    ],
    "gglpot2": [
      {
        "linkText": "基础代码",
        "link": "https://www.r-graph-gallery.com/164-area-chart-ggplot2/"
      },
    ]
  },
  "设计工具": {
    "PS/AI/Sketch": [
      {
        "linkText": "通过Google Sheets、illustrator和Sketch设计面积图（英文）",
        "link": "https://medium.com/product-design-adventures/designing-better-charts-with-google-sheets-illustrator-and-sketch-bbdae473cf9"
      },
    ]
  }
}}
/>


## 专项工具

<div id="specialty-tool-graph-detail"></div>

（1）[在线生成工具](<https://online.visual-paradigm.com/diagrams.jsp#diagramlist:proj=0&new=AreaChart>)



## 学习资源

<div id="learning-resource-graph-detail"></div>

（1）[面积图与折线图的区别。](<https://www.sohu.com/a/199245953_416207>)



## 参考文献

<div id="reference-graph-detail"></div>

<Reference>
  

1. HIGHCHARTS. (n.d.). 包含负值的面积图. [online]. Available at: https://www.hcharts.cn/demo/highcharts/area-negative [Accessed 25 January 2019].


2. HIGHCHARTS. (n.d.). 分组堆叠柱状图. [online]. Available at: https://www.hcharts.cn/demo/highcharts/column-stacked-and-grouped [Accessed 25 January 2019].


</Reference>

## 贡献者

<div id="contributor-graph-detail"></div>

<!-- 默认读取github commit记录，非commit可以在data中可以自定义 -->

<Contributors
  data={{
  "Amphetamine": [
    {
      "date": 1548950400000,
      "content": "绘图"
    },
    {
      "date": 1546272000000,
      "content": "文档资料搜集、整理和编辑"
    }
  ],
}}
  merge
/>
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
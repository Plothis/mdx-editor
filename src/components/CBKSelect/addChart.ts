import { CKBJson, addChart, ChartKnowledge, Language, TransKnowledgeProps } from '@antv/knowledge';

export function mergeChartProps(chartData: any[]) {
  chartData.forEach(({trans, chartKnowledge}) => {
    addChart(
      chartKnowledge as ChartKnowledge,
      trans as Record<string, TransKnowledgeProps>
    );
  })
}

export { CKBJson }
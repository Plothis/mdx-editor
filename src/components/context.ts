import React from 'react';


export interface ChartInfo {
    name: string
    image: string
    path: string
    /** 常用使用这个字段 */
    family: string[]
    /** 形状 */
    shape: string[]
    /** 图类 */
    category: string[]
    /** 用途 */
    purpose: string[]
    /**
     * 便于搜索
     * $searchMap: { 类型-属性值: 1 }
     */
    $searchMap: Record<string, number>
}

  
export const ChartContext = React.createContext<{
    chartList: ChartInfo[];
    currentChart: ChartInfo | null;
}>({
    chartList: [],
    currentChart: null,
});

 
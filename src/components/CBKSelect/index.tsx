import { ChartKnowledgeJSON, CKBJson } from '@antv/knowledge';
import React from 'react';
import { Select }  from 'antd';


export const zhCompletedKB = CKBJson('zh-CN', true);
const options: {
    path: string
    name: string;
}[] = []
for (const key in zhCompletedKB) {
    const chartInfo = zhCompletedKB[key]
    const { category, purpose, shape, family, name, id } = chartInfo
    options.push({
        path: key,
        name: name,
    })
}
const { Option } = Select;

const CBKSelect: React.FC<{ onChange: (data: ChartKnowledgeJSON) => void }> = (props) => {
    function onChange(value: keyof typeof zhCompletedKB) {
        props.onChange(zhCompletedKB[value]);
    }
    
    function onBlur() {

    }
    
    function onFocus() {

    }
    
    function onSearch(val: string) {

    }
  return (
    <Select
        showSearch
        style={{ width: 380 }}
        placeholder="请选择一个模板"
        optionFilterProp="children"
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onSearch={onSearch}
        filterOption={(input, option) => {
            const str = option && Array.isArray(option.children) ? option.children.toString() : option?.children
            return str.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }}
    >
        {
            options.map(item => {
                return  <Option key={item.path} value={item.path}>{item.name}-{item.path}</Option>
            })
        }
    </Select>
  );
};

export default CBKSelect
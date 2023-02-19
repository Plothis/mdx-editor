import React from "react";
import { Select } from "antd";

export type OptionType =  {
  path: string;
  name: string;
}
const { Option } = Select;

const CBKSelect: React.FC<{ options: OptionType[], onChange: (data: string) => void }> = (
  props
) => {
  function onChange(value: string) {
    props.onChange(value);
  }

  function onBlur() {}

  function onFocus() {}

  function onSearch(val: string) {}

  return (
    <Select
      showSearch

      placeholder="请选择一个模板"
      optionFilterProp="children"
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      onSearch={onSearch}
      filterOption={(input, option) => {
        const str =
          option && Array.isArray(option.children)
            ? option.children.toString() as string
            : (option?.children || '') as string;
        return str.toLowerCase().indexOf(input.toLowerCase()) >= 0;
      }}
    >
      {props.options.map((item) => {
        return (
          <Option key={item.path} value={item.path}>
            {item.name}-{item.path}
          </Option>
        );
      })}
    </Select>
  );
};

export default CBKSelect;

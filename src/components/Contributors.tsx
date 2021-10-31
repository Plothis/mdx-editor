// @ts-nocheck
import React from 'react';
import styled from 'styled-components';
import { Popover } from 'antd';
import { size } from 'lodash';
import dayjs from 'dayjs';

const ContributeName = styled.span`
margin: 0 10px;
`;

// TODO antd v4 popover 没办法自己消失了...
export const Contributors = ({ data = [] }) => {
  return (
    <div style={{ marginBottom: '18px' }}>
      {Object.keys(data).map((key, i) => {
        const info = data[key];

        const contentEl = (
          <>
            {info.map((item, index) => {
              const date = typeof item.date === 'number' ? dayjs(item.date).format('YYYY-MM-DD') : item.date;
              return <div key={index}>{date} {item.content}</div>
            })}
          </>
        );
        return (
          <span key={i}>
            <Popover trigger="hover" placement="right" content={contentEl}>
              <ContributeName>{key}</ContributeName>
            </Popover>
            {size(data) !== i + 1 && '  •  '}
          </span>
        );
      })}
    </div>
  );
};
import React, { useEffect, useMemo } from "react";
import { render } from "react-dom";
import MDX from "@mdx-js/runtime";
import { Editor, Viewer } from '@bytemd/react'
import { Row, Col, Button, Space, notification, Modal } from 'antd';
import frontmatter from '@bytemd/plugin-frontmatter'
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight';
import { ChartKnowledgeJSON, CKBJson } from '@antv/knowledge';
// 设计案例
import DesignCase from './components/DesignCase';
// 制作教程
import { ProductionTutorials } from './components/ProductionTutorials';
// 参考文献
import { Reference } from './components/Reference';
// 贡献者
import { Contributors } from './components/Contributors';
import { SimilarCharts } from './components/SimilarCharts'
import { ChartProps } from './components/ChartProps'
import { uploadImg, uploadURL } from "./api/upload";
import { mdxString, templateString } from "./template";
import CBKSelect from "./components/CBKSelect";
import exportFile from "./utils/exportFile";
import template from "./utils/template";
import { toHump } from "./utils";

import './document.css';

import './App.css'
import { getData } from "./test";


const PlaceHolder: React.FC<any> = ({ children }) => {
  return <em style={{ opacity: 0.65 }}>{children}</em>;
}

// Provide custom components for markdown elements
const components = {
  PlaceHolder,
  DesignCaseContainer: DesignCase.Container,
  DesignCaseItem: DesignCase.Item,
  ProductionTutorials,
  Reference,
  Contributors,
  SimilarCharts,
  ChartProps,
};
// Provide variables that might be referenced by JSX
const scope = {
  some: "value"
};

const plugins =[
  frontmatter(),
  gfm(),
  highlight(),
]

function getStyles(style: string) {
  var output: Record<string, string> = {};

  if (!style) {
      return {};
  }

  var camelize = function camelize(str: string) {
      return str.replace (/-(.)/g, (match: string, $1: string | undefined) => {
        if ($1) {
          return $1.toUpperCase();
        }
        return match;
      })
  }

  var styleArr = style.split(';');

  for (var i = 0; i < styleArr.length; ++i) {

      var rule = styleArr[i].trim();

      if (rule) {
          var ruleParts = rule.split(':');
          var key = camelize(ruleParts[0].trim());
          output[key] = ruleParts[1].trim();
          
      }
  }

  return output;
}
function App() {
  const [content, setContent] = React.useState(template(mdxString)({
    name: '面积图',
    enName: 'Area Chart'
  }));
  const [loading, setLoading] = React.useState(false);
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [chartInfo, setChartInfo] = React.useState<ChartKnowledgeJSON>();
  useEffect(() => {
    // getData().then((str: string) => {

    //   setContent(str)
    // })
  }, [])
  // @ts-ignore
  const onChange = (newValue: string) => {

    const replaceValue = newValue.replace(/style="([\d\w\s,:;\\(\\)-]*)"/ig, (match, $1) => {
      if ($1) {
        return `style={${JSON.stringify(getStyles($1))}}`
      }
      return match
    })
    setContent(replaceValue);
  };
  const uploadImages = async (files: File[]) => {

    const file = files[0];
    if (!file) {
      return []
    }
    const result = await uploadImg({smfile: file})

    const imgList = []
    for (const name in result) {
      if (Object.prototype.hasOwnProperty.call(result, name)) {
        const url: string = result[name];
        imgList.push({title: file.name, alt: file.name, url: url.replace('https:', '')})
      }
    }
    return imgList
  }
  const handleRepalceAllImg = async () => {
    const imgReg = /http:\/\/\S*((\.png)|(\.jpeg)|(\.gif))/g;
    const matchList = content.match(imgReg)
    if (!Array.isArray(matchList)) {
      return
    }
    let newCotnet = content
    let preUrl = ''
    for (const url of matchList) {
      setLoading(true)
      try {
        const result = await uploadURL([url])
        for (const oldURL in result) {
          if (Object.prototype.hasOwnProperty.call(result, oldURL)) {
            const newUrl = result[oldURL].replace('https:', '');
            if (preUrl === newUrl) {
              throw Error('替换出错')
            }
            newCotnet = newCotnet.replace(oldURL, newUrl)
            preUrl = newUrl
          }
        }
        setContent(newCotnet)
        setLoading(false)
        notification.success({
          message: `替换成功`,
          description: `${url}`,
        })
      } catch (error) {
        notification.warn({
          message: `替换失败`,
          description: `${url}`,
        })
        setLoading(false)
      }
    }
  } 
  const createTemplate = () => {
    if (chartInfo) {
      var compiled = template(mdxString);

      setContent(compiled({
        ...chartInfo,
        enName: toHump(chartInfo.id)
      }));
    }
    handleCancel();
  }
  const handleCancel  = () => {
    setModalVisible(false);
  }
  const openModal = () => {
    setModalVisible(true);
  }
  const handleTemplateSelectChange = (data: any) => {
    console.log(data)
    setChartInfo(data);
  }
  const downloadFile = () => {
    if (chartInfo) {
      exportFile(content, `${chartInfo.id}.mdx`)
    }
  }
  return (
    <div>
      <div  style={{height: 10}}/>
      <Space>
        <Button onClick={handleRepalceAllImg} loading={loading}>一键替换http图片(比较慢)</Button>
        <Button href="https://sm.ms/" target="_blank">sm.ms</Button>
        <Button href="https://imgbb.com/" target="_blank">imgbb.com</Button>
        <Button onClick={openModal} type="primary" >新建模板</Button>
        <Button onClick={downloadFile} type="primary" disabled={chartInfo === undefined} >下载mdx文件</Button>
      </Space>
      <div  style={{height: 10}}/>
      <Editor
        mode="auto"
        value={content}
        onChange={onChange}
        uploadImages={uploadImages}
        plugins={plugins}
        overridePreview={(el, props) => { 
          render(
            <div className="markdown-body chart-container pg-chart" {...props}>
              <MDX scope={scope} components={components}>{content}</MDX>  
            </div>
          , el)
        }}
      />
      <Modal title="" visible={isModalVisible} onOk={createTemplate} onCancel={handleCancel}>
        <CBKSelect onChange={handleTemplateSelectChange} />

        <p style={{marginTop: 20}}>没有你创建的图表，前往<a href="https://github.com/Plothis/gradict-charts-doc/blob/dev/src/constants/charts.ts">gradict-charts-doc</a>新增一个吧</p>
      </Modal>
    </div>
  );
}

export default App;

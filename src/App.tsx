import React, { useMemo } from "react";
import MDX from "@mdx-js/runtime";
import { Editor, Viewer } from '@bytemd/react'
import { Row, Col, Button, Space, notification } from 'antd';
import frontmatter from '@bytemd/plugin-frontmatter'
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight'
// 设计案例
import DesignCase from './components/DesignCase';
// 制作教程
import { ProductionTutorials } from './components/ProductionTutorials';
// 参考文献
import { Reference } from './components/Reference';
// 贡献者
import { Contributors } from './components/Contributors';
import { SimilarCharts } from './components/SimilarCharts'
import './App.css'
import './global.less'
import { render } from "react-dom";
import { uploadImg, uploadURL } from "./api/upload";
import { mdxString } from "./template";

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
function App() {
  const [content, setContent] = React.useState(mdxString);
  const [loading, setLoading] = React.useState(false);
  // @ts-ignore
  const onChange = (newValue: string) => {
    setContent(newValue);
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
    const imgReg = /http:\/\/\S*((\.png)|(\.jpeg))/g;
    const matchList = content.match(imgReg)
    if (!Array.isArray(matchList)) {
      return
    }
    let newCotnet = content
    for (const url of matchList) {
      setLoading(true)
      try {
        const result = await uploadURL([url])
        for (const oldURL in result) {
          if (Object.prototype.hasOwnProperty.call(result, oldURL)) {
            const neURL = result[oldURL].replace('https:', '');
            newCotnet = newCotnet.replace(oldURL, neURL)
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
  return (
    <div>
      <div  style={{height: 10}}/>
      <Space>
        <Button onClick={handleRepalceAllImg} loading={loading}>一键替换http图片(比较慢)</Button>
        <Button href="https://sm.ms/" target="_blank">sm.ms</Button>
        <Button href="https://imgbb.com/" target="_blank">imgbb.com</Button>
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
            <div className="markdown-body" {...props}>
              <MDX scope={scope} components={components}>{content}</MDX>  
            </div>
          , el)
        }}
      />
    </div>
  );
}

export default App;

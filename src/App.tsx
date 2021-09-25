import React, { useMemo } from "react";
import MDX from "@mdx-js/runtime";
import { Editor, Viewer } from '@bytemd/react'
import { Row, Col } from 'antd';
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
import './App.css'
import './global.less'
import { render } from "react-dom";
import { uploadImg } from "./api/upload";
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
  const [code, setCode] = React.useState(mdxString);
 
  // @ts-ignore
  const onChange = (newValue: string) => {
    setCode(newValue);
  };
  const uploadImages = async (files: File[]) => {

    const file = files[0];
    if (!file) {
      return []
    }
    const result = await uploadImg({smfile: file})
    return [{title: file.name, alt: file.name, url: result.url}]
  }

  return (
    <div>
      <Editor
        mode="auto"
        value={code}
        onChange={onChange}
        uploadImages={uploadImages}
        plugins={plugins}
        overridePreview={(el, props) => { 
          render(
            <div className="markdown-body" {...props}>
              <MDX scope={scope} components={components}>{code}</MDX>  
            </div>
          , el)
        }}
      />
    </div>
  );
}

export default App;

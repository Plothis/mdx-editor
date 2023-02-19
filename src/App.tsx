import React, { useEffect, useMemo } from "react";
import { render } from "react-dom";

import MDX from "@mdx-js/runtime";
import { Editor, Viewer } from '@bytemd/react'
import { Input, Spin, Button, Space, notification, Modal } from 'antd';
import frontmatter from '@bytemd/plugin-frontmatter'
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight';
import { ChartKnowledgeJSON, FAMILY_OPTIONS, addChart, TransKnowledgeProps, ChartKnowledge } from '@antv/knowledge';
// import GitHub from 'github-api';

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
import { mdxString, templateString } from "./template/template";
import exportFile from "./utils/exportFile";
import template from "./utils/template";
import { getStyles, toHump } from "./utils";
import { CKBJson, mergeChartProps } from "./components/CBKSelect/addChart";
// import test from "./components/Editor/plugins/test";
import './document.css';

import './App.css'
import { OldPostConverter } from "./template/old-post-converter";
import ChartPropsEidtor, { ChartKnowledgeEdit } from "./components/ChartProps/ChartProps";
import axios from "axios";
import { initOctokit, REPO } from "./utils/Octokit";

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
  // test(),
]


export let zhCompletedKB = CKBJson("zh-CN");


function App() {
  const searchParams = new URL(window.location.href).searchParams;
  let filePath = searchParams.get('file-path') ? decodeURIComponent(searchParams.get('file-path') as string) : ''
  const [content, setContent] = React.useState(template(mdxString)({
    name: '面积图',
    enName: 'Area Chart'
  }));
  const [sha, setSha] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [chartPropsModalVisible, setChartPropsModalVisible] = React.useState(false);
  const [chartInfo, setChartInfo] = React.useState<{chartKnowledge: ChartKnowledgeJSON, trans?: Record<string, any>}>();
  const [chartPropsList, setChartPropsList] = React.useState<Record<string, any>[]>([]);
  const octokit = initOctokit();
  useEffect(() => {
    if (filePath) {
      setLoading(true)
      octokit.getFile({
        path: filePath.includes('.mdx') ? filePath : `${filePath}.mdx`,
      }).then((file) => {
        if (file.content) {
          setContent(file.content)
          setSha(file.sha)
        }
      }).catch((error) => {
        notification.error({message: error.message})
      }).finally(() => {
        setLoading(false)
      })
    }
    mergeChartPropsFromGithub();

    // OldPostConverter().then((str: string) => {
    //   setContent(str)
    // })
  }, [])
  const mergeChartPropsFromGithub = async () => {
    try {
      const file = await octokit.getFile({
        path: 'src/constants/props.ts',
      })
      if (file.content) {
        const content = file.content.replace('export const chartKnowledges = ','')
        const list = eval(content)
        if (Array.isArray(list)) {
          mergeChartProps(list);
          setChartPropsList(list);
          zhCompletedKB = CKBJson("en-US");

          if (filePath) {
            const paths = decodeURIComponent(filePath).replace(/\/?charts\//, '');
            if (paths && zhCompletedKB[paths]) {
              setChartInfo({chartKnowledge: zhCompletedKB[paths]})
            }
          }

        }
      }
    } catch (error: any) {
      console.error(error)
      notification.error({message: error.message})
    }
  

  }
  // @ts-ignore
  const onChange = (newValue: string) => {
    // cssText -> cssPrototype
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

  const openModal = () => {
    filePath = ''
    const u = new URL(window.location.href);
    u.searchParams.delete('file-path')
    // window.location.search = searchParams.toString()
    window.history.replaceState(null, '', u.href)
    setChartPropsModalVisible(true);
  }
  
  const downloadFile = () => {
    if (chartInfo) {
      exportFile(content, `${chartInfo.chartKnowledge.id}.mdx`)
    }
  }
  const handleScroll = (e: any) => {
    console.log(e)
  }


  const submitRepo = async () => {
    let commitMsg = ''
    Modal.confirm({
      title: 'Commit and fork',
      content: <>
        <Input addonBefore="docs: "   placeholder="commit message" onChange={(e) => {
          commitMsg = e.currentTarget.value
        }} />
        <p style={{fontSize: 12, marginTop: 10}}>将会先fork一份到自己仓库，然后向<a href="https://github.com/Plothis/gradict-charts-doc">github.com/Plothis/gradict-charts-doc</a>发起PR</p>
      </>,
      onOk: async () => {
        const forkData = await octokit.forkRepo();
        const searchParams = new URL(window.location.href).searchParams;
        filePath = searchParams.get('file-path') ? decodeURIComponent(searchParams.get('file-path') as string) : ''

        if (!forkData.owner) {
          notification.error({
            message: 'fork失败，稍后尝试',
          })
          return
        }

        if (filePath && filePath.includes('charts') && sha) {
          await octokit.pushFile({
            sha: sha,
            owner: forkData.owner.login,
            repo: forkData.owner.name || REPO,
            path: filePath.includes('.mdx') ? filePath : `${filePath}.mdx`,
            content: content,
            message: `docs: ${commitMsg}`,
          })
        } else {
          await octokit.pushFile({
            owner: forkData.owner.login,
            repo: forkData.owner.name || REPO,
            path: `charts/${chartInfo?.chartKnowledge.name}.mdx`,
            content: content,
            message: `docs: ${commitMsg}`,
          })
     
          const index = chartPropsList.findIndex((item) => item.id === chartInfo?.chartKnowledge.id)
          if (index === -1) {
            const file = await octokit.getFile({
              path: 'src/constants/props.ts',
            })
            if (file.sha) {
              chartPropsList.push({
                chartKnowledge: chartInfo?.chartKnowledge,
                trans: chartInfo?.trans ? chartInfo.trans : {
                  'zh-CN': {
                      name: '',
                      alias: [],
                      def: '',
                  }
                }
              })
              await octokit.pushFile({
                sha: file.sha,
                owner: forkData.owner.login,
                repo: forkData.owner.name || REPO,
                path: 'src/constants/props.ts',
                content: `export const chartKnowledges = ${JSON.stringify(chartPropsList, null, 4)}`,
                message: `docs: add props`,
              })
            }
          }
        }
  
        await octokit.createPullRequest(forkData.owner.login)
        notification.success({message: <>提交成功 <a href="https://github.com/Plothis/gradict-charts-doc/pulls">github.com/Plothis/gradict-charts-doc/pulls</a></>})
      },
      onCancel() {
        console.log('Cancel');
      },
    });
 
    
    // await octokit.createPullRequest(forkData.owner.login)
  }
  const handleChartPropsChange = (values: ChartKnowledgeEdit) => {
    const {cnName, cnAlias, cnDef, ...chartKnowledge } = values;
    const trans = {
      'zh-CN': {
        name: cnName,
        alias: cnAlias ?? [],
        def: cnDef ?? ''
      }
    }

    try {

      setChartInfo({chartKnowledge: chartKnowledge, trans: trans})

      // addChart(chartKnowledge as ChartKnowledge, trans as Record<string, TransKnowledgeProps>)

      const compiled = template(templateString);
      setContent(compiled({
        name: cnName,
        enName: toHump(chartKnowledge.name),
        representativePicture: '//i.ibb.co/QdxRXkp/346ff944cb6911dc5521095aa5a6008f.png',
        overview: 'overview text',
        constitution: 'text text',
        appropriateScene: 'text text',
        unAppropriateScene: 'text text',
        reference: '1. HIGHCHARTS. (n.d.). 包含负值的面积图. [online]. Available at: https://www.hcharts.cn/demo/highcharts/area-negative [Accessed 25 January 2019].',
        learningResource: 'text text',
        specialTool: '（1）[meta chart在线生成](<https://www.meta-chart.com/>)',
        usageScene: 'text text',
        DesignCase: `<DesignCaseItem
  description="潮汐预测，采用不规则的坐标系，使用海蓝色为基础色调进行配色，通过透明度的调整使图形更富有美感。"
  link="http://www.joanangdesign.com/"
  image="//i.ibb.co/QdxRXkp/346ff944cb6911dc5521095aa5a6008f.png"
/>`,
productionTutorial: `<ProductionTutorials
  data={${JSON.stringify({
    "BI工具": {},
    "代码库": {
      "ECharts": [
        {
          "linkText": "官方实例",
          "link": "https://echarts.baidu.com/examples/editor.html?c=area-basic"
        }
      ],
    },
    "设计工具": {}
  }, null, 2)}}
/>`,
contributors: `<Contributors
  merge
/>
`
      }));

      setChartPropsModalVisible(false);
    } catch (error) {
      
    }
    
  }

  return (
    <div>
      <div  style={{height: 10}}/>
      <Space style={{marginLeft: 10}}>
 
        <Button onClick={openModal} type="primary" >新建模板</Button>
        <Button onClick={downloadFile} type="primary" disabled={chartInfo === undefined} >下载mdx文件</Button>
        <Button onClick={submitRepo} type="primary" disabled={chartInfo === undefined} >提交文件</Button>

        <Button onClick={handleRepalceAllImg} loading={loading}>图片链接替换(http-&gt;https)</Button>
      
      </Space>
      <div  style={{height: 10}}/>
      <Spin spinning={loading}>
        <Editor
          mode="auto"
          value={content}
          onChange={onChange}
          uploadImages={uploadImages}
          plugins={plugins}
      
          overridePreview={(el, props) => { 
            render(
              <div className="markdown-body chart-container pg-chart">
                <MDX scope={scope} components={components}>{props.value}</MDX>  
              </div>
            , el)
          }}
        />
      </Spin>
      <ChartPropsEidtor
        visible={chartPropsModalVisible}
        onVisibleChange={setChartPropsModalVisible}
        onOk={handleChartPropsChange}
      />
    </div>
  );
}

export default App;

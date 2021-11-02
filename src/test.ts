import Axios from "axios";
import { templateString } from "./template";
import template from "./utils/template";
import { toHump } from "./utils";
import * as showdown  from 'showdown'
// import fs from 'fs';
// import { resolve } from 'path';


const converter = new showdown.Converter()

const htmlParse = (a, b) =>{
  console.log(a, b)
}
export function getData() {
  return new Promise<string>((resolve) => {
    Axios.post("http://139.224.62.3:3001/api/v1/graph/search", {
      common: [],
      shape: [],
      graphTypes: [],
      function: [],
      dataType: [],
    }).then(({ data }) => {
      data.data.forEach((item, index) => {
        if (index !== 21) {
          return;
        }
        const id = item._id;
        Axios.get(`http://139.224.62.3:3001/api/v1/graph/getById/${id}`).then(
          ({ data }) => {
            data = data.data
            let DesignCase = "";
            for (const iterator of data.designCase) {
              const { description, link, image } = iterator;
              DesignCase += `
<DesignCaseItem
    description="${description}"
    link="${link}"
    image="${image}"
/>
            `;
            }
            const replaceSpan = (c: string) => { 
              return c.replace(/<span\s.*">/ig, '')
              .replace(/<\/span>/ig, '')
              .replace(/&nbsp;/ig, ' ')
              .replace('<br>', '<br />')
              .replace(/!\[null\]\(<(.*)>\)/, function(match, $1) {
                return`![null](${$1})`
              })
            }
            const parserHTMLText = (c) => {
              const d = document.createElement('div')
              d.innerHTML = c;
     
              let text = '';
              for(var i = 0; i < d.children.length; i++) {
                const child = d.children[i] as HTMLElement;
     
                text += `\n
${child.innerText.replace(/^(\d{1,2})\./, (m, $1) => `${$1}. `)}
`
              }
              return text.replace(/&nbsp;/ig, ' ')
            }
            const dataJSON = {
              DesignCase,
              overview: replaceSpan(converter.makeMarkdown(data.overview)),
              representativePicture: data.representativePicture.url,
              constitution: replaceSpan(converter.makeMarkdown(data.constitution).replace(/<data:image.*\/\/Z>/, '')),
              appropriateScene:  replaceSpan(converter.makeMarkdown(data.appropriateScene)),
              unAppropriateScene: replaceSpan(converter.makeMarkdown(data.unAppropriateScene)),
              usageScene: replaceSpan(converter.makeMarkdown(data.usageScene)),
              productionTutorial:`
<ProductionTutorials
  data={${JSON.stringify({
    "BI工具": data.productionTutorial.BITools,
    "代码库": data.productionTutorial.codeLibrary,
    "设计工具": data.productionTutorial.designSoftware
  }, null, 2)}}
/>
`.trim() ,
              reference: parserHTMLText(data.reference),
              specialTool: replaceSpan(converter.makeMarkdown(data.specialTool)),
              learningResource: replaceSpan(converter.makeMarkdown(data.learningResource)),
              contributors: `
<Contributors
  data={${JSON.stringify(data.contributors, null, 2)}}
  merge
/>
`.trim(),
            };
            console.log(parserHTMLText(data.reference))
            var compiled = template(templateString);
            const enName = toHump(data.enName);
            const str = compiled({
              ...dataJSON,
              name: data.cnName,
              enName: enName,
            });
            resolve(str)
          }
        );
      })
      
    });
  });
}

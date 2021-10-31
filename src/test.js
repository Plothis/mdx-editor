
const arr = [
    {
      "_id": "5c66623d372bb033b9c2f9fd",
      "description": "这张图使用了便于区分的颜色，展现了美国近300种威士忌的种类和产地，整体较为简洁美观。",
      "link": "https://public.tableau.com/profile/adam.e.mccann#!/vizhome/WhiskeyWheel/WhiskeyWheel",
      "image": "http://www.tuzhidian.com:3001/upload/images/2019/酒_41f2ea80f9e6a7e3c2f621c26cb4ace4.png"
    },
    {
      "_id": "5c66623d372bb033b9c2f9fc",
      "description": "对于树状结构，设计时可以适当灵活处理。",
      "link": "https://www.behance.net/gallery/23336987/Annual-Report-poster-2014",
      "image": "http://www.tuzhidian.com:3001/upload/images/2019/立体_62c93f72b5d4bb3d773328fcf8999c66.png"
    },
    {
      "_id": "5c66623d372bb033b9c2f9fb",
      "description": "实物设计。",
      "image": "http://www.tuzhidian.com:3001/upload/images/2019/实物_b7b2e19bae4d38820a10fc091036834a.png",
      "link": "https://www.behance.net/gallery/4636643/Journey-to-the-East"
    },
    {
      "_id": "5c66623d372bb033b9c2f9fa",
      "description": "可借鉴穹顶投影，做出类似disco的视觉效果。",
      "link": "https://www.paulprudence.com/?p=547",
      "image": "http://www.tuzhidian.com:3001/upload/images/2019/投影_26f7161fea4a65ca18448c955d0796b0.png"
    }
  ]

let str = ``
for (const iterator of arr) {
    const { description , link, image} = iterator
    str += `
    <DesignCaseItem
        description="${description}"
        link="${link}"
        image="${image}"
    />
    `
}

console.log(str)
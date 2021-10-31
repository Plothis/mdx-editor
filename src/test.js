
const arr = [
    {
      "_id": "5c66a93c372bb033b9c2fb68",
      "description": "删去不必要的网格线及坐标轴线。在折线图上可标记出重要的节点，并给予讲解。",
      "link": "https://www.thepaper.cn/newsDetail_forward_2928719",
      "image": "http://www.tuzhidian.com:3001/upload/images/2019/数说｜春节催婚旺季将至，其实你们和爸妈说的都没错_993d968ff6204c62ecac4802080b7d44.jpg"
    },
    {
      "_id": "5c66a93c372bb033b9c2fb67",
      "description": "实物折线。",
      "link": "http://www.topdesignmag.com/9-unique-and-extremely-interesting-styled-infographics/",
      "image": "http://www.tuzhidian.com:3001/upload/images/2019/实物_a3aeea426b487263206a61f477c9d3aa.png"
    },
    {
      "_id": "5c66a93c372bb033b9c2fb66",
      "description": "人体互动。",
      "link": "https://laughingsquid.com/photographer-uses-physical-objects-to-create-ingenious-photographic-infographics/",
      "image": "http://www.tuzhidian.com:3001/upload/images/2019/人体_3d32d3610d586e62c9a25254879cfae7.jpeg"
    },
    {
      "_id": "5c66a93c372bb033b9c2fb65",
      "description": "对于数据点过多的情况，可以做成可交互版本。在交互版本可以给x轴添加scale或者可滑动的选区。这样既可以避免数据点过于密集的情况，也能让用户集中在一个特定的时间选区。",
      "link": "https://nbremer.github.io/babynames/",
      "image": "http://www.tuzhidian.com:3001/upload/images/2019/交互_083adca06162ed03da5e5ff2446bc5a0.png"
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
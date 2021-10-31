
const arr = [
    {
      "_id": "5c55a30558461d3fa61366ef",
      "description": "将死板的坐标轴和刻度，变形为有“设计感”的圆；用颜色进行归类。下面的案例探讨了环保问题最左边是几种常见的食品，第二列表示每公斤需要消耗的能量；第三列表示蛋白质重量；第四列表示蛋白质所要的能量。数值大小对应了圆圈的大小。",
      "link": "https://spectrum.ieee.org/static/the-energy-to-create-your-food",
      "image": "http://www.tuzhidian.com:3001/upload/images/2019/1544099283801-d6f36585-5550-453b-9a56-d0e697c20378_850ffb26e1d9efdebc44d6ecd0d3c943.png"
    },
    {
      "_id": "5c55a30558461d3fa61366ee",
      "description": "线下布展。讨论了不同地区使用勺子和刀具的异同。",
      "link": "http://dataphys.org/list/data-strings-physical-parallel-coordinates/",
      "image": "http://www.tuzhidian.com:3001/upload/images/2019/1544362051979-a0b4155b-342f-49ae-a971-535718b06e39_7c9d5e746cec86dd0d69751fa27f939f.png"
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
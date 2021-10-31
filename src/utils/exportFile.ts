/**
 * 文本内容导出文件
 * 支持JSON, html
 */
export default function exportFile(content: string, fileName: string) {
    // 创建隐藏的可下载链接
    const eleLink = document.createElement('a');
    eleLink.download = fileName;
    eleLink.style.display = 'none';
    // 字符内容转变成blob地址
    const blob = new Blob([content]);
    eleLink.href = URL.createObjectURL(blob);
    // 触发点击
    document.body.appendChild(eleLink);
    eleLink.click();
    // 然后移除
    document.body.removeChild(eleLink);
}

# WebSheetPixelator

WebSheetPixelator 是一个纯前端的工具，用于将图片转换为 Excel 像素画。该项目使用 HTML、CSS 和 JavaScript，通过 Canvas 提取图片像素数据，利用 ExcelJS 生成 Excel 文件，实现整个转换过程都在浏览器端完成，无需任何后端支持。

## 特性

- 纯前端实现，无需服务器部署
- 自动缩放图片，生成适当尺寸的像素画
- 使用 ExcelJS 高效生成 Excel 文件


## 演示

项目已部署至 GitHub Pages，你可以通过以下链接查看在线效果：
[pixel.colorcard.cc](https://pixel.colorcard.cc)

## 使用方法

1. 克隆或下载仓库：
   ```bash
   git clone https://github.com/colorcard/WebSheetPixelator.git
   ```
2. 打开项目根目录下的 `index.html` 文件，即可在浏览器中体验该工具。

## 文件结构

- `index.html` —— 主要页面结构
- `style.css` —— 页面样式与动画效果
- `script.js` —— 前端逻辑，处理图片转换及 Excel 文件生成

## 贡献

欢迎提交 Issue 或 Pull Request 来改进项目。

## 许可证

本项目采用 MIT 许可证，详情请参阅 [LICENSE](LICENSE) 文件。
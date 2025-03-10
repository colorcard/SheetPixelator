// 打字动画：将标题“图片转 Excel 像素画”按字母逐个显示
document.addEventListener('DOMContentLoaded', function() {
  const titleElement = document.getElementById("title");
  const fullText = "图片转 Excel 像素画";
  let index = 0;
  titleElement.style.opacity = 1; // 动画开始时确保元素显示
  const typingInterval = setInterval(() => {
    titleElement.textContent += fullText.charAt(index);
    index++;
    if (index === fullText.length) {
      clearInterval(typingInterval);
    }
  }, 200); // 每个字符间隔 200 毫秒
});


// 最大像素尺寸常量：超过此尺寸则自动缩放
const MAX_PIXEL_SIZE = 500;

document.getElementById('convertBtn').addEventListener('click', function() {
  const fileInput = document.getElementById("imageInput");
  if (fileInput.files.length === 0) {
    alert("请选择图片文件！");
    return;
  }
  
  const file = fileInput.files[0];
  const reader = new FileReader();
  reader.onload = function(event) {
    const img = new Image();
    img.onload = function() {
      // 计算缩放比例，确保图片尺寸不超过设定最大值
      let scale = 1;
      if (img.width > MAX_PIXEL_SIZE || img.height > MAX_PIXEL_SIZE) {
        scale = Math.min(MAX_PIXEL_SIZE / img.width, MAX_PIXEL_SIZE / img.height);
      }
      const scaledWidth = Math.floor(img.width * scale);
      const scaledHeight = Math.floor(img.height * scale);
      
      const canvas = document.getElementById('canvas');
      canvas.width = scaledWidth;
      canvas.height = scaledHeight;
      const ctx = canvas.getContext("2d");
      // 绘制缩放后的图片到画布
      ctx.drawImage(img, 0, 0, scaledWidth, scaledHeight);
      
      // 获取图片像素数据（RGBA数组）
      const imageData = ctx.getImageData(0, 0, scaledWidth, scaledHeight);
      const data = imageData.data;
      
      // 使用 ExcelJS 创建工作簿和工作表
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Pixel Art');
      
      // 设置每一列宽度和每一行高度，使单元格近似正方形
      for (let i = 1; i <= scaledWidth; i++) {
        worksheet.getColumn(i).width = 1.4/5;
      }
      for (let i = 1; i <= scaledHeight; i++) {
        worksheet.getRow(i).height = 18/5;
      }
      
      // 填充单元格，根据图片每个像素的颜色
      for (let row = 0; row < scaledHeight; row++) {
        for (let col = 0; col < scaledWidth; col++) {
          const index = (row * scaledWidth + col) * 4;
          let r = data[index];
          let g = data[index + 1];
          let b = data[index + 2];
          const a = data[index + 3];
          
          // 如果透明，则设为白色
          if (a === 0) {
            r = 255; g = 255; b = 255;
          }
          
          // 生成16进制颜色代码（前缀 FF 表示全不透明）
          const hex = ((1 << 24) + (r << 16) + (g << 8) + b)
                      .toString(16)
                      .slice(1)
                      .toUpperCase();
          
          const cell = worksheet.getCell(row + 1, col + 1);
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF' + hex }
          };
          cell.value = '';
        }
      }
      
      // 保存生成的工作簿到全局变量，便于下载
      window.currentWorkbook = workbook;
      document.getElementById('downloadBtn').disabled = false;
      alert(`转换完成！原始尺寸：${img.width}x${img.height}，缩放为：${scaledWidth}x${scaledHeight}。请点击“下载 Excel”按钮下载文件。`);
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
});

document.getElementById('downloadBtn').addEventListener('click', function() {
  if (window.currentWorkbook) {
    window.currentWorkbook.xlsx.writeBuffer().then(function(buffer) {
      saveAs(new Blob([buffer], { type: "application/octet-stream" }), "pixel_art.xlsx");
    });
  }
});
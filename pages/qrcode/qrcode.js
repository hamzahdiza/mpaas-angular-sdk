// IMPORTANT: require from miniprogram_npm after Build NPM
const QRCode = require('qrcode'); // adjust ../../ as needed

Page({
  data:{
    saveImageSelected:"saveImage",
    selectedFilePath : "tempFilePath"
  },
  onLoad() {
    // Start simple; keep content short first

  },
  savePNG() {
    this.drawQR(this.data.inputValue, {
      width: 290,
      margin: 4,
      ecLevel: 'M'
    });
  },
  async drawQR(text, {
    width = 290,
    margin = 4,
    ecLevel = 'H'
  } = {}) {
    // Build the bit matrix via node-qrcode
    let qr;
    try {
      qr = QRCode.create(String(text), {
        errorCorrectionLevel: ecLevel
      });
      
    } catch (e) {
      console.error('QRCode.create failed:', e);
      my.showToast({
        type: 'fail',
        content: 'QR create error'
      });
      return;
    }

    const size = qr.modules.size; // 21 for Version 1
    const data = qr.modules.data;
    const total = size + margin * 2;

    // Integer pixels per module for crisp edges
    // With width=290 and total=29 => 10px/module (nice)
    const scale = Math.max(1, Math.floor(width / total));
    const drawSize = total * scale; // 290

    // Try Canvas 2D node API first (preferred)
    const q = my.createSelectorQuery();
    q.select('#qrCanvas').node().exec((res) => {
      const nodeEntry = res && res[0];
      if (nodeEntry && nodeEntry.node && nodeEntry.node.getContext) {
        // Modern 2D Canvas path
        const canvas = nodeEntry.node;
        const ctx = canvas.getContext('2d');

        // Ensure the backing buffer matches our draw size exactly
        canvas.width = drawSize;
        canvas.height = drawSize;

        // Background white
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, drawSize, drawSize);

        // Modules black
        ctx.fillStyle = '#000000';
        for (let y = 0; y < size; y++) {
          for (let x = 0; x < size; x++) {
            if (data[y * size + x]) {
              const px = (x + margin) * scale;
              const py = (y + margin) * scale;
              ctx.fillRect(px, py, scale, scale);
            }
          }
        }
        return; // done
      }

      // Fallback: old canvas API (createCanvasContext)
      try {
        const ctx = my.createCanvasContext('qrCanvas');

        // White background
        ctx.setFillStyle('#FFFFFF');
        ctx.fillRect(0, 0, drawSize, drawSize);

        // Black modules
        ctx.setFillStyle('#000000');
        for (let y = 0; y < size; y++) {
          for (let x = 0; x < size; x++) {
            if (data[y * size + x]) {
              const px = (x + margin) * scale;
              const py = (y + margin) * scale;
              ctx.fillRect(px, py, scale, scale);
            }
          }
        }

        // Flush draw to screen
        const that = this
        // console.log(QRCode.toDataURL(ctx,"TEST",{type:"String"},))
        ctx.draw(false, () => {
          ctx
          .toDataURL({
            x: 0,
            y: 0,
            width: 290,
            height: 290,
            destWidth: 290,
            destHeight: 290,
          })
          .then(dataURL => {
            this.setData({
              dataURL
            })
            console.info(dataURL,"<<< check")
          });
          ctx.toTempFilePath({
            x: 0,
            y: 0,
            width: 300,
            height: 250,
            fileType: 'jpg',
            quality: 1,
            success(res) {
              if(that.data.saveImageSelected === 'saveImageSelected'){
           
                my.saveImage({
                  url: res[that.data.selectedFilePath],
                  success:()=>{
                    console.info("success")
                  },
                  fail: (err) => {
                    console.info(err, "<<<< error")
                  }
                });
              } else {
                my.saveImageToPhotosAlbum({
                  filePath: res[that.data.selectedFilePath],
                  success: () => {
                    console.info("success")
                  },
                  fail: (err) => {
                    console.info(err, "<<<< error")
                  }
                })
                console.info(res)
              }
          
            }
          })
          // no export; QR is visible on canvas
        });
      } catch (e) {
        console.error('Canvas draw failed:', e);
        my.showToast({
          type: 'fail',
          content: 'Canvas draw error'
        });
      }
    });
    console.log('QRCode keys:', Object.keys(QRCode || {}));

  },
  bindKeyInput(e) {
    this.setData({
      inputValue: e.detail.value.toUpperCase()
    })
  },
  onChooseSaveApi(e){
    const {api} = e.currentTarget.dataset

    this.setData({
      saveImageSelected : api
    })
  },
  onChooseFilePath(e){
    const {path} = e.currentTarget.dataset
    this.setData({
      selectedFilePath : path 
    })
  }
});
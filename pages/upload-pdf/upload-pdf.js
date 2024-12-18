Page({
  data: {
    fileName: String(""),
    uploadSuccess: Boolean(false),
  },
  onLoad() {},
  uploadPDF() {
    my.chooseFileFromDisk({
      success: (res) => {
        console.info('MPAAS_SUCCESS_UPLOAD', res)
        my.getFileInfo({
          success: (ress) => {
            console.info('MPAAS_GET_INFO', ress)
            my.showModal({
              title: "Info File upload",
              content: ress
            })
          }
        })
        this.setData({
          fileName: res.fileName,
          uploadSuccess: true
        })
      },
      fail: (err) => {
        console.info('MPAAS_ERROR_UPLOAD', err)
        my.showModal({
          title: "Error upload",
          content: err
        })
      }
    });
  }
});
Page({
  data: {
    fileName: String(""),
    uploadSuccess: Boolean(false),
    params: {
      "fileExtensions": ["jpg", "pdf", "png", "jpeg"],
      "maxFileSize": "2MB"
    }
  },
  onLoad() {},
  // uploadPDF() {
  //   my.chooseFileFromDisk({
  //     success: (res) => {
  //       console.info('MPAAS_SUCCESS_UPLOAD', res)
  //       my.getFileInfo({
  //         apFilePath: res.apFilePath,
  //         success: (ress) => {
  //           console.info('MPAAS_GET_INFO', JSON.stringify(ress))
  //         },
  //         fail: (error) => {
  //           console.info('MPAAS_GET_INFO_ERROR', error)
  //         }
  //       })
  //       this.setData({
  //         fileName: res.fileName,
  //         uploadSuccess: true
  //       })
  //     },
  //     fail: (err) => {
  //       console.info('MPAAS_ERROR_UPLOAD', err)
  //       my.showModal({
  //         title: "Error upload",
  //         content: err
  //       })
  //     }
  //   });
  // }

  uploadPDF() {
    my.call("selectFile", {
      data: this.data.params,
      success: (res) => {
        console.info('MPAAS_JSAPI_SELECT_FILE', JSON.stringify(res))
        my.alert({
          title: 'success',
          content: res
        });
        this.setData({
          uploadSuccess: true,
          fileName: res.data.fileName,
        })
      }
    })
  }
});
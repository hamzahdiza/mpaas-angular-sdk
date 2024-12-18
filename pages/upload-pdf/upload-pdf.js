Page({
  data: {
    fileName: String(""),
    uploadSuccess: Boolean(false),
  },
  onLoad() {
  },
  uploadPDF() {
    my.chooseFileFromDisk({
      success: (res) => {
       this.setData({
        fileName: res.fileName,
        uploadSuccess: true
       })
      },
      fail: (err) => {
        my.showModal({
          title: "Error upload",
          content: err
        })
      }
  	});
  }
});

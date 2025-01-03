import { dinamycJSAPI } from "/utils/customJSAPI";

Page({
  data: {
    fileName: String(""),
    uploadSuccess: Boolean(false),
    params: {
      "fileMIMEType": ["application/pdf", "image/jpeg", "image/png"],
    }
  },
  onLoad() {},
  uploadPDF() {
    my.chooseFileFromDisk({
      success: (res) => {
        let fs = my.getFileSystemManager()
        fs.readFile({
          filePath: res.apFilePath,
          encoding: "base64",
          success: (res) => {
            // res.data is the base64 string
            // my.alert({title: "readFile succ", content: JSON.stringify(res.data)})
            console.info('MPAAS_READFILE_SUCCESS', JSON.stringify(res.data))
            my.request({
              url: "xxx",
              method: "POST",
              data: {
                body: "xxx"
              },
              success: (res) => {
                console.info('MPAAS_RESULT_SUCCESS', res)
              },
              fail: (err) => {
                console.info('MPAAS_RESULT_ERROR', err)
              }
            })
          },
          fail: (err) => {
            // my.alert({title: "readFile fail", content: JSON.stringify(err)})
            console.info('MPAAS_READFILE_FAIL', JSON.stringify(err))
          }
        })
      },
      fail: (result) => {
        // my.alert({content:JSON.stringify(result)})
        console.info('MPAAS_CHOOSEFILE_FAIL', JSON.stringify(result))
      }
    })
  },

  uploadPDFJSAPI() {
    dinamycJSAPI("selectFile", {
      data: JSON.stringify(this.data.params),
    }, (res) => {
      console.info('MPAAS_JSAPI_SELECT_FILE', JSON.stringify(res.data))
      // my.alert({
      //   title: 'success',
      //   content: JSON.stringify(res)
      // });
      this.setData({
        uploadSuccess: true,
        fileName: res.data.message.fileName,
      })
    })
  }
});
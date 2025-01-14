const tools = require('../../utils/lib/e2ee.wsx')

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
  // uploadPDF() {
  //   my.chooseFileFromDisk({
  //     success: (res) => {
  //       let fs = my.getFileSystemManager()
  //       fs.readFile({
  //         filePath: res.apFilePath,
  //         encoding: "base64",
  //         success: (res) => {
  //           // res.data is the base64 string
  //           // my.alert({title: "readFile succ", content: JSON.stringify(res.data)})
  //           console.info('MPAAS_READFILE_SUCCESS', JSON.stringify(res.data))
  //           my.request({
  //             url: "xxx",
  //             method: "POST",
  //             data: {
  //               body: "xxx"
  //             },
  //             success: (res) => {
  //               console.info('MPAAS_RESULT_SUCCESS', res)
  //             },
  //             fail: (err) => {
  //               console.info('MPAAS_RESULT_ERROR', err)
  //             }
  //           })
  //         },
  //         fail: (err) => {
  //           // my.alert({title: "readFile fail", content: JSON.stringify(err)})
  //           console.info('MPAAS_READFILE_FAIL', JSON.stringify(err))
  //         }
  //       })
  //     },
  //     fail: (result) => {
  //       // my.alert({content:JSON.stringify(result)})
  //       console.info('MPAAS_CHOOSEFILE_FAIL', JSON.stringify(result))
  //     }
  //   })
  // },

  generateUUID() {
    let key32 = tools.createKey().toLowerCase();
    let uuid = ""
    for (let i = 1; i <= 32; i++) {
      uuid += key32.charAt(i - 1)
      if (i == 8 || i == 12 || i == 16 || i == 20) uuid += "-";
    }
    return uuid;
  },

  uploadPDF(){
    const nativeData = getApp().globalData.nativeData;
    my.chooseFileFromDisk({
      success: (res) => {
        console.info("APPLYCC_Choose file success", JSON.stringify(res))
        this.setData({
          fileName: res.fileName
        })
        const { fileName, filePath } = res;
        my.uploadFile({
          url: "https://mav-apigw-ext-test2.bni.co.id:48202/apc/v1/upsert-document",
          fileType: "file",
          fileName: fileName,
          filePath: filePath,
          headers: {
            "content-type": "multipart/form-data",
            "Channel-Id": "MVR",
            "Client-Platform": nativeData.clientPlatform,
            "Client-Version": nativeData.clientVersion,
            "Client-Release": nativeData.clientRelease,
            "Accept-Language": nativeData.language,
            "User-Agent": nativeData.userAgent,
            "Device-Id": nativeData.deviceId,
            "Request-Id": this.generateUUID(),
            authorization: nativeData.authorization,
            "Enc-Session-Key": nativeData.encSessionKey,
          },
          formData: {
            fileName: res.fileName,
            id: "iddata",
          },
          success: (uploadRes) => {
            if (uploadRes.statusCode || uploadRes.status === 200) {
              console.info("APPLYCC_File uploaded successfully!:", JSON.stringify(uploadRes.data));
            } else {
              console.info(`MPAAS_Upload failed with status: ${uploadRes.statusCode}`, JSON.stringify(uploadRes.data));
            }
          },
          fail: (err) => {
            console.info("APPLYCC_File upload failed:", JSON.stringify(err));
          },
        });
      },
      fail: (err) => {
        console.info("APPLYCC_Failed To ChooseFile", JSON.stringify(err))
      }
    })
  },

  uploadPDFJSAPI() {
    dinamycJSAPI("selectFile", {
      data: JSON.stringify(this.data.params),
    }, (res) => {
      console.info('MPAAS_JSAPI_SELECT_FILE', JSON.stringify(res.data))
      this.setData({
        uploadSuccess: true,
        fileName: res.data.fileName,
      })
    })
  }
});
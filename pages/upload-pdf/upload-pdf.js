const tools = require('../../utils/lib/e2ee.wsx')

import {
  dinamycJSAPI
} from "/utils/customJSAPI";
import {
  generateUUID
} from "/utils/e2ee";

Page({
  data: {
    fileName: String(""),
    uploadSuccess: Boolean(false),
    params: {
      "fileMIMEType": ["application/pdf", "image/jpeg", "image/png"],
    }
  },
  onLoad() {
    console.info("ALL NATIVE DATA", JSON.stringify(getApp().globalData.nativeData))
    console.info("ALL BUNDLE LAUNCH PARAM", JSON.stringify(getApp().globalData.launchParams))
  },

  uploadPDF() {
    const nativeData = getApp().globalData.nativeData;
  
    my.chooseFileFromDisk({
      success: (res) => {
        console.info("APPLYCC_Choose file success", JSON.stringify(res));
  
        const fileName = getApp().globalData.launchParams.clientPlatform === "ios" ? "filename.pdf" : res.fileName;
        const filePath = res.apFilePath;
        const idValue = "iddata";
  
        let fs = my.getFileSystemManager();
        fs.readFile({
          filePath,
          success: (readRes) => {
            console.info('MPAAS_READFILE_SUCCESS', JSON.stringify(readRes));
            const binaryContent = Buffer.from(readRes.data); // Ensure binary data is a Buffer
  
            const boundary = '----BoundaryString' + new Date().getTime();
            const delimiter = `\r\n--${boundary}\r\n`;
            const closeDelimiter = `\r\n--${boundary}--`;
  
            const bodyParts = [
              Buffer.from(delimiter + 'Content-Disposition: form-data; name="fileData"; filename="' + fileName + '"\r\nContent-Type: application/octet-stream\r\n\r\n', 'utf-8'),
              binaryContent, // File binary content
              Buffer.from(delimiter + 'Content-Disposition: form-data; name="fileName"\r\n\r\n' + fileName + '\r\n', 'utf-8'),
              Buffer.from(delimiter + 'Content-Disposition: form-data; name="id"\r\n\r\n' + idValue + '\r\n', 'utf-8'),
              Buffer.from(closeDelimiter, 'utf-8')
            ];
            const finalBuffer = Buffer.concat(bodyParts);
  
            my.request({
              url: "/apc/v1/upsert-document",
              method: "POST",
              data: finalBuffer,
              headers: {
                'Content-Type': `multipart/form-data; boundary=${boundary}`,
                "Channel-Id": "MVR",
                "Client-Platform": nativeData.clientPlatform,
                "Client-Version": nativeData.clientVersion,
                "Client-Release": nativeData.clientRelease,
                "Accept-Language": nativeData.language,
                "User-Agent": nativeData.userAgent,
                "Device-Id": nativeData.deviceId,
                "Request-Id": generateUUID(),
                authorization: nativeData.authorization,
                "Enc-Session-Key": nativeData.encSessionKey,
              },
              success: (resUp) => {
                console.info('MPAAS_RESULT_SUCCESS', JSON.stringify(resUp));
              },
              fail: (errUp) => {
                console.info('MPAAS_RESULT_ERROR', JSON.stringify(errUp));
              }
            });
          },
          fail: (errRes) => {
            console.info('MPAAS_READFILE_FAIL', JSON.stringify(errRes));
          }
        });
      },
      fail: (err) => {
        console.info('MPAAS_CHOOSEFILE_FAIL', JSON.stringify(err));
      }
    });
  },
  
  // uploadPDF() {
  //   const nativeData = getApp().globalData.nativeData;

  //   my.chooseFileFromDisk({
  //     success: (res) => {
  //       console.info("APPLYCC_Choose file success", JSON.stringify(res))

  //       this.setData({
  //         fileName: getApp().globalData.launchParams.clientPlatform === "ios" ? "filename.pdf" : res.fileName
  //       })

  //       const filePath = res.apFilePath;
  //       const fileName = getApp().globalData.launchParams.clientPlatform === "ios" ? "filename.pdf" : res.fileName;
  //       const idValue = "iddata"

  //       let fs = my.getFileSystemManager()
  //       fs.readFile({
  //         filePath: filePath,
  //         success: (readRes) => {
  //           console.info('MPAAS_READFILE_SUCCESS', JSON.stringify(readRes))
  //           const binaryContent = readRes.data;

  //           const boundary = '----BoundaryString';
  //           const delimiter = `\r\n--${boundary}\r\n`;
  //           const closeDelimiter = `\r\n--${boundary}--`;

  //           let body = '';

  //           body += delimiter;
  //           body += 'Content-Disposition: form-data; name="fileData"; filename="' + fileName + '"\r\n';
  //           body += 'Content-Type: application/octet-stream\r\n\r\n';
  //           const fileDataBuffer = new Uint8Array(binaryContent)

  //           body += delimiter;
  //           body += 'Content-Disposition: form-data; name="fileName"\r\n\r\n';
  //           body += fileName + '\r\n';

  //           body += delimiter;
  //           body += 'Content-Disposition: form-data; name="id"\r\n\r\n';
  //           body += idValue + '\r\n';

  //           body += closeDelimiter;

  //           const finalBuffer = Buffer.concat([
  //             Buffer.from(body, 'utf-8'),
  //             fileDataBuffer
  //           ])

  //           my.request({
  //             url: "/apc/v1/upsert-document",
  //             method: "POST",
  //             data: {
  //               body: finalBuffer,
  //             },
  //             headers: {
  //               'Content-Type': `multipart/form-data; boundary=${boundary}`,
  //               "Channel-Id": "MVR",
  //               "Client-Platform": nativeData.clientPlatform,
  //               "Client-Version": nativeData.clientVersion,
  //               "Client-Release": nativeData.clientRelease,
  //               "Accept-Language": nativeData.language,
  //               "User-Agent": nativeData.userAgent,
  //               "Device-Id": nativeData.deviceId,
  //               "Request-Id": generateUUID(),
  //               authorization: nativeData.authorization,
  //               "Enc-Session-Key": nativeData.encSessionKey,
  //             },
  //             success: (resUp) => {
  //               console.info('MPAAS_RESULT_SUCCESS', JSON.stringify(resUp))
  //             },
  //             fail: (errUp) => {
  //               console.info('MPAAS_RESULT_ERROR', JSON.stringify(errUp))
  //             }
  //           })
  //         },
  //         fail: (errRes) => {
  //           console.info('MPAAS_READFILE_FAIL', JSON.stringify(errRes))
  //         }
  //       })
  //     },
  //     fail: (err) => {
  //       console.info('MPAAS_CHOOSEFILE_FAIL', JSON.stringify(err))
  //     }
  //   })
  // },

  // uploadPDF(){
  //   const nativeData = getApp().globalData.nativeData;
  //   my.chooseFileFromDisk({
  //     success: (res) => {
  //       console.info("APPLYCC_Choose file success", JSON.stringify(res))
  //       this.setData({
  //         fileName: res.fileName
  //       })
  //       const { fileName, apFilePath } = res;
  //       my.uploadFile({
  //         url: "/apc/v1/upsert-document",
  //         fileType: "file",
  //         fileName: "fileName",
  //         filePath: apFilePath,
  //         headers: {
  //           "content-type": "multipart/form-data",
  //           "Channel-Id": "MVR",
  //           "Client-Platform": nativeData.clientPlatform,
  //           "Client-Version": nativeData.clientVersion,
  //           "Client-Release": nativeData.clientRelease,
  //           "Accept-Language": nativeData.language,
  //           "User-Agent": nativeData.userAgent,
  //           "Device-Id": nativeData.deviceId,
  //           "Request-Id": generateUUID(),
  //           authorization: nativeData.authorization,
  //           "Enc-Session-Key": nativeData.encSessionKey,
  //         },
  //         formData: {
  //           fileName: getApp().globalData.launchParams.clientPlatform === "ios" ? "filename.pdf" : fileName,
  //           id: "iddata",
  //         },
  //         success: (uploadRes) => {
  //           console.info("SUCCESS TO UPLOADED FILE", JSON.stringify(uploadRes))
  //           if (uploadRes.statusCode || uploadRes.status === 200) {
  //             console.info("APPLYCC_File uploaded successfully!:", JSON.stringify(uploadRes.data));
  //           } else {
  //             console.info(`MPAAS_Upload failed with status: ${uploadRes.statusCode}`, JSON.stringify(uploadRes.data));
  //           }
  //         },
  //         fail: (err) => {
  //           console.info("APPLYCC_File upload failed:", JSON.stringify(err));
  //         },
  //       });
  //     },
  //     fail: (err) => {
  //       console.info("APPLYCC_Failed To ChooseFile", JSON.stringify(err))
  //     }
  //   })
  // },

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
  },

  handleBack(){
    my.navigateBack()
  }
});
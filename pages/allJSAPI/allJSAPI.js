import {
  rspCheckService
} from "../../utils/rspCheckService"

Page({
  data: {
    optionsHomeScreen: [{
        value: 'GROWTH',
        label: 'Growth'
      },
      {
        value: 'INSIGHT',
        label: 'Insight'
      },
      {
        value: 'TRANSACTION',
        label: 'Transaction'
      },
    ],
    optionsDownTime: [{
        value: true,
        label: 'True',
      },
      {
        value: false,
        label: 'False',
      }
    ],
    valueHomeScreen: '',
    valueDownTime: '',
    valueStorePartner: {
      partnerId: "2024",
      partnerName: "Whoosh",
      partnerAlias: "WSH",
      paymentType: "VA",
      transactionId: "T2KC4ACM0q2iRZNK8Vb3l",
      screenId: "lifestyleWhoosh",
      urlRedirect: 'https://mvrk-bo-dev.bni.co.id/mpaas/?urlCallback=https:%2F%2Fgoogle.com',
      urlMicrosite: 'https://mvrk-bo-dev.bni.co.id/mpaas/?urlCallback=https:%2F%2Fgoogle.com',
    },
    firebase: {
      "groupId": "pfmHome",
      "event": [{
        "name": "AppClick",
        "value": "CreateNewAccount"
      }]
    },
    dataStoreTransaction: {
      "data": {
        "creditCardChargeAmount": 500000,
        "isFromContact": true,
        "additionalBillerData": [{
          "additionalLabel": "Promo Code",
          "additionalValue": "DISCOUNT123"
        }],
        "packageData": {
          "packageCode": "PKG123",
          "title": "Premium Package",
          "description": "Full-feature package"
        },
        "categoryData": {
          "categoryId": "py72wj7639eWWBI",
          "categoryIcon": "iconlink1",
          "categoryName": "Pulsa & Pascabayar",
          "isCrowned": true,
          "crown": "Baru",
          "categorySequence": 1,
          "isPopular": true
        },
        "ubpCompanyCode": "UTILCO",
        "billerCode": "ELECTRICITY",
        "billerName": "Electricity Provider",
        "billerAliasName": "Electricity",
        "billerLogo": "electricity_icon.png",
        "subRegionName": "RegionABC",
        "subRegionPrefixCode": "110593",
        "billKey1Label": "Meter Number",
        "billKey1LabelEn": "Meter Number",
        "billKey1LabelId": "meter_number",
        "journalNumberValues": ["JN12345", "JN67890"],
        "paymentMethod": "Credit Card",
        "paymentType": "One-time",
        "completionTime": "2023-12-15T12:34:56Z",
        "billAmount": 500000,
        "billTotalAmount": 515000,
        "isContactFull": true
      },
      "dataProtected": {
        "billInfoList": [{
            "label": "NAMA",
            "value": "IDHAM DHIYAULHAQ HABIBI"
          },
          {
            "label": "NOMINAL",
            "value": "10000"
          },
          {
            "label": "BIAYA ADMIN",
            "value": "5000"
          },
          {
            "label": "PENALTI",
            "value": "0"
          },
          {
            "label": "TOTAL",
            "value": "15000"
          }
        ],
        "account": {
          "accountName": "John Doe",
          "productName": "Gold Package",
          "accountNumber": "1234567890"
        },
        "creditCard": {
          "cardProduct": "Platinum Card",
          "cardNumber": "**** **** **** 1234",
          "amexPrincipalFlag": false,
          "binFirstDigits": "1234",
          "binLastDigits": "5678"
        },
        "referenceId": "REF123",
        "customerName": "John Doe",
        "sipNumber": "192.168.1.1",
        "referenceNumber": "REF-09876",
        "electricityTokenNumber": "TOKEN123",
        "billKey1": "123456789012",
        "billKey2": "987654321098",
        "billKey3": "543210987654"
      }
    },
    eventObject: {
      "loanDetail": {
        loanAccountNumber: "1234567890",
        accountType: "savings",
        subCat: "education",
        contractNumber: "101022403002"
      },
      "scenario": ""
    },
    pageValue: ""
  },
  onLoad() {},

  goToResetMPINPage() {
    my.call("goToResetMPINPage", {
      success: (res) => {
        my.alert({
          title: 'success',
          content: res
        });
      }
    })
  },

  sharePdf() {
    my.call("sharePdf", {
      url: "chrome-extension://oemmndcbldboiebfnladdacbdfmadadm/https://laporgub.jatengprov.go.id/storage/status-history/filet/2020-07-24/1595570001.pdf",
      success: (res) => {
        my.alert({
          title: 'success',
          content: res
        });
      }
    })
  },

  openExternalBrowserListBranch() {
    my.call("openExternalBrowserListBranch", {
      success: (res) => {
        my.alert({
          title: 'success',
          content: res
        });
      }
    })
  },

  openViewNearestBranch() {
    my.call("openViewNearestBranch", {
      success: (res) => {
        my.alert({
          title: 'success',
          content: res
        });
      }
    })
  },

  firebaseScreenView() {
    my.call("firebaseScreenView", {
      GroupId: "pfmHome",
      ScreenId: "pfmHomeScreen",
      success: (res) => {
        my.alert({
          title: 'success',
          content: res
        });
      }
    })
  },

  sendFirebaseEvent() {
    my.call("firebaseEvent", {
      data: JSON.stringify(this.data.firebase),
      success: (res) => {
        my.alert({
          title: 'success',
          content: res
        });
      },
      fail: (error) => {
        // Jumping failed
        my.alert({
          content: 'fail'
        });
      }
    })
  },

  enableSwipe() {
    my.call("enableSwipe", {
      isSwipe: false,
      success: (res) => {
        my.alert({
          title: 'success',
          content: res
        });
      }
    })
  },

  goToSplashScreen() {
    my.call("goToSplashScreen", {
      success: (res) => {
        my.alert({
          title: 'success',
          content: res
        });
      }
    })
  },

  goToConsolidateLoanDetail() {
    my.call("goToConsolidateLoanDetail", {
      data: JSON.stringify(this.data.eventObject),
      success: (res) => {
        my.alert({
          title: 'success',
          content: res
        });
      }
    })
  },

  handleChangeHomeScreen(value) {
    this.setData({
      valueHomeScreen: value
    })
  },

  goToHomeScreen() {
    my.call("goToHomeScreen", {
      tab: this.data.valueHomeScreen,
      success: (res) => {
        my.alert({
          title: 'success',
          content: res
        });
      }
    })
  },

  handleDownTime(value) {
    this.setData({
      valueDownTime: value
    })
  },

  downTimeError() {
    my.call("downTimeError", {
      isScheduled: this.data.valueDownTime,
      endTime: '2024-09-23 17:00:00.000+0700',
      success: (res) => {
        my.alert({
          title: 'success',
          content: res
        });
      }
    })
  },

  goToSavingAccountDataVerification() {
    my.call("goToSavingAccountDataVerification", {
      success: (res) => {
        my.alert({
          title: 'success',
          content: res
        });
      }
    })
  },

  goToSavingAccountProductSelection() {
    my.call("goToSavingAccountProductSelection", {
      success: (res) => {
        my.alert({
          title: 'success',
          content: res
        });
      }
    })
  },

  goToAMLBlocked() {
    my.call("goToAMLBlocked", {
      success: (res) => {
        my.alert({
          title: 'success',
          content: res
        });
      }
    })
  },

  goToEDDOccupation() {
    my.call("goToEDDOccupation", {
      success: (res) => {
        my.alert({
          title: 'success',
          content: res
        });
      }
    })
  },

  storePartnerContext() {
    my.call("storePartnerContext", {
      data: JSON.stringify(this.data.valueStorePartner),
      success: (res) => {
        my.alert({
          title: 'success',
          content: res
        });
      }
    })
  },

  goToReceiptScreen() {
    my.call("goToReceiptScreen", {
      transactionId: "T2KC4ACM0q2iRZNK8Vb3l",
      fromScreen: "pages/gather/gather",
      success: (res) => {
        my.alert({
          title: 'success',
          content: res
        });
      }
    })
  },

  storeTransactionDetailContext() {
    my.call("storeTransactionDetailContext", {
      data: JSON.stringify(this.data.dataStoreTransaction),
      paymentType: "bill_payment",
      success: (res) => {
        my.alert({
          title: 'success',
          content: res
        });
      }
    })
  },

  handleInput(e) {
    this.setData({
      pageValue: e.detail.value
    })
  },

  handleNavigateFromInsight() {
    console.info(this.data.pageValue, "handleNavigateFromInsight");
    my.call("navigateFromInsight", {
      page: this.data.pageValue,
      success: (res) => {
        console.info(res, this.data.pageValue, "<<< success handleNavigateFromInsight");
        my.alert({
          title: 'success',
          content: res
        });
      },
      fail: (err) => {
        console.info(err, this.data.pageValue, "<<< fail handleNavigateFromInsight");
        my.alert({
          title: 'fail',
          content: res
        });
      }
    })
  },

  handleNavigateFromInsightPageIn() {
    console.info(this.data.pageValue, "handleNavigateFromInsight");
    my.call("navigateFromInsight", {
      pageIn: this.data.pageValue,
      success: (res) => {
        console.info(res, this.data.pageValue, "<<< success handleNavigateFromInsight");
        my.alert({
          title: 'success',
          content: res
        });
      },
      fail: (err) => {
        console.info(err, this.data.pageValue, "<<< fail handleNavigateFromInsight");
        my.alert({
          title: 'fail',
          content: res
        });
      }
    })
  },

  handleNavigateFromInsightPageInData() {
    console.info(this.data.pageValue, "handleNavigateFromInsight");
    let pageIn = this.data.pageValue
    my.call("navigateFromInsight", {
      data: JSON.stringify(pageIn),
      success: (res) => {
        console.info(res, this.data.pageValue, "<<< success handleNavigateFromInsight");
        my.alert({
          title: 'success',
          content: res
        });
      },
      fail: (err) => {
        console.info(err, this.data.pageValue, "<<< fail handleNavigateFromInsight");
        my.alert({
          title: 'fail',
          content: res
        });
      }
    })
  },

  handleGoToFAQArticlePage() {
    console.info("<<<< handleGoToFAQArticlePage");
    my.call("goToFAQArticlePage", {
      qnaId: "WCXpVZQ5pYyJbxEfPoN0",
      success: (res) => {
        console.info(res, "<<< Success goToFAQArticlePage");
        my.alert({
          title: 'success',
          content: JSON.stringify(res)
        });
      }
    })
  },

  async handleRspCheckServiceUtils() {
    const servicesToCheck = [
      "app.config.wealth.rsp.feature.service.key",
      "app.config.wealth.rsp.creation.feature.service.key",
      "app.config.wealth.rsp.modify.feature.service.key",
      "app.config.wealth.rsp.cancel.feature.service.key"
    ];

    const featureFlags = await rspCheckService(servicesToCheck);

    console.info(featureFlags, "<<< featureFlags")

    my.alert({
      content: JSON.stringify(featureFlags)
    })


  },
  handleRspCheckService1() {
    const serviceConfigMap = {
      "app.config.wealth.rsp.feature.service.key": "rspFeatureOn",
      "app.config.wealth.rsp.creation.feature.service.key": "rspCreationFeatureOn",
      "app.config.wealth.rsp.modify.feature.service.key": "rspModifyFeatureOn",
      "app.config.wealth.rsp.cancel.feature.service.key": "rspCancelFeatureOn"
    };
    const rspServiceKeys = Object.keys(serviceConfigMap);

    console.info(rspServiceKeys, "<<< RSP rspServiceKeys button 1")
    my.call("getAppConfig", {
      keys: rspServiceKeys
    }, (configResponse) => {
      configResponse = {
        "app.config.wealth.rsp.feature.service.key": null,
        "app.config.wealth.rsp.creation.feature.service.key": "wealth-mf-rsp-creation-feature",
        "app.config.wealth.rsp.modify.feature.service.key": "wealth-mf-rsp-modify-feature",
        "app.config.wealth.rsp.cancel.feature.service.key": "wealth-mf-rsp-cancel-feature"
      }
      console.info(configResponse, "<<< RSP configResponse button 1")
      for (const configKey in configResponse) {
        if (Object.prototype.hasOwnProperty.call(configResponse, configKey)) {
          const serviceName = configResponse[configKey];
          const propertyName = serviceConfigMap[configKey];
          console.info(serviceName, "<<< RSP serviceName button 1")
          console.info(propertyName, "<<< RSP propertyName button 1")

          if (serviceName && propertyName) {
            my.call("getServiceStatus", {
              serviceName: serviceName
            }, (statusResponse) => {
              console.info(statusResponse, "<<< RSP statusResponse button 1")
              const status = statusResponse === true || statusResponse === 'true';

              console.info(propertyName, "propertyName status button 1");
              console.info(status, "status status button 1");

            });
          }
        }
      }
    });
  },

  handleRspCheckService2() {
    let {
      rspFeatureOn,
      rspCreationFeatureOn,
      rspModifyFeatureOn,
      rspCancelFeatureOn
    } = ""

    const serviceConfigMap = {
      "app.config.wealth.rsp.feature.service.key": "rspFeatureOn",
      "app.config.wealth.rsp.creation.feature.service.key": "rspCreationFeatureOn",
      "app.config.wealth.rsp.modify.feature.service.key": "rspModifyFeatureOn",
      "app.config.wealth.rsp.cancel.feature.service.key": "rspCancelFeatureOn"
    };
    const rspServiceKeys = Object.keys(serviceConfigMap);

    console.info(rspServiceKeys, "rspServiceKeys status button 2");
    my.call("getAppConfig", {
      keys: rspServiceKeys
    }, (configResponse) => {
      configResponse = {
        "app.config.wealth.rsp.feature.service.key": null,
        "app.config.wealth.rsp.creation.feature.service.key": "wealth-mf-rsp-creation-feature",
        "app.config.wealth.rsp.modify.feature.service.key": "wealth-mf-rsp-modify-feature",
        "app.config.wealth.rsp.cancel.feature.service.key": "wealth-mf-rsp-cancel-feature"
      }

      rspFeatureOn = configResponse["app.config.wealth.rsp.feature.service.key"]
      rspCreationFeatureOn = configResponse["app.config.wealth.rsp.creation.feature.service.key"]
      rspModifyFeatureOn = configResponse["app.config.wealth.rsp.modify.feature.service.key"]
      rspCancelFeatureOn = configResponse["app.config.wealth.rsp.cancel.feature.service.key"]

      console.info(rspFeatureOn, "<<< configResponse rspFeatureOn");
      console.info(rspCreationFeatureOn, "<<< configResponse rspCreationFeatureOn");
      console.info(rspModifyFeatureOn, "<<< configResponse rspModifyFeatureOn");
      console.info(rspCancelFeatureOn, "<<< configResponse rspCancelFeatureOn");

      my.call("getServiceStatus", {
        serviceName: "wealth-mf-rsp-feature"
      }, (statusResponse) => {
        console.info(statusResponse, "<<< RSP statusResponse button 2 wealth-mf-rsp-feature")
        const status = statusResponse === true || statusResponse === 'true';
        console.info(status, "status button 2 wealth-mf-rsp-feature");
      });

      my.call("getServiceStatus", {
        serviceName: rspFeatureOn
      }, (statusResponse) => {
        console.info(statusResponse, "<<< RSP statusResponse button 2 rspFeatureOn")
        const status = statusResponse === true || statusResponse === 'true';
        console.info(status, "status button 2 rspFeatureOn");
      });

      my.call("getServiceStatus", {
        serviceName: rspCreationFeatureOn
      }, (statusResponse) => {
        console.info(statusResponse, "<<< RSP statusResponse button 2 rspCreationFeatureOn")
        const status = statusResponse === true || statusResponse === 'true';
        console.info(status, "status button 2 rspCreationFeatureOn");
      });

      my.call("getServiceStatus", {
        serviceName: rspModifyFeatureOn
      }, (statusResponse) => {
        console.info(statusResponse, "<<< RSP statusResponse button 2 rspModifyFeatureOn")
        const status = statusResponse === true || statusResponse === 'true';
        console.info(status, "status button 2 rspModifyFeatureOn");
      });

      my.call("getServiceStatus", {
        serviceName: rspCancelFeatureOn
      }, (statusResponse) => {
        console.info(statusResponse, "<<< RSP statusResponse button 2 rspCancelFeatureOn")
        const status = statusResponse === true || statusResponse === 'true';
        console.info(status, "status button 2 rspCancelFeatureOn");
      });

    })
  }
});
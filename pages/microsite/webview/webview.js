Page({
  data: {
    urlMicrosite: ""
  },
  onLoad() {
    this.setData({
      visible: false,
      urlMicrosite: "https://mpaas.vercel.app/uploadmpaas.html"
    })
    let partnerMenu = {
      "params": [{
          "queryParam": "customerName",
          "id": "HQ6QnFQ2RNNtTgBbhYcfX",
          "lifestylePartnerMenuId": "jM3p1F8fXAQV9zRr4ek6uIDcb2X7QdCKxbo2",
          "valueMapping": "kaiCustomerNameLabel",
          "status": false,
          "queryParamType": "response",
          "defaultValue": null
        },
        {
          "queryParam": "BID",
          "id": "KKYUH3RHx92pbw3NAkCbC",
          "lifestylePartnerMenuId": "jM3p1F8fXAQV9zRr4ek6uIDcb2X7QdCKxbo2",
          "valueMapping": "billerNumber",
          "status": false,
          "queryParamType": "redirect",
          "defaultValue": null
        },
        {
          "queryParam": "customerSeat",
          "id": "QxJiDWpCBWVpVTTZyUQy9",
          "lifestylePartnerMenuId": "jM3p1F8fXAQV9zRr4ek6uIDcb2X7QdCKxbo2",
          "valueMapping": "kaiCustomerSeatLabel",
          "status": false,
          "queryParamType": "response",
          "defaultValue": null
        },
        {
          "queryParam": "bookingCode",
          "id": "hMT8LPDztQpjRAt8xNxUD",
          "lifestylePartnerMenuId": "jM3p1F8fXAQV9zRr4ek6uIDcb2X7QdCKxbo2",
          "valueMapping": "kaiBookingCodeLabel",
          "status": false,
          "queryParamType": "response",
          "defaultValue": null
        },
        {
          "queryParam": "transportName",
          "id": "mW2F2GX2w9X6YR_EkxLLD",
          "lifestylePartnerMenuId": "jM3p1F8fXAQV9zRr4ek6uIDcb2X7QdCKxbo2",
          "valueMapping": "kaiTransportNameLabel",
          "status": false,
          "queryParamType": "response",
          "defaultValue": null
        },
        {
          "queryParam": "transportOriginName",
          "id": "tFb3rLJUUJjZQatiDU2Er",
          "lifestylePartnerMenuId": "jM3p1F8fXAQV9zRr4ek6uIDcb2X7QdCKxbo2",
          "valueMapping": "kaiTransportOriginNameLabel",
          "status": false,
          "queryParamType": "response",
          "defaultValue": null
        },
        {
          "queryParam": "transportDestName",
          "id": "2MTEq7cMQGVR7Tx3EFC68",
          "lifestylePartnerMenuId": "jM3p1F8fXAQV9zRr4ek6uIDcb2X7QdCKxbo2",
          "valueMapping": "kaiTransportDestNameLabel",
          "status": false,
          "queryParamType": "response",
          "defaultValue": null
        },
        {
          "queryParam": "tripDate",
          "id": "49pPKBLZx6G8fdDiHmpRq",
          "lifestylePartnerMenuId": "jM3p1F8fXAQV9zRr4ek6uIDcb2X7QdCKxbo2",
          "valueMapping": "kaiTripDateLabel",
          "status": false,
          "queryParamType": "response",
          "defaultValue": null
        },
        {
          "queryParam": "tripTime",
          "id": "6HzazMkmr6jY3pGfmYKZQ",
          "lifestylePartnerMenuId": "jM3p1F8fXAQV9zRr4ek6uIDcb2X7QdCKxbo2",
          "valueMapping": "kaiTripTimeLabel",
          "status": false,
          "queryParamType": "response",
          "defaultValue": null
        }
      ],
      "id": "jM3p1F8fXAQV9zRr4ek6uIDcb2X7QdCKxbo2",
      "virtualAccountBillersCid": null,
      "amount": "**5000",
      "virtualAccountDetail": null,
      "screenId": "exploreScreen",
      "categoryDisplay": "Transportasi",
      "description": "lifestylePartnerKaiDescription",
      "paymentType": "BILL_PAYMENT",
      "category": "transportasi",
      "discount": 0,
      "title": "lifestylePartnerKaiTitle",
      "isDiscount": false,
      "displayImage": "image_link",
      "partnerName": "RINTIS",
      "transactionType": "kai",
      "partnerAlias": "RINTIS",
      "isUrlMicrositeStatic": false,
      "partnerId": "1A221321",
      "isActive": true,
      "position": 3,
      "transactionTypeDisplay": "kai",
      "boBillerUbpCompanyCode": "0050000007",
      "detailBoBiller": {
        "billKey2MaxAmount": 0,
        "billerCode": "0106",
        "billKey3MinLength": 0,
        "billKey2MinLength": 0,
        "billKey1MinLength": 1,
        "billKey3MaxLength": 0,
        "billKeyCount": 1,
        "isSpecialhandling": false,
        "specialHandlingType": null,
        "prefixCode": null,
        "billerAbbreviation": "KAI",
        "paymentType": "1",
        "errorCodeMappingFlag": "Error Code Mapping",
        "hasSubRegionFlag": false,
        "regionCode": "0000",
        "billKey1MinAmount": 1,
        "ubpCompanyCode": "0050000007",
        "adminFee": 0,
        "billKey2MaxLength": 0,
        "billKey1MaxLength": 13,
        "billKey2MinAmount": 0,
        "categoryId": "zDe8pgfzM_bVJYE4Ehb2H",
        "billKeyLabel2": null,
        "ccServiceFee": null,
        "isCcSupported": false,
        "isActive": true,
        "billKey3MaxAmount": 0,
        "billKeyLabel3": null,
        "billerName": "KAI",
        "billKeyLabel1": "Kode pembayaran",
        "billKey1MaxAmount": 1000000,
        "billKey3MinAmount": 0,
        "amountAsBillKey": 10000
      },
      "urlMicrosite": "http://kai.com",
      "icon": "icon_link",
      "urlRedirect": "https://lifestyle.bni.co.id"
    }

    const dataToStore = {
      partnerId: partnerMenu.partnerId,
      partnerName: partnerMenu.partnerName,
      partnerAlias: partnerMenu.partnerAlias,
      paymentType: partnerMenu.paymentType,
      transactionId: "",
      screenId: partnerMenu.screenId,
      urlRedirect: partnerMenu.urlRedirect,
      urlMicrosite: partnerMenu.urlMicrosite,
      params: partnerMenu.params,
      icon: partnerMenu.icon,
      ubpCompanyCode: partnerMenu.boBillerUbpCompanyCode,
    };

    my.call("storePartnerContext", {
      data: JSON.stringify(
        dataToStore
      )
    }, () => {});

    my.on('nativeToTiny', (resp) => {
      try {
        const responseNative = parseNestedJSON(resp.data.data);
        console.info(responseNative, "<<< nativeToTiny responseNative")
        let dataContext = matchParamsWithQuery(responseNative)
        const data = {
          billerNumber: dataContext.billerNumber,
          ubpCompanyCode: responseNative.partnerData.ubpCompanyCode,
          icon: partnerMenu.icon
        }
        console.info(data, "<<< nativeToTiny data")
        my.call("showAppBar", {
          isShow: false,
          title: ""
        }, () => {});

        my.redirectTo({
          url: `/pages/microsite/gather/gather?data=${JSON.stringify(data)}`
        })
      } catch (err) {
        console.info(err, "Error nativeToTiny")
      }
    });


    my.on("tinyToNative", (res) => {
      try {
        console.info("SUCCESS_tinyToNative" + JSON.stringify(res))
        this.setData({
          visible: true,
          res: "SUCCESS_" + JSON.stringify(res)
        })
      } catch (err) {
        console.info("ERR_tinyToNative" + JSON.stringify(err))
        this.setData({
          visible: true,
          res: "ERROR_" + JSON.stringify(res)
        })
      }
    });
    // batas
  }

});
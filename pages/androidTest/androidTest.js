Page({
  data: {
    popupVisible: false
  },
  onLoad() {
    this.setData({
      devicePlatform: getApp().globalData.nativeData.clientPlatform
    })
  },
  onCanvasReady() {
    my.createSelectorQuery().select('#canvas').node().exec((res) => {
      const canvas = res[0].node
      const ctx = canvas.getContext('2d')

      const img = canvas.createImage()
      img.src = 'https://mdn.alipayobjects.com/huamei_esgcm9/afts/img/A*vlKfQKOGboQAAAAAAAAAAAAADsaJAQ/original'
      img.onload = () => {
        ctx.drawImage(img, 10, 10, 100, 100)
      }
    })
  },

  onFocusCustom(e) {
    const {
      inputSection
    } = e.currentTarget.dataset
    const newFocusCustom = this.data.focusCustom
    newFocusCustom[inputSection] = true

    this.setData({
      focusCustom: newFocusCustom
    })
  },
  onBlurCustom(e) {
    const {
      inputSection
    } = e.currentTarget.dataset
    const newFocusCustom = this.data.focusCustom
    newFocusCustom[inputSection] = false

    this.setData({
      focusCustom: newFocusCustom
    })
  },

  onInputSalesCode(e) {
    const value = String(e.detail.value).trim()
    const regex = new RegExp(this.data.salesCodeInput.regexAlphanumeric);
    const maxLength = Number(this.data.salesCodeInput.salesCodeMaxChar);
    const lang = this.data.lang;

    this.setData({
      "gatherData.salesCode": value
    });

    if (value.length === maxLength) {
      if (regex.test(value)) {
        this.setData({
          "salesCodeInput.error": false,
          "salesCodeInput.errorCaption": "",
          "salesCodeInput.buttonEnabled": true
        });
      } else {
        this.setData({
          "salesCodeInput.error": true,
          "salesCodeInput.errorCaption": lang.digitalLoanApplianceGatherScreenErrorDescriptionLabel
        });
      }
    } else {
      this.setData({
        "salesCodeInput.error": false,
        "salesCodeInput.errorCaption": "",
        "salesCodeInput.buttonEnabled": false
      });
    }
    this.checkDataHasChanged()
  },
  closeInputSalesCode() {
    this.setData({
      "salesCodeInput.popupVisible": false
    })
  },
  showSalesCodePopup() {
    firebaseScreenView("digital_loan_appliance_gather", "digitalLoanOverlayKodeReferralScreen")
    this.setData({
      "salesCodeInput.popupVisible": true,
      "loanAmountInput.closeMaskStatus": true
    })
  },
  handleInputSalesCode() {
    const groupId = "digital_loan_appliance_gather"
    let event = {
      name: "AppClick",
      value: "cta_button_simpan_kode_referral"
    }
    firebaseEvent(groupId, event)
    this.setData({
      "salesCodeInput.saveSalesCodeStatus": "SUCCESS",
      "salesCodeInput.popupVisible": false,
      "salesCodeInput.isSnackbarVisible": true
    })
    setTimeout(() => {
      this.setData({
        "salesCodeInput.isSnackbarVisible": false
      });
    }, 2000);
  },
  onClearSalesCode() {
    this.setData({
      "gatherData.salesCode": "",
      "salesCodeInput.error": false,
      "salesCodeInput.errorCaption": "",
      "salesCodeInput.buttonEnabled": false
    })
    this.checkDataHasChanged()
  },

  onOpenPopup(){
    this.setData({
      popupVisible: true
    })
  },
  onClosePopup(){
    this.setData({
      popupVisible: false
    })
  }
});
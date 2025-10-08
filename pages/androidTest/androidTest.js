Page({
  data: {
    popupVisible: false,
    newInputData: '', 
    
  },
  onLoad() {
    this.setData({
      devicePlatform: getApp().globalData.nativeData.clientPlatform
    })
  },
  
  onNewInput(e) {
    this.setData({
      newInputData: e.detail.value
    });
  },

  onEnterPressed() {
    const inputValue = this.data.newInputData;
    if (inputValue) {
      my.navigateTo({
        url: `/pages/webview-link/webview-link?data=${inputValue}`,
        success: (res) => {
          console.log('Navigasi berhasil', res);
        },
        fail: (err) => {
          console.error('Navigasi gagal, pastikan halaman tujuan ada:', err);
          my.alert({ content: 'Gagal pindah halaman. Cek path tujuan.' });
        }
      });
      
      this.setData({
        newInputData: ''
      });
    } else {
      my.alert({ content: 'Mohon masukkan data sebelum melanjutkan.' });
    }
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
    const regex = new RegExp(this.data.salesCodeInput.regexAlphanumeric || /^[a-zA-Z0-9]+$/);
    const maxLength = Number(this.data.salesCodeInput.salesCodeMaxChar || 10);
    const lang = this.data.lang || {};

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
          "salesCodeInput.errorCaption": lang.digitalLoanApplianceGatherScreenErrorDescriptionLabel || "Error"
        });
      }
    } else {
      this.setData({
        "salesCodeInput.error": false,
        "salesCodeInput.errorCaption": "",
        "salesCodeInput.buttonEnabled": false
      });
    }
  },
  closeInputSalesCode() {
    this.setData({
      "salesCodeInput.popupVisible": false
    })
  },
  showSalesCodePopup() {
    this.setData({
      "salesCodeInput.popupVisible": true,
      "loanAmountInput.closeMaskStatus": true
    })
  },
  handleInputSalesCode() {
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
  },

  onOpenPopup() {
    this.setData({
      popupVisible: true
    })
  },
  onClosePopup() {
    this.setData({
      popupVisible: false
    })
  }
});
Page({
  data: {
    value1: "",
    value2: "Input",
    value3: "Input Field",
    value4: "Input Field",
    value5: "Input Field",
    value6: "",
    value7: "Input Field",
    value8: "Input Field",
    value9: "Input Field",
    value10: "Input Field",
    value11: "",
    value12: "",
    value13: 0,
    formattedValue13: "",
    value14: "",
    error: false,
    value15: 0,
    value16: 0,
    formattedValue15: "0",
    formattedValue16: "0",
    success: false,
    firstEncounter: false,
    minBuy: 100000,
    formattedMinBuy: "",
    error13: false,
    error15: false,
    error16: false,
    birthDate: {
      month: "",
      year: "",
      day:""
    },
    birthDateTitle: {
      day: {
        value : "Tanggal",
        id : "check satu"
      },
      month: {
        value : "Bulan",
        id : "check dua"
      },
      year: {
        value : "Tahun",
        id : "check tiga"
      }
    }
  },
  onLoad() {
    this.setData({
      formattedMinBuy: this.onFormattedValue(this.data.minBuy)
    })
    this.setData({
      formattedValue13: this.onFormattedValue(this.data.value13)
    })
  },
  onClear() {
    this.setData({
      value8: ""
    })
  },
  onClear2() {
    this.setData({
      value10: ""
    })
  },
  onClear3() {
    this.setData({
      value14: ""
    })
  },
  onClear15() {
    this.setData({
      formattedValue15: "0",
      error15: false
    })
  },

  onFocusStatus(value) {
    this.setData({
      inputFocusStatus: value
    })
    if (!this.data.firstEncounter) {
      this.setData({
        firstEncounter: value
      })
      this.setData({
        formattedValue13: ""
      })
    }
  },
  onFocusStatus15(value) {
    this.setData({
      inputFocusStatus: value
    })
    if (value) {
      if (this.data.formattedValue15 === '0') {
        this.setData({
          formattedValue15: ''
        })
      }
    } else {
      if (this.data.formattedValue15 === '') {
        this.setData({
          formattedValue15: '0'
        })
      }
    }
  },
  onFocusStatus16(value) {
    this.setData({
      inputFocusStatus: value,
    })
    if (value) {
      if (this.data.formattedValue16 === '0') {
        this.setData({
          formattedValue16: ''
        })
      }
    } else {
      if (this.data.formattedValue16 === '') {
        this.setData({
          formattedValue16: '0'
        })
      }
    }
  },
  onAlert() {
    my.alert({
      title: "Profile",
      content: "this is people"
    })
  },
  onChange1(value) {
    if (value.length >= 10) {
      this.setData({
        error: true
      })
    } else if (value == "mpaas") {
      this.setData({
        success: true
      })
    } else {
      this.setData({
        error: false
      })
      this.setData({
        success: false
      })
    }
    this.setData({
      value1: value
    })
  },
  onChange2(value) {
    this.setData({
      value2: value
    })
  },
  onChange3(value) {
    this.setData({
      value3: value
    })
  },
  onChange4(value) {
    this.setData({
      value4: value
    })
  },
  onChange5(value) {
    this.setData({
      value5: value
    })
  },
  onChange6(value) {
    this.setData({
      value6: value
    })
  },
  onChange7(value) {
    this.setData({
      value7: value
    })
  },
  onChange8(value) {
    this.setData({
      value8: value
    })
  },
  onChange9(value) {
    this.setData({
      value9: value
    })
  },
  onChange10(value) {
    this.setData({
      value10: value
    })
  },
  onChange11(value) {
    this.setData({
      value11: value
    })
  },
  onChange12(value) {
    this.setData({
      value12: value
    })
  },
  onChange13(value) {
    let plainNumber = value.replace(/\./g, '');
    let result = parseInt(plainNumber, 10);

    if (result < this.data.minBuy) {
      this.setData({
        error13: true
      })
    } else {
      this.setData({
        error13: false
      })
    }

    if (!isNaN(result)) {
      this.setData({
        value13: result
      })
      this.setData({
        formattedValue13: this.onFormattedValue(this.data.value13)
      })
    } else {

      this.setData({
        value13: 0
      })
      this.setData({
        formattedValue13: ""
      })
    }
  },
  onChange14(value) {
    this.setData({
      value14: value
    })
  },
  onChange15(value) {
    let plainNumber = value.replace(/\./g, '');
    let result = parseInt(plainNumber, 10);

    if (result < this.data.minBuy) {
      this.setData({
        error15: true
      })
    } else {
      this.setData({
        error15: false
      })
    }

    if (!isNaN(result)) {
      this.setData({
        value15: result
      })
      this.setData({
        formattedValue15: this.onFormattedValue(this.data.value15)
      })
    } else {
      this.setData({
        value15: 0
      })
      this.setData({
        formattedValue15: ""
      })
    }
  },
  onChange16(value) {
    let plainNumber = value.replace(/\,/g, ''); // eslint-disable-line
    let result = parseInt(plainNumber, 10);

    if (result < this.data.minBuy) {
      this.setData({
        error16: true
      })
    } else {
      this.setData({
        error16: false
      })
    }

    if (!isNaN(result)) {
      this.setData({
        value16: result
      })
      this.setData({
        formattedValue16: this.onFormattedValue16(this.data.value16)
      })
    } else {
      this.setData({
        value16: 0
      })
      this.setData({
        formattedValue16: ""
      })
    }
  },
  onFormattedValue(value) {
    return value.toLocaleString('id-ID')
  },
  onFormattedValue16(value) {
    return value.toLocaleString('en-US')
  },

  onChange17(e) {
    const birthDateFocusStatus = this.data.birthDateFocusStatus;
    if ((birthDateFocusStatus === 'day' || birthDateFocusStatus === 'month') && e.length > 2) {
      return;
    }
    this.setData({
      birthDate: {
        ...this.data.birthDate,
        [birthDateFocusStatus]: e
      }
    });
    if (birthDateFocusStatus === 'day' && this.data.birthDate.day.length >= 2) {
      this.setData({
        birthDateFocusStatus: 'month'
      });
    } else if (birthDateFocusStatus === 'month' && this.data.birthDate.month.length >= 2) {
      this.setData({
        birthDateFocusStatus: 'year'
      });
    } 
    if (birthDateFocusStatus === 'year' && this.data.birthDate.year.length >= 4) {
      this.setData({
        birthDateFocusStatus: ''
      });
    }
  },
  onFocusValue17(e) {
    this.setData({
      birthDateFocusStatus: e
    })
  },
  onCloseKeyboard(){
  },
  onConfirmKeyboardSelect() {
    my.hideKeyboard()
  },
});
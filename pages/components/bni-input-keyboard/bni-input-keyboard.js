Page({
  data: {
    formattedMinBuy: "",
    minBuy: 100000,
    formattedValue: "",
    formattedValue3: "",
    error: false,
    error2: false
  },
  onLoad() {
    this.setData({
      formattedMinBuy: this.data.minBuy.toLocaleString('id-ID'),
      formattedValue1: (100000).toLocaleString('id-ID'),
    })
  },

  onChange(value) {
    const currencyType = this.data.currencyType
    let plainNumber = value;
    let result;

    if (currencyType === 'USD') {
      plainNumber = value.replace(/[^\d.]/g, '');

      const parts = plainNumber.split('.');
      if (parts.length > 2) {
        plainNumber = parts[0] + '.' + parts.slice(1).join('');
      }

      result = parseFloat(plainNumber);
    } else {
      plainNumber = value.replace(/\./g, '');
      result = parseInt(plainNumber, 10);
    }

    if (result < this.data.minBuy || isNaN(result)) {
      this.setData({
        error: true
      });
    } else {
      this.setData({
        error: false
      });
    }

    let formattedValue = "";
    if (!isNaN(result)) {
      const [intPart, decimalPart] = plainNumber.split('.');
      if (currencyType === 'USD') {
        if (plainNumber.includes('.')) {
          if (decimalPart === undefined) {
            formattedValue = parseInt(intPart || 0, 10).toLocaleString('en-US') + '.';
          } else {
            const cleanDecimal = decimalPart.slice(0, 2);
            formattedValue = parseInt(intPart || 0, 10).toLocaleString('en-US') + '.' + cleanDecimal;
          }
        } else {
          formattedValue = result.toLocaleString('en-US');
        }
      } else {
        formattedValue = result.toLocaleString('id-ID');
      }
    }

    this.setData({
      value15: !isNaN(result) ? result : 0
    });
    this.setData({
      formattedValue: formattedValue
    });
  },


  onChangeUSD(value) {
    const currencyType = 'USD'
    let plainNumber = value;
    let result;

    if (currencyType === 'USD') {
      plainNumber = value.replace(/[^\d.]/g, '');

      const parts = plainNumber.split('.');
      if (parts.length > 2) {
        plainNumber = parts[0] + '.' + parts.slice(1).join('');
      }

      result = parseFloat(plainNumber);
    } else {
      plainNumber = value.replace(/\./g, '');
      result = parseInt(plainNumber, 10);
    }

    if (result < this.data.minBuy || isNaN(result)) {
      this.setData({
        error: true
      });
    } else {
      this.setData({
        error: false
      });
    }

    let formattedValue = "";
    if (!isNaN(result)) {
      const [intPart, decimalPart] = plainNumber.split('.');
      if (currencyType === 'USD') {
        if (plainNumber.includes('.')) {
          if (decimalPart === undefined) {
            formattedValue = parseInt(intPart || 0, 10).toLocaleString('en-US') + '.';
          } else {
            const cleanDecimal = decimalPart.slice(0, 2);
            formattedValue = parseInt(intPart || 0, 10).toLocaleString('en-US') + '.' + cleanDecimal;
          }
        } else {
          formattedValue = result.toLocaleString('en-US');
        }
      } else {
        formattedValue = result.toLocaleString('id-ID');
      }
    }

    this.setData({
      value15: !isNaN(result) ? result : 0
    });
    this.setData({
      formattedValue: formattedValue
    });
  },



  onChange2(value) {
    let plainNumber = value.replace(/\./g, '');
    let result = parseInt(plainNumber, 10);

    if (result < this.data.minBuy) {
      this.setData({
        error2: true
      })
    } else {
      this.setData({
        error2: false
      })
    }

    if (!isNaN(result)) {
      this.setData({
        value25: result
      })
      this.setData({
        formattedValue2: (this.data.value25).toLocaleString('id-ID')
      })
    } else {
      this.setData({
        value25: 0
      })
      this.setData({
        formattedValue2: ""
      })
    }
  },
  onClose() {
    this.setData({
      formattedValue1: (1000000).toLocaleString('id-ID')
    })
  },

  onClose2() {
    this.setData({
      formattedValue2: (1000000).toLocaleString('id-ID')
    })
  },
  onClear() {
    this.setData({
      formattedValue: "",
      error: false
    })
  },

  onClear2() {
    this.setData({
      formattedValue2: "",
      error: false
    })
  },
  onPaste() {
    my.getClipboard({
      success: ({
        text
      }) => {
        this.setData({
          formattedValue: parseInt(text, 10).toLocaleString('id-ID'),
        });
      },
    });
  },

  onPaste2() {
    my.getClipboard({
      success: ({
        text
      }) => {
        this.setData({
          formattedValue2: parseInt(text, 10).toLocaleString('id-ID'),
        });
      },
    });
  },

  onChange1(value) {
    let plainNumber = value.replace(/\./g, '');
    let result = parseInt(plainNumber, 10);

    if (result < this.data.minBuy) {
      this.setData({
        error1: true
      })
    } else {
      this.setData({
        error1: false,
        success1: true
      })
    }

    if (!isNaN(result)) {
      this.setData({
        value1: result
      })
      this.setData({
        formattedValue1: (this.data.value1).toLocaleString('id-ID')
      })
    } else {
      this.setData({
        value1: 0
      })
      this.setData({
        formattedValue1: ""
      })
    }
  },
  onClear1() {
    this.setData({
      error1: false,
      value1: "",
      formattedValue1: ""
    })
  },
  onPaste1() {
    my.getClipboard({
      success: ({
        text
      }) => {
        this.setData({
          value1: text,
          formattedValue1: parseInt(text, 10).toLocaleString('id-ID')
        });
      },
    });
  },
  onFocus1() {
    // my.createSelectorQuery().select('#input1').scrollOffset().exec(() => {
    //   my.pageScrollTo({
    //     scrollTop: 400,
    //     duration: 200,
    //   });
    // })
    this.setData({
      KeyboardVisible: true
    })
  },



});
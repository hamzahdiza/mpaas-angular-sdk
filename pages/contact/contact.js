// API-DEMO page/API/contact/contact.js
Page({
  data: {
    contact: ""
  },
  choosePhoneContact() {
    my.choosePhoneContact({
      success: (res) => {
        // my.alert({
        //   content: 'choosePhoneContact response: ' + JSON.stringify(res)
        // });
        // console.info('choosePhoneContact response: ' + JSON.stringify(res))
        this.setData({
          contact: JSON.stringify(res)
        })
      },
      fail: (res) => {
        // my.alert({
        //   // content: 'choosePhoneContact response: ' + JSON.stringify(res)
        // });
        this.setData({
          contact: "ERROR Choose Phone Contact"
        })
      },
    });
  },
  chooseContact() {
    my.chooseContact({
      chooseType: 'multi', // multi-select mode
      includeMe: true, // include yourself
      includeMobileContactMode: 'known', // only include contacts in the two-way mobile phone address book, that is, contacts whose phone numbers are stored in both mobile phone address books
      multiChooseMax: 3, // up to three contacts can be selected
      multiChooseMaxTips: 'Exceeded the maximum number of people selected',
      success: (res) => {
        // my.alert({
        //   content: 'chooseContact : ' + JSON.stringify(res)
        // });
        this.setData({
          contact: JSON.stringify(res)
        })
      },
      fail: (res) => {
        // my.alert({
        //   content: 'chooseContact : ' + JSON.stringify(res)
        // });
        this.setData({
          contact: "ERROR Choose Contact"
        })
      },
    });
  },
});
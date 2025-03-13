// API-DEMO page/API/contact/contact.js
Page({
  data: {},
  choosePhoneContact() {
    my.choosePhoneContact({
      success: (res) => {
        // my.alert({
        //   content: 'choosePhoneContact response: ' + JSON.stringify(res)
        // });
        console.info('choosePhoneContact response: ' + JSON.stringify(res))
      },
      fail: (res) => {
        // my.alert({
        //   // content: 'choosePhoneContact response: ' + JSON.stringify(res)
        // });
        console.info('choosePhoneContact response: ' + JSON.stringify(res))
      },
    });
  },
  chooseAlipayContact() {
    my.chooseAlipayContact({
      count: 2,
      success: (res) => {
        // my.alert({
        //   content: 'chooseAlipayContact response: ' + JSON.stringify(res)
        // });
        console.info('chooseAlipayContact response: ' + JSON.stringify(res))
      },
      fail: (res) => {
        // my.alert({
        //   content: 'chooseAlipayContact response: ' + JSON.stringify(res)
        // });
        console.info('chooseAlipayContact response: ' + JSON.stringify(res))
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
        console.info('chooseContact : ' + JSON.stringify(res))
      },
      fail: (res) => {
        // my.alert({
        //   content: 'chooseContact : ' + JSON.stringify(res)
        // });
        console.info('chooseContact : ' + JSON.stringify(res))
      },
    });
  },
});
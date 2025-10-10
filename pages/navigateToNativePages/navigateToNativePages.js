Page({
  data: {},
  onLoad() {},
  onTap1() {
    my.call("navigateToNativePages", {
      data: JSON.stringify({
        path : "consolidate-loan-details",
        params : {
        loanDetail: {
          loanAccountNumber: '9999999999',
          accountType: 'KTA',
          subCat: 'KTA',
        },
        scenario: "internal-loan"
      }
      })
    })
  },
  onTap2() {
    my.call("navigateToNativePages", {
      data: JSON.stringify({
        path : "consolidate-loan-details",
        params : {
        loanDetail: {
          loanAccountNumber: '9999999999',
          accountType: 'KTA',
          subCat: 'KTA',
          contractNumber: ""
        },
        scenario: "internal-loan"
      }
      })
    })
  },
  onTap3() {
    my.call("navigateToNativePages", {
      data: JSON.stringify({
        path : "consolidate-loan-details",
        params : {
        loanDetail: {
          loanAccountNumber: '9999999999',
          accountType: 'KTA',
          subCat: 'KTA',
          contractNumber: "ada lur"
        },
        scenario: "internal-loan"
      }
      })
    })
  },
  onTap4() {
    my.call("navigateToNativePages", {
      data: JSON.stringify({
        path : "disbursement-consolidate-loan-details",
        params : {
        loanDetail: {
          loanAccountNumber: '9999999999',
          accountType: 'KTA',
          subCat: 'KTA',
        },
        scenario: "internal-loan"
      }
      })
    })
  },
  onTap5() {
    my.call("navigateToNativePages", {
      data: JSON.stringify({
        path : "disbursement-consolidate-loan-details",
        params : {
        loanDetail: {
          loanAccountNumber: '9999999999',
          accountType: 'KTA',
          subCat: 'KTA',
          contractNumber: ""
        },
        scenario: "internal-loan"
      }
      })
    })
  },
  onTap6() {
    my.call("navigateToNativePages", {
      data: JSON.stringify({
        path : "disbursement-consolidate-loan-details",
        params : {
        loanDetail: {
          loanAccountNumber: '9999999999',
          accountType: 'KTA',
          subCat: 'KTA',
          contractNumber: "check"
        },
        scenario: "internal-loan"
      }
      })
    })
  },
});

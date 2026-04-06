Page({
  data: {},
  onLoad() {},
  onTap1() {
    my.call("navigateToNativePages", {
      data: JSON.stringify({
        path: "casa-list-account",
        params: {
          "eligiblePrioritySegment": "EMERALD"
        }
      })
    })
  },
  onTap2() {
    my.call("navigateToNativePages", {
      data: JSON.stringify({
        path: "limit-setting-landing"
      })
    })
  },
  onTap3() {
    my.call("navigateToNativePages", {
      data: JSON.stringify({
        path: "consolidate-loan-details",
        params: {
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
        path: "debit-card-detail",
        params: {
          "accountNumber": "1000649945",
          "cardNumber": "5264222591922240"
        }
      })
    })
  },
  onTap5() {
    my.call("navigateToNativePages", {
      data: JSON.stringify({
        path: "credit-card-detail",
        params: {
          "cardNumber": "Ogz9pBeDB4Y9N4UT+5Bhr3XTbwr38IzmcSxK2/zh6I0="
        }
      })
    })
  },
  onTap6() {
    my.call("navigateToNativePages", {
      data: JSON.stringify({
        path: "disbursement-consolidate-loan-details",
        params: {
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
  onTap7() {
    my.call("navigateToNativePages", {
      data: JSON.stringify({
        path: "debit-card-checking-behavior",
        params: {
          "accountNumber": "1000649945",
          "cardNumber": "5264222591922240",
          "cardTypeSelected": "PHYSICAL_CARD",
          "scenario": "emerald-landing-request-debit"
        }
      })
    })
  },
  onTap8() {
    console.info({data:JSON.stringify({
      path: "transaction-list-screen",
      params: {
        "accountNumber": "1002111917"
      }
    })},'########################### mpaas-debug_navigateToNativePages_transaction-list-screen ###########################')
    my.call("navigateToNativePages", {
      data: JSON.stringify({
        path: "transaction-list-screen",
        params: {
          "accountNumber": "1002111917"
        }
      })
    }, () => {})
  },
});
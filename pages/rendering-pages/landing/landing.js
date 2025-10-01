import {
  getRspList,
} from "/public/api";
import {
  currencyFormat,
  unitFormat,
  percentageFormat
} from "/utils/currency-util";
import {
  dateFormat
} from "/utils/date-util";
import {
  customNavigateTo
} from "/utils/route-util";
import {
  typeMap
} from "/utils/field-util";
import getNetWork from "/utils/getNetWork";
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import advanced from "dayjs/plugin/advancedFormat"
import {
  firebaseEvent,
  firebaseScreenView
} from "/utils/firebase";
import generalError from "/utils/generalError";
import languagePacks from "../../../public/language-pack.json";

dayjs.extend(duration);
dayjs.extend(timezone)
dayjs.extend(utc)
dayjs.extend(advanced)



/* JShield-obfus:enable */
Page({
  data: {
    isLoading: Boolean(true), // Loading or not
    isLodingTriggered: Boolean(false),
    failureLoad: Boolean(false), // Loading failed or not
    isTop: Boolean(false),
    duration: Number(300),
    isLoading: Boolean(false)
  },

  onShow() {
    my.pageScrollTo({
      scrollTop: 0
    })
    my.call("enableSwipe", {
      isSwipe: !this.data.showSelectAccountModal
    }, () => {})
    getNetWork()
  },
  async onLoad() {
    setTimeout(() => {
      const {
        statusBarHeight,
        accountData,
        nativeData
      } = getApp().globalData;

      console.log(nativeData, "<<< nativeData");

      let language = getApp().globalData.nativeData.language;
      const languagePackObj = getApp().globalData.languagePack;
      const lang = languagePackObj && Object.keys(languagePackObj).length > 200 ? getApp().globalData.languagePack : languagePacks.languagePack[language]
      console.log(language, "<<<< language");
      console.log(languagePackObj, "<<<< languagePackObj");
      console.log(lang, "<<<< LANG");

      
    }, 300)
    await this.getDataForRspList()

  },

  getDataForRspList() {
    return getRspList(
        `?productCode=sfsdf&investmentAccountNumber=wr4w3234`, {
          "Screen-Id": "portfolioDetailScreen",
        })
      .then((res) => {
        console.log(res.data.data.rspList, "<<< RES");
      })
      .catch((err) => {
        console.log(err, "<<< CATCH");
      })
      .finally(() => {
        this.setData({
          lottieLoading: false
        })
      });
  },

  onClick(){
    console.log("Ke Klik Button");
  }

})
/* JShield-obfus:disable */
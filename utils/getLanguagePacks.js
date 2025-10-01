import {
  getNewLockey
} from "../public/api";
import languagePacks from "../public/language-pack.json";

export async function getLanguagePacks() {
  let language = getApp().globalData.nativeData.language;
  try {
    const {
      data
    } = await my.getStorage({
      key: 'lockeyVer'
    });
    const res = await getNewLockey(data || languagePacks.languageVersion);
    language = getApp().globalData.nativeData.language;
    const newLockeyData = res.data.data;
    if (res.status === 200 || res.statusCode === 200) {
      if (+newLockeyData.languageVersion === +data) {
        const lockey = await getLanguagePackFromStorage(language)
        return lockey
      } else {
        await setLockeyStorage(newLockeyData);
        getApp().globalData.languagePack = newLockeyData.languagePack[language]
        return getApp().globalData.languagePack
      }
    }
    if (res.status === 204 || res.statusCode === 204) {
      const lockey = await getLanguagePackFromStorage(language)
      return lockey
    }
  } catch (error) {
    switch (error.status || error.statusCode) {
      case 409:
      case 503: {
        const lockey = await getLanguagePackFromStorage(language)
        return lockey
      }
      default: {
        const fallbackData = languagePacks;
        await setLockeyStorage(fallbackData)
        getApp().globalData.languagePack = fallbackData.languagePack[language];
        return getApp().globalData.languagePack
      }
    }
  }
}

async function getLanguagePackFromStorage(language) {
  const lockeyId = await my.getStorage({
    key: 'lockeyID'
  });
  const lockeyEn = await my.getStorage({
    key: 'lockeyEN'
  });
  if(!lockeyId.data){
    const fallbackData = languagePacks;
    getApp().globalData.languagePack = fallbackData.languagePack[language];
  } else {
    getApp().globalData.languagePack = language === "id-ID" ? lockeyId.data : lockeyEn.data;

  }
  return getApp().globalData.languagePack;
}

async function setLockeyStorage(lockeyData) {
  await my.setStorage({
    key: 'lockeyVer',
    data: lockeyData.languageVersion
  });
  await my.setStorage({
    key: 'lockeyID',
    data: lockeyData.languagePack["id-ID"]
  });
  await my.setStorage({
    key: 'lockeyEN',
    data: lockeyData.languagePack["en-ID"]
  });
}
import {
  getLanguagePacks
} from "/utils/getLanguagePacks";

Page({
  data: {
    languagePack: {}
  },

  async onLoad() {
    try {
      const lang = await getLanguagePacks();
      const parsedLang = JSON.stringify(lang)

      this.setData({
        languagePack: parsedLang
      });

    } catch (error) {
      console.error("Gagal memuat bahasa", error);
    }
  },
});
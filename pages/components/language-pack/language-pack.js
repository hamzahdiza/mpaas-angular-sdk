import { getLanguagePacks } from '/src/utils/getLanguagePacks';

Page({
  data: {
    currentLanguage: 'id-ID',
    featureName: 'Bocelli',
    languageVersion: 101,
    lang: {},
    loading: false
  },

  async onLoad() {
    await this.fetchLanguageData('id-ID');
  },

  async fetchLanguageData(langCode) {
    this.setData({ loading: true });

    try {
      const langPack = await getLanguagePacks();
      this.setData({
        currentLanguage: langCode,
        lang: langPack,
        loading: false
      });
    } catch (err) {
      this.setData({ loading: false });
    }
  },

  async onToggleLanguage() {
    const nextLang = this.data.currentLanguage === 'id-ID' ? 'en-ID' : 'id-ID';
    await this.fetchLanguageData(nextLang);
    my.showToast({
      content: `Bahasa diubah ke: ${nextLang}`,
      duration: 1500
    });
  },

  closeUpdateNativePopup() {
    my.alert({
      title: 'Action Triggered',
      content: `closeUpdateNativePopup triggered with label: "${this.data.lang.lockeyTitleEvent}"`
    });
  },

  handleBuyTicket() {
    my.alert({
      title: this.data.lang.lockeyBtnBuyTicket || 'Beli Tiket',
      content: `${this.data.lang.lockeyTitleEvent} - ${this.data.lang.lockeyEventSubtitle}`
    });
  },

  handleFallbackAction(e) {
    const keyName = (e && e.target && e.target.dataset && e.target.dataset.key) || 'Fallback Key';
    my.alert({
      title: 'Fallback Key Terpilih',
      content: `Key "${keyName}" tidak terdaftar di language pack JSON, sehingga otomatis menampilkan key name.`
    });
  }
});

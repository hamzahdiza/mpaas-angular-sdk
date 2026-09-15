Page({
  data: {
    url: ''
  },

  onLoad(query) {
    console.log('[Webview] query params:', query);
    let targetUrl = '';

    if (query && query.url) {
      targetUrl = decodeURIComponent(query.url);
    } else if (query && query.customUrlQueryData) {
      const mark = query.customUrlQueryData;
      const customData = my.customUrlQueryData && my.customUrlQueryData[mark];
      if (customData) {
        targetUrl =
          customData.url ||
          customData.externalUrl ||
          customData.external_url ||
          (customData.partnerMenu &&
            (customData.partnerMenu.externalUrl ||
              customData.partnerMenu.external_url ||
              customData.partnerMenu.urlMicrosite));
      }
    }

    if (targetUrl) {
      let trimmed = targetUrl.trim();
      if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
        trimmed = 'https://' + trimmed;
      }
      console.log('[Webview] opening target URL:', trimmed);
      this.setData({ url: trimmed });
    }
  },

  onMessage(e) {
    console.log('[Webview] message from webview:', e);
  }
});

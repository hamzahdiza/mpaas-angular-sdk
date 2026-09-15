import { customNavigateTo } from "/src/utils/route-util";


Page({
  data: {
    hotelData: {},
    templateId: 1
  },
  onLoad(query) {
    const queryData = (query && query.customUrlQueryData && my.customUrlQueryData && my.customUrlQueryData[query.customUrlQueryData]) || {};
    const runningData = queryData.runningData || queryData.eventDetail || queryData;
    
    if (runningData) {
      const templateId = runningData.templateId
        || runningData.selected_template
        || runningData.selectedTemplate
        || (runningData.templates && runningData.templates.index && runningData.templates.index.id)
        || 'template-1';

      const enrichedRunningData = {
        ...runningData,
        templateId,
        selected_template: templateId,
        selectedTemplate: templateId,
      };

      this.setData({
        runningData: enrichedRunningData,
        templateId
      });
    }
  },

  goToRunningDetail(ticketData) {
    console.log("[package_running/index] Navigating to detail-running with:", ticketData);
    const runningData = this.data.runningData || {};
    const templateId = runningData.templateId
      || runningData.selected_template
      || runningData.selectedTemplate
      || this.data.templateId
      || (runningData.templates && runningData.templates.index && runningData.templates.index.id)
      || 'template-1';

    customNavigateTo({
      url: "/src/app/pages/package_running/detail-running/detail-running",
      data: { 
        ticketData: ticketData || runningData,
        runningData: runningData,
        eventDetail: runningData,
        templateId: templateId
      }
    });
  }
});
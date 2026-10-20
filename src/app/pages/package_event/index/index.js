import { customNavigateTo } from "/src/utils/route-util";

Page({
  data: {
    hotelData: {},
    templateId: 1
  },
  onLoad(query) {
    const queryData = my.customUrlQueryData && query && query.customUrlQueryData ? my.customUrlQueryData[query.customUrlQueryData] : {};
    const eventData = queryData.eventData || queryData.detailEvent || queryData.hotelData;
    
    if (eventData) {
      const templateId = eventData.templateId
        || eventData.selected_template
        || eventData.selectedTemplate
        || (eventData.templates && eventData.templates.index && eventData.templates.index.id)
        || '1';

      this.setData({
        detailEvent: {
          ...eventData,
          templateId,
          selected_template: templateId,
        },
        templateId,
        successFetch: true,
        isLoading: false
      });
    }
  },

  goToTicketList(eventOrData) {
    let ticketData;
    if (eventOrData && eventOrData.target && eventOrData.target.dataset) {
      ticketData = eventOrData.target.dataset.ticketData;
    } else {
      ticketData = eventOrData;
    }

    const eventDetail = {
      ...(this.data.detailEvent || {}),
      ticketCategories: (this.data.detailEvent && (this.data.detailEvent.ticketCategories || this.data.detailEvent.tickets || this.data.detailEvent.ticket_tiers)) || []
    };

    const templateId = this.data.templateId || (eventDetail && (eventDetail.templateId || eventDetail.selected_template || eventDetail.selectedTemplate)) || 1;

    console.log("[Package Event Index] Navigating to book-ticket with templateId:", templateId);
    customNavigateTo({
      url: "/src/app/pages/book-ticket/book-ticket",
      data: {
        templateId: templateId,
        ticketData: ticketData || (eventDetail.ticketCategories && eventDetail.ticketCategories[0]),
        eventDetail: eventDetail,
        runningData: eventDetail
      }
    });
  },

  goToTransactionHistory() {
    customNavigateTo({
      url: "/src/app/pages/transaction-history/transaction-history",
      data: {}
    });
  }
});
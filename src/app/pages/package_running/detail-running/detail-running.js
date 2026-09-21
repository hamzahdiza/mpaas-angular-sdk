import {
  customNavigateTo
} from "/src/utils/route-util";
import {
  getPersonalData
} from "/src/public/api";
import generalError from "/src/utils/generalError";

Page({
  data: {},
  onLoad(query) {
    const queryData = (query && query.customUrlQueryData && my.customUrlQueryData && my.customUrlQueryData[query.customUrlQueryData]) || {};
    const runningData = queryData.runningData || queryData.eventDetail || queryData.ticketData || queryData;
    const rawId = (runningData && ((runningData.templates && runningData.templates.bookTicket && runningData.templates.bookTicket.id) || runningData.templateId || runningData.selected_template || runningData.selectedTemplate)) || queryData.templateId || 1;
    const cleanNum = Number(String(rawId).replace('template-', ''));
    const templateId = (!isNaN(cleanNum) && cleanNum >= 1 && cleanNum <= 4) ? cleanNum : (rawId || 'custom');

    this.setData({
      runningData,
      ticketData: queryData.ticketData || runningData,
      templateId,
      rawTemplateId: rawId
    });
  },
  onBackToIndex() {
    my.navigateBack();
  },
  async handleBooking(data){
    console.log("[detail-running] handleBooking:", data);
    try {
      this.setData({ isLoading: true });

      let personalData = {
        fullName: 'Hamzah Diza',
        email: 'hamzah.diza@orbitalinc.com',
        phone: '081234567890',
        gender: 'M',
        dateBirth: '15',
        monthBirth: '10',
        yearBirth: '1995',
        nationality: 'ID',
        nik: '3171012304850001',
        subdistrict: 'KEBAYORAN BARU',
        postalCode: '12160',
      };
      try {
        const res = await getPersonalData();
        if (res && res.data && res.data.dataProtected) {
          personalData = { ...personalData, ...res.data.dataProtected };
        }
      } catch (e) {
        console.warn("Using fallback personalData:", e);
      }

      const eventDetail = data.eventDetail || data.runningData || this.data.runningData || {};
      const selectedTickets = data.selectedTicket || [];
      const totalAmount = data.totalAmount || data.priceCount || 0;
      const totalTicket = data.ticketCount || 1;

      const firstGroup = selectedTickets[0] || {};
      const firstTicket = (firstGroup.tickets && firstGroup.tickets[0]) || (data.tickets && data.tickets[0]) || {};

      const customerTicketList = [];
      if (data.tickets && data.tickets.length > 0) {
        data.tickets.forEach(t => {
          for (let i = 0; i < (t.ticketQty || t.total || 1); i++) {
            customerTicketList.push({
              fullName: "",
              idCard: "",
              gender: "",
              dob: "",
              citizen: "Indonesia",
              country: "Indonesia",
              statusForeign: "",
              postCode: "",
              ticketName: t.name || t.ticketName || eventDetail.name || "Tiket Running",
              ticketDate: eventDetail.formattedDate || eventDetail.startDate || ""
            });
          }
        });
      } else {
        customerTicketList.push({
          fullName: "",
          idCard: "",
          gender: "",
          dob: "",
          citizen: "Indonesia",
          country: "Indonesia",
          statusForeign: "",
          postCode: "",
          ticketName: firstTicket.ticketName || eventDetail.name || "Tiket Running",
          ticketDate: eventDetail.formattedDate || eventDetail.startDate || ""
        });
      }

      const ticketListSummary = (data.tickets && data.tickets.length > 0)
        ? data.tickets.map(t => ({
            title: t.name || t.ticketName || "Tiket Running",
            totalDetailTicket: t.ticketQty || t.total || 1,
            amount: t.totalPrice || (t.price * (t.ticketQty || t.total || 1))
          }))
        : [{
            title: firstTicket.ticketName || eventDetail.name || "Tiket Running",
            totalDetailTicket: totalTicket,
            amount: totalAmount
          }];

      const navData = {
        tickets: {
          name: personalData.fullName,
          email: personalData.email,
          phone: personalData.phone,
          gender: personalData.gender,
          ticketId: firstTicket.ticketId || firstTicket.id || "ticket-001",
          ticketQty: totalTicket,
          category: firstTicket.category || firstTicket.categoryId || "cat_main",
          category2: firstTicket.category2 || "cat_main",
          category3: firstTicket.category3 || "cat_main",
          type: firstTicket.type || "regular",
          oldPrice: firstTicket.oldPrice || 0,
          price: totalAmount,
          priceTaxService: totalAmount,
          customerTicket: customerTicketList,
          ticketTotal: totalTicket,
          ticketCount: totalTicket,
          ticketList: ticketListSummary
        },
        visitorIndex: 0,
        ticketIndex: 0,
        personalData: personalData,
        autoSingleVisitor: true,
        isPersonalNikUsed: selectedTickets.map(() => ({ toggleTabDisabled: false })),
        selectedTickets: selectedTickets,
        eventDetail: eventDetail
      };

      console.log("[detail-running] Navigating directly to visitor-input-screen:", navData);
      customNavigateTo({
        data: navData,
        url: '/src/app/pages/visitor-input-screen/visitor-input-screen',
      });
    } catch (err) {
      generalError({ err });
    } finally {
      this.setData({ isLoading: false });
    }
  }
});

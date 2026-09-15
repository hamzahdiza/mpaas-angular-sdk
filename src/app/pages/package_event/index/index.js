import { customNavigateTo } from "/src/utils/route-util";

Page({
  data: {
    hotelData: {},
    templateId: 1
  },
  onLoad(query) {
    const { hotelData } = my.customUrlQueryData[query.customUrlQueryData];
    
    if (hotelData) {
      const templateId = hotelData.templateId
        || hotelData.selected_template
        || hotelData.selectedTemplate
        || (hotelData.templates && hotelData.templates.index && hotelData.templates.index.id)
        || 'template-1';

      this.setData({
        detailEvent: {
          ...hotelData,
          templateId,
          selected_template: templateId,
        },
        templateId
      });
    }
  },
  goToRoomDetail(roomData) {
    customNavigateTo({
      url: "/src/app/pages/package_hotel/detail-hotel/detail-hotel",
      data: { 
        roomData,
        hotelData: this.data.hotelData 
      }
    });
    // my.navigateTo({
    //   url: '/src/app/pages/package_hotel/detail-hotel/detail-hotel',
    //   data: { 
    //     roomData,
    //     hotelData: this.data.hotelData 
    //   }
    // });
  }
});
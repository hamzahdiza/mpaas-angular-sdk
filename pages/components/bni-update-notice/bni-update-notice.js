Page({
  data: {},
  onLoad() {
    this.setData({
      textObject: {
        imgUrl: "/pages/assets/images/img_common_00_need_update_xsmall.svg",
        titleText: "Yuk, pakai aplikasi wondr versi terbaru!",
        contentText: "Update ke versi terbaru untuk bisa nikmatin semua fitur-fitur seru yang ada di wondr.",
        btnPrimaryText: "Update Sekarang",
        btnSecondaryText: "Nanti Dulu"
      }
    })
  },

  handleOnTap(){
    my.alert({title: "MASOKK"})
  }
});
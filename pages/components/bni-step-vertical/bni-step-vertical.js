Page({
  data: {
    listStatus:[
      {
        name: "Order Diterima",
        nameId:"nameIdAutomationStep1",
        seeDate:false,
        seeDetail:false,
        date:"21 Sep 2023",
        dateId:"dateIdAutomationStep1",
        time:"16.20 WIB",
        status: "success",
        type:"submited",
        detail:"Lorem ipsum dolor sit amet consectetur.",
        detailId:"detailIdAutomationStep1",
        icon : "/pages/assets/icons/ic_common_checkmark.svg",
        iconId:"iconIdAutomationStep1",
        lineId:"lineIdAutomationStep1"

      },
      {
        name: "Order berhasil diverifikasi",
        nameId:"nameIdAutomationStep2",
        seeDate:true,
        seeDetail:false,
        date:"22 Sep 2023",
        dateId:"dateIdAutomationStep2",
        time:"15.20 WIB",
        status: "success",
        detail:"Lorem ipsum dolor sit amet consectetur. ",
        detailId:"detailIdAutomationStep2",
        icon : "/pages/assets/icons/ic_common_checkmark.svg",
        iconId:"iconIdAutomationStep2",
        lineId:"lineIdAutomationStep2"

      },
      {
        name: "Menunggu alokasi unit",
        nameId:"nameIdAutomationStep3",
        seeDate:true,
        seeDetail:true,
        date:"25 Sep 2023",
        dateId:"dateIdAutomationStep3",
        time:"17.00 WIB",
        status: "process",
        detail:"Lorem ipsum <b>dolor sit amet</b> consectetur.",
        detailId:"detailIdAutomationStep3",
        icon : "/pages/assets/icons/Close.svg",
        iconId:"iconIdAutomationStep3",
        lineId:"lineIdAutomationStep3"

      },
    ],
    listStatus2:[
      {
        name: "Order Diterima",
        seeDate:false,
        seeDetail:false,
        date:"21 Sep 2023",
        time:"16.20 WIB",
        status: "success",
        type:"submited",
        detail:"Lorem ipsum dolor sit amet consectetur. ",
        icon : "/pages/assets/icons/ic_common_checkmark.svg"
      },
      {
        name: "Order berhasil diverifikasi",
        seeDate:false,
        seeDetail:false,
        date:"22 Sep 2023",
        time:"15.20 WIB",
        status: "success",
        detail:"Lorem ipsum dolor sit amet consectetur. ",
        icon : "/pages/assets/icons/ic_common_checkmark.svg"
      },
      {
        name: "Penjualan Berhasil",
        seeDate:true,
        seeDetail:false,
        date:"25 Sep 2023",
        time:"17.00 WIB",
        status: "success",
        detail:"Lorem ipsum dolor sit amet consectetur. panjang 2 baris ini ",
        icon : "/pages/assets/icons/ic_common_checkmark.svg"

      },
    ],
    listStatus3:[
      {
        name: "Order Diterima",
        seeDate:false,
        seeDetail:false,
        date:"21 Sep 2023",
        time:"16.20 WIB",
        status: "success",
        type:"submited",
        detail:"Lorem ipsum dolor sit amet consectetur. ",
        icon : "/pages/assets/icons/ic_common_checkmark.svg"
      },
      {
        name: "Penjualan gagal ",
        seeDate:true,
        seeDetail:true,
        date:"22 Sep 2023",
        time:"15.20 WIB",
        status: "error",
        detail:"Lorem ipsum dolor sit amet consectetur. ",
        icon : "/pages/assets/icons/Close.svg"
      },
      {
        name: "Penjualan gagal",
        seeDate:true,
        seeDetail:true,
        date:"25 Sep 2023",
        time:"17.00 WIB",
        status: "blocked",
        detail:"Lorem ipsum dolor sit amet consectetur. ",
        icon : "/pages/assets/icons/Close.svg"
      },
    ],
    listStatus4:[
      {
        name: "Order Diterima",
        seeDate:false,
        seeDetail:false,
        date:"21 Sep 2023",
        time:"16.20 WIB",
        status: "success",
        type:"submited",
        detail:"Lorem ipsum dolor sit amet consectetur. ",
        icon : "/pages/assets/icons/ic_common_checkmark.svg"
      },
      {
        name: "Menunggu verifikasi Manajer Investasi ",
        seeDate:true,
        seeDetail:false,
        date:"22 Sep 2023",
        time:"15.20 WIB",
        status: "waiting",
        detail:"Lorem ipsum dolor sit amet consectetur. ",
        icon : "/pages/assets/icons/Close.svg"
      },
      {
        name: "Proses alokasi unit",
        seeDate:true,
        seeDetail:true,
        date:"25 Sep 2023",
        time:"17.00 WIB",
        status: "waiting",
        detail:"Lorem ipsum dolor sit amet consectetur. ",
        icon : "/pages/assets/icons/Close.svg"
      },
    ],
    largeCircle:0,
    smallCircle:0
  },
  onLoad() {},
});

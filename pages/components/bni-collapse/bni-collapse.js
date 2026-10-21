Page({
  data: {
    collapseData: [{
        title: "Apa yang perlu disiapin untuk mulai investasi?",
        content: "Siapkan data-data yang diperlukan untuk registrasi, data sudah kami isiin jadi kamu bisa konfirmasi dan ubah data jika belum sesuai.",
        idTitle:"sid-landing-page-section-2-title-1",
        idDesc:"sid-landing-page-section-2-desc-1",
        idIcon:"sid-landing-page-section-2-icon-1"
      },
      {
        title: "Bagaimana memilih produk investasi?",
        content: "Kamu bisa memilih produk berdasarkan profil risiko kamu.",
      },
      {
        title: "Apakah investasi di wondr aman?",
        content: "Tentunya sangat aman."

      }
    ],
    collapseData2: [{
        title: "Apa yang perlu disiapin untuk mulai investasi?",
      },
      {
        title: "Bagaimana memilih produk investasi?",
      },
      {
        title: "Apakah investasi di wondr aman?",

      }
    ],
    accordion: [],
  },
  onLoad() {
    const initialAccordion = this.data.collapseData.map(() => false);
    this.setData({
      accordion: initialAccordion
    });
  },

});
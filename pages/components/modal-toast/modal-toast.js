Page({
  data: {
    showToast: false,
    title: '',
    content: '',
    type: '',
    btnText: '',
    language: '',
    isShow: false
  },
  onLoad() {},
  toastHandler(e) {
    const {
      props
    } = e.currentTarget.dataset
    if (props === 'success') {
      this.setData({
        content: {
          text1: 'Harap perhatikan ya, awal periode yang diatur akan mempengaruhi',
          text2: 'Insight',
          text3: 'dan',
          text4: 'Laporan Transaksi',
          text5: 'kamu.'
        },
        title: 'Berhasil Atur Awal Periode',
        showToast: true,
        type: props,
        btnText: 'OK, Saya Mengerti'
      })
    } else if (props === 'error') {
      this.setData({
        content: 'Gagal diatur karena kesalahan sistem, silakan coba lagi.',
        title: 'Gagal Atur Awal Periode',
        showToast: true,
        type: props,
        btnText: 'Coba Lagi'
      })
    }
  },
  closeToastHandler() {
    this.setData({
      content: '',
      title: '',
      showToast: false,
      type: '',
      btnText: ''
    })
  },
  onPrimary() {
    this.setData({
      isShow: true
    })
  }
});
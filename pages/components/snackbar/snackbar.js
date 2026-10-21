Page({
  data: {
    isSnackbarVisible: false,
    iconSnackbar:"",
    txt:""
  },
  showSnackbar() {
    this.setData({
      isSnackbarVisible: true,
      iconSnackbar:"success",
      txt:"Kategori berhasil diubah"
    });
  
    setTimeout(() => {
      this.setData({
        isSnackbarVisible: false,
      });
    }, 3000);
  },
  showSnackbarex() {
    this.setData({
      isSnackbarVisible: true,
      iconSnackbar:"error",
      txt:"Kategori gagal diubah. Coba lagi ya"
    });
  
    setTimeout(() => {
      this.setData({
        isSnackbarVisible: false,
      });
    }, 3000);
  },
  showSnackbarWarning() {
    this.setData({
      isSnackbarVisible: true,
      iconSnackbar:"warning",
      txt:"Rekening sedang dihubungkan. Cek lagi dalam beberapa saat ya."
    });
  
    setTimeout(() => {
      this.setData({
        isSnackbarVisible: false,
      });
    }, 3000);
  }
});

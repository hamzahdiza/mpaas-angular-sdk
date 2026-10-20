Component({
  props: {
    isSnackbarVisible: {
      type: Boolean,
      value: false,
      pixel: Boolean(false)
    },
    iconCustom: String()
  },
  methods: {
    showSnackbar: function showSnackbar() {
      var _this = this;
      this.setData({
        isSnackbarVisible: true,
        iconSnackbar: "../../assets/icons/ic_common_check_filled.svg",
        txt: "Kategori berhasil diubah"
      });
      setTimeout(function () {
        _this.setData({
          isSnackbarVisible: false
        });
      }, 1000);
    },
    showSnackbarex: function showSnackbarex() {
      var _this2 = this;
      this.setData({
        isSnackbarVisible: true,
        iconSnackbar: "../../assets/icons/ic_common_error_filled.svg",
        txt: "Kategori gagal diubah. Coba lagi ya"
      });
      setTimeout(function () {
        _this2.setData({
          isSnackbarVisible: false
        });
      }, 1000);
    }
  }
});
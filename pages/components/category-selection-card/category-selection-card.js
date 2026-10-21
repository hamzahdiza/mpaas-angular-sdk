Page({
  data: {
    basicVisible: false,
    dataCategory: [
      {
        id: 1,
        title: "Uang Keluar",
        icon: "../../assets/icons/ic_common_hourglass.svg",
        selected: false
      },
      {
        id: 2,
        title: "Belanja",
        icon: "../../assets/icons/ic_common_hourglass.svg",
        selected: true
      },
      {
        id: 3,
        title: "Hadiah & Amal",
        icon: "../../assets/icons/ic_common_hourglass.svg",
        selected: false

      },
      {
        id: 4,
        title: "Hiburan",
        icon: "../../assets/icons/ic_common_hourglass.svg",
        selected: false

      },
      {
        id: 5,
        title: "Makanan & Minuman",
        icon: "../../assets/icons/ic_common_hourglass.svg",
        selected: false

      },
      {
        id: 6,
        title: "Pinjaman",
        icon: "../../assets/icons/ic_common_hourglass.svg",
        selected: false

      },
      {
        id: 57,
        title: "Tabungan & Investasi",
        icon: "../../assets/icons/ic_common_hourglass.svg",
        selected: false

      },
      {
        id: 8,
        title: "Tagihan",
        icon: "../../assets/icons/ic_common_hourglass.svg",
        selected: false

      },
      {
        id: 9,
        title: "Top Up",
        icon: "../../assets/icons/ic_common_hourglass.svg",
        selected: false

      },
      {
        id: 10,
        title: "Transportasi",
        icon: "../../assets/icons/ic_common_hourglass.svg",
        selected: false

      },
      {
        id: 11,
        title: "Biaya & Lainnya",
        icon: "../../assets/icons/ic_common_hourglass.svg",
        selected: false

      }
    ],
    dataCategoryMain: []
  },
  onLoad() {
    const sortedDataCategory = this.data.dataCategory.sort((a, b) => {
      if (a.selected && !b.selected) {
        return -1;
      } else if (!a.selected && b.selected) {
        return 1;
      }
      return 0;
    });

    this.data.dataCategoryMain = sortedDataCategory.filter(category => [1, 2, 3, 4].includes(category.id)).slice(0, 4);
  },
  onOpenPopup() {
    this.setData({
      basicVisible: true
    });
  },
  onClosePopup() {
    if (this.data.basicVisible === true) {
      const sortedDataCategory = this.data.dataCategory.sort((a, b) => {
      if (a.selected && !b.selected) {
        return -1;
      } else if (!a.selected && b.selected) {
        return 1;
      }
      return 0;
    });
    this.setData({
      basicVisible: false,
      dataCategoryMain: sortedDataCategory.filter(category => [category.id, 2, 3, 4].includes(category.id)).slice(0, 4),
      dataCategory: sortedDataCategory.filter(category => [category.id, 2, 3, 4].includes(category.id))
    });

    } else {
      this.setData({
        basicVisible: true
      })
    }
  },
  handlePopupClose() {
    const sortedDataCategory = this.data.dataCategory.sort((a, b) => {
      if (a.selected && !b.selected) {
        return -1;
      } else if (!a.selected && b.selected) {
        return 1;
      }
      return 0;
    });
    this.setData({
      basicVisible: false,
      dataCategoryMain: sortedDataCategory.filter(category => [category.id, 2, 3, 4].includes(category.id)).slice(0, 4),
      dataCategory: sortedDataCategory.filter(category => [category.id, 2, 3, 4].includes(category.id))
    });
  },
  handleTapItem(item) {
    const selected = parseInt(item.currentTarget.id, 10);
    this.onSubmitCategory(selected)
    const updatedDataCategory = this.data.dataCategory.map(category => {
      if (selected === category.id) {
        return {
          ...category,
          selected: true
        };
      }
      return {
        ...category,
        selected: false
      };
    });

    this.setData({
      dataCategory: updatedDataCategory
    });
  },
  onSubmitCategory(){
  }
  

});

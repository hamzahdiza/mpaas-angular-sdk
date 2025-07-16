Page({
  data: {
    days: [
      "1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
      "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
      "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"
    ],
    months: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ],
    years: ["2025", "2026", "2027", "2028", "2029", "2030", "2031", "2032", "2034", "2035"],
    value: [0, 0, 0],
    dateValue: [5, 0],
    numValue: 9,
    numValueTypeThree: 0,
    selectedType: 1,
    currentYear: 2025,
    defaultDate: ["May", 2025]
  },
  onLoad() {
    const newMonths = this.getAvailableMonths(2)
    const currentYear = new Date().getFullYear()

    this.setData({
      months: newMonths,
      currentYear
    })
  },

  getAvailableMonths(minMonth) {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
  
    return months.slice(minMonth)
  },
  onChangeScroll(value) {
    this.setData({
      dateSelected: value // output will be object with month and year key. And get the value always when component mounted
    })
  },
  onChangeScrollNumber(value) {
    this.setData({
      numSelected: value // output will be the exact number. And get the value always when component mounted
    })
  },
  onChangeNumberType(e) {
    const { number } = e.currentTarget.dataset
    this.setData({
      selectedType: Number(number)
    })
  },
  navBack() {
    my.navigateBack();
  }
});
import dayjs from "dayjs";

Component({
  mixins: [],
  data: {
    arrayNumber: Array([]),
    dateValue: Array([]),
    numValue: Number(1),
    days: Array([]),
    minimumMonth: Number(0),
    currentDate: Object({
      month: '',
      years: 0
    })
  },
  props: {

    /**
     * Defines id for number type
     * @type {String}
     * @required ✅
     */
    idNumber: String,

    /**
     * Defines id for date type
     * @type {String}
     * @required ✅
     */
    idDate: String,

    /**
     * Defines id for month type
     * @type {String}
     * @required ✅
     */
    idMonth: String,

    /**
     * Defines id for year type
     * @type {String}
     * @required ✅
     */
    idYear: String,

    /**
     * Defines type for scroll picker ("date", "number", "custom")
     * @type {String}
     * @required ✅
     */
    type: String,

    /**
     * Defines language for months
     *  Example: "en-ID" or "id-ID"
     * @type {String}
     * @optional
     */
    langType: String,

    /**
     * one days is an array that represents the options available for a scroll picker.
     * Example:
     * ["1"] or ["16"]
     * @type {Array}
     * @optional
     */
    days: Array,

    /**
     * Defines minimum months available for a scroll picker this year
     * Example:
     *  2, 5, ... 12.
     * 
     * @type {Number}
     * @optional
     */
    minimumMonth: Number(0),

    /**
     * defaultDate is an array that represents the default value for date picker.
     * Example:
     * ["Januari", 2026]
     * @type {Array}
     * @optional
     */
    defaultDate: Array,

    /**
     * years is an array that represents the options available for a scroll picker.
     * Example:
     * ["2025", "2026", ... "2035"]
     * @type {Array}
     * @optional
     */
    years: Array,

    /**
     * You can add more year based on number you give, but it's only 10 increments.
     * Example:
     * addMoreYear = 1
     * currentYear = 2025
     * ["2026", "2027", ... "2036"]
     * @type {Array}
     * @optional
     */
    addMoreYear: Number(0),

    /**
     * Defines maximal number if type "number"
     * @type {Number}
     * @required ✅
     */
    maxNumber: Number,

    /**
     * Defines minimal number if type "number"
     * @type {Number}
     * @required ✅
     */
    minNumber: Number,

    /**
     * Defines minimal selectable number if type "number"
     * @type {Number}
     * @required ✅
     */
    minSelectableNumber: Number,

    /**
     * Defines default value for date picker by its index
     * Example: 
     *  [0, 0]
     * @type {Array}
     * @optional
     */
    dateValue: Array,

    /**
     * Defines default value for number picker by number
     * Example: 
     *  5 or 15
     * @type {Number}
     * @optional
     */
    numValue: Number,

    /**
     * onChangeScroll is a callback to handle onChange input component
     * @type {Function}
     * @required ✅
     */
    onChangeScroll: Function,

    /**
     * trigger onChange immediately
     * @type {Boolean}
     * @optional
     */
    immediateChange: Boolean(false),

    /**
     * Defines class for picker container
     * @type {String}
     * @optional
     */
    pickerContainerClass: String,

    /**
     * Defines the user agent is Android
     * @type {Boolean}
     * @optional
     */
    isAndroid: Boolean(true),
  },
  didMount() {
    if (this.props.type == 'number') {
      const max = Number(this.props.maxNumber)
      const min = Number(this.props.minNumber)
      const array = Array.from({
        length: max - min + 1
      }, (_, i) => i + min);
      const numIndex = array.findIndex(e => e == this.props.numValue)
      this.setData({
        arrayNumber: array,
        numValue: this.props.numValue ? [numIndex] : [0]
      })
      this.props.onChangeScroll(numIndex !== -1 ? array[numIndex] : array[0])
    } else {
      const currentYear = Array.from({
        length: 11
      }, (_, i) => String(dayjs().year() + Number(this.props.addMoreYear) + i))
      let minimumMonth =
        this.props.minimumMonth && this.props.minimumMonth <= 12 ?
        this.props.minimumMonth :
        this.props.minimumMonth > 12 ?
        this.props.minimumMonth % 12 :
        1;
      let monthIndex, yearIndex, newMonths
      const { defaultDate } = this.props
      if (this.props.defaultDate[0]) {
        if (currentYear[0] == defaultDate[1]) {
          newMonths = this.getAvailableMonths(minimumMonth - 1)
          monthIndex = newMonths.findIndex(e => this.props.defaultDate[0] == e)
          yearIndex = currentYear.findIndex(e => this.props.defaultDate[1] == e)
        } else {
          monthIndex = this.getAvailableMonths(0).findIndex(e => this.props.defaultDate[0] == e)
          yearIndex = currentYear.findIndex(e => this.props.defaultDate[1] == e)
          newMonths = this.getAvailableMonths(0)
        }
      } else {
        newMonths = this.getAvailableMonths(minimumMonth - 1)
        yearIndex = 0
        monthIndex = 0
      }
      this.setData({
        years: currentYear,
        days: this.props.days[0] ? this.props.days : [],
        months: newMonths,
        minimumMonth: minimumMonth,
        dateValue: [monthIndex, yearIndex]
      })

      const date = {
        month: monthIndex != -1 ? this.data.months[monthIndex] : this.data.months[0],
        year: Number(this.data.years[yearIndex])
      }

      this.setData({
        currentDate: date
      })

      this.props.onChangeScroll(date)
    }
  },
  methods: {
    onChangeDate(e) {
      const {
        value
      } = e.detail
      const {
        years,
        currentDate
      } = this.data
      const [val1, val2] = value
      const currentYear = this.data.years[0]
      const yearSelected = Number(years[value[1]])
      let propsDate
      if (currentYear < yearSelected) {
        const newMonths = this.getAvailableMonths(0)
        console.info("yearSelected > currentYear")
        if (yearSelected != this.data.currentDate.year) {
          console.info(this.data.currentDate, "this.data.currentDate.month")
          const monthIndex = newMonths.findIndex(item => item == this.data.currentDate.month)
          console.log(newMonths, "< < < < <newMonths")
          console.info("yearSelected != this.data.currentDate.year")
          console.info(monthIndex, "<<< MONTH INDEX")
          propsDate = {
            month: newMonths[monthIndex],
            year: yearSelected
          }
          console.info(monthIndex, val2, "[monthIndex, val2]")
          this.setData({
            months: newMonths,
            dateValue: [monthIndex, val2],
            currentDate: propsDate
          })
          console.info(this.data.currentDate, "this.data.currentDate.month")

        } else {
          console.info('yearSelected == this.data.currentDate.year')
          console.info(val1, val2, "dateValue = [val1, val2]")
          propsDate = {
            month: newMonths[val1],
            year: yearSelected
          }
          this.setData({
            months: newMonths,
            dateValue: [val1, val2],
            currentDate: propsDate
          })
        }

      } else {
        console.info("yearSelected < currentYear")
        const newMonths = this.getAvailableMonths(this.data.minimumMonth - 1)
        if (yearSelected != currentDate.year) {
          console.info("yearSelected != currentDate.year")

          const monthIndex = newMonths.findIndex(item => item == this.data.currentDate.month)
          console.info(this.data.currentDate.month, "this.data.currentDate.month")
          console.info(monthIndex, "<<<<<<<<<< monthIndex")

          propsDate = {
            month: newMonths[monthIndex] ? newMonths[monthIndex] : newMonths[0],
            year: yearSelected
          }

          console.info(monthIndex, val2, "dateValue: [monthIndex != -1 ? monthIndex : 0, val2]")

          console.info([monthIndex != -1 ? monthIndex : 0, val2])
          this.setData({
            months: newMonths,
            dateValue: [monthIndex != -1 ? monthIndex : 0, val2],
            currentDate: propsDate
          })
        } else {
          console.info("yearSelected != currentDate.year")
          console.info(this.data.currentDate, "this.data.currentDate <<<")
          propsDate = {
            month: newMonths[val1],
            year: yearSelected
          }
          console.info(val1, val2, "dateValue: [val1, val2]")
          this.setData({
            months: newMonths,
            dateValue: [val1, val2],
            currentDate: propsDate
          })
          console.info(this.data.currentDate, "<<< this.data.currentDate.month")
        }
      }
      this.setData({
        currentDate: propsDate
      })
      this.props.onChangeScroll(propsDate)
    },
    onChangeNumber(e) {
      const {
        value
      } = e.detail

      if (this.data.arrayNumber[value] < Number(this.props.minSelectableNumber)) {
        this.setData({
          numValue: this.data.numValue
        })
      } else {
        this.setData({
          numValue: value
        })
        this.props.onChangeScroll(this.data.arrayNumber[value])
      }
    },
    getAvailableMonths(minMonth) {
      const months = {
        "en-ID": [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ],
        "id-ID": [
          "Januari", "Februari", "Maret", "April", "Mei", "Juni",
          "Juli", "Agustus", "September", "Oktober", "November", "Desember"
        ]
      };

      const selectedMonths = months[this.props.langType] || months["en-ID"];
      return selectedMonths.slice(minMonth);
    }
  }
});
Component({
  mixins: [],
  data: {
    type: String(""),
    dateTransactionList: Object([])
  },
  props: {
    /**
     * Data is for the data from parent to component. Array of objects
     * "statusColor": "done" || "canceled" || "inprogress" || "expired"
     */
    data: Array([]),
    /**
     * Type: transactionHistory or historyBookingBranch or contactList
     */
    type: String(""),
    /**
     * Passing details data which details will be required to be opened
     */
    onTap: Function
  },
  didMount() {
    this.setData({
      ...this.props,
      type: this.props.type,
      dateTransactionList: this.props.data,
      transactionHistoryList: this.props.data,
      contactList: this.props.data,
      id: this.props.id
    })

  },
  didUpdate() {
    this.setData({
      ...this.props,
      type: this.props.type,
      dateTransactionList: this.props.data,
      transactionHistoryList: this.props.data,
      contactList: this.props.data,
      id: this.props.id
    })
  },
  methods: {
    handleOnTap(e) {
      this.props.onTap(e)
    },
    handlenormalizeStatusColor(item) {
      if (item.statusColor) {
        // If statusColor exists, normalize it
        item.statusColor = item.statusColor.toLowerCase();
      } else if (item.status) {
        // If no statusColor, map from status text (language independent)
        const statusLower = item.status.toLowerCase();
        if (statusLower === 'selesai' || statusLower === 'done') {
          item.statusColor = 'done';
        } else if (statusLower === 'dibatalkan' || statusLower === 'canceled') {
          item.statusColor = 'canceled';
        } else if (statusLower === 'dalamProses' || statusLower === 'inprogress') {
          item.statusColor = 'canceled';
        } else if (statusLower === 'kadaluarsa' || statusLower === 'expired') {
          item.statusColor = 'expired';
        } else {
          item.statusColor = 'default';
        }
      } else {
        item.statusColor = 'default';
      }
    }
  },
});
Page({
  data: {
    item: {
      title: "12345678901234567890",
      timestamp: "16.20 WIB",
      description: "Lorem ipsum dolor sit amet consectetur. Nibh morbi massa elit. Lorem ipsum dolor sit amet consectetur. Nibh morbi massa elit.",
    },
    items: [],
    options: {
      indices: [],
      direction: [{
          text: 'vertical',
          value: 'vertical'
        },
        {
          text: 'horizontal',
          value: 'horizontal'
        },
      ],
      status: [{
          text: 'selected',
          value: 'selected'
        },
        {
          text: 'complete',
          value: 'complete'
        },
        {
          text: 'error',
          value: 'error'
        },
      ],
      type: [{
        text: 'default',
        value: 'default'
      },
      {
        text: 'small',
        value: 'small'
      },
      {
        text: 'loader',
        value: 'loader'
      },
    ]
    },
    selected: {
      currentIndex: 1,
      type: 'default',
      direction: 'vertical',
      status: 'selected'
    },
  },
  onLoad() {
    this.onSliderChange(3)
    this.onChangeType(this.data.selected.type)
  },
  onSliderChange(number) {
    const items = Array.from({
      length: number
    }, (_, i) => (this.data.item))
    const indices = Array.from({
      length: number
    }, (_, i) => ({
      text: String(i),
      value: i
    }))
    const {
      options,
      selected
    } = this.data
    options.indices = indices
    selected.currentIndex = number - 2 > 0 ? number - 2 : 0
    this.setData({
      items,
      options,
      selected
    })

  },
  onChangeIndex(value) {
    const {
      selected
    } = this.data
    selected.currentIndex = value ? value : 0
    this.setData({
      selected
    })
  },
  onChangeStatus(value) {
    const {
      selected
    } = this.data
    selected.status = value ? value : 'selected'
    this.setData({
      selected
    })
  },
  onChangeDirection(value) {
    const {
      selected, options
    } = this.data
    selected.direction = value ? value : 'vertical'
    if (selected.direction === 'horizontal') {
      selected.direction = 'horizontal'
      selected.type = 'default'
      options.type.map(item => {
        item.disabled = item.value !== 'default'
      })
    }  else {
      options.type.map(item => {
        item.disabled = false
      })
    }
    this.setData({
      selected, options
    })
  },
  onChangeType(value) {
    const {
      selected, options
    } = this.data
    selected.type = value ? value : 'small'
    if (selected.type === 'small' || selected.type === 'loader') {
      selected.direction = 'vertical'
      options.direction.map(item => {
        item.disabled = item.value !== 'vertical'
      })
    } else {
      options.direction.map(item => {
        item.disabled = false
      })
    }
    this.setData({
      selected, options
    })
  },
  onTapStepItem(index){
    // console.log('tapped step with index: ' +index )
  }
})
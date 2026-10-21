const {
  componentList
} = require('./components.json')
const items = [{
    title: 'typography',
  },
  {
    title: 'theme',
  }
];

Page({
  data: {
    items,
  },
  onLoad() {
    const {
      uploadVersion,
      libraryVersion
    } = getApp().globalData
    this.setData({
      componentList: componentList.sort(),
      uploadVersion,
      libraryVersion
    })
  },
  onTapComponentList(e) {
    const {
      component
    } = e.currentTarget.dataset
    my.navigateTo({
      url: `/pages/components/${component}/${component}?title=${component}`,
    })
  },
  onChange(checked, e) {
    const {
      index
    } = e.currentTarget.dataset;
    const checkboxList = [...this.data.checkboxList];
    checkboxList[index] = checked;
    this.setData({
      checkboxList,
    });
  },
  handleBack() {
    my.navigateBack({
      fallback: '/src/app/pages/landing/landing'
    });
  }
});
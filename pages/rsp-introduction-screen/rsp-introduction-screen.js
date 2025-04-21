Page({
  data: {
    currentIndex: Number(0),
    type:String(''),
    dataStory:[]
  },

  onLoad(){
    let lang = getApp().globalData.languagePack;
    const dataStory=[
      {
        title: lang.rspIntroductionScreenIntroductionLabelSlide1,
        subTitle:lang.rspIntroductionScreenBodyLabelSlide1,
        image:"/image/asvg_investment_intro_second.svg"
      },
      {
        title: lang.rspIntroductionScreenIntroductionLabelSlide2,
        subTitle:lang.rspIntroductionScreenBodyLabelSlide2,
        image:"/image/story_date.svg"
      },
      {
        title: lang.rspIntroductionScreenIntroductionLabelSlide3,
        subTitle:lang.rspIntroductionScreenBodyLabelSlide3,
        image:"/image/story_note.svg"
      },
    ]

    this.setData({
      lang,
      dataStory,
    })
  },

  onSwiperChange(e) {
    this.setData({
      currentIndex: e.detail.current
    });
  },

  navBack(){
    if (this.data.show) {
      my.navigateTo({
        url:"/pages/home/home"
      })
    }else{
      this.setData({
        type :false,
        show:true
      })
    }
  
  },

  handleClick(e){
    const  data = e.target.dataset.props
    this.setData({
      type : data === "story" ? "storyWithoutProgress": data=== "dots"?"storyWithDots":"storyProgressBar",
      show:false
    })
  },

  scrollToNext() {
    const {
      currentIndex
    } = this.data;
    if (currentIndex < this.data.dataStory.length) {
      this.setData({
        currentIndex: currentIndex + 1
      });
    }

  },

  scrollToPrev() {
    const {
      currentIndex
    } = this.data;
    if (currentIndex > 0) {
      this.setData({
        currentIndex: currentIndex - 1
      });
    }
  },

  handleMoveScreen(){

  }
});
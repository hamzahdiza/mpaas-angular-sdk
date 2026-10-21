Page({
  data: {
    currentIndex: 0,
    type:'',
    show:true,
    dataButton:[
      {
        title:"Story With Progress Bar Animation",
        type:"storyProgress"
      },
      {
        title:"Story Without Progress Bar",
        type:"story"
      },
    ],
    dataStory:[
      {
        title: "Kapan ya waktu paling pas buat beli produk investasi?",
        subTitle:"Jangan sampai kegalauan begini bikin kamu ragu konsisten berinvestasi. Rutinin dulu aja!",
        image:"/pages/assets/images/story_bank.svg"
      },
      {
        title: "Kapan ya waktu paling pas buat beli produk investasi?",
        subTitle:"Jangan sampai kegalauan begini bikin kamu ragu konsisten berinvestasi. Rutinin dulu aja!",
        image:"/pages/assets/images/story_date.svg"
      },
      {
        title: "Kapan ya waktu paling pas buat beli produk investasi?",
        subTitle:"Jangan sampai kegalauan begini bikin kamu ragu konsisten berinvestasi. Rutinin dulu aja!",
        image:"/pages/assets/images/story_note.svg"
      },
    ]
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

  handleClickPrimaryButton(){
    const {
      currentIndex
    } = this.data;
    if (currentIndex < this.data.dataStory.length) {
      this.setData({
        currentIndex: currentIndex + 1
      });
    }
  }
});
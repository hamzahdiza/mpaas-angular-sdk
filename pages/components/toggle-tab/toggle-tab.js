Page({
  data: {
    current:1,
    currentScroll:1,
    loading:true,
    items:[
      {
        title: 'Insight',

      },
      {
        title: 'Transaction',
      },
      {
        title: 'Plans',
      },
 
    ],
    items1:[
      {
        title: 'TEXT',
        badge:100,
      },
      {
        title: 'TEXT',
        badge:100,
      },
      {
        title: 'TEXT',
        badge:100,
      },
      {
        title: 'TEXT',
        badge:100,
      },
      
    ],
    items2:[
      {
        title: 'Harian',
      },
      {
        title: 'Bulanan',
      },
      {
        title: 'Quarter',
      },
      {
        title: 'Annual',
      },
  
    ],
    items3:[
      {
        iconActive: '../../assets/icons/ic_common_chart_outline_active.svg',
        iconPassive:'../../assets/icons/ic_common_chart_outline_passive.svg'
      },
      {
        iconActive: '../../assets/icons/ic_common_pie_chart_active.svg',
        iconPassive:'../../assets/icons/ic_common_pie_chart_passive.svg'
      },
      {
        iconActive: '../../assets/icons/ic_common_pie_chart_active.svg',
        iconPassive:'../../assets/icons/ic_common_pie_chart_passive.svg'
      },
    
    ],
    items4:[
      {
        title: 'Insight',
        id:'test12313'
      },
      {
        title: 'Transaction',
        id:'button2'
      },
    ],
    items5:[
      {
        title: '1',
        id:'button 1'
       
      },
      {
        title: 'Bulanan',
        id:'button toggle 2'
      },
  
      {
        title: 'Pendapatan Tetap',
        icon:'../../assets/icons/ic_common_cancel_outlined.svg'
      },
      {
        title: 'Pasar Uang',
      },
      {
        title: 'januari',
      },
  
    ],
  },
  onLoad() {
    setTimeout(()=>{
      this.setData({
        loading:false
      })
    },3000)
  },
  handleClick(e){
    this.setData({
      current:e.target.dataset.num,
    })
  },
  swipeChange(e){
    this.setData({
      current:e.detail.current
    })
  }
});

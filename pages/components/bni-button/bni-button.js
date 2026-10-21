Page({
  data: {
    exampleData: [{
        exp: 1
      },
      {
        exp: 2
      }
    ],
    style:{"background-color":"#CEBAA2"}
  },
  onLoad() {},
  handleClick(e) {

    my.alert({
      title: e.currentTarget.id ? `Clicked with id ${e.currentTarget.id}` : "Clicked button with no id"
    })
  },
  handleSubmit(e) {
    my.alert({
      title: e.detail.value.input1 ? `Clicked sumbitted form: ${e.detail.value.input1}` : "form empty"
    })
  },

  handleClickPrimaryButton(e) {
    my.alert({
      title: e.currentTarget.id ? `Primary Button Clicked with id ${e.currentTarget.id}` : "Clicked primary button with no id"
    })
  },

  handleClickSecondaryButton(e) {
    my.alert({
      title: e.currentTarget.id ? `Secondary Button Clicked with id ${e.currentTarget.id}` : "Clicked secondary button with no id"
    })
  },
});
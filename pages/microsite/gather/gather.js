Page({
  data: {
  },
  onLoad(query) {
    console.info(JSON.parse(query.data));

    my.alert({
      content: query.data
    })
  },
});

Page({
  data: {},
  onLoad() {
  },
  chooseFileFromDisk(){
    
    // my.request({
    //   url: 'https://api.imgbb.com/1/upload?expiration=600&key=c0cc9015f2022669a17771dba0c0b704',
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   },
    //   data: {
    //     image:"iVBORw0KGgoAAAANSUhEUgAAABwAAAAgCAYAAAABtRhCAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAD7SURBVHgB7ZRBDsFAFIb/N2rvCL0B2xJJHUfEwglwAhLEEjdwAxKRbh2hbuAA+p4pGws6r1K7+Zbt/943k3kzgKdiCGU5LWJjENvKBotcYLIjolGqLdcLk1lIqG9sQfz+WYBUREZoD/eaNjrhS3aw4fBbhO/SQ3d4hAMDBUaCSZEshwLaQNNLExJDTVfmuaDzquXKqYQkcDbKCZgbroxKCJErKkInBBQTSOm9qqFhCuZ2/m9FGXuGUyjQ7TDqpyzUy3fx8T/LNIsGWygo99Ik67AGju1lH9tztQNCOxZs0Rlc8E8oWR5MshT8gHZoKsMLvdALvdALvdALgQcEGEVOzIPS9gAAAABJRU5ErkJggg=="
    //   },
    //   success: (result) => {
    //     console.log("upload success");
    //   },
    //   fail: () => {
    //     console.log("upload fail");
    //   }
    // });

    my.chooseFileFromDisk({
      success: (res) => {
        my.alert({
          content: JSON.stringify(res, "masuk"),
        });
      },
      fail: (res) => {
        my.alert({
          content: JSON.stringify(res, "error"),
        });
      }
  	});
  },
});

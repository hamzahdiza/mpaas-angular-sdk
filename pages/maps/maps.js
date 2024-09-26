Page({
  data: {
    isLoading: true,
    titleBarHeight: 0,
    statusBarHeight: 0,
    micrositeURL: "http://8.210.58.52:9432/distribute-interface/#/?language=id&flag=KO9Fea&phoneNo=nDWIXtF6X%2BGPN0tSFofMtsJbMYe%2FqW8CDuBUdNViPxcmJo7SuqrjUsLvBPH%2B%2FHCx%2F96UW2aWJpv%2FQXtke1jE1T46n4wOlVfIpz3Rs1mH9jKEAZrX%2FaVhNCqpS0hk9ZP1ll%2B8YWcpMEHcUNiFO%2FMMg9xJ1JWTSIqzfdxUcSsE5SrjR85SRXLgWH7PpmzvtokckC4SnYiv6220l%2FsRhs0zLF2wcJWTCEjVq0LlrMCXuC9gv2H203nT%2FEGgwh65IHnfL02XlT30kiSPKiPyrDZNRigh%2FSE1vFcslI%2BbpcxEdExpaU2nbgzUjwVKH7BHdsIYjJcL1QkCXWrak1c4pUKVEw%3D%3D&email=PT5GkhgYSCCcuBkUbApKxE0XzK3530a4xFc5lqedOfaam3ncp87cxCG2QzL7bEjSrmsNTUSUw4JjKngoJxCXGDX5KDePfD2mEHoxN2ZyxsMHDhzydB24SOOjZjwNnpi8u7ELTcy1S9BPWx3VDGV2P8g5moQugiih%2FUYDxBmpSyyPdsoga6E9tht33OBqkhz89rQksA3FgJ5MLi6VfkgWw3a%2B32L%2F%2Bmhztr4GUPICQ7BzoIprsymFHtaZRf6f9Iun3HyacaNlgiVmgucQ5lzpY%2BmuVcPAsdW8F9K3rvSx12j6lVt5Fm37dKp8h0oua6wLgkY905APOZd%2B%2BLnCgGzAwg%3D%3D&name=KnD3QUyc%2BVSS%2F5cKCEXkO94CKTfr5rlTQf6LlBY3mHvZQhkKFAI9y1KuHGYoACgJn4qIMaZn%2FuDU78AXWJ3NB27CiR%2FdRTcltZmf72W8OAUshmGwkuKFXumF6RlS2Ic9Hh7r2FPRoRub98nbJ2925e%2FXz509CUB8JvgpgbWfLT6SjdQKn%2B5DD7wOZQ7%2FQRmCKQ%2BzdfM0DM9bcD4M90pr7d%2FvR7pEuNMPpYRKCdpicn3ApWSRAjhvMZQqnjeY3vWbl1iAQTd77k08fsB8zr30cR%2BMTfYU1r7CudppksJtURUc%2F5N8U40uZTajYn54bMeuPNNC9Jjsoy8Fcpg5hoTD5Q%3D%3D"
  },
  onLoad() {
    my.on('nativeToTiny', (resp) => {
      console.info('MAV_SUCCESS_CALL', JSON.stringify(resp))
      my.navigateTo({
        url: `/pages/gather/gather?data=${JSON.stringify(resp)}`,
        success: (res) => {
          console.info('MAV_NAVIGATE_SUCCESS', res)
        },
        fail: (err) => {
          console.info('MAV_ERROR', err)
        }
      })
    })
    // Delay the loading of the WebView by 3 seconds
    setTimeout(() => {
      this.setData({
        isLoading: false, // Hide loading screen after 3 seconds
      });
    }, 3000);

    const {
      titleBarHeight,
      statusBarHeight,
    } = my.getSystemInfoSync();
    this.setData({
      titleBarHeight,
      statusBarHeight,
    });
    
  },
});
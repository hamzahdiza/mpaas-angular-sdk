export default function callJsApi(method, obj) {
  my.call(method,obj,{
    success: (res) => {
      if (!res) {
        my.nativeNeeUpdateFunc(true)
      } else {
        return res
      }
    },
  });
}
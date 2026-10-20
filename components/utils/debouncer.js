let timeout;
export function debouncer(callback, delay) {
  clearTimeout(timeout);
  
  timeout = setTimeout(() => {
    callback();
  }, delay);
}

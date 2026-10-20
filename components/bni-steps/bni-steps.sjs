function getClassName(current, index, status) {
  current = current || 0;
  if (index < current) {
    return 'complete';
  }
  if (index === current) {
    if (status === 'error') {
      return 'error';
    }
    return 'selected';
  }
  if (index > current) {
    if (status === 'error') {
      return 'blocked';
    }
    return 'incomplete';
  }
}
export default {
  getClassName: getClassName
};
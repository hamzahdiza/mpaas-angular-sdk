/**
 * this function
 * 
 * 
 * 
 * @param {String} minimumVersion - Minimum version to compare
 * @param {String} currentVersion - Current Version to compare
 * @returns {Boolean} - The return will be boolean, if false it means the current version is already met the minimum version, vice versa
 */
export function checkMinimumVersion(minimumVersion, currentVersion) {
  if(minimumVersion === currentVersion){
    return false
  }
  const partsA = minimumVersion.split('.').map(Number);
  const partsB = currentVersion.split('.').map(Number);
  const length = Math.max(partsA.length, partsB.length);

  for (let i = 0; i < length; i++) {
    const numA = partsA[i] || 0;
    const numB = partsB[i] || 0;

    if (numA > numB) return true;
    if (numA < numB) return false;
  }

  
}
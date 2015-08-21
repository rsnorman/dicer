function round(degrees) {
  if (typeof degrees === 'undefined' || degrees === null) {
    return degrees;
  }
  return Math.round(degrees * 100) / 100;
}

module.exports = {
  round: round
};

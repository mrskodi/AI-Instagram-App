const passwordStrength = (password, regex) => {
  
  return password.match(regex);
}

module.exports = passwordStrength;
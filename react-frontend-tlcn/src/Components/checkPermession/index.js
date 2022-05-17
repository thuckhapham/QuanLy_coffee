const checkPermesion = (roles) => {
  const coffeeRole = localStorage.getItem("coffeeRole");
  if (coffeeRole == null) return null;
  // else if (roles.includes(coffeeRole)) return true;
  // else false;
  return roles.includes(coffeeRole);
};

export default checkPermesion;

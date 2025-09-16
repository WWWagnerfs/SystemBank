const generateId = (prefix) => {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}_${randomNum.toString().padStart(3, '0')}`;
};

export default generateId;

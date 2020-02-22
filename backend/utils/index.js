export const convertToArray = (obj) => {
  const dataArray = [];
   if (obj !== undefined || obj !== null) {
     const { dishName, morning, noon, night } = obj;
     if (morning !== 0) {
       const addParam = {
         dishName,
         dishNum: morning,
         dishType: '早餐',
       };
       dataArray.push(addParam);
     }
     if (noon !== 0) {
        const addParam = {
          dishName,
          dishNum: noon,
          dishType: '午餐',
        };
        dataArray.push(addParam);
      }
      if (night !== 0) {
        const addParam = {
          dishName,
          dishNum: night,
          dishType: '晚餐',
        };
        dataArray.push(addParam);
      }
   }
   return dataArray;
}

export const getRandomNumbers = () => {
  let numbersArray = '';
  const strs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 6; i ++ ) {
    const index = Math.round(Math.random()*strs.length);
    numbersArray += strs.charAt(index)
  }
  return numbersArray;
}
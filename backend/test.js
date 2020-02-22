 getRandomNumbers = () => {
    let numbersArray = '';
    const strs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 6; i ++ ) {
      const index = Math.round(Math.random()*strs.length);
      numbersArray += strs.charAt(index)
    }
    return numbersArray;
  }
  
  console.log(getRandomNumbers());
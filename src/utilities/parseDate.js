// function for parsing date from database into human friendly string, ex: 5/10 11 AM
// returns array with am-pm as second item to be rendered as small text

function parseDate(date) {
  let hour = "";
  let minutes = "";
  let amPm = "";
  let meetDate = "";
  
  for (let i = 0; i < date.length; i++) {
    if (i === 0 && date[i] === '0')
      continue;
    else if (i < 2) 
      hour += date[i];
    
    if (i > 1 && i < 5)  
      if (date[3] === '0' && date[4] === '0') {
        i = 5;
        continue;
      }  else
        minutes += date[i];
        
     if (i > 5 && i < 8)
       amPm += date[i];
       
     if (i > 8 && i < 14) {
       if (i === 9 && date[i] === '0')
         continue;
       else
         meetDate += date[i]; 
     }    
  }
  return [`${meetDate} ${hour}${minutes} `, amPm]
}



 
module.exports = { parseDate };
// accepts rich text editor object and returns a 
// truncated meeting description to display on schedule page list
function trimDescription(description) {
  let parsedDescrip = JSON.parse(description);
  let text = parsedDescrip.blocks[0].text.slice(0,100);
  let count = 0;
 // make sure text is trimmed at space instead of middle of word
  while (text[text.length-1] !== " " && count < 100) {
      text = text.slice(0,-1);
      count++;
  }
  text += ' . . .';
  parsedDescrip.blocks[0].text = text;
  return JSON.stringify(parsedDescrip);
}

module.exports = { trimDescription };
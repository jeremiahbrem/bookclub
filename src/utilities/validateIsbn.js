function validateIsbn(input) {
  const isbn = input.replace("-","");
  if (!parseInt(isbn))
    return false;
  else if (isbn.length !== 13 && isbn.length !== 10)
    return false;
  return true;
}


module.exports = { validateIsbn };
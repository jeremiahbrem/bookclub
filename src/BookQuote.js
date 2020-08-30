import React from "react";
import "./BookQuote.css";
 
const BookQuote = ({night}) => {
  return (
    <div className={`BookQuote ${night && 'BookQuote-night'}`}>
      <p className={`BookQuote-text ${night && 'BookQuote-text-night'}`}>
      "And that was why she shrieked and fainted when she saw the coronet," 
       cried Mr. Holder. <span>"Oh, my God! what a blind fool I have been! And his 
       asking to be allowed to go out for five minutes!</span> The dear fellow wanted 
       to see if the missing piece were at the scene of the struggle. How 
       cruelly I have misjudged him!"
      </p>
    </div>
  );

}
 
export default BookQuote;
import React, { useState } from "react";
import "./Contact.css";
 
const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [favorite, setFavorite] = useState("");
  // Success form submitted message
  const [showMessage, setShowMessage] = useState(false);

  function handleChange(event) {
    const target = event.target;
    const name = event.target.name;
  
    if (name === 'name')
      setName(target.value);
    else if (name === 'email')
      setEmail(target.value); 
    else  
      setFavorite(target.value);   
  }

  function handleSubmit(event) {
    event.preventDefault();
    // test that form processes input data
    console.log(`Name: ${name} Email: ${email} Favorite read: ${favorite}`)
    setName("");
    setEmail("");
    setFavorite("");
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 4000);
  }
 
  return (
    <div className="Contact">  
      <div className="Contact-img"></div> 
      <div className="Contact-form-cont">
        <h3>Interested in book club?, <br/><b>we’d love to here from you</b></h3>
        <div className={`Contact-message ${showMessage && 'Contact-message-show'}`}>
          Thanks! We'll be in touch soon.</div>
        <form className="Contact-form" onSubmit={handleSubmit}>
          <label className="Contact-label">Name:</label>
          <input className="Contact-input" type="text" value={name} name="name" onChange={handleChange} required/>
          <label className="Contact-label">Email:</label>
          <input className="Contact-input" type="text" value={email} name="email" onChange={handleChange} required/>
          <label className="Contact-label">Favorite read:</label>
          <input className="Contact-input" type="text" value={favorite} name="favorite" onChange={handleChange} required/>
          <div className="Contact-recaptcha">
            <div className="Contact-recaptcha-bg"></div>
            <div className="Contact-icon"></div>
            <div className="Contact-check"></div>
          </div>
      
          <button className="Contact-button" type="submit"><p>Send</p></button>
        
        </form>
      </div>
    </div> 
  );
  
}



 
export default Contact;
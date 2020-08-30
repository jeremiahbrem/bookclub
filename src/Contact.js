import React, { useState } from "react";
import "./Contact.css";
 
const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [select, setSelect] = useState("default");
  const [toggle, setToggle] = useState(false);

  function handleChange(event) {
    const target = event.target;
    const name = event.target.name;
  
    if (name === 'name')
      setName(target.value);
    else if (name === 'email')
      setEmail(target.value);
    else if (name === 'slider')
      setToggle(target.checked); 
    else  
      setSelect(target.value)   
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(`Name: ${name} Email: ${email} Join List: ${toggle} Reason: ${select}`)
  }
 
  return (
    <div className="Contact">  
      <div className="Contact-img"></div> 
      <div className="Contact-form-cont">
        <h3>Interested in book club?, <br/><b>we’d love to here from you</b></h3>
        <form className="Contact-form" onSubmit={handleSubmit}>
          <label className="Contact-label">Name:</label>
          <input className="Contact-input" type="text" value={name} name="name" onChange={handleChange} required/>
          <label className="Contact-label">Email:</label>
          <input className="Contact-input" type="text" value={email} name="email" onChange={handleChange} required/>
          <label className="Contact-label">Favorite read:</label>
          <input className="Contact-input" type="text" value={email} name="email" onChange={handleChange} required/>
          <div className="Contact-recaptcha">
            <div className="Contact-recaptcha-bg"></div>
            <div className="Contact-icon"></div>
            <div className="Contact-check"></div>
          </div>
      
          <button className="Contact-button"><p>Send</p></button>
        
        </form>
      </div>
    </div> 
  );
  
}



 
export default Contact;
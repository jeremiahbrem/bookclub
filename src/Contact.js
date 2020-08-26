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
      <form className="Contact-form" onSubmit={handleSubmit}>
        <label className="Contact-label">Name</label>
        <input className="Contact-input" type="text" value={name} name="name" onChange={handleChange} required/>
        <label className="Contact-label">Email</label>
        <input className="Contact-input" type="text" value={email} name="email" onChange={handleChange} required/>
        <label className="Contact-slider-label">Join Email List</label>
        <label className="Contact-switch">
          <input name="slider" checked={toggle} onChange={handleChange}
            type="checkbox"/><span className="Contact-slider round"></span>
        </label>
        <select value={select} name="select" className="Contact-select" onChange={handleChange}>
            <option value="default" disabled>Reason for Contact</option>
            <option value="member">Become a member</option>
            <option value="refer">Refer a book</option>
            <option value="tech">Technical problems</option>
            <option value="other">Other</option>
        </select>

        <button className="Contact-button" type="submit" value="Submit">Submit</button>
      </form>
    </div> 
  );
  
}



 
export default Contact;
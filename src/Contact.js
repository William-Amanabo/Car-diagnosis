import mechanic from "./mechanic.png";
import React from "react";

const Contact = () => {
  console.log("Contact rendered");
  return (
    <div className="itemContainer">
      <div className="item">
        <img className="image" src={mechanic} />
        <h2>Mechanic Ola</h2>
      </div>
      <div className="item">
        <div>Phone Number</div>
        <div>+123090904343</div>
      </div>
      <div className="item">
        <div>SMS</div>
        <div>+123090904343</div>
      </div>
      <div className="item">
        <div>Send Log</div>
        <div>
          <input type="file"></input>
        </div>
      </div>
    </div>
  );
};

export default Contact;

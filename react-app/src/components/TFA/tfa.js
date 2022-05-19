import React from "react";
import QRCode from "react-google-qrcode";
import './tfa.css'


function TFA () {

    return (
      <div className="container">
        <div>TFA Authentication</div>
        <div>
          <QRCode data="https://www.google.com" size={130} framed />
        </div>
      </div>
    );
}

export default TFA;



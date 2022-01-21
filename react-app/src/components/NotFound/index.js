import React from "react";
import { useNavigate } from "react-router-dom";
import "./notfound.css";


function NotFound() {
  const hist = useNavigate();

  const back = (e) => {
    e.preventDefault();
    hist(`/`);
  };

    return (
      <div id="not-found">
        <nav className="Hieroglyphics">
          <div class="container">
            <h1>An error has occured</h1>
            <button className="not-back" onClick={back}>Go back</button>
          </div>
        </nav>
      </div>
    );

}

export default NotFound;

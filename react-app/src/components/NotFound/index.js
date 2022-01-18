import "./notfound.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {

    return (
      <div>
        <nav className="Hieroglyphics">
          <div class="container">
            <h1>An error has occured</h1>
            <a href="/">Go back</a>
          </div>
        </nav>
      </div>
    );

}

export default NotFound;

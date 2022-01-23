import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/session";
import "./bio.css";

const Bio = () => {
  const dispatch = useDispatch();
  const hist = useNavigate();

  const back = (e) => {
    e.preventDefault();
    hist(`/home`);
  };

  return (
    <div className="bio">
      <nav className="bio-main-div">
        <div className="leftNav">
          <img
            id="home-button"
            onClick={back}
            src="https://cdn.discordapp.com/attachments/919391399269515305/932090523496370277/logo-removebg-preview.png"
            alt="logo"
          ></img>
          <h2>Pharaohs</h2>
        </div>
        <div className="rightNav">
          <button
            id="signout"
            onClick={async () => {
              await dispatch(logout());
              hist("/");
            }}
          >
            Log Out
          </button>
        </div>
      </nav>
      <br />
      <br />
      <div className="bio-content">
        <h3 id="bio-text">
          As ancient Egyptian rulers, pharaohs were both the heads of state and
          the religious leaders of their people. The word “pharaoh” means “Great
          House,” a reference to the palace where the pharaoh resides. While
          early Egyptian rulers were called “kings,” over time, the name
          “pharaoh” stuck.
        </h3>
        <br />
        <span id="span">Who are pharaohs and why are they important?</span>
        <h3>
          The ruler of ancient Egypt was called pharaoh . Pharaohs were looked
          upon as more than rulers. They were Gods chosen to lead the people and
          maintain order, and provided an important link between the Egyptian
          people and their gods.{" "}
        </h3>
        <br />
        <span id="span">Where did pharaohs come from?</span>
        <h3>
          Pharaoh, (“great house”), originally, the royal palace in ancient
          Egypt. The word came to be used metonymically for the Egyptian king
          under the New Kingdom (starting in the 18th dynasty, 1539–1292 bce),
          and by the 22nd dynasty (c. 945–c. 730 bce) it had been adopted as an
          epithet of respect.
        </h3>
        <br />
        <h2>Ancient Egypt</h2>
        <h3>
          Ancient Egypt was a civilization of ancient Africa, concentrated along
          the lower reaches of the Nile River, situated in the place that is now
          the country Egypt. Ancient Egyptian civilization followed prehistoric
          Egypt and coalesced around 3100 BC (according to conventional Egyptian
          chronology)[1] with the political unification of Upper and Lower Egypt
          under Menes (often identified with Narmer).[2] The history of ancient
          Egypt occurred as a series of stable kingdoms, separated by periods of
          relative instability known as Intermediate Periods: the Old Kingdom of
          the Early Bronze Age, the Middle Kingdom of the Middle Bronze Age and
          the New Kingdom of the Late Bronze Age.
        </h3>
        <span id="span">How old is Egypt ancient?</span>
        <h3>
          For almost 30 centuries—from its unification around 3100 B.C. to its
          conquest by Alexander the Great in 332 B.C.—ancient Egypt was the
          preeminent civilization in the Mediterranean world.
        </h3>
      </div>
      <div className="bio-images">
        <img id="img-1"></img>
        <br />
        <img id="img-2"></img>
      </div>
    </div>
  );
};

export default Bio;

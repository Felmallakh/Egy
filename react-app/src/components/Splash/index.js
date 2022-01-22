import Reach, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./splash.css";

function Splash() {
  const slideShowArr = [];
  slideShowArr[0] = "./Images/pic1.jpg";
  slideShowArr[1] = "./Images/pic2.jpg";
  slideShowArr[2] = "./Images/pic3.jpg";
  slideShowArr[3] = "./Images/pic4.jpg";
  slideShowArr[4] = "./Images/pic5.jpg";
  slideShowArr[5] = "./Images/pic6.jpg";
  slideShowArr[6] = "./Images/pic7.jpg";
  slideShowArr[7] = "./Images/pic8.jpg";
  slideShowArr[8] = "./Images/pic9.jpg";
  slideShowArr[9] = "./Images/pic10.jpg";
  slideShowArr[10] = "./Images/pic11.jpg";

  // Background slideshow
  let i = 0;
  let time = 2000;

  const slideShow = () => {
    const splashContainer = document.body;
    splashContainer.style.backgroundImage = `url(${slideShowArr[i]})`;

    if (i < slideShowArr.length - 1) {
      i++;
    } else {
      i = 0;
    }
  };

  let imagesLoaded = false;

  Promise.all(
    Array.from(document.images)
      .filter((img) => !img.complete)
      .map(
        (img) =>
          new Promise((resolve) => {
            img.onload = img.onerror = resolve;
          })
      )
  ).then((res) => {
    imagesLoaded = true;
  });

  useEffect(() => {
    if ((imagesLoaded = true)) {
      const slideShowTimer = setInterval(slideShow, time);

      return () => clearInterval(slideShowTimer);
    }
  }, [imagesLoaded]);

  const hist = useNavigate();
  return (
    <div id="splash-container">
      <nav>
        <div className="leftNav">
          <img
            src="https://cdn.discordapp.com/attachments/919391399269515305/932090523496370277/logo-removebg-preview.png"
            alt="logo"
          ></img>
          <h2>Egypt Destinations</h2>
        </div>
        <div className="rightNav">
          <button
            id="signin"
            onClick={() => {
              hist("/login");
            }}
          >
            SIGN IN
          </button>
        </div>
      </nav>
      <div className="titleContent">
        <h1>Find your next destination</h1>
        <button
          id="explore"
          onClick={() => {
            hist("/signup");
          }}
        >
          EXPLORE
        </button>
      </div>
      <footer>
        <a href="https://github.com/felmallakh">
          <i className="fab fa-github"></i>
        </a>
        <a href="https://https://www.linkedin.com/in/fady-el-mallakh-05a84329">
          <i className="fab fa-linkedin-in"></i>
        </a>
        <a href="https://angel.co/u/fady-el-mallakh">
          <i className="fab fa-angellist"></i>
        </a>
      </footer>
    </div>
  );
}
export default Splash;

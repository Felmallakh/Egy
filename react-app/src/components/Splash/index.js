import Reach, { useEffect } from 'react';
import {useNavigate} from "react-router-dom"
import './splash.css'

function Splash(){


    const slideShowArr = [];
    slideShowArr[0] = "https://cdn.discordapp.com/attachments/919391399269515305/932226922589585448/011.jpg"
    slideShowArr[1] = "https://cdn.discordapp.com/attachments/919391399269515305/932226922417647666/012.jpg"
    slideShowArr[2] = "https://cdn.discordapp.com/attachments/919391399269515305/932226922216312892/013.jpg"
    slideShowArr[3] = "https://cdn.discordapp.com/attachments/919391399269515305/932226921973035058/014.jpg"
    slideShowArr[4] = "https://cdn.discordapp.com/attachments/919391399269515305/932226921754935316/015.jpg"
    slideShowArr[5] = "https://cdn.discordapp.com/attachments/919391399269515305/932226921452933171/016.jpg"
    slideShowArr[6] = "https://cdn.discordapp.com/attachments/919391399269515305/932226921209688135/017.jpg"
    slideShowArr[7] = "https://cdn.discordapp.com/attachments/919391399269515305/932226921012559892/018.jpg";
    slideShowArr[8] = "https://cdn.discordapp.com/attachments/919391399269515305/932226920790241310/019.jpg"
    slideShowArr[9] = "https://cdn.discordapp.com/attachments/919391399269515305/932226920534392912/0110.jpeg"
    slideShowArr[10] = "https://cdn.discordapp.com/attachments/919391399269515305/932226948816580618/0111.jpg"
    slideShowArr[11] = "https://cdn.discordapp.com/attachments/919391399269515305/932226949030494328/0122.jpg"

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

    Promise.all(Array.from(document.images).filter(img => !img.complete).map(img => new Promise(resolve => { img.onload = img.onerror = resolve; }))).then((res) => {
        imagesLoaded = true;
    });

    // useEffect(() => {

    //     if (imagesLoaded = true) {
    //         const slideShowTimer = setInterval(slideShow, time);

    //         return () => clearInterval(slideShowTimer);
    //     }

    // }, [imagesLoaded])


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
          <button id="explore"
            onClick={() => {
              hist("/signup");
            }}
          >
            EXPLORE
          </button>
        </div>
      </div>
    );
}
export default Splash;

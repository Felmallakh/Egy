import './splash.css'
import {useNavigate} from "react-router-dom"
function Splash(){
    const hist = useNavigate();
    return (
        <div className="wrapper">
            <nav>
                <div className="leftNav">
                    <img src="https://cdn.discordapp.com/attachments/919391399269515305/932090523496370277/logo-removebg-preview.png" alt="logo"></img>
                    <h2>Egypt Destinations</h2>
                </div>
                <div className="rightNav">
                    <button id="search">Search</button>
                    <button id="signin" onClick={() => {
                        hist("/login");
                    }}>SIGN IN</button>
                </div>
            </nav>
            <div className="titleContent">
                <h1>Find your next destination</h1>
                {/* <p>Transform the way you work with one place for everyone and everything you need to get stuff done.</p> */}
                <button onClick={() => {
                    hist("/signup");
                }}>Try it!</button>
            </div>
        </div>
    )
}
export default Splash;

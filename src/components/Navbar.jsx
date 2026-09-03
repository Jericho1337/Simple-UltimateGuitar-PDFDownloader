import '../styles/Navbar.css';
import githubIcon from "../assets/githubicon.png"

function Navbar() {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
            <a href="https://github.com/Jericho1337/Simple-UltimateGuitar-PDFDownloader">
                <img src={githubIcon} alt="Github Page" style={{width: '50px', height: '50px', display: 'block'}} />
            </a>
        </div>
    );
};

export default Navbar;
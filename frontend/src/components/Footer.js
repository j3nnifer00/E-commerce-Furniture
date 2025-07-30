import { Link } from "react-router-dom";
import "./footer.css"
// Footer

const Footer = () => {
    return (
        <footer>
            <div className="footer-container">
                <div className="column" id="business-info">
                    <h4>business info</h4>
                        <p>Anything you need for your home or room. It's most be a minimalist and beautiful</p>
                        <ul>
                            <li>451 Wall Street, UK, London</li>
                            <li>Phone: (064) 123-1233</li>
                            <li>Fax: (099) 456-4566</li>
                        </ul>
                        <p>Follow our socials |</p>
                        <br />
                        <Link to = "/admin"><div>admin?</div></Link>
                </div>
                <div className="column" id="our-stores">
                    <h4>our stores</h4>
                    <ul>
                        <li>Indonesia JKT</li>
                        <li>London SF</li>
                        <li>Cockster BP</li>
                        <li>Los Angels</li>
                        <li>Chicago</li>
                        <li>Las Vegas</li>
                    </ul>
                </div>
                <div className="column" id="useful-links">
                    <h4>useful links</h4>
                    <ul>
                        <li>Privacy Policy</li>
                        <li>Returns</li>
                        <li>Terms & Conditions</li>
                        <li>Contact Us</li>
                        <li>Latest News</li>
                        <li>Our Sitemap</li>
                    </ul>
                </div>
                <div className="column" id="company">
                    <h4>company</h4>
                    <ul>
                        <li>About us</li>
                        <li>Carrers</li>
                        <li>Our Customers</li>
                        <li>Blog</li>
                        <li>Events</li>
                        <li>Contact us</li>
                    </ul>
                </div>
            </div>
            <hr></hr>
            <div className="copyright">
                &copy; 2024 SereneSpaces. Site by Jenn <br />
            </div>

        </footer>
    );
};

export default Footer;
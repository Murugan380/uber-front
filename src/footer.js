
import './footer.css'
function Footer() {
  return (
    <footer className="uber-footer">
      <div className="footer-container">
        {/* Column 1 - Logo & About */}
        <div className="footer-col">
          <h2 className="footer-logo">Uber</h2>
          <p>
            The easiest way to get around your city. Book rides, order food, and
            enjoy a reliable service at your fingertips.
          </p>
          <div className="app-buttons">
            <button>📱 Get on Play Store</button>
            <button>🍏 Get on App Store</button>
          </div>
        </div>

        {/* Column 2 - Company Links */}
        <div className="footer-col">
          <h3>Company</h3>
          <ul>
            <li><a href="#home">About Us</a></li>
            <li><a href="#home">Careers</a></li>
            <li><a href="#home">Become a Partner</a></li>
            <li><a href="#home">Newsroom</a></li>
            <li><a href="#home">Blog</a></li>
          </ul>
        </div>

        {/* Column 3 - Support Links */}
        <div className="footer-col">
          <h3>Support</h3>
          <ul>
            <li><a href="#home">Help Center</a></li>
            <li><a href="#home">Safety Info</a></li>
            <li><a href="#home">Community Guidelines</a></li>
            <li><a href="#home">Terms of Service</a></li>
            <li><a href="#home">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Column 4 - Contact & Social */}
        <div className="footer-col">
          <h3>Contact</h3>
          <p>Email: support@uberclone.com</p>
          <p>Phone: +91 98765 43210</p>
          <h3 style={{ marginTop: "15px" }}>Follow Us</h3>
          <div className="footer-socials">
            <a href="#">🌐</a>
            <a href="#">📘</a>
            <a href="#">🐦</a>
            <a href="#">📸</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Uber Clone. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;

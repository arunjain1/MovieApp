import React from 'react'
import { Link } from 'react-router-dom';
import "./Styling/Footer.css";
function Footer() {
  return (
    <div className='footer_cont'>
       <div class="container">
      <div class="row">
        <div class="footer-col">
          <h4>Movies</h4>
          <ul>
            <li><Link to="/genre/28/1">Action</Link></li>
            <li><Link to="/genre/12/1">Adventure</Link></li>
            <li><Link to="/genre/878/1">Sci-fi</Link></li>
            <li><Link to="/genre/53/1">Thriller</Link></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Country</h4>
          <ul>
            <li><Link to = "/country/IN/1">India</Link></li>
            <li><Link to = "/country/US/1">United States</Link></li>
            <li><Link to = "/country/TW/1">Taiwan</Link></li>
            <li><Link to = "/country/KR/1">South Korea</Link></li>
            <li><Link to = "/country/CN/1">China</Link></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Help</h4>
          <ul>
            <li><a href="#">Blog</a></li>
            <li><a href="#">DCMA</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Follow Me</h4>
          <div class="social-links">
            <a href="https://www.linkedin.com/in/
arun-jain-5aa013154"><i class="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </div>
     </div>
    </div>
  )
}

export default Footer
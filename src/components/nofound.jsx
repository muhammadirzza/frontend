import React, {Component} from 'react'
import '../colorlib-error-404-16/colorlib-error-404-16/css/style.css'

class Notfound extends Component{
    render() {
        return (
            <div id="notfound">
              <div className="notfound-bg" />
              <div className="notfound">
                <div className="notfound-404">
                  <h1>404</h1>
                </div>
                <h2>we are sorry, but the page you requested was not found</h2>
                <a href="#" className="home-btn">Go Home</a>
                <a href="#" className="contact-btn">Contact us</a>
                <div className="notfound-social">
                  <a href="#"><i className="fa fa-facebook" /></a>
                  <a href="#"><i className="fa fa-twitter" /></a>
                  <a href="#"><i className="fa fa-pinterest" /></a>
                  <a href="#"><i className="fa fa-google-plus" /></a>
                </div>
              </div>
            </div>
          )
      }
  }

export default Notfound
import React, { Component } from 'react';
// import '../App.css';
import { MDBInput } from 'mdbreact'

/* <h2>Weekly Coding Challenge #1: Sign in/up Form</h2> */
class LoginLogout extends Component{
    state={
        is_swap:false
    }

    onSwapClick=()=>{
        this.setState({is_swap:!this.state.is_swap})
    }
    
    render() {
        return(
        <div style={{marginTop:"150px"}}>
            <div className={this.state.is_swap===false?"container" : "container right-panel-active" } id="container">
                <div className="form-container sign-up-container">
                    <form className="formlog" action="#">
                        <h1>Create Account</h1>
                        <div className="social-container">
                            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                        <span>or use your email for registration</span>
                        <div className="form-group">
                            <MDBInput label="Name" outline />
                            <MDBInput label="Email" outline />
                            <MDBInput label="Password" outline type="password" />
                        </div>
                        {/* <input type="text" placeholder="Name" />
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" /> */}
                        <button>Sign Up</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form className="formlog" action="#">
                        <h1>Sign in</h1>
                        <div className="social-container">
                            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                        <span>or use your account</span>
                        <div className="form-group">
                            <MDBInput label="Email" outline />
                            <MDBInput label="Password" outline type="password" />
                        </div>
                        {/* <MDBInput label="Name" outline /> */}
                        {/* <input type="email" placeholder="Email" /> */}
                        {/* <input type="password" placeholder="Password" /> */}
                        <a href="#">Forgot your password?</a>
                        <button>Sign In</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlays">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button className="ghost" id="signIn" onClick={this.onSwapClick}>Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <button className="ghost" id="signUp" onClick={this.onSwapClick}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        )
    }
}

export default LoginLogout

/* <footer>
	<p>
		Created with <i class="fa fa-heart"></i> by
		<a target="_blank" href="https://florin-pop.com">Florin Pop</a>
		- Read how I created this and how you can join the challenge
		<a target="_blank" href="https://www.florin-pop.com/blog/2019/03/double-slider-sign-in-up-form/">here</a>.
	</p>
</footer> */
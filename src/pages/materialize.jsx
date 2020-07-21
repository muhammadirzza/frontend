import React,{Component} from 'react';
// import 'materialize-css/dist/css/materialize.min.css'
import { NavItem, Navbar, Dropdown,Divider,Icon, Parallax } from 'react-materialize';


class Materialize extends Component {

    state={
        photos:'./images/view-of-vintage-camera-325153.jpg'
    }

    render() {
        return(
            <div className="paddingatas">
                <Navbar
                    alignLinks="right"
                    brand={<a className="brand-logo" href="#">Logo</a>}
                    id="mobile-nav"
                    menuIcon={<Icon>menu</Icon>}
                    options={{
                        draggable: true,
                        edge: 'left',
                        inDuration: 250,
                        onCloseEnd: null,
                        onCloseStart: null,
                        onOpenEnd: null,
                        onOpenStart: null,
                        outDuration: 200,
                        preventScrolling: true
                    }}
                >
                    <NavItem href="">
                        Getting started
                    </NavItem>
                    <NavItem href="components.html">
                        Components
                    </NavItem>
                    <Dropdown
                        id="Dropdown_6"
                        options={{
                        alignment: 'left',
                        autoTrigger: true,
                        closeOnClick: true,
                        constrainWidth: true,
                        container: null,
                        coverTrigger: true,
                        hover: false,
                        inDuration: 150,
                        onCloseEnd: null,
                        onCloseStart: null,
                        onOpenEnd: null,
                        onOpenStart: null,
                        outDuration: 250
                        }}
                        trigger={<a href="#!">Dropdown{' '}<Icon right>arrow_drop_down</Icon></a>}
                    >
                        <a href="#">
                        one
                        </a>
                        <a href="#">
                        two
                        </a>
                        <Divider />
                        <a href="#">
                        three
                        </a>
                    </Dropdown>
                </Navbar>

                <div>
                    <Parallax
                        image={
                            <div>
                                <img alt="" src="https://img.theculturetrip.com/2460x1000/wp-content/uploads/2019/04/ia_0667_tokyo_miwa-goto-1.jpg"/>
                                <img alt="" src="http://materializecss.com/images/parallax2.jpg"/>
                            </div>
                        }
                        options={{
                        responsiveThreshold: 0
                        }}
                    />
                    <div className="section white">
                        <div className="row container">
                        <h2 className="header">
                            Parallax
                        </h2>
                        <p className="grey-text text-darken-3 lighten-3">
                            Parallax is an effect where the background content or image in this case, is moved at a different speed than the foreground content while scrolling.
                        </p>
                        </div>
                    </div>
                    {/* <Parallax
                        image={<img alt="" src="http://materializecss.com/images/parallax2.jpg"/>}
                        options={{
                        responsiveThreshold: 0
                        }}
                    /> */}
                    
                </div>
                
            </div>
        )
    }
}

export default Materialize
import React from 'react';
import '../App.css'
// import { useEffect } from 'react';
// import { objectFitImages, jarallax } from 'mdbreact'

const Parallax = () => {

    // useEffect(()=>{
    //     // object-fit polyfill run
    //     objectFitImages();

    //     /* init Jarallax */
    //     jarallax(document.querySelectorAll('.jarallax'));

    //     jarallax(document.querySelectorAll('.jarallax-keep-img'), {
    //         keepImg: true,
    //     });
    // },[])

    return(
        <div className="container paddingatas">

            <div class="parallax">
                <div class="parallax_layer parallax_layer-back">
                    <div class="title">
                        <svg version="1" xmlns="http://www.w3.org/2000/svg" width="800" height="400" viewBox="0 0 800 400">
                            <path fill="#9DB2DC" d="M-1 105v296h800v-291s-42.25-8-50.25-12-33.875-14-37.875-15-15.938 7-23.938 11l-39.969 18s-18.984-9-25.984-10-31.992-18-36.992-17l-19.996 7s-10.998-9-17.998-8l-44.999-9s-17.999 20-20.999 20-27-4-41-8l-50-19-30 15s-36 21-40 21-40-11-44-13l-27-27s-24 14-30 16l-33-1s-32-7-52-4-57 19-62 20-33.25-6-37.25-10l-34.75 20z"/>
                        </svg>
                    </div>
                </div>
                <div class="parallax_layer parallax_layer-middle">
                    <div class="title">
                        <svg version="1" xmlns="http://www.w3.org/2000/svg" width="800" height="400" viewBox="0 0 800 400">
                            <path fill="#6889BF" d="M0 144v256h800v-272s-78-25-97-25-101-3-121-10-70-14-82-18l-12-4s-15 28-50 38-76 1-93-4-61-27-66-23-35 27-53 29-64-10-70-10-43 18-58 18-54-13-61-12l-37 18v19z"/>
                        </svg>
                    </div>
                </div>
                <div class="parallax_layer parallax_layer-front">
                    <div class="title">
                        <svg version="1" xmlns="http://www.w3.org/2000/svg" width="800" height="400" viewBox="0 0 800 400">
                            <path fill="#2B4C80" d="M0 145v255h800v-274c-204-10-122-43-263-3s-158-2-189-3-84-19-88-19-46 23-58 26-51-2-56-3-28 19-37 15-51-18-64-15l-45 21z"/>
                        </svg>
                    </div>
                </div>
                <div class="cover"></div>
            </div>

        </div>
    )
}

export default Parallax
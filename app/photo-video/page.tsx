"use client";

import React, { useEffect } from "react";
import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import Image from "next/image";


export default function Gallery() {

  const onInit = () => {
    console.log("lightGallery has been initialized");
  };

  useEffect(() => {
    // Load Instagram embed script
    if (!document.getElementById("instagram-embed-script")) {
      const script = document.createElement("script");
      script.id = "instagram-embed-script";
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);
  
  return (
    <div className="App">
      <LightGallery plugins={[lgZoom]} elementClassNames="custom-wrapper-class" >
        <a href="images/1.jpeg" className="gallery-item">
          {/* <img
            className="img-responsive"
            alt="img1"
            src="images/1.jpeg"
            style={{ maxWidth: "200px" }}
          /> */}
          a
          <Image
            alt="img2"
            width={200}
            height={0}
            src="/images/1.jpeg"
            quality={1}
          />          
        </a>
        <a
          data-src="https://www.google.com/maps/embed"
          data-iframe="true"
          className="gallery-item"
          data-iframe-title="All new time tracking. Greater insight."
        >
        </a>
        <a href="images/3.jpeg" className="gallery-item">
        </a>
      </LightGallery>

  
      <LightGallery plugins={[lgZoom, lgThumbnail]} mode="lg-fade">
        <a
          data-lg-size="1406-1390"
          className="gallery-item"
          data-src="https://images.unsplash.com/photo-1581894158358-5ecd2c518883?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1406&q=80"
          data-sub-html="<h4>Photo by - <a href='https://unsplash.com/@entrycube' >Diego Guzmán </a></h4> <p> Location - <a href='https://unsplash.com/s/photos/fushimi-inari-taisha-shrine-senbontorii%2C-68%E7%95%AA%E5%9C%B0-fukakusa-yabunouchicho%2C-fushimi-ward%2C-kyoto%2C-japan'>Fushimi Ward, Kyoto, Japan</a></p>"
        >
          <img
            className="img-responsive"
            src="https://images.unsplash.com/photo-1581894158358-5ecd2c518883?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=240&q=80"
            alt="adsada"
          />
        </a>
        <a
          data-lg-size="1400-1400"
          data-pinterest-text="Shinimamiya, Osaka, Japan"
          data-tweet-text="Shinimamiya, Osaka, Japan"
          className="gallery-item"
          data-src="https://images.unsplash.com/photo-1544550285-f813152fb2fd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80"
          data-sub-html="<h4>Photo by - <a href='https://unsplash.com/@asoshiation' >Shah </a></h4><p> Location - <a href='https://unsplash.com/s/photos/shinimamiya%2C-osaka%2C-japan'>Shinimamiya, Osaka, Japan</a></p>"
        >
          <img
            className="img-responsive"
            src="https://images.unsplash.com/photo-1544550285-f813152fb2fd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=240&q=80"
          />
        </a>
        <a
          data-lg-size="1400-1400"
          className="gallery-item"
          data-src="https://images.unsplash.com/photo-1584592740039-cddf0671f3d4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80"
          data-sub-html="<h4>Photo by - <a href='https://unsplash.com/@katherine_xx11' >Katherine Gu </a></h4><p> For all those years we were alone and helpless.</p>"
        >
          <img
            className="img-responsive"
            src="https://images.unsplash.com/photo-1584592740039-cddf0671f3d4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=240&q=80"
            style={{ maxWidth: "100px" }}
          />
        </a>
        <a
          className="gallery-item"
          data-src="https://www.youtube.com/watch?v=egyIeygdS_E&mute=0"
          key="4"
        >
          <img
            style={{ maxWidth: "70px" }}
            className="img-responsive"
            alt=""
            src="https://img.youtube.com/vi/egyIeygdS_E/maxresdefault.jpg"
          />
        </a>        
        <a
          data-lg-size="1400-1400"
          className="gallery-item"
          data-iframe="true"
          data-src="https://www.lightgalleryjs.com/pdf/sample.pdf"
        >
          <img
            className="img-responsive"
            src="https://images.unsplash.com/photo-1455541504462-57ebb2a9cec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=320&q=80"
          />
        </a>
      </LightGallery>
    </div>
  );
}


// export default function Gallery() {
//   useEffect(() => {
//     // Load Instagram embed script
//     if (!document.getElementById("instagram-embed-script")) {
//       const script = document.createElement("script");
//       script.id = "instagram-embed-script";
//       script.src = "https://www.instagram.com/embed.js";
//       script.async = true;
//       document.body.appendChild(script);
//     }
//   }, []);

//   return (
//     <div className="App">
//       <blockquote
//         className="instagram-media"
//         data-instgrm-captioned
//         data-instgrm-permalink="https://www.instagram.com/p/DFX36faPMqA/?utm_source=ig_embed&amp;utm_campaign=loading"
//         data-instgrm-version="14"
//       >
//       </blockquote>
//     </div>
//   );
// }


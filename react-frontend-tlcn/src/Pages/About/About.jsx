import axios from "axios";
import { useEffect, useState } from "react";
import "./about.css";
import { Parallax, ParallaxBanner, useParallax } from "react-scroll-parallax";

import bg2 from "./../About/image/bg2.png";
import Footer from "../../Components/Footer/Footer";
import Header2 from "../../Components/Header2/Header";

const About = () => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products?page=1&pagesize=100`)
      .then((response) => {
        setProduct(
          response.data.products.sort(function (a, b) {
            return a.category.localeCompare(b.category);
          })
        );
      });
  }, []);
  function currencyFormat(num) {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " đ";
  }
  return (
    <div className=" overflow-hidden">
      <Header2/>

      <ParallaxBanner
        className="text-center mx-auto d-block aspect-21"
        layers={[
          {
            image: bg2,
            amount: -1,
            speed: -10,
            children: "img",
          },
        ]}
        style={{
          height: "300px",
          width: "100%",
        }}
      >
        <div className="chumma">
          <Parallax scale={[3, 1, "easeInQuad"]}>
            <h1 className="text-light m-0">KHA COFFEE</h1>
            <h6 className="text-light">- since 2019 -</h6>
          </Parallax>
        </div>
      </ParallaxBanner>

      <ParallaxBanner
        layers={[
          {
            image:
              "https://inhat.vn/hcm/wp-content/uploads/2019/08/cafe5-min.jpg",
            speed: -55,
          },
        ]}
        className="aspect-21 mt-4"
      >
        <div className="absolute inset-0 d-flex align-items-center justify-content-center">
          <h1 className="bg-dark text-light p-1 rounded">
            Không gian yên tĩnh
          </h1>
        </div>
      </ParallaxBanner>
      <div className="text-center mt-4">
        <div className="d-inline-block ">
          <Parallax rotate={[-90, 90]} className="snipper">
            <img
              src="https://pngimage.net/wp-content/uploads/2018/05/coffee-cafe-png-2.png"
              alt="nut"
              width={120}
            />
            <div className="top-snipper">
              <img
                src="https://cdn.pixabay.com/photo/2018/02/24/10/01/coffee-3177691_640.png"
                alt="nut"
                width={50}
              />
            </div>
            <div className="left-snipper">
              <img
                src="https://i.pinimg.com/originals/90/09/95/900995375dfb74f689ce37ba5f13204b.png"
                alt="nut"
                width={50}
              />
            </div>
            <div className="bot-snipper">
              <img
                src="https://pngimg.com/uploads/cookie/cookie_PNG13648.png"
                alt="nut"
                width={50}
              />
            </div>
            <div className="right-snipper">
              <img
                src="https://cdn.pixabay.com/photo/2017/08/09/17/49/orange-2615311_960_720.png"
                alt="nut"
                width={50}
              />
            </div>
          </Parallax>
        </div>
        <div className="row m-0 text-center">
          <h1 className="m-0">Menu</h1>
          {product.map(
            (e, i) =>
              (i === 0 || e.category !== product[i - 1].category) && (
                <div className="col-12 col-sm-6 p-3">
                  <h5 className="m-0">{e.category}</h5>
                  <table className="drinktable__table">
                    <thead className="drinktable__head">
                      <tr className="drinktable__header">
                        <th className="col-4">Name</th>
                        <th className="col-sm-3 col-2">Price</th>
                      </tr>
                    </thead>
                    <tbody className="drinktable__body">
                      {product.map(
                        (data) =>
                          data.category == e.category && (
                            <tr className="drinktable__row">
                              <td>{data.name}</td>
                              <td>{currencyFormat(data.price)}</td>
                            </tr>
                          )
                      )}
                    </tbody>
                  </table>
                </div>
              )
          )}
        </div>
      </div>
      <hr />
      <div className="row">
        <Parallax easing="easeOutQuad" translateX={[-50, 10]} className="col-6">
          <img
            src="https://ae01.alicdn.com/kf/HTB1w2tjIXXXXXaeXVXXq6xXFXXXE/C-a-h-ng-gi-m-v-ng-th-i-gian-glass-pattern-decals-sticker-tr.jpg"
            alt="nut"
            className="w-100 aspect-11"
          />
        </Parallax>
        <Parallax easing="easeOutQuad" translateX={[50, -10]} className="col-6">
          <img
            src="https://content.shopback.com/sg/wp-content/uploads/2017/01/places-with-free-wifi-and-sockets.jpg"
            alt="nut"
            className="w-100 aspect-11 img-cover"
          />
        </Parallax>
      </div>
      <hr />

      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3806.9543450128494!2d106.77402207552775!3d10.849063804297035!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752763f23816ab%3A0x282f711441b6916f!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBTxrAgcGjhuqFtIEvhu7kgdGh14bqtdCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmg!5e0!3m2!1svi!2s!4v1651043188133!5m2!1svi!2s"
        height="450"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        className="w-100"
      ></iframe>
    </div>
  );
};

export default About;

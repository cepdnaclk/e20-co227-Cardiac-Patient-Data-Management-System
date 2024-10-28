import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "../components/styles/ImageSlider.css";
import index1 from "/src/images/index1.webp";
import index2 from "/src/images/index2.webp";
import index3 from "/src/images/index3.webp";
import index4 from "/src/images/index4.webp";
import { InitializeCarousel } from "./styles/ImageSlider.js";
import NavBar from "./NavBar.jsx";

export default function IndexPage({ onSeeMoreClick }) {
  const navigate = useNavigate();

  useEffect(() => {
    InitializeCarousel();
  }, []);

  const handleRegisterClick = () => {
    navigate("/register-patient");
  };

  return (
    <div className="body">
      <NavBar />
      <div className="carousel">
        <div className="list">
          {/* Slide 1 */}
          <div className="item">
            <img src={index1} alt="Slide 1" />
            <div className="content">
              <div className="author">UNIVERSITY OF PERADENIYA</div>
              <div className="title">CARE ABOUT YOUR HEART</div>
              <div className="topic">MEDICARE</div>
              <div className="des">
                A healthy heart is key to a long and vibrant life. This campaign
                aims to raise awareness about the importance of cardiovascular
                health through regular exercise, balanced nutrition, and routine
                checkups. Protect your heart and prevent common heart diseases
                by making the right lifestyle choices.
              </div>
              <div className="buttons">
                <button
                  className="bg-gray-500 text-black"
                  onClick={onSeeMoreClick}
                >
                  SEE MORE
                </button>
                <button onClick={handleRegisterClick}>REGISTER</button>
              </div>
            </div>
          </div>
          {/* Slide 2 */}
          <div className="item">
            <img src={index2} alt="Slide 2" />
            <div className="content">
              <div className="author">UNIVERSITY OF PERADENIYA</div>
              <div className="title">DON`T EAT CHINESE FOOD</div>
              <div className="topic">MEDICARE</div>
              <div className="des">
                Recent studies show that consuming too much processed and
                high-sodium food can lead to serious health complications. This
                slide encourages a mindful approach to diet, especially when it
                comes to fast food options like Chinese cuisine, which often
                contains excess salt and unhealthy oils. Opt for more balanced
                and nutritious meals to maintain your well-being.
              </div>
              <div className="buttons">
                <button
                  className="bg-gray-500 text-black"
                  onClick={onSeeMoreClick}
                >
                  SEE MORE
                </button>
                <button onClick={handleRegisterClick}>REGISTER</button>
              </div>
            </div>
          </div>
          {/* Slide 3 */}
          <div className="item">
            <img src={index3} alt="Slide 3" />
            <div className="content">
              <div className="author">UNIVERSITY OF PERADENIYA</div>
              <div className="title">EAT HEALTHY FOOD</div>
              <div className="topic">MEDICARE</div>
              <div className="des">
                Good nutrition is the foundation of a healthy life. This
                campaign highlights the importance of incorporating fruits,
                vegetables, and whole grains into your diet. Healthy eating can
                help prevent diseases, boost immunity, and improve mental and
                physical well-being.
              </div>
              <div className="buttons">
                <button
                  className="bg-gray-500 text-black"
                  onClick={onSeeMoreClick}
                >
                  SEE MORE
                </button>
                <button onClick={handleRegisterClick}>REGISTER</button>
              </div>
            </div>
          </div>
          {/* Slide 4 */}
          <div className="item">
            <img src={index4} alt="Slide 4" />
            <div className="content">
              <div className="author">UNIVERSITY OF PERADENIYA</div>
              <div className="title">DON`T GET LIQUOR</div>
              <div className="topic">MEDICARE</div>
              <div className="des">
                Excessive alcohol consumption can have devastating effects on
                your liver, heart, and overall health. This slide encourages
                individuals to either avoid or limit alcohol intake in order to
                lead a healthier and more productive life, free from the risks
                associated with alcohol-related diseases.
              </div>
              <div className="buttons">
                <button
                  className="bg-gray-500 text-black"
                  onClick={onSeeMoreClick}
                >
                  SEE MORE
                </button>
                <button onClick={handleRegisterClick}>REGISTER</button>
              </div>
            </div>
          </div>
        </div>
        {/* Thumbnail Section */}
        <div className="thumbnail">
          <div className="item">
            <img src={index1} alt="Thumbnail 1" />
            <div className="content">
              <div className="title">CARE ABOUT YOUR HEART</div>
              <div className="description">MEDIGUARD</div>
            </div>
          </div>
          <div className="item">
            <img src={index2} alt="Thumbnail 2" />
            <div className="content">
              <div className="title">DON`T EAT CHINESE FOOD</div>
              <div className="description">MEDIGUARD</div>
            </div>
          </div>
          <div className="item">
            <img src={index3} alt="Thumbnail 3" />
            <div className="content">
              <div className="title">EAT HEALTHY FOOD</div>
              <div className="description">MEDIGUARD</div>
            </div>
          </div>
          <div className="item">
            <img src={index4} alt="Thumbnail 4" />
            <div className="content">
              <div className="title">DON`T GET LIQUOR</div>
              <div className="description">MEDIGUARD</div>
            </div>
          </div>
        </div>
        {/* Navigation Arrows */}
        <div className="flex space-x-4 arrows">
          <button id="prev">Prev</button>
          <button id="next">Next</button>
        </div>
        <div className="time"></div>
      </div>
    </div>
  );
}

IndexPage.propTypes = {
  onSeeMoreClick: PropTypes.func.isRequired,
};

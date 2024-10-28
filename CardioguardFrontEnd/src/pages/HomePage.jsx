import { useRef } from "react";
import BarGraph from "../components/BarGraph";
import Blog1 from "../components/HomePageSeeMoreDocuments/Blog1";
import Blog2 from "../components/HomePageSeeMoreDocuments/Blog2";
import Blog3 from "../components/HomePageSeeMoreDocuments/Blog3";
import Blog4 from "../components/HomePageSeeMoreDocuments/Blog4";
import Blog5 from "../components/HomePageSeeMoreDocuments/Blog5";
import Blog6 from "../components/HomePageSeeMoreDocuments/Blog6";
import IndexPage from "../components/IndexPageSlider";
import NavBar from "../components/NavBar";

export default function HomePage() {
  const topicRef = useRef(null); // Create a ref for the heading

  const scrollToBlog1 = () => {
    if (topicRef.current) {
      // Scroll to the heading instead of blog1Ref
      topicRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <NavBar />
      <IndexPage onSeeMoreClick={scrollToBlog1} />
      <div className="my-8">
        {" "}
        {/* Adds margin between the graph and blogs */}
        <BarGraph />
      </div>
      {/* Add the ref to the heading */}
      <h1
        ref={topicRef}
        className="text-5xl mb-4 text-center font-bold text-orange-500"
      >
        Let's Talk About Heart Health
      </h1>

      <div className="shadow-lg p-6 rounded-lg mb-8">
        {" "}
        {/* Shadow and spacing */}
        <Blog1 />
      </div>
      <div className="shadow-lg p-6 rounded-lg mb-8">
        <Blog2 />
      </div>
      <div className="shadow-lg p-6 rounded-lg mb-8">
        <Blog3 />
      </div>
      <div className="shadow-lg p-6 rounded-lg mb-8">
        <Blog4 />
      </div>
      <div className="shadow-lg p-6 rounded-lg mb-8">
        <Blog5 />
      </div>
      <div className="shadow-lg p-6 rounded-lg mb-8">
        <Blog6 />
      </div>
    </div>
  );
}

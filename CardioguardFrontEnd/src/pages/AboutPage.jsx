import NavBar from "../components/NavBar";
import "../components/styles/AboutUs.css";

const AboutPage = () => {
  return (
    <div className="backroundImage min-h-screen flex flex-col">
      <NavBar />
      <div className="flex flex-col min-h-screen">
        <div className="w-full text-white h-52 flex-1 pt-10">
          <p className="pt-5 px-3">
            Our system is designed to help cardiologists and healthcare
            professionals manage patient records efficiently, with a specific
            focus on cardiovascular health. It stores comprehensive details
            about patients medical history, current health status, and vital
            signs, offering a centralized hub for patient management.
          </p>
          <p className="pt-5 px-3">
            The system also incorporates advanced predictive analytics,
            providing real-time insights into the likelihood of a cardiac event,
            such as cardiac arrest, occurring in the near future. By analyzing
            patient data over time, it helps medical professionals make informed
            decisions and potentially prevent life-threatening events.
          </p>
        </div>
        <div className="mt-4 p-2 bg-gray-800">
          <h2 className="text-white text-lg mb-4">Contact Information</h2>
          <p className="text-white">
            Email:{" "}
            <a
              href="mailto:info@mediguard.com"
              className="text-white underline"
            >
              info@yourwebsite.com
            </a>
          </p>
          <p className="text-white">Phone: (123) 456-7890</p>
          <p className="text-white">Address: 123 Main Street, Anytown, USA</p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

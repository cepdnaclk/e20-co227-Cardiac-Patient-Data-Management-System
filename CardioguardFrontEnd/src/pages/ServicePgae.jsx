import { Link } from "react-router-dom"; // Import Link
import CallYourDoctor from "../components/CallYourDoctor";
import NavBar from "../components/NavBar";
import MyLocationComponent from "../components/MyLocation";
import HospitalLocations from "../components/HospitalLocations";

export default function ServicesPage() {
    return (
        <div className="min-h-screen bg-gray-100">
            <NavBar />
            <div className="container mx-auto p-3">
                <div className="flex items-stretch">
                    <div className="w-1/2 p-3">
                        <MyLocationComponent />
                    </div>
                    <div className="w-1/2 p-3">
                        <CallYourDoctor />
                    </div>
                </div>
            </div>

            {/* Add margin-bottom for gap */}
            <div className="mb-6 p-10">
                <HospitalLocations />
            </div>

            <div className="flex justify-center items-center h-100">
                <div className="container mx-auto flex justify-around">

                    {/* Create Diet Plan Button */}
                    <Link to="/services/createdietplan" className="w-1/3 p-3">
                        <div className="flex flex-col items-center h-50"> {/* Increased container height */}
                            <div className="w-full h-4/5 mb-2 overflow-hidden"> {/* Image takes more height */}
                                <img 
                                    src="/src/images/service1.webp" // Replace with your image path
                                    alt="Create Diet Plan"
                                    className="w-full h-full object-cover" // Fit the image to its container
                                />
                            </div>
                            <button className="p-4 bg-green-500 text-white rounded hover:bg-green-600 w-full text-2xl"> {/* Adjusted button */}
                                Create Diet Plan
                            </button>
                        </div>
                    </Link>

                    {/* Get Advice Button */}
                    <Link to="/services/getadvice" className="w-1/3 p-3">
                        <div className="flex flex-col items-center h-50"> {/* Increased container height */}
                            <div className="w-full h-4/5 mb-2 overflow-hidden"> {/* Image takes more height */}
                                <img 
                                    src="/src/images/service2.webp" // Replace with your image path
                                    alt="Get Advice"
                                    className="w-full h-full object-cover" // Fit the image to its container
                                />
                            </div>
                            <button className="p-4 bg-blue-500 text-white rounded hover:bg-blue-600 w-full text-2xl"> {/* Adjusted button */}
                                Get Advice
                            </button>
                        </div>
                    </Link>

                    {/* Meditate Button */}
                    <Link to="/services/meditate" className="w-1/3 p-3">
                        <div className="flex flex-col items-center h-50"> {/* Increased container height */}
                            <div className="w-full h-4/5 mb-2 overflow-hidden"> {/* Image takes more height */}
                                <img 
                                    src="/src/images/service3.webp" // Replace with your image path
                                    alt="Meditate"
                                    className="w-full h-full object-cover" // Fit the image to its container
                                />
                            </div>
                            <button className="p-4 bg-yellow-500 text-white rounded hover:bg-yellow-600 w-full text-2xl"> {/* Adjusted button */}
                                Meditate
                            </button>
                        </div>
                    </Link>

                </div>
            </div>
        </div>
    );
}

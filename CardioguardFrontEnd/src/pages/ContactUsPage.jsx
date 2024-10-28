import "@fortawesome/fontawesome-free/css/all.min.css";
import NavBar from "../components/NavBar";
import { useState } from "react";

export default function ContactUsPage() {
  const [formStatus, setFormStatus] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get("name");
    const email = data.get("email");
    const message = data.get("message");

    // Creating JSON object from form data
    const formData = {
      name: name,
      email: email,
      message: message,
    };

    if (name && email && message) {
      // Sending form data as JSON to a specified URL
      fetch("https://example.com/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          setFormStatus("Message sent successfully!");
          console.log(data); // For debug purposes
        })
        .catch((error) => {
          setFormStatus("Failed to send message.");
          console.error("Error:", error);
        });
    } else {
      setFormStatus("Please fill out all fields.");
    }
  };

  return (
    <div>
      <NavBar />
      {/* Page Background */}
      <div className="contact-us-body bg-gradient-to-r from-pink-500 to-orange-500 min-h-screen p-8">
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Form with 3D Effect */}
            <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-2xl transform transition duration-500 hover:-translate-y-2 hover:shadow-3xl">
              <h3 className="text-gray-800 text-3xl font-bold mb-6">
                Get in Touch
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="w-full p-3 border border-gray-300 bg-white text-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-pink-300"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full p-3 border border-gray-300 bg-white text-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-pink-300"
                  required
                />
                <textarea
                  name="message"
                  placeholder="Message"
                  rows={4}
                  className="w-full p-3 border border-gray-300 bg-white text-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-pink-300"
                  required
                />
                <button
                  type="submit"
                  className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition"
                >
                  Submit
                </button>
                {formStatus && (
                  <p className="text-gray-800 mt-2">{formStatus}</p>
                )}
              </form>
            </div>

            {/* Contact Information with 3D and Table Effect */}
            <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-2xl transform transition duration-500 hover:-translate-y-2 hover:shadow-3xl">
              <h3 className="text-gray-800 text-3xl font-bold mb-6">
                Contact Information
              </h3>

              <div className="grid grid-cols-[min-content_auto] gap-4">
                <div className="bg-blue-200 p-4 rounded-l-lg w-[150px]">
                  <p className="text-gray-800">Email</p>
                </div>
                <div className="bg-white p-4 rounded-r-lg">
                  <a
                    href="mailto:cardioguarduop@gmail.com"
                    className="text-blue-500 font-mono"
                    style={{ width: "220px", display: "block" }}
                  >
                    CardioGuarduop@gmail.com
                  </a>
                </div>

                <div className="bg-blue-200 p-4 rounded-l-lg w-[150px]">
                  <p className="text-gray-800">Phone</p>
                </div>
                <div className="bg-white p-4 rounded-r-lg">
                  <p
                    className="text-blue-500 font-mono"
                    style={{ width: "220px", display: "block" }}
                  >
                    (+94) 71-075-8542
                  </p>
                </div>

                <div className="bg-blue-200 p-4 rounded-l-lg w-[150px]">
                  <p className="text-gray-800">Address</p>
                </div>
                <div className="bg-white p-4 rounded-r-lg">
                  <p className="text-gray-800">
                    University of Peradeniya, Prof. E. O. E. Pereira Mawatha,
                    Kandy
                  </p>
                </div>
              </div>

              <h4 className="text-gray-800 text-xl font-semibold mb-4 mt-8">
                Office Hours
              </h4>
              <p className="text-gray-800">Monday - Friday: 9 AM - 6 PM</p>
              <p className="text-gray-800">Saturday: 10 AM - 4 PM</p>

              <h4 className="text-gray-800 text-xl font-semibold mt-6 mb-4">
                Follow Us
              </h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-800 hover:text-pink-500">
                  <i className="fab fa-facebook-f text-2xl"></i>
                </a>
                <a href="#" className="text-gray-800 hover:text-pink-500">
                  <i className="fab fa-twitter text-2xl"></i>
                </a>
                <a href="#" className="text-gray-800 hover:text-pink-500">
                  <i className="fab fa-instagram text-2xl"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Google Map Embed - University of Peradeniya Faculty of Engineering */}
          <div className="mt-10">
            <iframe
              title="University of Peradeniya Faculty of Engineering"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63381.68227642068!2d80.57344165765523!3d7.254306386944084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae317246cd63b21%3A0x2e278f57e0bc6d39!2sFaculty%20of%20Engineering%2C%20University%20of%20Peradeniya!5e0!3m2!1sen!2slk!4v1694309643097!5m2!1sen!2slk"
              width="100%"
              height="400"
              allowFullScreen=""
              loading="lazy"
              className="rounded-lg shadow-2xl"
            ></iframe>
          </div>

          {/* Footer with additional functionalities */}
          <footer className="mt-10 bg-gray-800 text-white py-8">
            <div className="container mx-auto text-center space-y-4">
              <p>
                &copy; {new Date().getFullYear()} CardioGuard. All rights
                reserved.
              </p>
              <div className="space-x-4">
                <a href="/privacy-policy" className="hover:underline">
                  Privacy Policy
                </a>
                <a href="/terms-of-service" className="hover:underline">
                  Terms of Service
                </a>
              </div>
              <div className="flex justify-center space-x-4">
                <a
                  href="https://www.facebook.com"
                  className="hover:text-pink-300"
                >
                  <i className="fab fa-facebook-f text-3xl"></i>
                </a>
                <a
                  href="https://www.twitter.com"
                  className="hover:text-pink-300"
                >
                  <i className="fab fa-twitter text-3xl"></i>
                </a>
                <a
                  href="https://www.instagram.com"
                  className="hover:text-pink-300"
                >
                  <i className="fab fa-instagram text-3xl"></i>
                </a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

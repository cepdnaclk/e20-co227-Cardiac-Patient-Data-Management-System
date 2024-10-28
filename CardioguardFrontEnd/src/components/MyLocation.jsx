import { useState } from "react";

function MyLocationComponent() {
  // State to store the user's location (latitude and longitude)
  const [location, setLocation] = useState(null);

  // Function to handle the location retrieval using browser's Geolocation API
  function handleGetLocation() {
    if (navigator.geolocation) {
      // If geolocation is supported by the browser
      navigator.geolocation.getCurrentPosition(
        function (position) {
          // Extract latitude and longitude from the position object
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude }); // Store location in state
          console.log("Latitude:", latitude, "Longitude:", longitude); // Log location to console
        },
        function (error) {
          // Handle any errors (like location access denied by user)
          console.error("Error fetching location", error);
        }
      );
    } else {
      // If geolocation is not supported
      console.error("Geolocation is not supported by this browser");
    }
  }

  // Function to create the 'mailto:' link and send the email with location data
  function handleSendEmail() {
    if (location) {
      const { latitude, longitude } = location; // Destructure latitude and longitude from state
      // Create subject and body for the email, properly URL-encoded
      const subject = encodeURIComponent("My Current Location");
      const body = encodeURIComponent(
        `Here is my current location:\nLatitude: ${latitude}\nLongitude: ${longitude}`
      );
      console.log("Subject:", subject, "Body:", body); // Log subject and body to console
      // Construct the mailto link with the recipient, subject, and body
      const mailtoLink = `mailto:kavindumethpura@gmail.com?subject=${subject}&body=${body}`;
      window.location.href = mailtoLink; // Open the email client with pre-filled data
    } else {
      // If the location is not yet available
      console.error("Location not available");
    }
  }

  return (
    <div className="h-full">
      {/* Button to fetch user's location */}
      <button
        onClick={handleGetLocation}
        className="bg-red-700 text-white font-bold py-2 px-4 w-full h-full rounded text-2xl mb-4"
      >
        Send My Location
      </button>

      {/* Button to send email with location, only shown after location is available */}
      {/* {location && (
                <button
                    onClick={handleSendEmail}
                    className="bg-blue-700 text-white font-bold py-2 px-4 w-full h-full rounded text-2xl"
                >
                    Send Location via Email
                </button>
            )} */}
    </div>
  );
}

export default MyLocationComponent;

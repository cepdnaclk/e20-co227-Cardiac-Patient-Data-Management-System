<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Image Switcher</title>
    <style>
        /* Basic styling to align the images and center the container */
        #image-container {
            display: flex;
            justify-content: space-between;
            width: 100%;
            max-width: 1100px;
            margin: 0 auto;
        }

        img {
            width: 500px;
        }
    </style>
</head>
<body>
    <div id="image-container">
        <div align="left">
            <img src="/docs/images/image5.png" alt="Home" id="image-left">
        </div>
        <div align="right">
            <img src="/docs/images/image6.png" alt="React" id="image-right">
        </div>
    </div>

    <script>
        // Array of image sources to cycle through
        const images = [
            "/docs/images/image5.png", // First image (left side)
            "/docs/images/image6.png"  // Second image (right side)
        ];

        let currentIndex = 0; // Start with the first image

        // Function to update the image display based on the current index
        function updateImages() {
            const leftImage = document.getElementById('image-left');
            const rightImage = document.getElementById('image-right');

            // Change the images based on the current index
            leftImage.src = images[(currentIndex % images.length)];
            rightImage.src = images[(currentIndex + 1) % images.length];
        }

        // Event listener for keydown to detect arrow keys
        window.addEventListener('keydown', function(event) {
            if (event.key === "ArrowRight") {
                // Move to the next set of images
                currentIndex++;
                updateImages();
            } else if (event.key === "ArrowLeft") {
                // Move to the previous set of images
                currentIndex--;
                updateImages();
            }
        });

        // Initialize the images on page load
        updateImages();
    </script>
</body>
</html>

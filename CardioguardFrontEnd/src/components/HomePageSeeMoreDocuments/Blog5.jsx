const Blog5 = () => {
  const blogData = {
    title: "The Importance of Regular Exercise",
    content:
      "Regular physical activity is crucial for maintaining heart health. This blog discusses how consistent exercise can lower blood pressure, improve cholesterol levels, and strengthen the heart muscle. Incorporating aerobic activities and strength training into your routine can lead to significant health benefits.",
    // image: "path/to/exercise_image.jpg", // Update with actual path
    youtubeLinks: [
      "https://www.youtube.com/embed/qTHVnGA5rzU", // Exercise routines
    ],
  };

  return (
    <div className="flex flex-col md:flex-row p-4">
      <div className="md:w-1/2 flex justify-center items-center">
        {blogData.youtubeLinks && blogData.youtubeLinks.length > 0 && (
          <div className="youtube-links">
            {blogData.youtubeLinks.map((link, index) => (
              <div key={index} className="youtube-video">
                <iframe
                  width="560"
                  height="315"
                  src={link}
                  title={`YouTube video player ${index + 1}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="md:w-1/2 md:pl-4 mt-4 md:mt-0">
        <h1 className="text-2xl font-bold mb-2 text-orange-500">
          {blogData.title}
        </h1>
        <p className="text-lg mb-4">{blogData.content}</p>
        {blogData.image && (
          <img
            src={blogData.image}
            alt={blogData.title}
            className="w-full h-auto"
          />
        )}
      </div>
    </div>
  );
};

export default Blog5;

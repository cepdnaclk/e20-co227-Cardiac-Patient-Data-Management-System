const Blog1 = () => {
  const blogData = {
    title: "Care About Your Heart",
    content:
      "Maintaining heart health is vital for overall well-being. This blog highlights the importance of regular cardiovascular exercise, a balanced diet rich in fruits and vegetables, and routine health checkups. Adopting these practices can help prevent heart disease and ensure a longer, healthier life.",
    // image: "src/images/index2.png", // Update with actual path
    youtubeLinks: [
      "https://www.youtube.com/embed/cW-vmmHgMOM", // Heart health tips
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

export default Blog1;

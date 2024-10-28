const Blog2 = () => {
  const blogData = {
    title: "Don’t Eat Chinese Food",
    content:
      "Chinese cuisine is often high in sodium and unhealthy fats, which can contribute to heart disease. This blog suggests avoiding excessive consumption of Chinese food and opting for more heart-healthy options like fresh vegetables and lean proteins. Maintaining a balanced diet is key to heart health.",
    // image: "path/to/chinese_food_image.jpg", // Update with actual path
    youtubeLinks: [
      "https://www.youtube.com/embed/jwWpTAXu-Sg", // Healthy eating tips
    ],
  };

  return (
    <div className="flex flex-col md:flex-row p-4">
      <div className="md:w-1/2 md:pr-4 mt-4 md:mt-0">
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
    </div>
  );
};

export default Blog2;

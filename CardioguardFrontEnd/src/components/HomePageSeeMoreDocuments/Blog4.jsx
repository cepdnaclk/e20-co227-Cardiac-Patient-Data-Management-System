const Blog4 = () => {
  const blogData = {
    title: "Don’t Get Liquor",
    content:
      "Excessive alcohol consumption can negatively impact heart health and increase the risk of cardiovascular diseases. This blog highlights the importance of moderating alcohol intake and provides tips for maintaining a healthy lifestyle without the negative effects of alcohol.",
    // image: "path/to/liquor_image.jpg", // Update with actual path
    youtubeLinks: [
      "https://www.youtube.com/embed/V2Aj-iJ6p38", // Risks of alcohol
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

export default Blog4;

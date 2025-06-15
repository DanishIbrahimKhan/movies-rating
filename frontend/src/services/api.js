
export default async function handler(req, res) {
    const { title } = req.query;
  
    if (!title) {
      return res.status(400).json({ error: "Title parameter is required." });
    }
  
    try {
      const response = await fetch(`https://movie-rating-blue.vercel.app/movie-by-title/${encodeURIComponent(title)}`);
  
      if (!response.ok) {
        throw new Error(`Error fetching movie data: ${response.statusText}`);
      }
  
      const data = await response.json();
  
      res.status(200).json(data);
    } catch (error) {
      console.error("API Error:", error.message);
      res.status(500).json({ error: "Failed to fetch movie details." });
    }
  }
  
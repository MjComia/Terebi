import supabase from "../services/supabase.js";

export const addWatch = async (req, res) => {
  try {
    const { user_id, movie_id, title, poster_path } = req.body;
    if (!user_id || !movie_id) {
      return res
        .status(400)
        .json({ error: "user_id and movie_id are required" });
    }
    const { data, error } = await supabase
      .from("watchlist")
      .insert([
        {
          user_id,
          movie_id,
          title,
          poster_path,
          is_watched: false,
        },
      ])
      .select();
    if (error) return res.status(500).json({ error: error.message });
    return res.status(201).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

//
export const getWatch = async (req, res) => {
  try {
    // If you pass userId as a query parameter (e.g., /api/watchlist?userId=...)
    const userId = req.user?.id || req.query.user_id;
    if (!userId) {
      return res.status(400).json({ error: "user_id is required" });
    }
    const { data, error } = await supabase
      .from("watchlist")
      .select("*")
      .eq("user_id", userId);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
//
export const deleteWatch = async (req, res) => {
  const { data, error } = await supabase
    .from("watchlist")
    .delete()
    .eq("movie_id", req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json(data);
};
//
export const updateWatch = async (req, res) => {
  const { data, error } = await supabase
    .from("watchlist")
    .update({
      is_watched: req.body.is_watched,
    })
    .eq("movie_id", req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json(data);
};

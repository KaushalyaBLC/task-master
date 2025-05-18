const supabase = require("../services/supabaseClient");

//get the user id from the email
const getUserId = async (req, res) => {
  const { data, error } = await supabase
    .from("users")
    .select("id")
    .eq("email", req.user.email)
    .single();

  if (error) {
    console.error("Error fetching user:", error.message);
    res.status(500).json({ error: "Failed to retrieve user" });
    return null;
  }

  return data?.id || null;
};

module.exports = { getUserId };
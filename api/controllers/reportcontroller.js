const supabase = require("../services/supabaseClient");
const { getUserId } = require("../utils/userUtils");

const getSummaryReport = async (req, res) => {
  const user_id = await getUserId(req, res);
  if (!user_id) return;

  const { data, error } = await supabase
    .from("tasks")
    .select("status")
    .eq("user_id", user_id);

  if (error) {
    console.error("Error fetching tasks:", error.message);
    return res.status(500).json({ error: "Failed to retrieve tasks" });
  }

  const summary = data.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {});
  res.status(200).json(summary);
};

const getTasksNext7Days = async (req, res) => {
  const user_id = await getUserId(req, res);
  if (!user_id) return;

  try {
    const today = new Date();
    const next7Days = new Date();
    next7Days.setDate(today.getDate() + 7);
    console.log(next7Days);

    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", user_id)
      .gte("due_date", today.toISOString())
     .lte("due_date", next7Days.toISOString())
     .order("due_date", { ascending: true }); // Order by due date
    if (error) {
      console.error("Error fetching tasks for the next 7 days:", error.message);
      return res.status(500).json({ error: "Failed to retrieve tasks" });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Unexpected error:", error.message);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
};



module.exports = {
  getSummaryReport,
  getTasksNext7Days,
};
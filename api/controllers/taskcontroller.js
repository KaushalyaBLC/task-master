const { getUserId } = require('../utils/userUtils');
const supabase = require("../services/supabaseClient");

// Create a new task 
const createTask = async (req, res) => {
  const user_id = await getUserId(req, res);
  if (!user_id) return;

  const { taskName, description, dueDate } = req.body;

  const { data, error } = await supabase
    .from("tasks")
    .insert([
      {
        user_id,
        title: taskName,
        description,
        due_date: dueDate,
        created_at: new Date().toISOString(),
        status: "pending",
      },
    ])
    .select();
  console.log("data", data);

  if (error) {
    console.error("Error creating task:", error.message);
    return res.status(400).json({ error: error.message });
  }

  console.log("Task created:", data[0]);
  res.status(201).json(data[0]);
};

//Get all tasks filterred by status and due date
const getTasks = async (req, res) => {
  const user_id = await getUserId(req, res);
  const { status, dueBefore } = req.query;

  if (!user_id) return;

  try {
    let query = supabase
      .from('tasks')
      .select('*')
      .eq('user_id', user_id)
      .order('due_date', { ascending: true }); // Order by due_date in ascending order

    if (status) {
      query = query.eq('status', status);
    }

    if (dueBefore) {
      query = query.lte('due_date', dueBefore);
    }

    const { data, error } = await query;
    if (error) {
      throw new Error(error.message);
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching tasks:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

// Mark a task as completed 
const CompleteTask = async (req, res) => {
  const user_id = await getUserId(req, res);
  
  if (!user_id) return;

  const { id } = req.params;
   
  const { data, error } = await supabase
    .from("tasks")
    .update({ status: "done" })
    .eq("id", id)
    .eq("user_id", user_id)
    .select();

  if (error) {
    console.error("Error completing task:", error.message);
    return res.status(400).json({ error: error.message });
  }

  res.status(200).json(data[0]);
};

module.exports = {
  createTask,
  getTasks,
  CompleteTask,
};

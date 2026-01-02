import Task from "../models/tasks.js";

export const GET_ALL_TASKS = async (req, res) => {
  try {
    let tasks = await Task.find({});
    res.status(201).json({
      status: "success",
      data: { tasks },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
};

export const CREATE_TASK = async (req, res) => {
  try {
    const { title, status } = req.body;

    if (!title) {
      console.log("No title");
      return res
        .status(400)
        .json({ status: "fail", message: "Title must be provided" });
    }

    let existingTask = await Task.findOne({ title });

    if (existingTask) {
      console.log("task exists");
      return res.status(400).json({
        status: "fail",
        message: "Task already exists with same title",
      });
    }

    let task = new Task({
      title,
      status,
    });

    await task.save();
    console.log("task saved");

    res.status(201).json({
      status: "success",
      data: task,
      message: `${task.title} added to list`,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
};

export const DELETE_TASK = async (req, res) => {
  try {
    const deleteID = req.params.id;
    let existingTask = await Task.findOne({ _id: deleteID });

    if (!existingTask) {
      console.log("task doesn't exists with the id");
      return res.status(404).json({
        status: "fail",
        message: "Task doesn't exists",
      });
    }

    await Task.findByIdAndDelete(deleteID);

    res.status(200).json({
      status: "success",
      message: `${existingTask.title} deleted from list`,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
};

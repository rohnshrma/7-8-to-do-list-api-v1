import Task from "../models/tasks.js";

export const GET_ALL_TASKS = async (req, res) => {
  try {
    const userId = "6957efbaed8110f3a24f4b27";

    let tasks = await Task.find({ userId });
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
    const { title, status, userId } = req.body;

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
      userId,
    });

    await task.save();
    console.log("task saved");

    res.status(201).json({
      status: "success",
      data: { task },
      message: `${task.title} added to list`,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
};
export const UPDATE_TASK = async (req, res) => {
  try {
    const id = req.params.id;

    const { title, status } = req.body;
    console.log(req.body);

    if (!title && !status) {
      console.log("Title and status missing");
      return res
        .status(400)
        .json({ status: "fail", message: "Title and Status must be provided" });
    }

    let existingTask = await Task.findOne({ _id: id });

    if (!existingTask) {
      console.log("Task Doesn't exists");
      return res.status(400).json({
        status: "fail",
        message: "Task Doesn't exists",
      });
    }
    if (title && status) {
      existingTask.title = title;
      existingTask.status = status;
    } else if (title) {
      existingTask.title = title;
    } else {
      existingTask.status = status;
    }

    await existingTask.save();
    console.log("task saved");

    res.status(201).json({
      status: "success",
      data: existingTask,
      message: `${existingTask.title} Updated`,
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

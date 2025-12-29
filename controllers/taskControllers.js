export const GET_ALL_TASKS = async (req, res) => {
  res.status(200).json({
    status: "success",
    data: [],
  });
};

export const CREATE_TASK = async (req, res) => {
  res.status(200).json({
    status: "success",
    data: {},
  });
};

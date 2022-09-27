const Task = require("../models/Task")
const asyncWrapper = require("../middleware/asyncWrapper")

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find()
  res.status(200).json({ tasks })
})

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body)
  res.status(201).json({ task })
})

const getTask = asyncWrapper(async (req, res) => {
  const id = req.params.id
  const task = await Task.findOne({ _id: id })
  if (!task) {
    return res.status(404).json({ msg: `No task with id: ${id}` })
  }
  res.status(200).json({ task })
})

const updateTask = asyncWrapper(async (req, res) => {
  const id = req.params.id
  const task = await Task.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  })
  if (!task) {
    return res.status(404).json({ msg: `No task with id: ${id}` })
  }
  res.status(200).json({ task })
})

const deleteTask = asyncWrapper(async (req, res) => {
  const id = req.params.id
  const task = await Task.findOneAndDelete({ _id: id })
  if (!task) {
    return res.status(404).json({ msg: `No task with id: ${id}` })
  }
  res.status(200).json({ task })
})

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
}

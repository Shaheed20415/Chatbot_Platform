const Project = require('../models/Project');

exports.createProject = async (req, res) => {
  try {
    const project = await Project.create({
      userId: req.user.id,
      name: req.body.name
    });
    res.json({ ok: true, project });
  } catch (err) {
    res.status(400).json({ ok: false, message: 'Create project failed' });
  }
};

exports.getProjects = async (req, res) => {
  const projects = await Project.find({
    userId: req.user.id,
    isDeleted: false
  }).sort({ createdAt: -1 });

  res.json({ ok: true, projects });
};

exports.renameProject = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ ok: false, message: 'Name required' });
  }

  await Project.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    { name }
  );

  res.json({ ok: true });
};

exports.deleteProject = async (req, res) => {
  await Project.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    { isDeleted: true }
  );

  res.json({ ok: true });
};


// const Project = require('../models/Project');

// exports.createProject = async (req, res) => {
//   if (!req.body.name) {
//     return res.status(400).json({ ok: false, message: 'Project name required' });
//   }

//   const project = await Project.create({
//     userId: req.user.id,
//     name: req.body.name,
//     systemPrompt: req.body.systemPrompt || 'You are a helpful assistant'
//   });

//   res.json({ ok: true, project });
// };

// exports.getProjects = async (req, res) => {
//   const projects = await Project.find({ userId: req.user.id });
//   res.json({ ok: true, projects });
// };

// exports.updateProject = async (req, res) => {
//   const project = await Project.findOneAndUpdate(
//     { _id: req.params.id, userId: req.user.id },
//     { systemPrompt: req.body.systemPrompt },
//     { new: true }
//   );

//   res.json({ ok: true, project });
// };
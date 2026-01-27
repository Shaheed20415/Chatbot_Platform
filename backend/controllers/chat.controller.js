const axios = require('axios');
const fs = require('fs');
const pdfParse = require('pdf-parse');

const Message = require('../models/Message');
const Project = require('../models/Project');

/**
 * Create default project if not exists
 */
async function getOrCreateDefaultProject(userId) {
  let project = await Project.findOne({
    userId: userId,
    name: 'Default Chat'
  });

  if (!project) {
    project = await Project.create({
      userId: userId,
      name: 'Default Chat',
      systemPrompt: 'You are a helpful assistant'
    });
  }

  return project;
}

/* ================= TEXT CHAT ================= */
exports.chat = async (req, res) => {
  try {
    const { projectId, message } = req.body;
    const userId = req.user.id;

    if (!message || !message.trim()) {
      return res.status(400).json({ ok: false, message: 'Empty message' });
    }

    let activeProjectId = projectId;

    if (!activeProjectId) {
      const project = await getOrCreateDefaultProject(userId);
      activeProjectId = project._id;
    }

    const project = await Project.findOne({
      _id: activeProjectId,
      userId: userId
    });

    if (!project) {
      return res.status(401).json({
        error: { message: 'User not found.', code: 401 }
      });
    }

    const messages = [
      { role: 'system', content: project.systemPrompt },
      { role: 'user', content: message }
    ];

    const aiRes = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openai/gpt-4o-mini',
        messages
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:5000',
          'X-Title': 'Chatbot Platform'
        }
      }
    );

    const reply = aiRes.data.choices[0].message.content;

    await Message.create({
      userId,
      projectId: activeProjectId,
      role: 'user',
      content: message
    });

    await Message.create({
      userId,
      projectId: activeProjectId,
      role: 'assistant',
      content: reply
    });

    res.json({ ok: true, reply, projectId: activeProjectId });

  } catch (err) {
    console.error('🔥 CHAT ERROR:', err.response?.data || err.message);
    res.status(500).json({ ok: false, message: 'Chat failed' });
  }
};

/* ================= FILE + CHAT ================= */
exports.chatWithFile = async (req, res) => {
  try {
    const { projectId, message } = req.body;
    const file = req.file;
    const userId = req.user.id;

    if (!file) {
      return res.status(400).json({ ok: false, message: 'File missing' });
    }

    let activeProjectId = projectId;

    if (!activeProjectId) {
      const project = await getOrCreateDefaultProject(userId);
      activeProjectId = project._id;
    }

    

const project =
  (activeProjectId &&
    await Project.findOne({ _id: activeProjectId })) ||
  await getOrCreateDefaultProject(userId);

activeProjectId = project._id;

    let extractedText = '';
    if (file.mimetype === 'application/pdf') {
      const buffer = fs.readFileSync(file.path);
      const data = await pdfParse(buffer);
      extractedText = data.text.slice(0, 4000);
    }

    const messages = [
      { role: 'system', content: 'You analyze uploaded documents.' },
      {
        role: 'user',
        content: `FILE CONTENT:\n${extractedText}\n\nQUESTION:\n${message || 'Analyze'}`
      }
    ];

    const aiRes = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openai/gpt-4o-mini',
        messages
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:5000',
          'X-Title': 'Chatbot Platform'
        }
      }
    );

    const reply = aiRes.data.choices[0].message.content;

    await Message.create({
      userId,
      projectId: activeProjectId,
      role: 'user',
      content: message || file.originalname
    });

    await Message.create({
      userId,
      projectId: activeProjectId,
      role: 'assistant',
      content: reply
    });

    res.json({ ok: true, reply, projectId: activeProjectId });

  } catch (err) {
    console.error('🔥 FILE CHAT ERROR:', err.response?.data || err.message);
    res.status(500).json({ ok: false, message: 'File analysis failed' });
  }
};


// const axios = require('axios');
// const Message = require('../models/Message');
// const Project = require('../models/Project');

// /* =========================
//    TEXT CHAT (SAFE)
// ========================= */
// exports.chat = async (req, res) => {
//   try {
//     const { projectId, message } = req.body;

//     if (!message || !message.trim()) {
//       return res.status(400).json({ ok: false, message: 'Empty message' });
//     }

//     const project = await Project.findOne({
//       _id: projectId,
//       userId: req.user.id
//     });

//     if (!project) {
//       return res.status(404).json({ ok: false, message: 'Project not found' });
//     }

//     const messages = [
//       {
//         role: 'system',
//         content: project.systemPrompt || 'You are a helpful assistant'
//       },
//       { role: 'user', content: message }
//     ];

//     const response = await axios.post(
//       'https://openrouter.ai/api/v1/chat/completions',
//       {
//         model: 'openai/gpt-3.5-turbo',
//         messages
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
//           'Content-Type': 'application/json',
//           'HTTP-Referer': 'http://localhost:5173',
//           'X-Title': 'Chatbot Platform'
//         }
//       }
//     );

//     const reply =
//       response.data?.choices?.[0]?.message?.content ||
//       'No response from model';

//     await Message.create({
//       userId: req.user.id,
//       projectId,
//       role: 'user',
//       content: message
//     });

//     await Message.create({
//       userId: req.user.id,
//       projectId,
//       role: 'assistant',
//       content: reply
//     });

//     res.json({ ok: true, reply });

//   } catch (err) {
//     console.error('🔥 OpenRouter ERROR:', err.response?.data || err.message);
//     res.status(500).json({ ok: false, message: 'LLM service unavailable' });
//   }
// };

// /* =========================
//    FILE CHAT (NEW, SAFE)
// ========================= */
// exports.chatWithFile = async (req, res) => {
//   try {
//     const { projectId, message = '' } = req.body;
//     const file = req.file;

//     if (!file && !message.trim()) {
//       return res.status(400).json({ ok: false, message: 'Empty input' });
//     }

//     const project = await Project.findOne({
//       _id: projectId,
//       userId: req.user.id
//     });

//     if (!project) {
//       return res.status(404).json({ ok: false, message: 'Project not found' });
//     }

//     // Save user message
//     await Message.create({
//       userId: req.user.id,
//       projectId,
//       role: 'user',
//       content: message || `Uploaded file: ${file.originalname}`
//     });

//     // TEMP RESPONSE (SAFE)
//     const reply = file
//       ? `📎 File received: ${file.originalname}`
//       : 'Message received';

//     await Message.create({
//       userId: req.user.id,
//       projectId,
//       role: 'assistant',
//       content: reply
//     });

//     res.json({ ok: true, reply });

//   } catch (err) {
//     console.error('🔥 FILE CHAT ERROR:', err.message);
//     res.status(500).json({ ok: false, message: 'File chat failed' });
//   }
// };



// backend/controllers/chat.controller.js
// const axios = require('axios');
// const Message = require('../models/Message');
// const Project = require('../models/Project');

// exports.chat = async (req, res) => {
//   try {
//     const { projectId, message } = req.body;

//     if (!message || !message.trim()) {
//       return res.status(400).json({ ok: false, message: 'Empty message' });
//     }

//     const project = await Project.findOne({
//       _id: projectId,
//       userId: req.user.id
//     });

//     if (!project) {
//       return res.status(404).json({ ok: false, message: 'Project not found' });
//     }

//     const messages = [
//       { role: 'system', content: project.systemPrompt || 'You are a helpful assistant' },
//       { role: 'user', content: message }
//     ];

//     const response = await axios.post(
//       'https://openrouter.ai/api/v1/chat/completions',
//       {
//         model: 'openai/gpt-3.5-turbo',
//         messages
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
//           'Content-Type': 'application/json',
//           'HTTP-Referer': 'http://localhost:5173',
//           'X-Title': 'Chatbot Platform'
//         }
//       }
//     );

//     const reply =
//       response.data?.choices?.[0]?.message?.content ||
//       'No response from model';

//     await Message.create({
//       userId: req.user.id,
//       projectId,
//       role: 'user',
//       content: message
//     });

//     await Message.create({
//       userId: req.user.id,
//       projectId,
//       role: 'assistant',
//       content: reply
//     });

//     return res.json({ ok: true, reply });

//   } catch (err) {
//     console.error('🔥 OpenRouter ERROR:', err.response?.data || err.message);
//     return res.status(500).json({ ok: false, message: 'LLM service unavailable' });
//   }
// };

// const axios = require('axios');
// const Message = require('../models/Message');
// const Project = require('../models/Project');

// exports.chat = async (req, res) => {
//   try {
//     const { projectId, message } = req.body;

//     if (!message || !message.trim()) {
//       return res.status(400).json({ ok: false, message: 'Empty message' });
//     }

//     const project = await Project.findOne({
//       _id: projectId,
//       userId: req.user.id
//     });

//     if (!project) {
//       return res.status(404).json({ ok: false, message: 'Project not found' });
//     }

//     const messages = [
//       { role: 'system', content: project.systemPrompt || 'You are a helpful assistant' },
//       { role: 'user', content: message }
//     ];

//     const response = await axios.post(
//       'https://openrouter.ai/api/v1/chat/completions',
//       {
//         model: 'openai/gpt-3.5-turbo',
//         messages
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
//           'Content-Type': 'application/json',
//           'HTTP-Referer': 'http://localhost:5173',
//           'X-Title': 'Chatbot Platform'
//         }
//       }
//     );

//     const reply =
//       response.data?.choices?.[0]?.message?.content ||
//       'No response from model';

//     // await Message.create({ projectId, role: 'user', content: message });
//     await Message.create({
//   userId: req.user.id,   // ✅ REQUIRED
//   projectId,
//   role: 'user',
//   content: message
// });

//     await Message.create({ userId: req.user.id, projectId, role: 'assistant', content: reply });

//     return res.json({ ok: true, reply });

//   } catch (err) {
//     console.error('🔥 OpenRouter ERROR:', err.response?.data || err.message);
//     return res.status(500).json({ ok: false, message: 'LLM service unavailable' });
//   }
// };

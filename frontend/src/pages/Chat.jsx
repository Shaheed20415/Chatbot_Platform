import { useState } from 'react';
import api from '../services/api';

export default function Chat({ projectId }) {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [error, setError] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const isImage = selectedFile?.type?.startsWith('image/');

  const send = async () => {
    setError('');

    const hasText = message.trim().length > 0;
    const hasFile = !!selectedFile;

    if (!hasText && !hasFile) {
      setError('Type a message or upload a file');
      return;
    }

    try {
      let res;

      // ✅ FILE + TEXT → /chat/file
      if (hasFile) {
        const formData = new FormData();
        formData.append('projectId', projectId);
        formData.append('message', message || '');
        formData.append('file', selectedFile);

        res = await api.post('/chat/file', formData);
      }
      // ✅ TEXT ONLY → /chat
      else {
        res = await api.post('/chat', {
          projectId,
          message
        });
      }

      if (res.data.ok) {
        setChat(prev => [
          ...prev,
          {
            role: 'You',
            text: message || selectedFile?.name,
            file: selectedFile || null
          },
          {
            role: 'Bot',
            text: res.data.reply
          }
        ]);

        setMessage('');
        setSelectedFile(null);
      }
    } catch (err) {
      console.error(err);
      setError('Chat failed');
    }
  };

  return (
    <div className="chat-layout">

      <div className="chat-messages">
        {chat.length === 0 && (
          <div className="chat-empty">
            <h2>What can I help with?</h2>
          </div>
        )}

        {chat.map((c, i) => (
          <div key={i} className={`chat-message ${c.role === 'You' ? 'user' : 'bot'}`}>
            <div className="chat-bubble">
              {c.file && isImage && (
                <img
                  src={URL.createObjectURL(c.file)}
                  alt="preview"
                  className="chat-image-preview"
                />
              )}
              {c.text}
            </div>
          </div>
        ))}
      </div>

      {selectedFile && (
        <div className="file-preview">
          {isImage ? (
            <img src={URL.createObjectURL(selectedFile)} alt="preview" />
          ) : (
            <span>📄 {selectedFile.name}</span>
          )}
          <button onClick={() => setSelectedFile(null)}>✕</button>
        </div>
      )}

      <div className="chat-input-wrapper">
        <div className="chat-input">

          <label className="icon-btn">
            📎
            <input
              type="file"
              hidden
              accept=".pdf,.doc,.docx,.txt,image/*"
              onChange={e => setSelectedFile(e.target.files[0])}
            />
          </label>

          <input
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Ask anything"
          />

          <button className="icon-btn" onClick={send}>➤</button>
        </div>
      </div>

      {error && (
        <p style={{ color: 'red', textAlign: 'center' }}>
          {error}
        </p>
      )}
    </div>
  );
}


// import { useState } from 'react';
// import api from '../services/api';
// export default function Chat({ projectId }) {
//   const [message, setMessage] = useState('');
//   const [chat, setChat] = useState([]);
//   const [error, setError] = useState('');
//   const [selectedFile, setSelectedFile] = useState(null);

//   const isImage = selectedFile?.type?.startsWith('image/');

//   const send = async () => {
//   setError(''); // ✅ CLEAR OLD ERROR FIRST

//   const hasText = message.trim().length > 0;
//   const hasFile = !!selectedFile;

//   if (!hasText && !hasFile) {
//     setError('Type a message or upload a file');
//     return;
//   }

//   try {
//     const formData = new FormData();
//     formData.append('projectId', projectId);
//     formData.append('message', message);

//     if (selectedFile) {
//       formData.append('file', selectedFile);
//     }

//     const res = await api.post('/chat', formData, {
//       headers: { 'Content-Type': 'multipart/form-data' }
//     });

//     if (res.data.ok) {
//       setChat(prev => [
//         ...prev,
//         {
//           role: 'You',
//           text: message || `📎 ${selectedFile.name}`,
//           file: selectedFile
//             ? {
//                 name: selectedFile.name,
//                 type: selectedFile.type,
//                 preview: isImage
//                   ? URL.createObjectURL(selectedFile)
//                   : null
//               }
//             : null
//         },
//         {
//           role: 'Bot',
//           text: res.data.reply
//         }
//       ]);

//       setMessage('');
//       setSelectedFile(null);
//       setError(''); // ✅ ENSURE ERROR IS CLEARED
//     } else {
//       setError(res.data.message || 'Chat failed');
//     }
//   } catch (err) {
//     setError(err.response?.data?.message || 'Chat failed');
//   }
// };


//   return (
//     <div className="chat-layout">

//       {/* Messages */}
//       <div className="chat-messages">
//         {chat.length === 0 && (
//           <div className="chat-empty">
//             <h2>What can I help with?</h2>
//           </div>
//         )}

//         {chat.map((c, i) => (
//           <div
//             key={i}
//             className={`chat-message ${c.role === 'You' ? 'user' : 'bot'}`}
//           >
//             <div className="chat-bubble">

//               {/* File preview in chat */}
//               {c.file && (
//                 <div className="chat-file">
//                   {c.file.preview ? (
//                     <img
//                       src={c.file.preview}
//                       alt="preview"
//                       className="chat-image-preview"
//                     />
//                   ) : (
//                     <div className="chat-file-chip">
//                       📄 {c.file.name}
//                     </div>
//                   )}
//                 </div>
//               )}

//               {c.text}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* File preview before send */}
//       {selectedFile && (
//         <div className="file-preview">
//           {isImage ? (
//             <img
//               src={URL.createObjectURL(selectedFile)}
//               alt="preview"
//               className="file-image-preview"
//             />
//           ) : (
//             <span>📄 {selectedFile.name}</span>
//           )}

//           <button
//             className="remove-file"
//             onClick={() => setSelectedFile(null)}
//           >
//             ✕
//           </button>
//         </div>
//       )}

//       {/* Input */}
//       <div className="chat-input-wrapper">
//         <div className="chat-input">

//           {/* File upload */}
//           <label className="icon-btn">
//             📎
//             <input
//               type="file"
//               hidden
//               accept=".pdf,.doc,.docx,.txt,image/*"
//               onChange={e => setSelectedFile(e.target.files[0])}
//             />
//           </label>

//           <input
//             value={message}
//             onChange={e => setMessage(e.target.value)}
//             placeholder="Ask anything"
//           />

//           <button className="icon-btn send" onClick={send}>
//             ➤
//           </button>

//         </div>
//       </div>

//       {error && (
//         <p style={{ color: 'red', textAlign: 'center' }}>
//           {error}
//         </p>
//       )}
//     </div>
//   );
// }

// import { useState } from 'react';
// import api from '../services/api';

// export default function Chat({ projectId }) {
//   const [message, setMessage] = useState('');
//   const [chat, setChat] = useState([]);
//   const [error, setError] = useState('');

//   const send = async () => {
//     try {
//       const res = await api.post('/chat', {
//         projectId,
//         message
//       });

//       if (res.data.ok) {
//         setChat([
//           ...chat,
//           { role: 'You', text: message },
//           { role: 'Bot', text: res.data.reply }
//         ]);
//         setMessage('');
//         setError('');
//       } else {
//         setError(res.data.message);
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || 'Chat failed');
//     }
//   };

//   return (
//   <>
//     <div className="chat-wrapper">
//       <div className="chat-container">
//         {chat.map((c, i) => (
//           <div
//             key={i}
//             className={`chat-message ${c.role === 'You' ? 'user' : 'bot'}`}
//           >
//             <div className="chat-bubble">
//               {c.text}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>

//     <div className="chat-input-bar">
//       <div className="chat-input-inner">
//         <input
//           className="ui-input"
//           value={message}
//           onChange={e => setMessage(e.target.value)}
//           placeholder="Message Chatbot..."
//         />
//         <button className="ui-btn" onClick={send} style={{ width: 120 }}>
//           Send
//         </button>
//       </div>
//     </div>
//   </>
// );
// }



//   return (
//   <div style={{
//     marginTop: 32,
//     background: 'white',
//     borderRadius: 12,
//     boxShadow: 'var(--shadow)',
//     display: 'flex',
//     flexDirection: 'column',
//     height: 420
//   }}>
    
//     {/* Messages */}
//     <div style={{
//       flex: 1,
//       padding: 16,
//       overflowY: 'auto'
//     }}>
//       {chat.map((c, i) => (
//         <div
//           key={i}
//           style={{
//             marginBottom: 12,
//             display: 'flex',
//             justifyContent: c.role === 'You' ? 'flex-end' : 'flex-start'
//           }}
//         >
//           <div style={{
//             background: c.role === 'You' ? '#1677ff' : '#f1f5f9',
//             color: c.role === 'You' ? 'white' : 'black',
//             padding: '10px 14px',
//             borderRadius: 12,
//             maxWidth: '70%',
//             animation: 'fadeInUp 0.3s ease'
//           }}>
//             {c.text}
//           </div>
//         </div>
//       ))}
//     </div>

//     {/* Input */}
//     <div style={{
//       borderTop: '1px solid var(--border)',
//       padding: 12,
//       display: 'flex',
//       gap: 10
//     }}>
//       <input
//         className="ui-input"
//         value={message}
//         onChange={e => setMessage(e.target.value)}
//         placeholder="Type your message..."
//       />
//       <button className="ui-btn" onClick={send} style={{ width: 120 }}>
//         Send
//       </button>
//     </div>
//   </div>
// );


  // return (
  //   <div>
  //     {error && <p style={{ color: 'red' }}>{error}</p>}
  //     {chat.map((c, i) => (
  //       <p key={i}>
  //         <b>{c.role}:</b> {c.text}
  //       </p>
  //     ))}
  //     <input value={message} onChange={e => setMessage(e.target.value)} />
  //     <button onClick={send}>Send</button>
  //   </div>
  // );
// }
import { useEffect, useState } from 'react';
import api from '../services/api';
import Chat from './Chat';

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [active, setActive] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [theme, setTheme] = useState('dark');

  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  useEffect(() => {
    api.get('/projects').then(res => setProjects(res.data.projects || []));
  }, []);

  const createProject = async () => {
    try {
      const res = await api.post('/projects', { name });
      if (res.data.ok) {
        setProjects([...projects, res.data.project]);
        setName('');
      } else {
        setMessage(res.data.message);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'Create failed');
    }
  };

  return (
    <div className={`app-shell ${theme}`}>

      {/* ================= SIDEBAR ================= */}
      <aside className={`sidebar ${sidebarOpen ? '' : 'collapsed'}`}>

        <div className="sidebar-top">
          <button className="icon-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
            ☰
          </button>
          {sidebarOpen && <span className="brand">Chatbot</span>}
        </div>

        {sidebarOpen && (
          <>
            {/* New Chat */}
            <button className="sidebar-item new-chat" onClick={() => setActive(null)}>
              + New Chat
            </button>

            {/* Chats */}
            <div className="sidebar-section">
              <p className="sidebar-title">Chats</p>
              <button className="sidebar-item active-chat">
                Current Chat
              </button>
            </div>

            {/* Projects */}
            <div className="sidebar-section">
              <p className="sidebar-title">Projects</p>

              <input
                className="sidebar-input"
                placeholder="New project"
                value={name}
                onChange={e => setName(e.target.value)}
              />

              <button className="sidebar-create" onClick={createProject}>
                Create
              </button>

              {projects.map(p => (
                <button
                  key={p._id}
                  className={`sidebar-item ${active === p._id ? 'active-chat' : ''}`}
                  onClick={() => setActive(p._id)}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </>
        )}

      </aside>

      {/* ================= MAIN ================= */}
      <main className="main-area">

        {/* Top Bar */}
        <header className="topbar">
          <div></div>

          <div className="topbar-actions">
            <button className="icon-btn" onClick={() =>
              setTheme(theme === 'dark' ? 'light' : 'dark')
            }>
              {theme === 'dark' ? '🌙' : '☀️'}
            </button>

            <div className="account-menu">
              <span className="avatar">U</span>
              <div className="account-dropdown">
                <button onClick={logout}>Logout</button>
              </div>
            </div>
          </div>
        </header>

        {/* Chat Area */}
        <Chat projectId={active} />

      </main>

    </div>
  );
}


// import { useEffect, useState } from 'react';
// import api from '../services/api';
// import Chat from './Chat';

// export default function Dashboard() {
//   const [projects, setProjects] = useState([]);
//   const [name, setName] = useState('');
//   const [message, setMessage] = useState('');
//   const [active, setActive] = useState(null);
//     const logout = () => {
//     localStorage.removeItem('token');
//     window.location.href = '/';
//   };

//   useEffect(() => {
//     api.get('/projects').then(res => setProjects(res.data.projects || []));
//   }, []);

//   const createProject = async () => {
//     try {
//       const res = await api.post('/projects', { name });
//       if (res.data.ok) {
//         setProjects([...projects, res.data.project]);
//         setName('');
//       } else {
//         setMessage(res.data.message);
//       }
//     } catch (err) {
//       setMessage(err.response?.data?.message || 'Create failed');
//     }
//   };



//   return (
//   <div className="app-shell">
    
//     {/* Sidebar */}
//     <aside className="sidebar">
//       <h3>Your Projects</h3>

//       <input
//         className="ui-input"
//         placeholder="New project"
//         value={name}
//         onChange={e => setName(e.target.value)}
//       />
//       <br />

//       <button className="ui-btn" onClick={createProject}>
//         Create
//       </button>

//       <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
//         {projects.map(p => (
//           <button
//             key={p._id}
//             className="project-btn"
//             onClick={() => setActive(p._id)}
//           >
//             {p.name}
//           </button>
//         ))}
//       </div>

//       <div style={{ marginTop: 'auto' }}>
//         <button onClick={logout} className="project-btn">
//           Logout
//         </button>
//       </div>
//     </aside>

//     {/* Main */}
//     <main className="main-area">
//       <div className="topbar">
//         <strong>Chat</strong>
//       </div>

//       {active && <Chat projectId={active} />}
//     </main>

//   </div>
// );
// }


//   return (
//   <div style={{ display: 'flex', minHeight: '100vh' }}>
    
//     {/* Sidebar */}
//     <aside style={{
//       width: 220,
//       background: '#0f172a',
//       color: 'white',
//       padding: 24
//     }}>
//       <h3 style={{ marginBottom: 32 }}>Chatbot</h3>

//       <button
//         onClick={logout}
//         style={{
//           background: '#dc2626',
//           color: 'white',
//           border: 'none',
//           padding: '10px 14px',
//           borderRadius: 8,
//           cursor: 'pointer'
//         }}
//       >
//         Logout
//       </button>
//     </aside>

//     {/* Main */}
//     <main style={{ flex: 1, padding: 32 }}>
//       <h2 style={{ marginBottom: 24 }}>Dashboard</h2>

//       {message && <div className="ui-error">{message}</div>}

//       {/* Create Project */}
//       <div className="ui-card" style={{ maxWidth: 520 }}>
//         <h3>Create Project</h3>
//         <input
//           className="ui-input"
//           placeholder="Project name"
//           value={name}
//           onChange={e => setName(e.target.value)}
//         />
//         <br /><br />
//         <button className="ui-btn" onClick={createProject}>
//           Create
//         </button>
//       </div>

//       {/* Projects */}
//       <div style={{ marginTop: 32 }}>
//         <h3>Your Projects</h3>
//         <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
//           {projects.map(p => (
//             <button
//               key={p._id}
//               onClick={() => setActive(p._id)}
//               style={{
//                 padding: '10px 16px',
//                 borderRadius: 10,
//                 border: '1px solid var(--border)',
//                 background: 'white',
//                 cursor: 'pointer'
//               }}
//             >
//               {p.name}
//             </button>
//           ))}
//         </div>
//       </div>

//       {active && <Chat projectId={active} />}
//     </main>
//   </div>
// );


  // return (
  //   <div style={{ padding: '20px' }}>

  //      {/* Logout Button */}
  //     <button
  //       onClick={logout}
  //       style={{
  //         float: 'right',
  //         background: 'red',
  //         color: 'white',
  //         padding: '6px 12px',
  //         border: 'none',
  //         cursor: 'pointer'
  //       }}
  //     >
  //       Logout
  //     </button>

  //     <h2>Dashboard</h2>


  //     <h2>Projects</h2>
  //     {message && <p style={{ color: 'red' }}>{message}</p>}
  //     <input
  //       placeholder="New project"
  //       value={name}
  //       onChange={e => setName(e.target.value)}
  //     />
  //     <button onClick={createProject}>Create</button>

  //     <div>
  //       {projects.map(p => (
  //         <button key={p._id} onClick={() => setActive(p._id)}>
  //           {p.name}
  //         </button>
  //       ))}
  //     </div>

  //     {active && <Chat projectId={active} />}
  //   </div>
  // );
//}
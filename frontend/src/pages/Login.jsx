import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false); // UI ONLY

  const login = async () => {
    try {
      const res = await api.post('/auth/login', { email, password });
      if (res.data.ok) {
        localStorage.setItem('token', res.data.token);
        window.location.href = '/dashboard';
      } else {
        setMessage(res.data.message);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <>
      {/* ===== Circuit Background ===== */}
      <div className="circuit-bg">
        <div className="circuit-line horizontal delay-1" style={{ top: '40%', '--line-color': '#22d3ee' }} />
        <div className="circuit-line horizontal delay-2" style={{ top: '55%', '--line-color': '#facc15' }} />
        <div className="circuit-line horizontal delay-3" style={{ top: '70%', '--line-color': '#a78bfa' }} />

        <div className="circuit-line vertical delay-2" style={{ left: '30%', '--line-color': '#38bdf8' }} />
        <div className="circuit-line vertical delay-3" style={{ left: '60%', '--line-color': '#ec4899' }} />
        <div className="circuit-line vertical delay-4" style={{ left: '80%', '--line-color': '#4ade80' }} />
      </div>

      {/* ===== Login Container ===== */}
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div className="neon-wrapper">
          <div className="login-chip">

            <h2 style={{ color: '#fff', marginBottom: 6 }}>
              Welcome back
            </h2>

            <p style={{ color: '#9ca3af', marginBottom: 18 }}>
              Sign in to continue
            </p>

            {message && (
              <p style={{ color: '#f87171', marginBottom: 10 }}>
                {message}
              </p>
            )}

            <input
              className="login-input"
              placeholder="Email"
              onChange={e => setEmail(e.target.value)}
            />
            <br /><br />

            {/* Password with icon */}
            <div className="password-field">
              <input
                className="login-input"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                onChange={e => setPassword(e.target.value)}
              />

              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  /* Eye Off */
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                    <path d="M3 3l18 18" />
                    <path d="M10.7 5.1A9.6 9.6 0 0 1 12 5c7 0 10 7 10 7a18.4 18.4 0 0 1-3.3 4.1" />
                    <path d="M6.6 6.6A18.4 18.4 0 0 0 2 12s3 7 10 7a9.6 9.6 0 0 0 4.3-1" />
                  </svg>
                ) : (
                  /* Eye */
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </span>
            </div>

            <button className="login-btn" onClick={login}>
              Login
            </button>

            <p style={{ color: '#9ca3af', marginTop: 14, textAlign: 'center' }}>
              Don’t have an account?{' '}
              <Link className="login-link" to="/register">
                Register
              </Link>
            </p>

          </div>
        </div>
      </div>
    </>
  );
}


// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import api from '../services/api';

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');

//   const login = async () => {
//     try {
//       const res = await api.post('/auth/login', { email, password });
//       if (res.data.ok) {
//         localStorage.setItem('token', res.data.token);
//         window.location.href = '/dashboard';
//       } else {
//         setMessage(res.data.message);
//       }
//     } catch (err) {
//       setMessage(err.response?.data?.message || 'Login failed');
//     }
//   };

//   return (
//     <>
//       {/* ===== Circuit Background ===== */}
//       <div className="circuit-bg">
//         {/* Horizontal lines */}
//         <div className="circuit-line horizontal delay-1" style={{ top: '40%', '--line-color': '#22d3ee' }} />
//         <div className="circuit-line horizontal delay-2" style={{ top: '55%', '--line-color': '#facc15' }} />
//         <div className="circuit-line horizontal delay-3" style={{ top: '70%', '--line-color': '#a78bfa' }} />

//         {/* Vertical lines */}
//         <div className="circuit-line vertical delay-2" style={{ left: '30%', '--line-color': '#38bdf8' }} />
//         <div className="circuit-line vertical delay-3" style={{ left: '60%', '--line-color': '#ec4899' }} />
//         <div className="circuit-line vertical delay-4" style={{ left: '80%', '--line-color': '#4ade80' }} />
//       </div>

//       {/* ===== Login Chip ===== */}
//       <div
//         style={{
//           minHeight: '100vh',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center'
//         }}
//       >
//         <div className="login-chip">
//           <h2 style={{ color: '#fff', marginBottom: 6 }}>Welcome back</h2>
//           <p className="login-text">Sign in to continue</p>

//           {message && (
//             <p style={{ color: '#f87171', marginBottom: 10 }}>{message}</p>
//           )}

//           <input
//             className="login-input"
//             placeholder="Email"
//             onChange={e => setEmail(e.target.value)}
//           />
//           <br /><br />

//           <input
//             className="login-input"
//             type="password"
//             placeholder="Password"
//             onChange={e => setPassword(e.target.value)}
//           />

//           <button className="login-btn" onClick={login}>
//             Login
//           </button>

//           <p className="login-text" style={{ marginTop: 14, textAlign: 'center' }}>
//             Don’t have an account?{' '}
//             <Link className="login-link" to="/register">
//               Register
//             </Link>
//           </p>
//         </div>
//       </div>
//     </>
//   );
// }


// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import api from '../services/api';

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const [showPassword, setShowPassword] = useState(false); // UI ONLY

//   const login = async () => {
//     try {
//       const res = await api.post('/auth/login', { email, password });
//       if (res.data.ok) {
//         localStorage.setItem('token', res.data.token);
//         window.location.href = '/dashboard';
//       } else {
//         setMessage(res.data.message);
//       }
//     } catch (err) {
//       setMessage(err.response?.data?.message || 'Login failed');
//     }
//   };

//   return (
//     <>
//       {/* ================= AI FUTURISTIC BACKGROUND ================= */}
//       <div className="ai-scene">
//         <div className="ui-float one"></div>
//         <div className="ui-float two"></div>
//         <div className="ui-float three"></div>
//         <div className="ui-float four"></div>
//         <div className="scan-line"></div>
//       </div>

//       {/* ================= LOGIN CARD ================= */}
//       <div
//         style={{
//           minHeight: '100vh',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           position: 'relative',
//           zIndex: 1
//         }}
//       >
//         <div className="login-card">

//           <h2 style={{ marginBottom: 6, color: '#e5e7eb' }}>
//             Welcome back 👋
//           </h2>

//           <p style={{ color: '#9ca3af', marginBottom: 24 }}>
//             Sign in to continue
//           </p>

//           {message && <div className="auth-error">{message}</div>}

//           <input
//             className="login-input"
//             placeholder="Email"
//             onChange={e => setEmail(e.target.value)}
//           />
//           <br /><br />

//           <input
//             className="login-input"
//             type={showPassword ? 'text' : 'password'}
//             placeholder="Password"
//             onChange={e => setPassword(e.target.value)}
//           />

//           <div
//             className="show-pass"
//             onClick={() => setShowPassword(!showPassword)}
//             style={{ marginTop: 8 }}
//           >
//             {showPassword ? 'Hide password' : 'Show password'}
//           </div>

//           <br />

//           <button className="login-btn" onClick={login}>
//             Login
//           </button>

//           <p style={{ marginTop: 18, textAlign: 'center', fontSize: 14 }}>
//             Don’t have an account?{' '}
//             <Link className="auth-link" to="/register">
//               Register
//             </Link>
//           </p>

//         </div>
//       </div>
//     </>
//   );
// }



// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import api from '../services/api';

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const [showPassword, setShowPassword] = useState(false); // UI ONLY

//   const login = async () => {
//     try {
//       const res = await api.post('/auth/login', { email, password });
//       if (res.data.ok) {
//         localStorage.setItem('token', res.data.token);
//         window.location.href = '/dashboard';
//       } else {
//         setMessage(res.data.message);
//       }
//     } catch (err) {
//       setMessage(err.response?.data?.message || 'Login failed');
//     }
//   };

//   return (
//     <>
//       {/* ================= Animated AI Background ================= */}
//       <div className="ai-bg">
//         <svg width="0" height="0">
//           <defs>
//             <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
//               <stop offset="0%" stopColor="#60a5fa" />
//               <stop offset="100%" stopColor="#a78bfa" />
//             </linearGradient>
//           </defs>
//         </svg>

//         {/* Floating AI / Chatbot Icons */}
//         <div className="ai-icon">
//           <svg viewBox="0 0 24 24">
//             <path d="M12 3v3M12 18v3M3 12h3M18 12h3M7 7l2 2M15 15l2 2M7 17l2-2M15 9l2-2" />
//             <circle cx="12" cy="12" r="4" />
//           </svg>
//         </div>

//         <div className="ai-icon">
//           <svg viewBox="0 0 24 24">
//             <rect x="4" y="4" width="16" height="16" rx="3" />
//             <path d="M9 9h6M9 13h4" />
//           </svg>
//         </div>

//         <div className="ai-icon">
//           <svg viewBox="0 0 24 24">
//             <path d="M4 12c0-4 4-8 8-8s8 4 8 8-4 8-8 8-8-4-8-8z" />
//             <path d="M8 12h8" />
//           </svg>
//         </div>

//         <div className="ai-icon">
//           <svg viewBox="0 0 24 24">
//             <path d="M12 2l7 4v8l-7 4-7-4V6z" />
//           </svg>
//         </div>

//         <div className="glow-line"></div>
//         <div className="glow-line"></div>
//         <div className="glow-line"></div>
//       </div>

//       {/* ================= Login Card ================= */}
//       <div
//         style={{
//           minHeight: '100vh',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center'
//         }}
//       >
//         <div className="login-card">

//           <h2 style={{ marginBottom: 6, color: '#e5e7eb' }}>
//             Welcome back 👋
//           </h2>

//           <p style={{ color: '#9ca3af', marginBottom: 24 }}>
//             Sign in to continue
//           </p>

//           {message && <div className="auth-error">{message}</div>}

//           <input
//             className="login-input"
//             placeholder="Email"
//             onChange={e => setEmail(e.target.value)}
//           />
//           <br /><br />

//           <input
//             className="login-input"
//             type={showPassword ? 'text' : 'password'}
//             placeholder="Password"
//             onChange={e => setPassword(e.target.value)}
//           />

//           <div
//             className="show-pass"
//             onClick={() => setShowPassword(!showPassword)}
//             style={{ marginTop: 8 }}
//           >
//             {showPassword ? 'Hide password' : 'Show password'}
//           </div>

//           <br />

//           <button className="login-btn" onClick={login}>
//             Login
//           </button>

//           <p style={{ marginTop: 18, textAlign: 'center', fontSize: 14 }}>
//             Don’t have an account?{' '}
//             <Link className="auth-link" to="/register">
//               Register
//             </Link>
//           </p>

//         </div>
//       </div>
//     </>
//   );
// }


// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import api from '../services/api';

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const [showPassword, setShowPassword] = useState(false); // UI ONLY

//   const login = async () => {
//     try {
//       const res = await api.post('/auth/login', { email, password });
//       if (res.data.ok) {
//         localStorage.setItem('token', res.data.token);
//         window.location.href = '/dashboard';
//       } else {
//         setMessage(res.data.message);
//       }
//     } catch (err) {
//       setMessage(err.response?.data?.message || 'Login failed');
//     }
//   };

//   return (
//     <div className="auth-bg">
//       <div className="login-card">

//         <h2 style={{ marginBottom: 6, color: '#e5e7eb' }}>
//           Welcome back 👋
//         </h2>

//         <p style={{ color: '#9ca3af', marginBottom: 24 }}>
//           Sign in to continue
//         </p>

//         {message && <div className="auth-error">{message}</div>}

//         <input
//           className="login-input"
//           placeholder="Email"
//           onChange={e => setEmail(e.target.value)}
//         />
//         <br /><br />

//         <input
//           className="login-input"
//           type={showPassword ? 'text' : 'password'}
//           placeholder="Password"
//           onChange={e => setPassword(e.target.value)}
//         />

//         <div
//           className="show-pass"
//           onClick={() => setShowPassword(!showPassword)}
//           style={{ marginTop: 8 }}
//         >
//           {showPassword ? 'Hide password' : 'Show password'}
//         </div>

//         <br />

//         <button className="login-btn" onClick={login}>
//           Login
//         </button>

//         <p style={{ marginTop: 18, textAlign: 'center', fontSize: 14 }}>
//           Don’t have an account?{' '}
//           <Link className="auth-link" to="/register">
//             Register
//           </Link>
//         </p>

//       </div>
//     </div>
//   );
// }




// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import api from '../services/api';

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');

//   const login = async () => {
//     try {
//       const res = await api.post('/auth/login', { email, password });
//       if (res.data.ok) {
//         localStorage.setItem('token', res.data.token);
//         window.location.href = '/dashboard';
//       } else {
//         setMessage(res.data.message);
//       }
//     } catch (err) {
//       setMessage(err.response?.data?.message || 'Login failed');
//     }
//   };


//   return (
//   <div className="auth-wrapper">
//     <div className="ui-card">
//       <h2 style={{ marginBottom: 6 }}>Welcome back</h2>
//       <p style={{ color: 'var(--muted)', marginBottom: 24 }}>
//         Sign in to continue
//       </p>

//       {message && <div className="ui-error">{message}</div>}

//       <input
//         className="ui-input"
//         placeholder="Email"
//         onChange={e => setEmail(e.target.value)}
//       />
//       <br /><br />

//       <input
//         className="ui-input"
//         type="password"
//         placeholder="Password"
//         onChange={e => setPassword(e.target.value)}
//       />
//       <br /><br />

//       <button className="ui-btn" onClick={login}>
//         Login
//       </button>

//       <p style={{ marginTop: 18, textAlign: 'center', fontSize: 14 }}>
//         Don’t have an account? <a className="ui-link" href="/register">Register</a>
//       </p>
//     </div>
//   </div>
// );
// }












//   return (
//     <div style={{ padding: '40px' }}>
//       <h2>Login</h2>

//       {message && <p style={{ color: 'red' }}>{message}</p>}

//       <input
//         placeholder="Email"
//         onChange={e => setEmail(e.target.value)}
//       />
//       <br /><br />

//       <input
//         type="password"
//         placeholder="Password"
//         onChange={e => setPassword(e.target.value)}
//       />
//       <br /><br />

//       <button onClick={login}>Login</button>

//       <p style={{ marginTop: '15px' }}>
//         Don’t have an account?{' '}
//         <Link to="/register">Register here</Link>
//       </p>
//     </div>
//   );
//}
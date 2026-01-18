import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false); // UI ONLY

  const register = async () => {
    try {
      const res = await api.post('/auth/register', {
        name,
        email,
        password
      });

      if (res.data.ok) {
        window.location.href = '/';
      } else {
        setMessage(res.data.message);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <>
      {/* ===== Same Gemini / Next.js Circuit Background ===== */}
      <div className="circuit-bg">
        <div className="circuit-line horizontal delay-1" style={{ top: '38%', '--line-color': '#22d3ee' }} />
        <div className="circuit-line horizontal delay-2" style={{ top: '55%', '--line-color': '#facc15' }} />
        <div className="circuit-line horizontal delay-3" style={{ top: '72%', '--line-color': '#a78bfa' }} />

        <div className="circuit-line vertical delay-2" style={{ left: '28%', '--line-color': '#38bdf8' }} />
        <div className="circuit-line vertical delay-3" style={{ left: '60%', '--line-color': '#ec4899' }} />
        <div className="circuit-line vertical delay-4" style={{ left: '82%', '--line-color': '#4ade80' }} />
      </div>

      {/* ===== Register Layout ===== */}
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1
        }}
      >
        <div className="neon-wrapper">
          <div className="login-chip">

            <h2 style={{ color: '#fff', marginBottom: 6 }}>
              Create account
            </h2>

            <p style={{ color: '#9ca3af', marginBottom: 18 }}>
              Get started in seconds
            </p>

            {message && (
              <p style={{ color: '#f87171', marginBottom: 10 }}>
                {message}
              </p>
            )}

            {/* Full Name */}
            <input
              className="login-input"
              placeholder="Full name"
              onChange={e => setName(e.target.value)}
            />
            <br /><br />

            {/* Email */}
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
                title={showPassword ? 'Hide password' : 'Show password'}
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

            <button className="login-btn" onClick={register}>
              Register
            </button>

            <p style={{ color: '#9ca3af', marginTop: 14, textAlign: 'center' }}>
              Already have an account?{' '}
              <Link className="login-link" to="/">
                Back to Login
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

// export default function Register() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');

//   const register = async () => {
//     try {
//       const res = await api.post('/auth/register', {
//         name,
//         email,
//         password
//       });

//       if (res.data.ok) {
//         window.location.href = '/';
//       } else {
//         setMessage(res.data.message);
//       }
//     } catch (err) {
//       setMessage(err.response?.data?.message || 'Registration failed');
//     }
//   };


//   return (
//   <div className="auth-wrapper">
//     <div className="ui-card">
//       <h2 style={{ marginBottom: 6 }}>Create account</h2>
//       <p style={{ color: 'var(--muted)', marginBottom: 24 }}>
//         Get started in seconds
//       </p>

//       {message && <div className="ui-error">{message}</div>}

//       <input
//         className="ui-input"
//         placeholder="Full name"
//         onChange={e => setName(e.target.value)}
//       />
//       <br /><br />

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

//       <button className="ui-btn" onClick={register}>
//         Register
//       </button>

//       <p style={{ marginTop: 18, textAlign: 'center', fontSize: 14 }}>
//         Already have an account? <a className="ui-link" href="/">Back to Login</a>
//       </p>
//     </div>
//   </div>
// );
// }


  // return (
  //   <div>
  //     <h2>Register</h2>
  //     {message && <p style={{ color: 'red' }}>{message}</p>}
  //     <input placeholder="Name" onChange={e => setName(e.target.value)} />
  //     <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
  //     <input
  //       placeholder="Password"
  //       type="password"
  //       onChange={e => setPassword(e.target.value)}
  //     />
  //     <button onClick={register}>Register</button>

  //      <p style={{ marginTop: '15px' }}>
  //       Already have an account?{' '}
  //       <Link to="/">Back to Login</Link>
  //     </p>
      


  //   </div>
  // );
// }
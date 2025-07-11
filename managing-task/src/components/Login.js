

// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import Navbar from "./Navbar";
// import loginBg from "../assets/loginbp.jpg";

// const Login = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   useEffect(() => {
//     if (location.state) {
//       setEmail(location.state.email || "");
//       setPassword(location.state.password || "");
//     }
//   }, [location.state]);

//   // const handleSubmit = async (e) => {
//   //   const userEmail = localStorage.getItem("email");

//   //   e.preventDefault();

//   //   try {
//   //     const response = await fetch(`http://localhost:8080/api/users/${email}`);
//   //     if (response.ok) {
//   //       const user = await response.json();
    

//   //       if (user.password === password) {

//   //         localStorage.setItem("email", user.email);  // ✅ Save email globally
//   //         sessionStorage.setItem("loggedInUserEmail", user.email);

//   //         alert("Logged in successfully!");

//   //         // Role-based navigation
//   //         if (user.role === "Admin") {
//   //           navigate("/adminhome", { state: { email: user.email } });
//   //         } else if (user.role === "Seller") {
//   //           navigate("/sellerhome", { state: { email: user.email } });
//   //         } else {
//   //           navigate("/usercategory", { state: { email: user.email } });
//   //         }
//   //       } else {
//   //         alert("Invalid password");
//   //       }
//   //     } else {
//   //       alert("User not found");
//   //     }
//   //   } catch (error) {
//   //     console.error("Login error:", error);
//   //     alert("Login failed");
//   //   }
//   // };
//   const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     const response = await fetch("http://localhost:8080/api/users/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({ email, password })
//     });

//     if (response.ok) {
//       const data = await response.json();
//       const { token, role } = data;

//       // ✅ Store token and role
//       localStorage.setItem("token", token);
//       localStorage.setItem("email", email);
//       localStorage.setItem("role", role);

//       alert("Login successful");

//       // ✅ Role-based navigation
//       if (role === "ADMIN") {
//         navigate("/manage-tasks", { state: { email } });
      
//       } else {
//         navigate("/addingtask", { state: { email } });
//       }
//     } else {
//       const errMsg = await response.text();
//       alert(errMsg || "Login failed");
//     }
//   } catch (error) {
//     console.error("Login error:", error);
//     alert("Error logging in");
//   }
// };


//   return (
//     <>
//       <Navbar />
//       <div className="container-fluid main-container" style={styles.background}>
//         <div className="row w-100">
//           <div className="col-md-6 d-flex justify-content-center align-items-center">
//             <div className="form-box" style={styles.formBox}>
//               <h3>Login</h3>
//               <form onSubmit={handleSubmit}>
//                 <div className="mb-3">
//                   <input
//                     type="email"
//                     className="form-control"
//                     placeholder="Email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <input
//                     type="password"
//                     className="form-control"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div className="mb-3 text-center">
//                   <button type="submit" className="btn btn-primary">SignIn</button>
//                   <button type="reset" className="btn btn-danger ms-3">Reset</button>
//                 </div>
//               </form>
//             </div>
//           </div>
//           <div className="col-md-6 d-none d-md-block"></div>
//         </div>
//       </div>
//     </>
//   );
// };

// const styles = {
//   background: {
//     backgroundImage: `url(${loginBg})`,
//     backgroundRepeat: "no-repeat",
//     backgroundPosition: "center center",
//     backgroundAttachment: "fixed",
//     backgroundSize: "cover",
//     minHeight: "100vh",
//     paddingTop: "60px",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center"
//   },
//   formBox: {
//     backgroundColor: "rgba(255, 255, 255, 0.5)",
//     padding: "30px",
//     borderRadius: "15px",
//     boxShadow: "0 0 15px rgba(0,0,0,0.2)",
//     width: "100%",
//     maxWidth: "500px"
//   }
// };

// export default Login;
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (location.state) {
      setEmail(location.state.email || "");
      setPassword(location.state.password || "");
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        const { token, role } = data;

        localStorage.setItem("token", token);
        localStorage.setItem("email", email);
        localStorage.setItem("role", role);

        alert("Login successful");

        if (role === "ADMIN") {
          navigate("/manage-tasks", { state: { email } });
        } else {
          navigate("/addingtask", { state: { email } });
        }
      } else {
        const errMsg = await response.text();
        alert(errMsg || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Error logging in");
    }
  };

  return (
    <>
      <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100">
        <div className="form-section col-md-5">
          <h3 className="text-center mb-4">Login</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <button type="submit" className="btn btn-primary px-4">Sign In</button>
              <button type="reset" className="btn btn-secondary ms-2 px-4">Reset</button>
            </div>
            <div className="text-center mt-4">
              <button
                type="button"
                className="btn btn-outline-dark"
                onClick={() => navigate("/register")}
              >
                New User? Register
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* STYLING */}
      <style>{`
        body {
          margin: 0;
          padding: 0;
          background: linear-gradient(-45deg, #74ebd5, #ACB6E5, #d4a5f9, #fbc2eb);
          background-size: 400% 400%;
          animation: gradientBG 15s ease infinite;
          font-family: 'Segoe UI', sans-serif;
        }

        @keyframes gradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .form-section {
          background-color: rgba(255,255,255,0.95);
          padding: 30px;
          border-radius: 15px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
          transition: transform 0.3s ease-in-out;
        }

        .form-section:hover {
          transform: translateY(-5px);
        }

        input.form-control {
          padding: 12px;
          font-size: 16px;
        }

        button.btn {
          font-size: 15px;
        }
      `}</style>
    </>
  );
};

export default Login;

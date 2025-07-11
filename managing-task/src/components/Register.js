
// import React, { useState } from "react";
// import Navbar from "./Navbar";
// import signinBg from "../assets/signinbg.jpg";
// import { useNavigate } from "react-router-dom"; // ✅ Import this

// const Register = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     gender: "",
//     phone: "",
//     address: "",
//     role: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({ ...prevState, [name]: value }));
//   };

  
//   const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     const response = await fetch("http://localhost:8080/api/users", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(formData),
//     });

//     if (response.ok) {
//       const data = await response.json();
//       alert("User Registered Successfully: " + data.email);

//       // ✅ Navigate to login page with credentials
//       navigate("/login", {
//         state: {
//           email: formData.email,
//           password: formData.password
//         }
//       });
//     } else if (response.status === 409) {
//       alert("User already exists with this email.");
//     } else {
//       alert("Failed to register user");
//     }
//   } catch (error) {
//     console.error("Error during registration:", error);
//     alert("Error occurred while registering.");
//   }
// };


//   return (
//     <>
//       <Navbar />
//       <div className="container-fluid main-container" style={styles.background}>
//         <div className="row w-100">
//           <div className="col-md-6 d-none d-md-block"></div>
//           <div className="col-md-6 d-flex justify-content-center align-items-center">
//             <div className="form-box" style={styles.formBox}>
//               <h3>SignUp</h3>
//               <form onSubmit={handleSubmit}>
//                 <div className="mb-3">
//                   <input name="name" type="text" className="form-control" placeholder="FullName" required onChange={handleChange} />
//                 </div>
//                 <div className="mb-3">
//                   <input name="email" type="email" className="form-control" placeholder="Email" required onChange={handleChange} />
//                 </div>
//                 <div className="mb-3">
//                   <input name="password" type="password" className="form-control" placeholder="Password" required onChange={handleChange} />
//                 </div>
//                 <div className="mb-3">
//                   <label>
//                     <input type="radio" name="gender" value="male" onChange={handleChange} required /> Male
//                   </label>
//                   <label className="ms-3">
//                     <input type="radio" name="gender" value="female" onChange={handleChange} /> Female
//                   </label>
//                 </div>
//                 <div className="mb-3">
//                   <input name="phone" type="tel" className="form-control" placeholder="Phone" required onChange={handleChange} />
//                 </div>
//                 <div className="mb-3">
//                   <textarea name="address" className="form-control" placeholder="Address" required onChange={handleChange}></textarea>
//                 </div>
//                 <div className="mb-3">
                  
//                   <label className="ms-3">
//                     <input type="radio" name="role" value="USER" onChange={handleChange} /> USER
//                   </label>
                  
//                 </div>
//                 <div className="mb-3 text-center">
//                   <button type="submit" className="btn btn-primary">SignUp</button>
//                   <button type="reset" className="btn btn-danger ms-3">Reset</button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// const styles = {
//   background: {
//     backgroundImage: `url(${signinBg})`,
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

// export default Register;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    phone: "",
    address: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        alert("User Registered Successfully: " + data.email);

        navigate("/login", {
          state: {
            email: formData.email,
            password: formData.password
          }
        });
      } else if (response.status === 409) {
        alert("User already exists with this email.");
      } else {
        alert("Failed to register user");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Error occurred while registering.");
    }
  };

  return (
    <>
      <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100">
        <div className="form-section col-md-5">
          <h3 className="text-center mb-4">Sign Up</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input name="name" type="text" className="form-control" placeholder="Full Name" required onChange={handleChange} />
            </div>
            <div className="mb-3">
              <input name="email" type="email" className="form-control" placeholder="Email" required onChange={handleChange} />
            </div>
            <div className="mb-3">
              <input name="password" type="password" className="form-control" placeholder="Password" required onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label>
                <input type="radio" name="gender" value="male" onChange={handleChange} required /> Male
              </label>
              <label className="ms-3">
                <input type="radio" name="gender" value="female" onChange={handleChange} /> Female
              </label>
            </div>
            <div className="mb-3">
              <input name="phone" type="tel" className="form-control" placeholder="Phone" required onChange={handleChange} />
            </div>
            <div className="mb-3">
              <textarea name="address" className="form-control" placeholder="Address" required onChange={handleChange}></textarea>
            </div>
            <div className="mb-3">
              <label>
                <input type="radio" name="role" value="USER" onChange={handleChange} required /> USER
              </label>
            </div>
            <div className="mb-3 text-center">
              <button type="submit" className="btn btn-primary px-4">Sign Up</button>
              <button type="reset" className="btn btn-danger ms-3 px-4">Reset</button>
            </div>
          </form>
        </div>
      </div>

      <style>{`
        body {
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

        input.form-control,
        textarea.form-control {
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

export default Register;

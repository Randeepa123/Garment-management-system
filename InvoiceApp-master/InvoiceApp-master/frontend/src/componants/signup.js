import React, { useState } from 'react';
import { FiUser, FiMail, FiKey, FiPhone } from 'react-icons/fi';
import backgroundImage from "../asserts/img/background_photo2.jpg";
import 'bootstrap/dist/css/bootstrap.min.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    rePassword: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name required';
    if (!formData.lastName) newErrors.lastName = 'Last name required';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Valid email required';
    if (!formData.password || formData.password.length < 6)
      newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.rePassword)
      newErrors.rePassword = 'Passwords do not match';
    if (!formData.phone || !/^\d{10}$/.test(formData.phone))
      newErrors.phone = 'Valid 10-digit phone required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const jsonData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        role: "admin"
      };
      console.log('Signup JSON:', jsonData);
      
    }
  };

  const styles = {
    background: {
       backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative"
    },

    
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 1
    },
    form: {
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      padding: "2rem",
      borderRadius: "12px",
      width: "100%",
      maxWidth: "450px",
      boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
      zIndex: 2,
      position: "relative"
    },
    label: {
      fontWeight: '600',
      color: '#007EA4',
      marginBottom: '8px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    title: {
      color: '#007EA4',
      fontWeight: '700',
      marginBottom: '1.5rem',
      textAlign: 'center',
      fontSize: '1.8rem'
    },
    button: {
      backgroundColor: '#007EA4',
      border: 'none',
      padding: '12px',
      borderRadius: '8px',
      fontWeight: '600',
      fontSize: '1rem'
    }
  };

  return (
    <div style={styles.background}>
      <div style={styles.overlay}></div>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h3 style={styles.title}>Admin Signup</h3>

        <div className="mb-3">
          <label style={styles.label}><FiUser size={18} /> First Name</label>
          <input type="text" className="form-control" name="firstName" value={formData.firstName} onChange={handleChange} />
          {errors.firstName && <small className="text-danger">{errors.firstName}</small>}
        </div>

        <div className="mb-3">
          <label style={styles.label}><FiUser size={18} /> Last Name</label>
          <input type="text" className="form-control" name="lastName" value={formData.lastName} onChange={handleChange} />
          {errors.lastName && <small className="text-danger">{errors.lastName}</small>}
        </div>

        <div className="mb-3">
          <label style={styles.label}><FiMail size={18} /> Email Address</label>
          <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <small className="text-danger">{errors.email}</small>}
        </div>

        <div className="mb-3">
          <label style={styles.label}><FiKey size={18} /> Password</label>
          <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} />
          {errors.password && <small className="text-danger">{errors.password}</small>}
        </div>

        <div className="mb-3">
          <label style={styles.label}><FiKey size={18} /> Re-enter Password</label>
          <input type="password" className="form-control" name="rePassword" value={formData.rePassword} onChange={handleChange} />
          {errors.rePassword && <small className="text-danger">{errors.rePassword}</small>}
        </div>

        <div className="mb-3">
          <label style={styles.label}><FiPhone size={18} /> Phone Number</label>
          <input type="text" className="form-control" name="phone" value={formData.phone} onChange={handleChange} />
          {errors.phone && <small className="text-danger">{errors.phone}</small>}
        </div>

        <button type="submit" className="btn w-100 mt-2" style={styles.button}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;

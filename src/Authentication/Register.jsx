import React, { useState } from 'react';

const Register = () => {
    // State to manage form inputs
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        gender: '',
        email: '',
        password: '',
        role: "user"
    });
    const [loading, setLoading] = useState(false);

    // State to manage form errors
    const [errors, setErrors] = useState({});

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Validate form fields
    const validate = () => {
        let tempErrors = {};
        const { firstname, lastname, gender, email, password, role } = formData;

        if (!firstname) tempErrors.firstname = 'firstname is required';
        if (!lastname) tempErrors.lastname = 'lastname is required';
        if (!email) tempErrors.email = 'Email is required';
        if (!password) tempErrors.password = 'Password is required';
        if (!gender) tempErrors.gender = 'Gender is Required'
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
          setLoading(true);
          try {
            const response = await fetch('https://ecommerce-api-8ga2.onrender.com/api/user/register', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
            });
    
            const result = await response.json();
            if (response.ok) {
              console.log('Success:', result);
              alert('Registration successful!');
            } else {
              console.error('Error:', result);
              alert('Error during registration');
            }
          } catch (error) {
            console.error('Network Error:', error);
            alert('Network error occurred');
          } finally {
            setLoading(false);
          }
        }
      };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="firstname">Firstname:</label>
                    <input
                        type="text"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleChange}
                    />
                    {errors.username && <p className="error">{errors.username}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="lastname">Lastname:</label>
                    <input
                        type="text"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                    />
                    {errors.lastname && <p className="error">{errors.lastname}</p>}
                </div>

                <div className="form-group">
                    <label>Gender:</label>
                    <div>
                        <input
                            type="radio"
                            name="gender"
                            value="Male"
                            checked={formData.gender === 'Male'}
                            onChange={handleChange}
                        /> Male
                    </div>
                    <div>
                        <input
                            type="radio"
                            name="gender"
                            value="Female"
                            checked={formData.gender === 'Female'}
                            onChange={handleChange}
                        /> Female
                    </div>
                    <div>
                        <input
                            type="radio"
                            name="gender"
                            value="Other"
                            checked={formData.gender === 'Other'}
                            onChange={handleChange}
                        /> Other
                    </div>
                    {errors.gender && <p className="error">{errors.gender}</p>}
                </div>


                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && <p className="error">{errors.password}</p>}
                </div>
                <button type="submit" >Register</button>
            </form>
        </div>
    );
};

export default Register;

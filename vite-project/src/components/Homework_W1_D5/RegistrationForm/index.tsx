import React, { useState } from 'react';
import styles from './RegistrationForm.module.css';

interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  gender: string;
  dob: string;
  country: string;
  hobbies: string[];
  profilePic: File | null;
  bio: string;
}

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    gender: '',
    dob: '',
    country: '',
    hobbies: [],
    profilePic: null,
    bio: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => {
        const newHobbies = checked
          ? [...prev.hobbies, value]
          : prev.hobbies.filter(h => h !== value);
        return { ...prev, hobbies: newHobbies };
      });
    } else if (type === 'file') {
      const file = (e.target as HTMLInputElement).files?.[0] || null;
      setFormData(prev => ({ ...prev, profilePic: file }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Full Name must be at least 3 characters.';
    }
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email address.';
    }
    if (!passwordRegex.test(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters with letters and numbers.';
    }
    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }
    if (formData.phone.length < 10) {
      newErrors.phone = 'Phone number must be at least 10 digits.';
    }
    if (!formData.gender) {
      newErrors.gender = 'Please select a gender.';
    }
    const dobDate = new Date(formData.dob);
    const age = new Date().getFullYear() - dobDate.getFullYear();
    if (!formData.dob || age < 18) {
      newErrors.dob = 'You must be at least 18 years old.';
    }
    if (!formData.country) {
      newErrors.country = 'Please select a country.';
    }
    if (formData.hobbies.length === 0) {
      newErrors.hobbies = 'Select at least one hobby.';
    }
    if (
      formData.profilePic &&
      !['image/jpeg', 'image/jpg', 'image/png'].includes(formData.profilePic.type)
    ) {
      newErrors.profilePic = 'Only .jpg, .jpeg, or .png files are allowed.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      alert('Form submitted successfully!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>User Registration</h2>

      <label>Full Name</label>
      <input name="fullName" value={formData.fullName} onChange={handleChange} />
      {errors.fullName && <p className={styles.error}>{errors.fullName}</p>}

      <label>Email</label>
      <input name="email" type="email" value={formData.email} onChange={handleChange} />
      {errors.email && <p className={styles.error}>{errors.email}</p>}

      <label>Password</label>
      <input name="password" type="password" value={formData.password} onChange={handleChange} />
      {errors.password && <p className={styles.error}>{errors.password}</p>}

      <label>Confirm Password</label>
      <input name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} />
      {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword}</p>}

      <label>Phone Number</label>
      <input name="phone" type="tel" value={formData.phone} onChange={handleChange} />
      {errors.phone && <p className={styles.error}>{errors.phone}</p>}

      <label>Gender</label>
      <div className={styles.inline}>
        <label><input type="radio" name="gender" value="Male" onChange={handleChange} /> Male</label>
        <label><input type="radio" name="gender" value="Female" onChange={handleChange} /> Female</label>
        <label><input type="radio" name="gender" value="Other" onChange={handleChange} /> Other</label>
      </div>
      {errors.gender && <p className={styles.error}>{errors.gender}</p>}

      <label>Date of Birth</label>
      <input name="dob" type="date" value={formData.dob} onChange={handleChange} />
      {errors.dob && <p className={styles.error}>{errors.dob}</p>}

      <label>Country</label>
      <select name="country" value={formData.country} onChange={handleChange}>
        <option value="">Select Country</option>
        <option value="Vietnam">Vietnam</option>
        <option value="USA">USA</option>
        <option value="Canada">Canada</option>
      </select>
      {errors.country && <p className={styles.error}>{errors.country}</p>}

      <label>Hobbies</label>
      <div className={styles.inline}>
        <label><input type="checkbox" name="hobbies" value="Reading" onChange={handleChange} /> Reading</label>
        <label><input type="checkbox" name="hobbies" value="Traveling" onChange={handleChange} /> Traveling</label>
        <label><input type="checkbox" name="hobbies" value="Gaming" onChange={handleChange} /> Gaming</label>
      </div>
      {errors.hobbies && <p className={styles.error}>{errors.hobbies}</p>}

      <label>Profile Picture</label>
      <input name="profilePic" type="file" accept="image/png,image/jpeg" onChange={handleChange} />
      {errors.profilePic && <p className={styles.error}>{errors.profilePic}</p>}

      <label>Bio</label>
      <textarea
        name="bio"
        maxLength={300}
        value={formData.bio}
        onChange={handleChange}
      />
      <p className={styles.remaining}>{300 - formData.bio.length} characters remaining</p>

      <button type="submit" className={styles.button}>Register</button>
    </form>
  );
};

export default RegistrationForm;

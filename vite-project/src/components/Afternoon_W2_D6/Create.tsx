import React from 'react';

type Props = {
  onCreated?: (customer: any) => void;
};

const url = 'https://server.aptech.io/online-shop/customers';

export default function Create({ onCreated }: Props) {
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    birthday: '',
  });

  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    const emailRegex = /^[a-z][a-z0-9._]*@[a-z0-9.-]+\.[a-z]{2,}$/;
    const phoneRegex = /^[0-9]{10,}$/;

    if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters.';
    }
    if (formData.lastName.trim().length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters.';
    }
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email. Must start with lowercase letter and contain "@" with a valid domain.';
    }
    if (!phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must be at least 10 digits.';
    }
    if (formData.address.trim().length === 0) {
      newErrors.address = 'Address is required.';
    }

    if (!formData.birthday) {
      newErrors.birthday = 'Birthday is required.';
    } else {
      const birthDate = new Date(formData.birthday);
      const age = new Date().getFullYear() - birthDate.getFullYear();
      if (age < 18) {
        newErrors.birthday = 'Customer must be at least 18 years old.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      alert('Customer created successfully!');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        address: '',
        birthday: '',
      });
      setErrors({});
      onCreated?.(data);
    } catch (error) {
      console.error('Error creating customer:', error);
    }
  };

  return (
    <div>
      <form className='w-full p-4 bg-white rounded shadow mb-4' onSubmit={handleSubmit}>
        <h2 className='text-xl font-bold mb-4'>Create Customer</h2>

        {['firstName', 'lastName', 'email', 'phoneNumber', 'address', 'birthday'].map((field) => (
          <div className='mb-4' key={field}>
            <label className='block text-sm font-medium text-gray-700 mb-1' htmlFor={field}>
              {field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
            </label>
            <input
              type={field === 'email' ? 'email' : field === 'birthday' ? 'date' : 'text'}
              id={field}
              value={formData[field as keyof typeof formData]}
              className='w-full p-2 border border-gray-300 rounded'
              onChange={handleChange}
            />
            {errors[field] && (
              <p className='text-sm text-red-500 mt-1'>{errors[field]}</p>
            )}
          </div>
        ))}

        <button
          type='submit'
          className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors'
        >
          Create Customer
        </button>
      </form>
    </div>
  );
}

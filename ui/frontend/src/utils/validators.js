// Email validation
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Password validation
export const validatePassword = (password) => {
  return password.length >= 8;
};

// Name validation
export const validateName = (name) => {
  return name.trim().length >= 2;
};

// Phone validation
export const validatePhone = (phone) => {
  const regex = /^[\d\s\-+()]+$/;
  return regex.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

// Form validation
export const validateForm = (formData, fields) => {
  const errors = {};

  fields.forEach((field) => {
    const value = formData[field.name];

    if (field.required && (!value || value.trim() === '')) {
      errors[field.name] = `${field.label} is required`;
      return;
    }

    if (field.type === 'email' && value && !validateEmail(value)) {
      errors[field.name] = 'Please enter a valid email';
      return;
    }

    if (field.type === 'password' && value && !validatePassword(value)) {
      errors[field.name] = 'Password must be at least 8 characters';
      return;
    }

    if (field.type === 'phone' && value && !validatePhone(value)) {
      errors[field.name] = 'Please enter a valid phone number';
      return;
    }

    if (field.minLength && value && value.length < field.minLength) {
      errors[field.name] = `${field.label} must be at least ${field.minLength} characters`;
      return;
    }
  });

  return errors;
};

// Format error message
export const formatErrorMessage = (error) => {
  if (typeof error === 'string') return error;
  if (error.response?.data?.error) return error.response.data.error;
  if (error.message) return error.message;
  return 'An unexpected error occurred';
};

// Get initials from name
export const getInitials = (name) => {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

// Format date
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Delay function for testing
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

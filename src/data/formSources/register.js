const registerInputs = [
  {
    required: true,
    id: 'username',
    type: 'text',
    placeholder: 'Username',
    errorMsg: 'Username must contain at least 2 letters',
    pattern: '^(?=.*[a-zA-Z].*[a-zA-Z]).+$',
  },
  {
    required: true,
    id: 'email',
    type: 'email',
    placeholder: 'Email',
  },
  {
    required: true,
    id: 'password',
    type: 'password',
    placeholder: 'Password',
  },
];

export default registerInputs;

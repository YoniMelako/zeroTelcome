const validator = {



  firstname: {
    rules: [
      {
        test: /[^0-9]+$/,
        message: 'Username must contain only alphabets characters',
      },
      {
        test: (value) => {
          return value.length > 2;
        },
        message: 'Username must be longer than two characters',
      },
    ],
    errors: [],
    valid: false,
    state: '',
  },


  lastname: {
    rules: [
      {
        test: /[^0-9]+$/,
        message: 'lastname must contain only alphabets characters',
      },
      {
        test: (value) => {
          return value.length > 2;
        },
        message: 'lastname must be longer than two characters',
      },
    ],
    errors: [],
    valid: false,
    state: '',
  },
  password: {
    rules: [

      {
        test: (value) => {
          return value.length >= 6;
        },
        message: 'Password must not be shorter than 6 characters',
      },
    ],
    errors: [],
    valid: false,
    state: ''
  },
  Id: {
    rules: [
      {
        test: /[0-9]+$/,
        message: 'id contain only numbers',
      },
      {
        test: (value) => {
          return value.length === 9;
        },
        message: 'Id must be 9 characters',
      },
    ],
    errors: [],
    valid: false,
    state: ''
  },
};

export default validator;
const { v4: uuidv4 } = require('uuid');
const HttpError = require('../models/http-error');

const DUMMY_USERS = [
  {
    id: 'p1',
    name: 'Lahiru',
    email: 'a@2',
    password: 'abcd',
  },
];

const getUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

const signup = (req, res, next) => {
  const { name, email, password } = req.body;

  const hasUser = DUMMY_USERS.find((user) => user.email === email);
  if (hasUser) {
    throw new HttpError('Could not create user, email already exist', 422);
    // 422 means invalid user input
  }

  const createUser = {
    id: uuidv4(),
    name,
    email,
    password,
  };
  DUMMY_USERS.push(createUser);
  res.status(201).json({ user: createUser }); // status code 201 = crete new
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  const identifiedUser = DUMMY_USERS.find((user) => user.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError(
      'Could not identify user, credentials seem to be wrong',
      401
    ); // 401 means authentication failed
  }
  res.json({ message: 'Logged in' });
};

exports.getAllUsers = getUsers;
exports.signup = signup;
exports.login = login;

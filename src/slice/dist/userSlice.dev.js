"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.userActions = exports.updateUser = exports.userReister = exports.userLogin = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _axios = _interopRequireDefault(require("axios"));

var _constants = require("../constants");

var _extraReducers;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var localStorageUserinfo = JSON.parse(localStorage.getItem('userInfo'));
var initialState = {
  userInfo: localStorageUserinfo ? localStorageUserinfo : [],
  status: '',
  error: null
};
var userLogin = (0, _toolkit.createAsyncThunk)('user/userLogin', function _callee(userData) {
  var config, data, response;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          config = {
            headers: {
              'Content-Type': 'application/json'
            }
          };
          data = {
            email: userData.email,
            password: userData.password
          };
          _context.next = 5;
          return regeneratorRuntime.awrap(_axios["default"].post('http://localhost:4000/api/users/login', data));

        case 5:
          response = _context.sent;
          return _context.abrupt("return", response.data);

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", _context.t0.response && _context.t0.response.message ? _context.t0.response.message : _context.t0.message);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
});
exports.userLogin = userLogin;
var userReister = (0, _toolkit.createAsyncThunk)('user/userReister', function _callee2(userData) {
  var config, data, response;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          config = {
            headers: {
              'Content-Type': 'application/json'
            }
          };
          data = {
            email: userData.email,
            name: userData.name,
            password: userData.password
          };
          _context2.next = 5;
          return regeneratorRuntime.awrap(_axios["default"].post('http://localhost:4000/api/users', data));

        case 5:
          response = _context2.sent;
          return _context2.abrupt("return", response.data);

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", _context2.t0.response && _context2.t0.response.message ? _context2.t0.response.message : _context2.t0.message);

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 9]]);
});
exports.userReister = userReister;
var updateUser = (0, _toolkit.createAsyncThunk)('user/updateUser', function _callee3(userData) {
  var config, data, response;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          config = {
            headers: {
              'Content-Type': 'application/json',
              Authorization: "Bearer ".concat(userData.token)
            }
          };
          data = {
            email: userData.email,
            name: userData.name,
            password: userData.password
          };
          _context3.next = 5;
          return regeneratorRuntime.awrap(_axios["default"].put('http://localhost:4000/api/users/profile', data));

        case 5:
          response = _context3.sent;
          return _context3.abrupt("return", response.data);

        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          return _context3.abrupt("return", _context3.t0.response && _context3.t0.response.message ? _context3.t0.response.message : _context3.t0.message);

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 9]]);
});
exports.updateUser = updateUser;
var userSlice = (0, _toolkit.createSlice)({
  name: 'user',
  initialState: initialState,
  reducers: {
    logOut: function logOut(state, action) {
      localStorage.removeItem('userInfo');
      state.userInfo = [];
    }
  },
  extraReducers: (_extraReducers = {}, _defineProperty(_extraReducers, userLogin.pending, function (state) {
    state.error = null;
    state.status = 'loading';
  }), _defineProperty(_extraReducers, userLogin.fulfilled, function (state, action) {
    if (action.payload.message) {
      state.error = action.payload.message;
    } else {
      state.userInfo = action.payload;
    }

    localStorage.setItem('userInfo', JSON.stringify(action.payload));
    state.status = 'scceeded';
  }), _defineProperty(_extraReducers, userLogin.rejected, function (state, action) {
    state.error = action.payload;
    state.status = 'faild';
  }), _defineProperty(_extraReducers, userReister.pending, function (state) {
    state.error = null;
    state.status = 'loading';
  }), _defineProperty(_extraReducers, userReister.fulfilled, function (state, action) {
    if (action.payload.message) {
      state.error = action.payload.message;
    } else {
      state.userInfo = action.payload;
    }

    localStorage.setItem('userInfo', JSON.stringify(action.payload));
    state.status = 'scceeded';
  }), _defineProperty(_extraReducers, userReister.rejected, function (state, action) {
    state.error = action.payload;
    state.status = 'faild';
  }), _defineProperty(_extraReducers, updateUser.pending, function (state) {
    state.error = null;
    state.status = 'loading';
  }), _defineProperty(_extraReducers, updateUser.fulfilled, function (state, action) {
    if (action.payload.message) {
      state.error = action.payload.message;
    } else {
      state.userInfo = action.payload;
    } //localStorage.setItem('userInfo', JSON.stringify(action.payload));


    state.status = 'scceeded';
  }), _defineProperty(_extraReducers, updateUser.rejected, function (state, action) {
    state.error = action.payload;
    state.status = 'faild';
  }), _extraReducers)
});
var userActions = userSlice.actions;
exports.userActions = userActions;
var _default = userSlice.reducer;
exports["default"] = _default;
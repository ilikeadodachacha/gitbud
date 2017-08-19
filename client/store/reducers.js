import { combineReducers } from 'redux';

const changeString = (state = 'some message', action) => action.type === 'CHANGE_STRING' ? action.text : state;

const users = (state, action) => {
  if (state === undefined) {
    return [];
  } else if (action.type === 'USERS_ADD') {
    return action.users;
  } else if (action.type === 'CHANGE_USER_PAIRING') {
    return state.map((user) => {
      if (user.id === action.userId) {
        return Object.assign({}, user, { paired: user.paired.concat(action.projectId) });
      }
      return user;
    });
  }
  return state;
};

const projects = (state, action) => {
  if (state === undefined) {
    return [];
  } else if (action.type === 'LIST_PROJECTS') {
    return action.projects;
  } else if (action.type === 'CHANGE_PROJECT_INTEREST') {
    return state.map((project) => {
      if (project.id === action.projectId) {
        return Object.assign({}, project, { interested: action.value });
      }
      return project;
    });
  } else if (action.type === 'CHANGE_USER_PAIRING') {
    return state.map((project) => {
      if (project.id === action.projectId) {
        return Object.assign({}, project, { paired: project.paired.concat(action.userId) });
      }
      return project;
    });
  }
  return state;
};

const messages = (state, action) => {
  if (state === undefined) {
    return {};
  } else if (action.type === 'MESSAGE_SEND') {
    const newMessages = {};
    newMessages[action.userId] = state[action.userId] ? state[action.userId].concat(action.message) : [action.message];
    return Object.assign({}, state, newMessages);
  }
  return state;
};

// hands off to container components with mapStateToProps
export default combineReducers({
  message: changeString,
  users,
  projects,
  messages,
});

let initialState = {
  token: localStorage.getItem("fatoentrepreneur-token"),
  user: localStorage.getItem("fatoentrepreneur-user")
    ? JSON.parse(localStorage.getItem("fatoentrepreneur-user"))
    : null,
  isAuthenticated: localStorage.getItem("fatoentrepreneur-token")
    ? true
    : false,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case "user/set":
      localStorage.setItem("fatoentrepreneur-token", action.payload.token);
      localStorage.setItem(
        "fatoentrepreneur-user",
        JSON.stringify(action.payload.user)
      );
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
      };

    case "user/logout":
      console.log("kogout");
      localStorage.removeItem("fatoentrepreneur-token");
      localStorage.removeItem("fatoentrepreneur-user");
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
      };

    case "user/update":
      return {
        ...state,
        user: action.payload.user,
      };

    default:
      return state;
  }
}

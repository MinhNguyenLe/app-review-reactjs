const INITIAL_STATE = {
  errPage: false,
  errLogin: false,
  idSchool: "",
  idReview: "",
  positive: "",
  negative: "",
  advice: "",
  createdAt: "",
  name: "",
  token: false,
  email: "",
  people: {
    email: "",
    permission: "",
    id: "",
    username: "",
    name: "",
    createdAt: "",
  },
  user: {
    email: "",
    permission: "",
    id: "",
    username: "",
    name: "",
    createdAt: "",
  },
  cmt: [],
};
export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SET-ID-SCHOOL":
      return {
        ...state,
        idSchool: action.payload.id,
      };
    case "SET-ID-REVIEW":
      return {
        ...state,
        idReview: action.payload.id,
      };
    case "SET-ERR-PAGE":
      return {
        ...state,
        errPage: action.payload.errPage,
      };
    case "SET-ERR-LOGIN":
      return {
        ...state,
        errLogin: action.payload.errLogin,
      };
    case "SET-REVIEW":
      return {
        ...state,
        positive: action.payload.positive,
        negative: action.payload.negative,
        advice: action.payload.advice,
      };
    case "SET-DETAIL-REVIEW":
      return {
        ...state,
        idReview: action.payload.id,
        positive: action.payload.positive,
        negative: action.payload.negative,
        advice: action.payload.advice,
        name: action.payload.name,
        createdAt: action.payload.createdAt,
      };
    case "SET-TOKEN":
      return {
        ...state,
        token: action.payload.token,
      };
    case "SET-EMAIL":
      return {
        ...state,
        email: action.payload.email,
      };
    case "SET-CMT":
      return {
        ...state,
        cmt: action.payload.cmt,
      };
    case "SET-PEOPLE":
      return {
        ...state,
        people: {
          email: action.payload.email,
          permission: action.payload.permission,
          id: action.payload.id,
          username: action.payload.username,
          name: action.payload.name,
          createdAt: action.payload.createdAt,
        },
      };
    case "SET-USER":
      return {
        ...state,
        user: {
          email: action.payload.email,
          permission: action.payload.permission,
          id: action.payload.id,
          username: action.payload.username,
          name: action.payload.name,
          createdAt: action.payload.createdAt,
        },
      };
    default:
      return state;
  }
}

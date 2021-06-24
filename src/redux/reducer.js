import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const INITIAL_STATE = {
  errPage: false,
  errLogin: false,
  errRegister : false,
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
    avatar: "",
    email: "",
    permission: "",
    id: "",
    username: "",
    name: "",
    createdAt: "",
    coverImg : ""
  },
  user: {
    avatar: "",
    email: "",
    permission: "",
    id: "",
    username: "",
    name: "",
    createdAt: "",
    coverImg : ""
  },
  cmt: [],
  arrId: {
    schools: [],
    reviews: [],
    comments: [],
    users: [],
  },
};
function reducer(state = INITIAL_STATE, action) {
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
    case "SET-ID-APP":
      return {
        ...state,
        arrId: {
          schools: action.payload.arrId.schools,
          reviews: action.payload.arrId.reviews,
          comments: action.payload.arrId.comments,
          users: action.payload.arrId.users,
        },
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
      case "SET-AVATAR":
        let avatar = action.payload.avatar
        state.user.avatar = avatar
      return state
      case "SET-ERR-REGISTER":
      return {
        ...state,
        errRegister: action.payload.errRegister,
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
          coverImg: action.payload.coverImg,
          avatar: action.payload.avatar,
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
          coverImg: action.payload.coverImg,
          avatar: action.payload.avatar,
          email: action.payload.email,
          permission: action.payload.permission,
          id: action.payload.id,
          username: action.payload.username,
          name: action.payload.name,
          createdAt: action.payload.createdAt,
        },
      };
    case "SET-CLEAR":
      return INITIAL_STATE;
    default:
      return state;
  }
}
export default persistReducer(persistConfig, reducer);

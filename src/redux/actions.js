export const setIdSchool = (id) => {
  return {
    type: "SET-ID-SCHOOL",
    payload: {
      id: id,
    },
  };
};

export const setScore = (score) => {
  return {
    type: "SET-SCORE",
    payload: {
      score: score,
    },
  };
};

export const setErrPage = (bool) => {
  return {
    type: "SET-ERR-PAGE",
    payload: {
      errPage: bool,
    },
  };
};

export const setAvatar = (ava) => {
  return {
    type: "SET-AVATAR",
    payload: {
      avatar: ava,
    },
  };
};

export const setIdApp = (arrId) => {
  return {
    type: "SET-ID-APP",
    payload: {
      arrId: arrId,
    },
  };
};

export const setErrRegister = (bool) => {
  return {
    type: "SET-ERR-REGISTER",
    payload: {
      errRegister: bool,
    },
  };
};

export const setErrLogin = (bool) => {
  return {
    type: "SET-ERR-LOGIN",
    payload: {
      errLogin: bool,
    },
  };
};

export const setCmt = (cmt) => {
  return {
    type: "SET-CMT",
    payload: {
      cmt: cmt,
    },
  };
};

export const setUser = (user) => {
  return {
    type: "SET-USER",
    payload: {
      banned: user.banned,
      avatar: user.avatar,
      email: user.email,
      permission: user.permission,
      id: user._id,
      username: user.username,
      name: user.name,
      createdAt: user.createdAt,
      coverImg: user.coverImg,
    },
  };
};

export const setPeople = (user) => {
  return {
    type: "SET-PEOPLE",
    payload: {
      banned: user.banned,
      avatar: user.avatar,
      email: user.email,
      permission: user.permission,
      id: user._id,
      username: user.username,
      name: user.name,
      createdAt: user.createdAt,
      coverImg: user.coverImg,
    },
  };
};

export const setEmail = (email) => {
  return {
    type: "SET-EMAIL",
    payload: {
      email: email,
    },
  };
};

export const setClear = () => {
  return {
    type: "SET-CLEAR",
  };
};

export const setToken = (bool) => {
  return {
    type: "SET-TOKEN",
    payload: {
      token: bool,
    },
  };
};

export const setIdReview = (id) => {
  return {
    type: "SET-ID-REVIEW",
    payload: {
      id: id,
    },
  };
};

export const setReview = (positive, negative, advice) => {
  return {
    type: "SET-REVIEW",
    payload: {
      positive: positive,
      negative: negative,
      advice: advice,
    },
  };
};

export const setDetailReview = (
  idReview,
  positive,
  negative,
  advice,
  name,
  createdAt
) => {
  return {
    type: "SET-DETAIL-REVIEW",
    payload: {
      idReview: idReview,
      positive: positive,
      negative: negative,
      advice: advice,
      name: name,
      createdAt: createdAt,
    },
  };
};

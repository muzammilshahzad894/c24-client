import axios from "axios";
import {
  ADD_DIPLOMAT_FAIL,
  ADD_DIPLOMAT_REQUEST,
  ADD_DIPLOMAT_SUCCESS,
  ADD_DOCUMENTS_FAIL,
  ADD_DOCUMENTS_REQUEST,
  ADD_DOCUMENTS_SUCCESS,
  CHANGE_PASSWORD_FAIL,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  GET_COMPANY_DATA_FAIL,
  GET_COMPANY_DATA_REQUEST,
  GET_COMPANY_DATA_SUCCESS,
  GET_COMPETENCY_FAIL,
  GET_COMPETENCY_REQUEST,
  GET_PERSONAL_DATA_FAIL,
  GET_PERSONAL_DATA_REQUEST,
  GET_PERSONAL_DATA_SUCCESS,
  SET_COMPANY_DATA_FAIL,
  SET_COMPANY_DATA_REQUEST,
  SET_COMPANY_DATA_SUCCESS,
  SET_PERSONAL_DATA_FAIL,
  SET_PERSONAL_DATA_REQUEST,
  SET_PERSONAL_DATA_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_FAIL,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  GET_COMPETENCY_SUCCESS,
  SET_COMPETENCY_REQUEST,
  SET_COMPETENCY_SUCCESS,
  SET_COMPETENCY_FAIL,
  GET_USER_COMPETENCY_REQUEST,
  GET_USER_COMPETENCY_SUCCESS,
  GET_USER_COMPETENCY_FAIL,
  REMOVE_COMPETENCY_REQUEST,
  REMOVE_COMPETENCY_SUCCESS,
  REMOVE_COMPETENCY_FAIL,
  GET_NOTIFICATION_REQUEST,
  GET_NOTIFICATION_SUCCESS,
  GET_NOTIFICATION_FAIL,
  SET_NOTIFICATION_REQUEST,
  SET_NOTIFICATION_SUCCESS,
  SET_NOTIFICATION_FAIL,
  GET_PROFILE_RATINGS_REQUEST,
  GET_PROFILE_RATINGS_SUCCESS,
  GET_PROFILE_RATINGS_FAIL,
  GET_WORK_EXPERIENCE_REQUEST,
  GET_WORK_EXPERIENCE_SUCCESS,
  GET_WORK_EXPERIENCE_FAIL,
  ADD_WORK_EXPERIENCE_REQUEST,
  ADD_WORK_EXPERIENCE_SUCCESS,
  ADD_WORK_EXPERIENCE_FAIL,
  DELETE_ACCOUNT_REQUEST,
  DELETE_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_FAIL,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  GET_AVAILABILITY_REQUEST,
  GET_AVAILABILITY_SUCCESS,
  GET_AVAILABILITY_FAIL,
  ADD_AVAILABILITY_FAIL,
  ADD_AVAILABILITY_REQUEST,
  ADD_AVAILABILITY_SUCCESS,
  REMOVE_AVAILABILITY_REQUEST,
  MODIFY_AVAILABILITY_TIME_REQUEST,
  MODIFY_AVAILABILITY_TIME_SUCCESS,
  MODIFY_AVAILABILITY_TIME_FAIL,
  REMOVE_AVAILABILITY_SUCCESS,
  REMOVE_AVAILABILITY_FAIL,
  GET_INVITED_REQUEST,
  GET_INVITED_SUCCESS,
  GET_INVITED_FAIL,
  INVITE_REQUEST,
  INVITE_SUCCESS,
  INVITE_FAIL,
  GET_DOCUMENTS_REQUEST,
  GET_DOCUMENTS_SUCCESS,
  GET_DOCUMENTS_FAIL,
  DELETE_WORK_EXPERIENCE_REQUEST,
  DELETE_WORK_EXPERIENCE_SUCCESS,
  DELETE_WORK_EXPERIENCE_FAIL,
  USER_LOGIN_FACEBOOK_REQUEST,
  USER_LOGIN_FACEBOOK_SUCCESS,
  USER_LOGIN_FACEBOOK_FAIL,
  ADD_CONTRACT_REQUEST,
  ADD_CONTRACT_FAIL,
  GET_CONTRACT_REQUEST,
  ADD_CONTRACT_SUCCESS,
  GET_CONTRACT_SUCCESS,
  GET_CONTRACT_FAIL,
  SET_ORGANASATIONS_REQUEST,
  SET_ORGANASATIONS_SUCCESS,
  SET_ORGANASATIONS_FAIL,
  GET_ORGANASATIONS_REQUEST,
  GET_ORGANASATIONS_SUCCESS,
  GET_ORGANASATIONS_FAIL,
  SET_TIMECARD_REQUEST,
  SET_TIMECARD_SUCCESS,
  SET_TIMECARD_FAIL,
  GET_TIMECARD_REQUEST,
  GET_TIMECARD_SUCCESS,
  GET_TIMECARD_FAIL,
  DELETE_TIMECARD_FILE_REQUEST,
  DELETE_TIMECARD_FILE_SUCCESS,
  DELETE_TIMECARD_FILE_FAIL,
  GET_CLT_ORGA_REQUEST,
  GET_CLT_ORGA_SUCCESS,
  GET_CLT_ORGA_FAIL,
  SET_CLT_ORGA_REQUEST,
  SET_CLT_ORGA_SUCCESS,
  SET_CLT_ORGA_FAIL,
  GET_LOCATION_REQUEST,
  GET_LOCATION_SUCCESS,
  GET_LOCATION_FAIL,
  SET_LOCATION_REQUEST,
  SET_LOCATION_SUCCESS,
  SET_LOCATION_FAIL,
  ADD_LOCATION_REQUEST,
  ADD_LOCATION_SUCCESS,
  ADD_LOCATION_FAIL,
  GET_ADDITIONAL_USRES_REQUEST,
  GET_ADDITIONAL_USRES_SUCCESS,
  GET_ADDITIONAL_USRES_FAIL,
  SET_ADDITIONAL_USERS_REQUEST,
  SET_ADDITIONAL_USERS_SUCCESS,
  SET_ADDITIONAL_USERS_FAIL,
  ADD_ADDITIONAL_USERS_REQUEST,
  ADD_ADDITIONAL_USERS_SUCCESS,
  ADD_ADDITIONAL_USERS_FAIL,
  ADD_ASSIGNEMENT_REQUEST,
  ADD_ASSIGNEMENT_FAIL,
  ADD_ASSIGNEMENT_SUCCESS,
  GET_ASSIGNEMENT_REQUEST,
  GET_ASSIGNEMENT_SUCCESS,
  GET_ASSIGNEMENT_FAIL,
  DELETE_ASSIGNEMENT_REQUEST,
  DELETE_ASSIGNEMENT_SUCCESS,
  DELETE_ASSIGNEMENT_FAIL,
  GET_ALL_ASSIGNEMENT_FAIL,
  GET_ALL_ASSIGNEMENT_REQUEST,
  GET_ALL_ASSIGNEMENT_SUCCESS,
  ADD_REVIEW_REQUEST,
  ADD_REVIEW_SUCCESS,
  ADD_REVIEW_FAIL,
  GET_REVIEW_REQUEST,
  GET_REVIEW_SUCCESS,
  GET_REVIEW_FAIL,
  UPDATE_USER_FILE_REQUEST,
  UPDATE_USER_FILE_SUCCESS,
  UPDATE_USER_FILE_FAIL,
  SET_ASSIGNEMENT_REQUEST,
  SET_ASSIGNEMENT_SUCCESS,
  SET_ASSIGNEMENT_FAIL,
  DELETE_DIPLOMAT_REQUEST,
  DELETE_DIPLOMAT_SUCCESS,
  DELETE_DIPLOMAT_FAIL,
  DELETE_LOCATION_REQUEST,
  DELETE_LOCATION_SUCCESS,
  DELETE_LOCATION_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_EMAIL_REQUEST,
  RESET_PASSWORD_EMAIL_FAIL,
  RESET_PASSWORD_EMAIL_SUCCESS,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  GET_GEOLOCATION_REQUEST,
  GET_GEOLOCATION_SUCCESS,
  GET_GEOLOCATION_FAIL,
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAIL,
  LIKE_REQUEST,
  LIKE_SUCCESS,
  LIKE_FAIL,
  GET_LIKED_REQUEST,
  GET_LIKED_SUCCESS,
  GET_LIKED_FAIL,
  REMOVE_LIKE_REQUEST,
  REMOVE_LIKE_SUCCESS,
  REMOVE_LIKE_FAIL,
  APPLY_REQUEST,
  APPLY_SUCCESS,
  APPLY_FAIL,
  GET_APPLICATION_REQUEST,
  GET_APPLICATION_SUCCESS,
  GET_APPLICATION_FAIL,
  INVITE_FREELANCER_REQUEST,
  INVITE_FREELANCER_SUCCESS,
  INVITE_FREELANCER_FAIL,
  GET_INVITED_FREELANCER_REQUEST,
  GET_INVITED_FREELANCER_SUCCESS,
  GET_INVITED_FREELANCER_FAIL,
  DELETE_INVITED_FREELANCER_REQUEST,
  DELETE_INVITED_FREELANCER_SUCCESS,
  DELETE_INVITED_FREELANCER_FAIL,
  ADD_ASSIGNEMENT_ALERT_REQUEST,
  ADD_ASSIGNEMENT_ALERT_SUCCESS,
  ADD_ASSIGNEMENT_ALERT_FAIL,
  GET_ASSIGNEMENT_ALERT_REQUEST,
  GET_ASSIGNEMENT_ALERT_SUCCESS,
  GET_ASSIGNEMENT_ALERT_FAIL,
  DELETE_ASSIGNEMENT_ALERT_REQUEST,
  DELETE_ASSIGNEMENT_ALERT_SUCCESS,
  DELETE_ASSIGNEMENT_ALERT_FAIL,
  LOGIN_MANAGEMENT_REQUEST,
  LOGIN_MANAGEMENT_SUCCESS,
  LOGIN_MANAGEMENT_FAIL,
  ADD_INVOICE_REQUEST,
  ADD_INVOICE_SUCCESS,
  ADD_INVOICE_FAIL,
  GET_INVOICE_SUCCESS,
  GET_INVOICE_REQUEST,
  GET_INVOICE_FAIL,
  DELETE_INVOICE_FILE_REQUEST,
  DELETE_INVOICE_FILE_SUCCESS,
  DELETE_INVOICE_FILE_FAIL,
  ADD_FAVORITE_REQUEST,
  ADD_FAVORITE_SUCCESS,
  ADD_FAVORITE_FAIL,
  GET_FAVORITE_REQUEST,
  GET_FAVORITE_SUCCESS,
  GET_FAVORITE_FAIL,
  REMOVE_FAVORITE_REQUEST,
  REMOVE_FAVORITE_SUCCESS,
  REMOVE_FAVORITE_FAIL,
  GET_RESERVE_REQUEST,
  GET_RESERVE_SUCCESS,
  GET_RESERVE_FAIL,
  SET_RESERVE_REQUEST,
  SET_RESERVE_SUCCESS,
  SET_RESERVE_FAIL,
  ADD_RESERVE_REQUEST,
  ADD_RESERVE_SUCCESS,
  ADD_RESERVE_FAIL,
  VERIFY_EMAIL_REQUEST,
  VERIFY_EMAIL_SUCCESS,
  VERIFY_EMAIL_FAIL,
  CHECK_VERIFY_EMAIL_REQUEST,
  CHECK_VERIFY_EMAIL_SUCCESS,
  CHECK_VERIFY_EMAIL_FAIL,
  DELETE_APPLICATION_REQUEST,
  DELETE_APPLICATION_SUCCESS,
  DELETE_APPLICATION_FAIL,
  DELETE_FILE_REQUEST,
  DELETE_FILE_SUCCESS,
  DELETE_FILE_FAIL,
  ADD_DIPLOMAT_TYPE_REQUEST,
  ADD_DIPLOMAT_TYPE_SUCCESS,
  ADD_DIPLOMAT_TYPE_FAIL,
  GET_DIPLOMAT_TYPES_REQUEST,
  GET_DIPLOMAT_TYPES_SUCCESS,
  GET_DIPLOMAT_TYPES_FAIL,
  SEND_EMAIL_CONTACT_REQUEST,
  SEND_EMAIL_CONTACT_SUCCESS,
  SEND_EMAIL_CONTACT_FAIL,
  SET_LANG_REQUEST,
  SET_LANG_SUCCESS,
  SET_LANG_FAIL,
  GET_LANG_SUCCESS,
  GET_LANG_REQUEST,
  GET_LANG_FAIL,
  ADD_INDUSTRY_REQUEST,
  ADD_INDUSTRY_SUCCESS,
  ADD_INDUSTRY_FAIL,
  REMOVE_RESERVE_REQUEST,
  REMOVE_RESERVE_SUCCESS,
  REMOVE_RESERVE_FAIL,
  DELETE_INVOICE_REQUEST,
  DELETE_INVOICE_SUCCESS,
  DELETE_INVOICE_FAIL,
} from "../Constants/UserConstants";

export const registerAction = (user) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST });
  try {
    console.log(user);
    const { data } = await axios.get("/api/auth/register", {
      params: {
        ...user,
        login_type: "email",
      },
    });
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL, payload: error.response });
  }
};

export const loginAction = (user) => async (dispatch) => {
  dispatch({ type: USER_LOGIN_REQUEST });
  try {
    const { data } = await axios.get("/api/auth/login", {
      params: {
        ...user,
        login_type: "email",
      },
    });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_LOGIN_FAIL, payload: error.response });
  }
};

//facebook login
export const facebookLoginAction = () => async (dispatch) => {
  dispatch({ type: USER_LOGIN_FACEBOOK_REQUEST });
  try {
    const { data } = await axios.get("/api/auth/facebook");
    dispatch({ type: USER_LOGIN_FACEBOOK_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_LOGIN_FACEBOOK_FAIL, payload: error.response });
  }
};
//logout
export const logOut = () => async (dispatch) => {
  dispatch({ type: USER_LOGOUT_REQUEST });
  try {
    const { data } = await axios.get("/api/auth/logout");
    dispatch({ type: USER_LOGOUT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_LOGOUT_FAIL, payload: error.response });
  }
};
//change password
export const changePassword = (info, token) => async (dispatch) => {
  dispatch({ type: CHANGE_PASSWORD_REQUEST });
  try {
    const { data } = await axios.post("/api/user/update-password", info, {
      headers: {
        token,
      },
    });
    dispatch({ type: CHANGE_PASSWORD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CHANGE_PASSWORD_FAIL, payload: error.response });
  }
};

//reset password
export const reset_password_action = (info) => async (dispatch) => {
  dispatch({ type: RESET_PASSWORD_REQUEST });
  try {
    const { data } = await axios.post("/api/user/reset-password", info);
    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: RESET_PASSWORD_FAIL, payload: error.response });
  }
};

//reset password email
export const reset_password_email_action = (info) => async (dispatch) => {
  dispatch({ type: RESET_PASSWORD_EMAIL_REQUEST });
  try {
    const { data } = await axios.post("/api/user/reset-password-email", info);
    dispatch({ type: RESET_PASSWORD_EMAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: RESET_PASSWORD_EMAIL_FAIL, payload: error.response });
  }
};

//add diplomas and certificates

export const addDiplomat = (info, token) => async (dispatch) => {
  dispatch({ type: ADD_DIPLOMAT_REQUEST });
  try {
    const { data } = await axios.post("/api/user/diplomat", info, {
      headers: {
        token,
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch({ type: ADD_DIPLOMAT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADD_DIPLOMAT_FAIL, payload: error.response });
  }
};

//delete diplomat
export const delete_diplomat_action = (id, token) => async (dispatch) => {
  dispatch({ type: DELETE_DIPLOMAT_REQUEST });
  try {
    const { data } = await axios.delete("/api/user/delete-diplomat", {
      headers: {
        token,
      },
      params: {
        id,
      },
    });
    dispatch({ type: DELETE_DIPLOMAT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DELETE_DIPLOMAT_FAIL, payload: error.response });
  }
};
//add documents

export const addDocuments = (info, token) => async (dispatch) => {
  dispatch({ type: ADD_DOCUMENTS_REQUEST });
  try {
    const { data } = await axios.post("/api/user/documents", info, {
      headers: {
        token,
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch({ type: ADD_DOCUMENTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADD_DOCUMENTS_FAIL, payload: error.response });
  }
};

//get documents
export const getDocuments = (token) => async (dispatch) => {
  dispatch({ type: GET_DOCUMENTS_REQUEST });
  try {
    const { data } = await axios.get("/api/user/get-documents", {
      headers: {
        token,
      },
    });
    dispatch({ type: GET_DOCUMENTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_DOCUMENTS_FAIL, payload: error.response });
  }
};
//set personal info

export const setPersonalInfo = (info, token) => async (dispatch) => {
  dispatch({ type: SET_PERSONAL_DATA_REQUEST });
  try {
    const { data } = await axios.post("/api/user/set-personal-data", info, {
      headers: {
        token,
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch({ type: SET_PERSONAL_DATA_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SET_PERSONAL_DATA_FAIL, payload: error.response });
  }
};

//GET personal info

export const getPersonalInfo = (token, user_id) => async (dispatch) => {
  dispatch({ type: GET_PERSONAL_DATA_REQUEST });
  try {
    const { data } = await axios.get("/api/user/personal", {
      headers: {
        token,
      },
      params: {
        id: user_id,
      },
    });
    dispatch({ type: GET_PERSONAL_DATA_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_PERSONAL_DATA_FAIL, payload: error.response });
  }
};

//GET company info

export const getCompanyInfo = (token) => async (dispatch) => {
  dispatch({ type: GET_COMPANY_DATA_REQUEST });
  try {
    const { data } = await axios.get("/api/user/company", {
      headers: {
        token,
      },
    });
    dispatch({ type: GET_COMPANY_DATA_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_COMPANY_DATA_FAIL, payload: error.response });
  }
};

//SET company details
export const set_company_details = (info, token) => async (dispatch) => {
  dispatch({ type: SET_COMPANY_DATA_REQUEST });
  try {
    const { data } = await axios.post("/api/user/set-company-details", info, {
      headers: {
        token,
      },
    });
    dispatch({ type: SET_COMPANY_DATA_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SET_COMPANY_DATA_FAIL, payload: error.response });
  }
};

//add industry
export const add_industry_action = (info, token) => async (dispatch) => {
  dispatch({ type: ADD_INDUSTRY_REQUEST });
  try {
    const { data } = await axios.post("/api/user/add-new-ind", info, {
      headers: {
        token,
      },
    });
    dispatch({ type: ADD_INDUSTRY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADD_INDUSTRY_FAIL, payload: error.response });
  }
};

//get all competencies
export const get_all_competencies_action = () => async (dispatch) => {
  dispatch({ type: GET_COMPETENCY_REQUEST });
  try {
    const { data } = await axios.get("/api/user/all-competencies");
    dispatch({ type: GET_COMPETENCY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_COMPETENCY_FAIL, payload: error.response });
  }
};

//get user competency
export const get_user_competency_action =
  (token, user_id = null) =>
  async (dispatch) => {
    dispatch({ type: GET_USER_COMPETENCY_REQUEST });
    try {
      const { data } = await axios.get("/api/user/competencies", {
        headers: {
          token,
        },
        params: {
          id: user_id,
        },
      });
      dispatch({ type: GET_USER_COMPETENCY_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_USER_COMPETENCY_FAIL, payload: error.response });
    }
  };
//add competency
export const add_competency_action =
  (info, token, user_added = false) =>
  async (dispatch) => {
    dispatch({ type: SET_COMPETENCY_REQUEST });
    try {
      const { data } = await axios.post("/api/user/add-competency", info, {
        headers: {
          token,
        },
        params: {
          user_added,
        },
      });
      dispatch({ type: SET_COMPETENCY_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: SET_COMPETENCY_FAIL, payload: error.response });
    }
  };

//remove competency

export const remove_competency_action = (info, token) => async (dispatch) => {
  dispatch({ type: REMOVE_COMPETENCY_REQUEST });
  try {
    const { data } = await axios.post("/api/user/remove-competency", info, {
      headers: {
        token,
      },
    });
    dispatch({ type: REMOVE_COMPETENCY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: REMOVE_COMPETENCY_FAIL, payload: error.response });
  }
};

//get all notifications
export const get_notifications_action = (token) => async (dispatch) => {
  dispatch({ type: GET_NOTIFICATION_REQUEST });
  try {
    const { data } = await axios.get("/api/user/notifications", {
      headers: {
        token,
      },
    });
    dispatch({ type: GET_NOTIFICATION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_NOTIFICATION_FAIL, payload: error.response });
  }
};

//set notifications
export const set_notifications_action = (info, token) => async (dispatch) => {
  dispatch({ type: SET_NOTIFICATION_REQUEST });
  try {
    const { data } = await axios.post("/api/user/set-notifications", info, {
      headers: {
        token,
      },
    });
    dispatch({ type: SET_NOTIFICATION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SET_NOTIFICATION_FAIL, payload: error.response });
  }
};

//get profile ratings

export const get_profile_ratings_action =
  (token, user_id = null) =>
  async (dispatch) => {
    dispatch({ type: GET_PROFILE_RATINGS_REQUEST });
    try {
      const { data } = await axios.get("/api/user/profile-ratings", {
        headers: {
          token,
        },
        params: {
          id: user_id,
        },
      });
      dispatch({ type: GET_PROFILE_RATINGS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_PROFILE_RATINGS_FAIL, payload: error.response });
    }
  };

//get work experience

export const get_work_experience_action =
  (token, user_id = null) =>
  async (dispatch) => {
    dispatch({ type: GET_WORK_EXPERIENCE_REQUEST });
    try {
      const { data } = await axios.get("/api/user/work-experience", {
        headers: {
          token,
        },
        params: {
          id: user_id,
        },
      });
      dispatch({ type: GET_WORK_EXPERIENCE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_WORK_EXPERIENCE_FAIL, payload: error.response });
    }
  };

//add work experience

export const add_work_experience_action = (info, token) => async (dispatch) => {
  dispatch({ type: ADD_WORK_EXPERIENCE_REQUEST });
  try {
    const { data } = await axios.post("/api/user/add-work-experience", info, {
      headers: {
        token,
      },
    });
    dispatch({ type: ADD_WORK_EXPERIENCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADD_WORK_EXPERIENCE_FAIL, payload: error.response });
  }
};

//delete work experience
export const delete_work_experience_action =
  (info, token) => async (dispatch) => {
    dispatch({ type: DELETE_WORK_EXPERIENCE_REQUEST });
    try {
      const { data } = await axios.post(
        "/api/user/delete-work-experience",
        info,
        {
          headers: {
            token,
          },
        }
      );
      dispatch({ type: DELETE_WORK_EXPERIENCE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: DELETE_WORK_EXPERIENCE_FAIL, payload: error.response });
    }
  };

//get availability
export const get_availability_action =
  (token, user_id = null) =>
  async (dispatch) => {
    dispatch({ type: GET_AVAILABILITY_REQUEST });
    try {
      const { data } = await axios.get("/api/user/availability", {
        headers: {
          token,
        },
        params: {
          id: user_id,
        },
      });
      dispatch({ type: GET_AVAILABILITY_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_AVAILABILITY_FAIL, payload: error.response });
    }
  };

//add availability
export const add_availability_action = (info, token) => async (dispatch) => {
  dispatch({ type: ADD_AVAILABILITY_REQUEST });
  try {
    const { data } = await axios.post("/api/user/add-availability", info, {
      headers: {
        token,
      },
    });
    dispatch({ type: ADD_AVAILABILITY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADD_AVAILABILITY_FAIL, payload: error.response });
  }
};

//remove availability
export const remove_availability_action = (info, token) => async (dispatch) => {
  dispatch({ type: REMOVE_AVAILABILITY_REQUEST });
  try {
    const { data } = await axios.post("/api/user/remove-availability", info, {
      headers: {
        token,
      },
    });
    dispatch({ type: REMOVE_AVAILABILITY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: REMOVE_AVAILABILITY_FAIL, payload: error.response });
  }
};

//get invited people
export const get_invited_action = (token) => async (dispatch) => {
  dispatch({ type: GET_INVITED_REQUEST });
  try {
    const { data } = await axios.get("/api/user/get-invited", {
      headers: {
        token,
      },
    });
    dispatch({ type: GET_INVITED_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_INVITED_FAIL, payload: error.response });
  }
};

//invite
export const invite_action = (info, token) => async (dispatch) => {
  dispatch({ type: INVITE_REQUEST });
  try {
    const { data } = await axios.post("/api/user/invite", info, {
      headers: {
        token,
      },
    });
    dispatch({ type: INVITE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: INVITE_FAIL, payload: error.response });
  }
};

//add contract
export const add_contract_action = (info, token) => async (dispatch) => {
  dispatch({ type: ADD_CONTRACT_REQUEST });
  try {
    const { data } = await axios.post("/api/user/add-contract", info, {
      headers: {
        token,
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch({ type: ADD_CONTRACT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADD_CONTRACT_FAIL, payload: error.response });
  }
};

//get contract
export const get_contract_action = (token) => async (dispatch) => {
  dispatch({ type: GET_CONTRACT_REQUEST });
  try {
    const { data } = await axios.get("/api/user/get-contracts", {
      headers: {
        token,
      },
    });
    dispatch({ type: GET_CONTRACT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_CONTRACT_FAIL, payload: error.response });
  }
};

//get organasations
export const get_organasation_action = (token) => async (dispatch) => {
  dispatch({ type: GET_ORGANASATIONS_REQUEST });
  try {
    const { data } = await axios.get("/api/user/get-orga", {
      headers: {
        token,
      },
    });
    dispatch({ type: GET_ORGANASATIONS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ORGANASATIONS_FAIL, payload: error.response });
  }
};

//add organasation
export const add_organasation_action = (info, token) => async (dispatch) => {
  dispatch({ type: SET_ORGANASATIONS_REQUEST });
  try {
    const { data } = await axios.post("/api/user/set-orga", info, {
      headers: {
        token,
      },
    });
    dispatch({ type: SET_ORGANASATIONS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SET_ORGANASATIONS_FAIL, payload: error.response });
  }
};

//get timecards
export const get_timecard_action = (token) => async (dispatch) => {
  dispatch({ type: GET_TIMECARD_REQUEST });
  try {
    const { data } = await axios.get("/api/user/get-timecards", {
      headers: {
        token,
      },
    });
    dispatch({ type: GET_TIMECARD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_TIMECARD_FAIL, payload: error.response });
  }
};

//set timecards
export const set_timecard_action = (info, token) => async (dispatch) => {
  dispatch({ type: SET_TIMECARD_REQUEST });
  try {
    const { data } = await axios.post("/api/user/set-timecard", info, {
      headers: {
        token,
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch({ type: SET_TIMECARD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SET_TIMECARD_FAIL, payload: error.response });
  }
};

//delete timecard file
export const delete_timecard_file_action =
  (name, id, token) => async (dispatch) => {
    dispatch({ type: DELETE_TIMECARD_FILE_REQUEST });
    try {
      const { data } = await axios.delete("/api/user/delete-timcard-file", {
        headers: {
          token,
          id,
          name,
        },
      });
      dispatch({ type: DELETE_TIMECARD_FILE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: DELETE_TIMECARD_FILE_FAIL, payload: error.response });
    }
  };

//GET client orga info
export const get_client_orga_action =
  (token, user_id = null) =>
  async (dispatch) => {
    dispatch({ type: GET_CLT_ORGA_REQUEST });
    try {
      const { data } = await axios.get("/api/user/client-orga", {
        headers: {
          token,
        },
        params: {
          id: user_id,
        },
      });
      dispatch({ type: GET_CLT_ORGA_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_CLT_ORGA_FAIL, payload: error.response });
    }
  };

//SET client orga info
export const set_client_orga_action = (token, info) => async (dispatch) => {
  dispatch({ type: SET_CLT_ORGA_REQUEST });
  try {
    const { data } = await axios.post("/api/user/set-client-orga", info, {
      headers: {
        token,
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch({ type: SET_CLT_ORGA_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SET_CLT_ORGA_FAIL, payload: error.response });
  }
};

//trigger to single location elements to start saving data
export const start_location_saving_action = (state) => async (dispatch) => {
  dispatch({ type: "START_SAVING_LOCATIONS", payload: state });
};
//get locations
export const get_locations_action = (token) => async (dispatch) => {
  dispatch({ type: GET_LOCATION_REQUEST });
  try {
    const { data } = await axios.get("/api/user/get-locations", {
      headers: {
        token,
      },
    });
    dispatch({ type: GET_LOCATION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_LOCATION_FAIL, payload: error });
  }
};
//set locations
export const set_locations_action = (token, info) => async (dispatch) => {
  dispatch({ type: SET_LOCATION_REQUEST });
  try {
    const { data } = await axios.post("/api/user/update-location", info, {
      headers: {
        token,
      },
    });
    dispatch({ type: SET_LOCATION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SET_LOCATION_FAIL, payload: error });
  }
};

//add locations
export const add_locations_action = (token, info) => async (dispatch) => {
  dispatch({ type: ADD_LOCATION_REQUEST });
  try {
    const { data } = await axios.post("/api/user/add-location", info, {
      headers: {
        token,
      },
    });
    dispatch({ type: ADD_LOCATION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADD_LOCATION_FAIL, payload: error });
  }
};

//delete locations
export const delete_location_action = (token, id) => async (dispatch) => {
  dispatch({ type: DELETE_LOCATION_REQUEST });
  try {
    const { data } = await axios.delete("/api/user/delete-location", {
      headers: {
        token,
      },
      params: {
        id,
      },
    });
    dispatch({ type: DELETE_LOCATION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DELETE_LOCATION_FAIL, payload: error });
  }
};

//get locations
export const get_additional_users_action = (token) => async (dispatch) => {
  dispatch({ type: GET_ADDITIONAL_USRES_REQUEST });
  try {
    const { data } = await axios.get("/api/user/get-additional-user", {
      headers: {
        token,
      },
    });
    dispatch({ type: GET_ADDITIONAL_USRES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ADDITIONAL_USRES_FAIL, payload: error });
  }
};
//set locations
export const set_additoinal_users_action =
  (token, info) => async (dispatch) => {
    dispatch({ type: SET_ADDITIONAL_USERS_REQUEST });
    try {
      const { data } = await axios.post(
        "/api/user/update-additional-user",
        info,
        {
          headers: {
            token,
          },
        }
      );
      dispatch({ type: SET_ADDITIONAL_USERS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: SET_ADDITIONAL_USERS_FAIL, payload: error });
    }
  };

//add locations
export const add_additional_users_action =
  (token, info) => async (dispatch) => {
    dispatch({ type: ADD_ADDITIONAL_USERS_REQUEST });
    try {
      const { data } = await axios.post("/api/user/add-additional-user", info, {
        headers: {
          token,
        },
      });
      dispatch({ type: ADD_ADDITIONAL_USERS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: ADD_ADDITIONAL_USERS_FAIL, payload: error });
    }
  };

//add review
export const add_review_action = (info, token) => async (dispatch) => {
  dispatch({ type: ADD_REVIEW_REQUEST });
  try {
    const { data } = await axios.post("/api/user/add-review", info, {
      headers: {
        token,
      },
    });
    dispatch({ type: ADD_REVIEW_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADD_REVIEW_FAIL, payload: error.response });
  }
};

//remove review
export const delete_review_action = (id, token) => async (dispatch) => {
  dispatch({ type: DELETE_REVIEW_REQUEST });
  try {
    const { data } = await axios.delete("/api/user/remove-review", {
      headers: {
        token,
      },
      params: {
        id,
      },
    });
    dispatch({ type: DELETE_REVIEW_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DELETE_REVIEW_FAIL, payload: error.response });
  }
};

//get reviews
export const get_review_action =
  (token, user_id = null) =>
  async (dispatch) => {
    dispatch({ type: GET_REVIEW_REQUEST });
    try {
      const { data } = await axios.get("/api/user/get-reviews", {
        headers: {
          token,
        },
        params: {
          id: user_id,
        },
      });
      dispatch({ type: GET_REVIEW_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_REVIEW_FAIL, payload: error.response });
    }
  };

//add assignement
export const add_assignement_action = (info, token) => async (dispatch) => {
  dispatch({ type: ADD_ASSIGNEMENT_REQUEST });
  try {
    const { data } = await axios.post("/api/user/add-assignement", info, {
      headers: {
        token,
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch({ type: ADD_ASSIGNEMENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADD_ASSIGNEMENT_FAIL, payload: error.response });
  }
};

//get assignements
export const get_assignement_action = (token, id) => async (dispatch) => {
  dispatch({ type: GET_ASSIGNEMENT_REQUEST });
  try {
    const { data } = await axios.get("/api/user/get-assignement", {
      headers: {
        token,
      },
      params: {
        id,
      },
    });
    dispatch({ type: GET_ASSIGNEMENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ASSIGNEMENT_FAIL, payload: error.response });
  }
};

//get all assignements
export const get_all_assignements_action =
  (token, user_id = null) =>
  async (dispatch) => {
    dispatch({ type: GET_ALL_ASSIGNEMENT_REQUEST });
    try {
      const { data } = await axios.get("/api/user/get-all-assignements", {
        headers: {
          token,
        },
        params: {
          id: user_id,
        },
      });
      dispatch({ type: GET_ALL_ASSIGNEMENT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_ALL_ASSIGNEMENT_FAIL, payload: error.response });
    }
  };

//SET assignements status
export const set_assignement_action = (info, id, token) => async (dispatch) => {
  dispatch({ type: SET_ASSIGNEMENT_REQUEST });
  try {
    const { data } = await axios.post("/api/user/set-assignement", info, {
      headers: {
        token,
        "Content-Type": "multipart/form-data",
      },
      params: {
        id,
      },
    });
    dispatch({ type: SET_ASSIGNEMENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SET_ASSIGNEMENT_FAIL, payload: error.response });
  }
};

//get geolocation
export const get_geolocation_action =
  (token, place, address) => async (dispatch) => {
    dispatch({ type: GET_GEOLOCATION_REQUEST });
    try {
      const { data } = await axios.get("/api/user/geolocation", {
        headers: {
          token,
        },
        params: {
          place,
          address,
        },
      });
      dispatch({ type: GET_GEOLOCATION_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_GEOLOCATION_FAIL, payload: error.response });
    }
  };
//delete assignements
export const delete_assignement_action = (token, id) => async (dispatch) => {
  dispatch({ type: DELETE_ASSIGNEMENT_REQUEST });
  try {
    const { data } = await axios.delete("/api/user/delete-assignement", {
      headers: {
        token,
      },
      params: {
        id,
      },
    });
    dispatch({ type: DELETE_ASSIGNEMENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DELETE_ASSIGNEMENT_FAIL, payload: error.response });
  }
};

//update user picture or video
export const update_user_file = (info, token) => async (dispatch) => {
  dispatch({ type: UPDATE_USER_FILE_REQUEST });
  try {
    const { data } = await axios.post("/api/user/update-user-files", info, {
      headers: {
        token,
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch({ type: UPDATE_USER_FILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_USER_FILE_FAIL, payload: error.response });
  }
};

//delete user picture or video
export const delete_user_file = (info, token) => async (dispatch) => {
  dispatch({ type: UPDATE_USER_FILE_REQUEST });
  try {
    const { data } = await axios.post("/api/user/delete-user-files", info, {
      headers: {
        token,
      },
    });
    dispatch({ type: UPDATE_USER_FILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_USER_FILE_FAIL, payload: error.response });
  }
};

//search for users / assignments
export const search_action = (info) => async (dispatch) => {
  dispatch({ type: SEARCH_REQUEST });
  try {
    const { data } = await axios.post("/api/user/search", info);
    dispatch({ type: SEARCH_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SEARCH_FAIL, payload: error.response });
  }
};

//like users / assignments
export const like_action = (info, token) => async (dispatch) => {
  dispatch({ type: LIKE_REQUEST });
  try {
    const { data } = await axios.post("/api/user/like", info, {
      headers: {
        token,
      },
    });
    dispatch({ type: LIKE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: LIKE_FAIL, payload: error.response });
  }
};

// remove like users / assignments
export const remove_like_action = (info, token) => async (dispatch) => {
  dispatch({ type: REMOVE_LIKE_REQUEST });
  try {
    const { data } = await axios.delete("/api/user/remove-like", {
      headers: {
        token,
      },
      params: {
        ...info,
      },
    });
    dispatch({ type: REMOVE_LIKE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: REMOVE_LIKE_FAIL, payload: error.response });
  }
};

//get liked users / assignments
export const get_liked_action = (info, token) => async (dispatch) => {
  dispatch({ type: GET_LIKED_REQUEST });
  try {
    const { data } = await axios.get("/api/user/get-liked", {
      headers: {
        token,
      },
      params: {
        table: info,
      },
    });
    dispatch({ type: GET_LIKED_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_LIKED_FAIL, payload: error.response });
  }
};

//apply for assignments
export const apply_action = (info, token) => async (dispatch) => {
  dispatch({ type: APPLY_REQUEST });
  try {
    const { data } = await axios.post("/api/user/apply", info, {
      headers: {
        token,
      },
    });
    dispatch({ type: APPLY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: APPLY_FAIL, payload: error.response });
  }
};

//get applied for assignements
export const get_applications_action = (token) => async (dispatch) => {
  dispatch({ type: GET_APPLICATION_REQUEST });
  try {
    const { data } = await axios.get("/api/user/get-applications", {
      headers: {
        token,
      },
    });
    dispatch({ type: GET_APPLICATION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_APPLICATION_FAIL, payload: error.response });
  }
};
//delete application
export const delete_applications_action = (token, id) => async (dispatch) => {
  dispatch({ type: DELETE_APPLICATION_REQUEST });
  try {
    const { data } = await axios.delete("/api/user/delete-applications", {
      headers: {
        token,
      },
      params: {
        id,
      },
    });
    dispatch({ type: DELETE_APPLICATION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DELETE_APPLICATION_FAIL, payload: error.response });
  }
};
//invite freelancer
export const invite_freelancer_action = (info, token) => async (dispatch) => {
  dispatch({ type: INVITE_FREELANCER_REQUEST });
  try {
    const { data } = await axios.post("/api/user/invite-freelancer", info, {
      headers: {
        token,
      },
    });
    dispatch({ type: INVITE_FREELANCER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: INVITE_FREELANCER_FAIL, payload: error.response });
  }
};

//get invite freelancer
export const get_invited_freelancer_action = (token) => async (dispatch) => {
  dispatch({ type: GET_INVITED_FREELANCER_REQUEST });
  try {
    const { data } = await axios.get("/api/user/get-invited-freelancers", {
      headers: {
        token,
      },
    });
    dispatch({ type: GET_INVITED_FREELANCER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_INVITED_FREELANCER_FAIL, payload: error.response });
  }
};

//delete invitations freelancer
export const delete_invitations_freelancer_action =
  (token) => async (dispatch) => {
    dispatch({ type: DELETE_INVITED_FREELANCER_REQUEST });
    try {
      const { data } = await axios.delete(
        "/api/user/delete-all-invitations-freelancer",
        {
          headers: {
            token,
          },
        }
      );
      dispatch({ type: DELETE_INVITED_FREELANCER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: DELETE_INVITED_FREELANCER_FAIL,
        payload: error.response,
      });
    }
  };

//set assignement alert
export const set_assignement_alert_action =
  (info, token) => async (dispatch) => {
    dispatch({ type: ADD_ASSIGNEMENT_ALERT_REQUEST });
    try {
      const { data } = await axios.post(
        "/api/user/add-assignement-alert",
        info,
        {
          headers: {
            token,
          },
        }
      );
      dispatch({ type: ADD_ASSIGNEMENT_ALERT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: ADD_ASSIGNEMENT_ALERT_FAIL, payload: error.response });
    }
  };

//get assignement alert
export const get_assignement_alert_action = (token) => async (dispatch) => {
  dispatch({ type: GET_ASSIGNEMENT_ALERT_REQUEST });
  try {
    const { data } = await axios.get("/api/user/get-assignement-alerts", {
      headers: {
        token,
      },
    });
    dispatch({ type: GET_ASSIGNEMENT_ALERT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ASSIGNEMENT_ALERT_FAIL, payload: error.response });
  }
};

//delete invitations freelancer
export const delete_assignement_alert_action =
  (id, token) => async (dispatch) => {
    dispatch({ type: DELETE_ASSIGNEMENT_ALERT_REQUEST });
    try {
      const { data } = await axios.delete(
        "/api/user/delete-assignement-alert",
        {
          headers: {
            token,
          },
          params: {
            id,
          },
        }
      );
      dispatch({ type: DELETE_ASSIGNEMENT_ALERT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: DELETE_ASSIGNEMENT_ALERT_FAIL,
        payload: error.response,
      });
    }
  };

//login_management

export const login_management_action = (info, token) => async (dispatch) => {
  dispatch({ type: LOGIN_MANAGEMENT_REQUEST });
  try {
    const { data } = await axios.post("/api/user/management", info, {
      headers: {
        token,
      },
    });
    dispatch({ type: LOGIN_MANAGEMENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: LOGIN_MANAGEMENT_FAIL, payload: error.response });
  }
};

//add invoices

export const add_invoices_actions = (info, token) => async (dispatch) => {
  dispatch({ type: ADD_INVOICE_REQUEST });
  try {
    const { data } = await axios.post("/api/user/add-invoice", info, {
      headers: {
        token,
      },
    });
    dispatch({ type: ADD_INVOICE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADD_INVOICE_FAIL, payload: error.response });
  }
};

//delete invoices

export const delete_invoices_action = (id, token) => async (dispatch) => {
  dispatch({ type: DELETE_INVOICE_REQUEST });
  try {
    const { data } = await axios.delete("/api/user/delete-invoice", {
      headers: {
        token,
      },
      params: {
        id,
      },
    });
    dispatch({ type: DELETE_INVOICE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DELETE_INVOICE_FAIL, payload: error.response });
  }
};

//get invoices
export const get_invoices_actions = (token) => async (dispatch) => {
  dispatch({ type: GET_INVOICE_REQUEST });
  try {
    const { data } = await axios.get("/api/user/invoices", {
      headers: {
        token,
      },
    });
    dispatch({ type: GET_INVOICE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_INVOICE_FAIL, payload: error.response });
  }
};

//DELETE invoices files
export const delete_invoices_files_actions =
  (name, id, token) => async (dispatch) => {
    dispatch({ type: DELETE_INVOICE_FILE_REQUEST });
    try {
      const { data } = await axios.delete("/api/user/delete-invoice-files", {
        headers: {
          token,
        },
        params: {
          id,
          name,
        },
      });
      dispatch({ type: DELETE_INVOICE_FILE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: DELETE_INVOICE_FILE_FAIL, payload: error.response });
    }
  };

//add favorite freelancer
export const add_favorite_freelancer = (id, token) => async (dispatch) => {
  dispatch({ type: ADD_FAVORITE_REQUEST });
  try {
    const { data } = await axios.post(
      "/api/user/add-favorite",
      { id },
      {
        headers: {
          token,
        },
      }
    );
    dispatch({ type: ADD_FAVORITE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADD_FAVORITE_FAIL, payload: error.response });
  }
};
//GET favorite freelancer
export const get_favorite_freelancer = (token) => async (dispatch) => {
  dispatch({ type: GET_FAVORITE_REQUEST });
  try {
    const { data } = await axios.get("/api/user/get-favorite", {
      headers: {
        token,
      },
    });
    dispatch({ type: GET_FAVORITE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_FAVORITE_FAIL, payload: error.response });
  }
};

//GET reserve
export const get_reserve_action = (token) => async (dispatch) => {
  dispatch({ type: GET_RESERVE_REQUEST });
  try {
    const { data } = await axios.get("/api/user/get-reserve-service", {
      headers: {
        token,
      },
    });
    dispatch({ type: GET_RESERVE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_RESERVE_FAIL, payload: error.response });
  }
};

//set reserve
export const set_reserve_action = (info, token) => async (dispatch) => {
  dispatch({ type: SET_RESERVE_REQUEST });
  try {
    const { data } = await axios.post("/api/user/set-reserve-service", info, {
      headers: {
        token,
      },
    });
    dispatch({ type: SET_RESERVE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SET_RESERVE_FAIL, payload: error.response });
  }
};

//add reserve
export const add_reserve_action = (info, token) => async (dispatch) => {
  dispatch({ type: ADD_RESERVE_REQUEST });
  try {
    const { data } = await axios.post("/api/user/add-reserve-service", info, {
      headers: {
        token,
      },
    });
    dispatch({ type: ADD_RESERVE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADD_RESERVE_FAIL, payload: error.response });
  }
};

//remove reserve
export const remove_reserve_action = (token) => async (dispatch) => {
  dispatch({ type: REMOVE_RESERVE_REQUEST });
  try {
    const { data } = await axios.delete("/api/user/remove-reserve-service", {
      headers: {
        token,
      },
    });
    dispatch({ type: REMOVE_RESERVE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: REMOVE_RESERVE_FAIL, payload: error.response });
  }
};

//remove favorite freelancer
export const remove_favorite_freelancer = (id, token) => async (dispatch) => {
  dispatch({ type: REMOVE_FAVORITE_REQUEST });
  try {
    const { data } = await axios.post(
      "/api/user/remove-favorite",
      { id },
      {
        headers: {
          token,
        },
      }
    );
    dispatch({ type: REMOVE_FAVORITE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: REMOVE_FAVORITE_FAIL, payload: error.response });
  }
};

//send verifiation email
export const send_verification_email = (email) => async (dispatch) => {
  dispatch({ type: VERIFY_EMAIL_REQUEST });
  try {
    const { data } = await axios.post("/api/user/verify-email", { email });
    dispatch({ type: VERIFY_EMAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: VERIFY_EMAIL_FAIL, payload: error.response });
  }
};

//check verifiation email
export const check_verification_email = (code) => async (dispatch) => {
  console.log(code);
  dispatch({ type: CHECK_VERIFY_EMAIL_REQUEST });
  try {
    const { data } = await axios.post("/api/user/verify-email-code", { code });
    dispatch({ type: CHECK_VERIFY_EMAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CHECK_VERIFY_EMAIL_FAIL, payload: error.response });
  }
};

//delete file
export const delete_file_action = (info, token) => async (dispatch) => {
  dispatch({ type: DELETE_FILE_REQUEST });
  try {
    const { data } = await axios.delete("/api/user/delete-file", {
      headers: {
        token,
      },
      params: info,
    });
    dispatch({ type: DELETE_FILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DELETE_FILE_FAIL, payload: error.response });
  }
};

//get diplomat type
export const getDiplomatType_action = (token) => async (dispatch) => {
  dispatch({ type: GET_DIPLOMAT_TYPES_REQUEST });
  try {
    const { data } = await axios.get("/api/user/get-diplomat-types", {
      headers: {
        token,
      },
    });
    dispatch({ type: GET_DIPLOMAT_TYPES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_DIPLOMAT_TYPES_FAIL, payload: error.response });
  }
};

//add diplomat type
export const addDiplomatType_action = (info, token) => async (dispatch) => {
  dispatch({ type: ADD_DIPLOMAT_TYPE_REQUEST });
  try {
    const { data } = await axios.post("/api/user/add-diplomat-type", info, {
      headers: {
        token,
      },
    });
    dispatch({ type: ADD_DIPLOMAT_TYPE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADD_DIPLOMAT_TYPE_FAIL, payload: error.response });
  }
};

//send email contact us
export const send_contact_mail_action = (info, token) => async (dispatch) => {
  dispatch({ type: SEND_EMAIL_CONTACT_REQUEST });
  try {
    const { data } = await axios.post("/api/user/contact-us-email", info, {
      headers: {
        token,
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch({ type: SEND_EMAIL_CONTACT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SEND_EMAIL_CONTACT_FAIL, payload: error.response });
  }
};

//get preffered language
export const get_lang_action =
  (token, assignement_id = null, user_id = null) =>
  async (dispatch) => {
    dispatch({ type: GET_LANG_REQUEST });
    try {
      const { data } = await axios.get("/api/user/get-lang", {
        headers: {
          token,
        },
        params: {
          assignement_id,
          user_id,
        },
      });
      dispatch({ type: GET_LANG_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_LANG_FAIL, payload: error.response });
    }
  };

//set preffered language
export const set_lang_action = (info, token) => async (dispatch) => {
  dispatch({ type: SET_LANG_REQUEST });
  try {
    const { data } = await axios.post("/api/user/set-lang", info, {
      headers: {
        token,
      },
    });
    dispatch({ type: SET_LANG_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SET_LANG_FAIL, payload: error.response });
  }
};

//logout

export const logout_action = (token) => async (dispatch) => {
  dispatch({ type: LOGOUT_REQUEST });
  try {
    const { data } = await axios.post("/api/auth/logout", {
      headers: {
        token,
      },
    });
    dispatch({ type: LOGOUT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error.response });
  }
};

//delete account
export const delete_account_action = (token) => async (dispatch) => {
  dispatch({ type: DELETE_ACCOUNT_REQUEST });
  try {
    const { data } = await axios.delete("/api/user/delete-account", {
      headers: {
        token,
      },
    });
    dispatch({ type: DELETE_ACCOUNT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DELETE_ACCOUNT_FAIL, payload: error.response });
  }
};

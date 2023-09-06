import {
  ADD_ADDITIONAL_USERS_FAIL,
  ADD_ADDITIONAL_USERS_REQUEST,
  ADD_ADDITIONAL_USERS_SUCCESS,
  ADD_ASSIGNEMENT_ALERT_FAIL,
  ADD_ASSIGNEMENT_ALERT_REQUEST,
  ADD_ASSIGNEMENT_ALERT_SUCCESS,
  ADD_ASSIGNEMENT_FAIL,
  ADD_ASSIGNEMENT_REQUEST,
  ADD_ASSIGNEMENT_SUCCESS,
  ADD_AVAILABILITY_FAIL,
  ADD_AVAILABILITY_REQUEST,
  ADD_AVAILABILITY_SUCCESS,
  ADD_CONTRACT_FAIL,
  ADD_CONTRACT_REQUEST,
  ADD_CONTRACT_SUCCESS,
  ADD_DIPLOMAT_FAIL,
  ADD_DIPLOMAT_REQUEST,
  ADD_DIPLOMAT_SUCCESS,
  ADD_DIPLOMAT_TYPE_FAIL,
  ADD_DIPLOMAT_TYPE_REQUEST,
  ADD_DIPLOMAT_TYPE_SUCCESS,
  ADD_DOCUMENTS_FAIL,
  ADD_DOCUMENTS_REQUEST,
  ADD_DOCUMENTS_SUCCESS,
  ADD_FAVORITE_FAIL,
  ADD_FAVORITE_REQUEST,
  ADD_FAVORITE_SUCCESS,
  ADD_INDUSTRY_FAIL,
  ADD_INDUSTRY_REQUEST,
  ADD_INDUSTRY_SUCCESS,
  ADD_INVOICE_FAIL,
  ADD_INVOICE_REQUEST,
  ADD_INVOICE_SUCCESS,
  ADD_LOCATION_FAIL,
  ADD_LOCATION_REQUEST,
  ADD_LOCATION_SUCCESS,
  ADD_RESERVE_FAIL,
  ADD_RESERVE_REQUEST,
  ADD_RESERVE_SUCCESS,
  ADD_REVIEW_FAIL,
  ADD_REVIEW_REQUEST,
  ADD_REVIEW_SUCCESS,
  ADD_WORK_EXPERIENCE_FAIL,
  ADD_WORK_EXPERIENCE_REQUEST,
  ADD_WORK_EXPERIENCE_SUCCESS,
  APPLY_FAIL,
  APPLY_REQUEST,
  APPLY_SUCCESS,
  CHANGE_PASSWORD_FAIL,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHECK_VERIFY_EMAIL_FAIL,
  CHECK_VERIFY_EMAIL_REQUEST,
  CHECK_VERIFY_EMAIL_SUCCESS,
  DELETE_ACCOUNT_FAIL,
  DELETE_ACCOUNT_REQUEST,
  DELETE_ACCOUNT_SUCCESS,
  DELETE_APPLICATION_FAIL,
  DELETE_APPLICATION_REQUEST,
  DELETE_APPLICATION_SUCCESS,
  DELETE_ASSIGNEMENT_ALERT_FAIL,
  DELETE_ASSIGNEMENT_ALERT_REQUEST,
  DELETE_ASSIGNEMENT_ALERT_SUCCESS,
  DELETE_ASSIGNEMENT_FAIL,
  DELETE_ASSIGNEMENT_REQUEST,
  DELETE_ASSIGNEMENT_SUCCESS,
  DELETE_FILE_FAIL,
  DELETE_FILE_REQUEST,
  DELETE_FILE_SUCCESS,
  DELETE_INVITED_FREELANCER_FAIL,
  DELETE_INVITED_FREELANCER_REQUEST,
  DELETE_INVITED_FREELANCER_SUCCESS,
  DELETE_INVOICE_FAIL,
  DELETE_INVOICE_FILE_FAIL,
  DELETE_INVOICE_FILE_REQUEST,
  DELETE_INVOICE_FILE_SUCCESS,
  DELETE_INVOICE_REQUEST,
  DELETE_INVOICE_SUCCESS,
  DELETE_LOCATION_FAIL,
  DELETE_LOCATION_REQUEST,
  DELETE_LOCATION_SUCCESS,
  DELETE_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_TIMECARD_FILE_FAIL,
  DELETE_TIMECARD_FILE_REQUEST,
  DELETE_TIMECARD_FILE_SUCCESS,
  DELETE_WORK_EXPERIENCE_FAIL,
  DELETE_WORK_EXPERIENCE_REQUEST,
  DELETE_WORK_EXPERIENCE_SUCCESS,
  GET_ADDITIONAL_USRES_FAIL,
  GET_ADDITIONAL_USRES_REQUEST,
  GET_ADDITIONAL_USRES_SUCCESS,
  GET_ALL_ASSIGNEMENT_FAIL,
  GET_ALL_ASSIGNEMENT_REQUEST,
  GET_ALL_ASSIGNEMENT_SUCCESS,
  GET_APPLICATION_FAIL,
  GET_APPLICATION_REQUEST,
  GET_APPLICATION_SUCCESS,
  GET_ASSIGNEMENT_ALERT_FAIL,
  GET_ASSIGNEMENT_ALERT_REQUEST,
  GET_ASSIGNEMENT_ALERT_SUCCESS,
  GET_ASSIGNEMENT_FAIL,
  GET_ASSIGNEMENT_REQUEST,
  GET_ASSIGNEMENT_SUCCESS,
  GET_AVAILABILITY_FAIL,
  GET_AVAILABILITY_REQUEST,
  GET_AVAILABILITY_SUCCESS,
  GET_CLT_ORGA_FAIL,
  GET_CLT_ORGA_REQUEST,
  GET_CLT_ORGA_SUCCESS,
  GET_COMPANY_DATA_FAIL,
  GET_COMPANY_DATA_REQUEST,
  GET_COMPANY_DATA_SUCCESS,
  GET_COMPETENCY_FAIL,
  GET_COMPETENCY_REQUEST,
  GET_COMPETENCY_SUCCESS,
  GET_CONTRACT_FAIL,
  GET_CONTRACT_REQUEST,
  GET_CONTRACT_SUCCESS,
  GET_DIPLOMAT_TYPES_FAIL,
  GET_DIPLOMAT_TYPES_REQUEST,
  GET_DIPLOMAT_TYPES_SUCCESS,
  GET_DOCUMENTS_FAIL,
  GET_DOCUMENTS_REQUEST,
  GET_DOCUMENTS_SUCCESS,
  GET_FAVORITE_FAIL,
  GET_FAVORITE_REQUEST,
  GET_FAVORITE_SUCCESS,
  GET_GEOLOCATION_FAIL,
  GET_GEOLOCATION_REQUEST,
  GET_GEOLOCATION_SUCCESS,
  GET_INVITED_FAIL,
  GET_INVITED_FREELANCER_FAIL,
  GET_INVITED_FREELANCER_REQUEST,
  GET_INVITED_FREELANCER_SUCCESS,
  GET_INVITED_REQUEST,
  GET_INVITED_SUCCESS,
  GET_INVOICE_FAIL,
  GET_INVOICE_REQUEST,
  GET_INVOICE_SUCCESS,
  GET_LANG_FAIL,
  GET_LANG_REQUEST,
  GET_LANG_SUCCESS,
  GET_LIKED_FAIL,
  GET_LIKED_REQUEST,
  GET_LIKED_SUCCESS,
  GET_LOCATION_FAIL,
  GET_LOCATION_REQUEST,
  GET_LOCATION_SUCCESS,
  GET_NOTIFICATION_FAIL,
  GET_NOTIFICATION_REQUEST,
  GET_NOTIFICATION_SUCCESS,
  GET_ORGANASATIONS_FAIL,
  GET_ORGANASATIONS_REQUEST,
  GET_ORGANASATIONS_SUCCESS,
  GET_PERSONAL_DATA_FAIL,
  GET_PERSONAL_DATA_REQUEST,
  GET_PERSONAL_DATA_SUCCESS,
  GET_PROFILE_RATINGS_FAIL,
  GET_PROFILE_RATINGS_REQUEST,
  GET_PROFILE_RATINGS_SUCCESS,
  GET_RESERVE_FAIL,
  GET_RESERVE_REQUEST,
  GET_RESERVE_SUCCESS,
  GET_REVIEW_FAIL,
  GET_REVIEW_REQUEST,
  GET_REVIEW_SUCCESS,
  GET_TIMECARD_FAIL,
  GET_TIMECARD_REQUEST,
  GET_TIMECARD_SUCCESS,
  GET_USER_COMPETENCY_FAIL,
  GET_USER_COMPETENCY_REQUEST,
  GET_USER_COMPETENCY_SUCCESS,
  GET_WORK_EXPERIENCE_FAIL,
  GET_WORK_EXPERIENCE_REQUEST,
  GET_WORK_EXPERIENCE_SUCCESS,
  INVITE_FAIL,
  INVITE_FREELANCER_FAIL,
  INVITE_FREELANCER_REQUEST,
  INVITE_FREELANCER_SUCCESS,
  INVITE_REQUEST,
  INVITE_SUCCESS,
  LIKE_FAIL,
  LIKE_REQUEST,
  LIKE_SUCCESS,
  LOGIN_MANAGEMENT_FAIL,
  LOGIN_MANAGEMENT_REQUEST,
  LOGIN_MANAGEMENT_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  MODIFY_AVAILABILITY_TIME_FAIL,
  MODIFY_AVAILABILITY_TIME_REQUEST,
  MODIFY_AVAILABILITY_TIME_SUCCESS,
  REMOVE_AVAILABILITY_FAIL,
  REMOVE_AVAILABILITY_REQUEST,
  REMOVE_AVAILABILITY_SUCCESS,
  REMOVE_COMPETENCY_FAIL,
  REMOVE_COMPETENCY_REQUEST,
  REMOVE_COMPETENCY_SUCCESS,
  REMOVE_FAVORITE_FAIL,
  REMOVE_FAVORITE_REQUEST,
  REMOVE_FAVORITE_SUCCESS,
  REMOVE_LIKE_FAIL,
  REMOVE_LIKE_REQUEST,
  REMOVE_LIKE_SUCCESS,
  REMOVE_RESERVE_FAIL,
  REMOVE_RESERVE_REQUEST,
  REMOVE_RESERVE_SUCCESS,
  RESET_PASSWORD_EMAIL_FAIL,
  RESET_PASSWORD_EMAIL_REQUEST,
  RESET_PASSWORD_EMAIL_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  SEARCH_FAIL,
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEND_EMAIL_CONTACT_FAIL,
  SEND_EMAIL_CONTACT_REQUEST,
  SEND_EMAIL_CONTACT_SUCCESS,
  SET_ADDITIONAL_USERS_FAIL,
  SET_ADDITIONAL_USERS_REQUEST,
  SET_ADDITIONAL_USERS_SUCCESS,
  SET_ASSIGNEMENT_FAIL,
  SET_ASSIGNEMENT_REQUEST,
  SET_ASSIGNEMENT_SUCCESS,
  SET_CLT_ORGA_FAIL,
  SET_CLT_ORGA_REQUEST,
  SET_CLT_ORGA_SUCCESS,
  SET_COMPANY_DATA_FAIL,
  SET_COMPANY_DATA_REQUEST,
  SET_COMPANY_DATA_SUCCESS,
  SET_COMPETENCY_FAIL,
  SET_COMPETENCY_REQUEST,
  SET_COMPETENCY_SUCCESS,
  SET_LANG_FAIL,
  SET_LANG_REQUEST,
  SET_LANG_SUCCESS,
  SET_LOCATION_FAIL,
  SET_LOCATION_REQUEST,
  SET_LOCATION_SUCCESS,
  SET_NOTIFICATION_FAIL,
  SET_NOTIFICATION_REQUEST,
  SET_NOTIFICATION_SUCCESS,
  SET_ORGANASATIONS_FAIL,
  SET_ORGANASATIONS_REQUEST,
  SET_ORGANASATIONS_SUCCESS,
  SET_PERSONAL_DATA_FAIL,
  SET_PERSONAL_DATA_REQUEST,
  SET_PERSONAL_DATA_SUCCESS,
  SET_RESERVE_FAIL,
  SET_RESERVE_REQUEST,
  SET_RESERVE_SUCCESS,
  SET_TIMECARD_FAIL,
  SET_TIMECARD_REQUEST,
  SET_TIMECARD_SUCCESS,
  UPDATE_USER_FILE_FAIL,
  UPDATE_USER_FILE_REQUEST,
  UPDATE_USER_FILE_SUCCESS,
  USER_LOGIN_FACEBOOK_FAIL,
  USER_LOGIN_FACEBOOK_REQUEST,
  USER_LOGIN_FACEBOOK_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  VERIFY_EMAIL_FAIL,
  VERIFY_EMAIL_REQUEST,
  VERIFY_EMAIL_SUCCESS,
} from "../Constants/UserConstants";
//login reducer
//regiter reducer
export const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
    case USER_LOGIN_FACEBOOK_REQUEST:
      return { loading: true };
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
    case USER_LOGIN_FACEBOOK_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_REGISTER_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_LOGIN_FAIL:
    case USER_LOGIN_FACEBOOK_FAIL:
      return { loading: false, error: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//change password reducer

export const password_reducer = (state = {}, action) => {
  switch (action.type) {
    case CHANGE_PASSWORD_REQUEST:
      return { loading: true };
    case CHANGE_PASSWORD_SUCCESS:
      return { loading: false, change_password_message: action.payload };
    case CHANGE_PASSWORD_FAIL:
      return { loading: false, change_password_message: action.payload.data };
    default:
      return state;
  }
};

//reset password reducer

export const reset_password_reducer = (state = {}, action) => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST:
      return { loading: true };
    case RESET_PASSWORD_SUCCESS:
      return { loading: false, data: action.payload };
    case RESET_PASSWORD_FAIL:
      return { loading: false, error: action.payload.data };
    default:
      return state;
  }
};

//reset password email reducer

export const reset_password_email_reducer = (state = {}, action) => {
  switch (action.type) {
    case RESET_PASSWORD_EMAIL_REQUEST:
      return { loading: true };
    case RESET_PASSWORD_EMAIL_SUCCESS:
      return { loading: false, data: action.payload };
    case RESET_PASSWORD_EMAIL_FAIL:
      return { loading: false, error: action.payload.data };
    default:
      return state;
  }
};

//add diplomat reducer

export const add_diplomat_reducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_DIPLOMAT_REQUEST:
      return { loading: true };
    case ADD_DIPLOMAT_SUCCESS:
      return { loading: false, data: action.payload.data };
    case ADD_DIPLOMAT_FAIL:
      return { loading: false, data: action.payload.data };
    default:
      return state;
  }
};

//add document reducer

export const add_documents_reducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_DOCUMENTS_REQUEST:
      return { loading: true };
    case ADD_DOCUMENTS_SUCCESS:
      return { loading: false, response: action.payload };
    case ADD_DOCUMENTS_FAIL:
      return { loading: false, response: action.payload.data };
    default:
      return state;
  }
};

//get document reducer

export const get_documents_reducer = (state = {}, action) => {
  switch (action.type) {
    case GET_DOCUMENTS_REQUEST:
      return { loading: true };
    case GET_DOCUMENTS_SUCCESS:
      return { loading: false, data: action.payload };
    case GET_DOCUMENTS_FAIL:
      return { loading: false, response: action.payload?.data };
    default:
      return state;
  }
};
//get personal data reducer

export const get_personal_data_reducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PERSONAL_DATA_REQUEST:
      return { loading: true };
    case GET_PERSONAL_DATA_SUCCESS:
      return { loading: false, user: action.payload };
    case GET_PERSONAL_DATA_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//set personal data reducer

export const set_personal_data_reducer = (state = {}, action) => {
  switch (action.type) {
    case SET_PERSONAL_DATA_REQUEST:
      return { loading: true };
    case SET_PERSONAL_DATA_SUCCESS:
      return { loading: false, message: action.payload };
    case SET_PERSONAL_DATA_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//get company data reducer

export const get_company_data_reducer = (state = {}, action) => {
  switch (action.type) {
    case GET_COMPANY_DATA_REQUEST:
      return { loading: true };
    case GET_COMPANY_DATA_SUCCESS:
      return { loading: false, data: action.payload };
    case GET_COMPANY_DATA_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//add new industry reducer

export const add_new_ind_reducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_INDUSTRY_REQUEST:
      return { loading: true };
    case ADD_INDUSTRY_SUCCESS:
      return { loading: false, data: action.payload };
    case ADD_INDUSTRY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//set company data reducer

export const set_company_data_reducer = (state = {}, action) => {
  switch (action.type) {
    case SET_COMPANY_DATA_REQUEST:
      return { loading: true };
    case SET_COMPANY_DATA_SUCCESS:
      return { loading: false, data: action.payload };
    case SET_COMPANY_DATA_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//get all competencies

export const get_all_competencies_reducer = (state = {}, action) => {
  switch (action.type) {
    case GET_COMPETENCY_REQUEST:
      return { loading: true };
    case GET_COMPETENCY_SUCCESS:
      return { loading: false, competencies: action.payload };
    case GET_COMPETENCY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//get user competency
export const get_user_competency_reducer = (state = {}, action) => {
  switch (action.type) {
    case GET_USER_COMPETENCY_REQUEST:
      return { loading: true };
    case GET_USER_COMPETENCY_SUCCESS:
      return { loading: false, competencies: action.payload };
    case GET_USER_COMPETENCY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
//add competency
export const add_competency_reducer = (state = {}, action) => {
  switch (action.type) {
    case SET_COMPETENCY_REQUEST:
      return { loading: true };
    case SET_COMPETENCY_SUCCESS:
      return { loading: false, competencies: action.payload };
    case SET_COMPETENCY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//remove competency
export const remove_competency_reducer = (state = {}, action) => {
  switch (action.type) {
    case REMOVE_COMPETENCY_REQUEST:
      return { loading: true };
    case REMOVE_COMPETENCY_SUCCESS:
      return { loading: false, message: action.payload };
    case REMOVE_COMPETENCY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//get notifications
export const get_notifications_reducer = (state = {}, action) => {
  switch (action.type) {
    case GET_NOTIFICATION_REQUEST:
      return { loading: true };
    case GET_NOTIFICATION_SUCCESS:
      return { loading: false, notifications: action.payload };
    case GET_NOTIFICATION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//set notificatinos

export const set_notifications_reducer = (state = {}, action) => {
  switch (action.type) {
    case SET_NOTIFICATION_REQUEST:
      return { loading: true };
    case SET_NOTIFICATION_SUCCESS:
      return { loading: false, message: action.payload };
    case SET_NOTIFICATION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//get work experience

export const get_work_experience_reducer = (state = {}, action) => {
  switch (action.type) {
    case GET_WORK_EXPERIENCE_REQUEST:
      return { loading: true };
    case GET_WORK_EXPERIENCE_SUCCESS:
      return { loading: false, work_xp: action.payload };
    case GET_WORK_EXPERIENCE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//add work experience

export const add_work_experience_reducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_WORK_EXPERIENCE_REQUEST:
      return { loading: true };
    case ADD_WORK_EXPERIENCE_SUCCESS:
      return { loading: false, work_xp_message: action.payload };
    case ADD_WORK_EXPERIENCE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//delete work experience

export const delete_work_experience_reducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_WORK_EXPERIENCE_REQUEST:
      return { loading: true };
    case DELETE_WORK_EXPERIENCE_SUCCESS:
      return { loading: false, work_xp_message: action.payload };
    case DELETE_WORK_EXPERIENCE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
//get profile ratings

export const get_profile_ratings_reducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PROFILE_RATINGS_REQUEST:
      return { loading: true };
    case GET_PROFILE_RATINGS_SUCCESS:
      return { loading: false, profile_ratings: action.payload };
    case GET_PROFILE_RATINGS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//get availability
export const get_availability_reducer = (state = {}, action) => {
  switch (action.type) {
    case GET_AVAILABILITY_REQUEST:
      return { loading: true };
    case GET_AVAILABILITY_SUCCESS:
      return { loading: false, availability: action.payload };
    case GET_AVAILABILITY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
//add availability
export const add_availability_reducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_AVAILABILITY_REQUEST:
      return { loading: true };
    case ADD_AVAILABILITY_SUCCESS:
      return { loading: false, availability_message: action.payload };
    case ADD_AVAILABILITY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
//remove availability
export const remove_availability_reducer = (state = {}, action) => {
  switch (action.type) {
    case REMOVE_AVAILABILITY_REQUEST:
      return { loading: true };
    case REMOVE_AVAILABILITY_SUCCESS:
      return { loading: false, availability_message: action.payload };
    case REMOVE_AVAILABILITY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//get invited
export const get_invited_reducer = (state = {}, action) => {
  switch (action.type) {
    case GET_INVITED_REQUEST:
      return { loading: true };
    case GET_INVITED_SUCCESS:
      return { loading: false, data: action.payload };
    case GET_INVITED_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//invite
export const invite_reducer = (state = {}, action) => {
  switch (action.type) {
    case INVITE_REQUEST:
      return { loading: true };
    case INVITE_SUCCESS:
      return { loading: false, message: action.payload };
    case INVITE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//add contract
export const add_contract_reducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_CONTRACT_REQUEST:
      return { loading: true };
    case ADD_CONTRACT_SUCCESS:
      return { loading: false, message: action.payload };
    case ADD_CONTRACT_FAIL:
      return { loading: false, message: action.payload };
    default:
      return state;
  }
};

//get contract
export const get_contract_reducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CONTRACT_REQUEST:
      return { loading: true };
    case GET_CONTRACT_SUCCESS:
      return { loading: false, data: action.payload };
    case GET_CONTRACT_FAIL:
      return { loading: false, message: action.payload };
    default:
      return state;
  }
};

//get organasation
export const get_orga_reducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ORGANASATIONS_REQUEST:
      return { loading: true };
    case GET_ORGANASATIONS_SUCCESS:
      return { loading: false, data: action.payload };
    case GET_ORGANASATIONS_FAIL:
      return { loading: false, message: action.payload };
    default:
      return state;
  }
};

//set organasation
export const set_orga_reducer = (state = {}, action) => {
  switch (action.type) {
    case SET_ORGANASATIONS_REQUEST:
      return { loading: true };
    case SET_ORGANASATIONS_SUCCESS:
      return { loading: false, data: action.payload };
    case SET_ORGANASATIONS_FAIL:
      return { loading: false, message: action.payload };
    default:
      return state;
  }
};

//get organasation
export const get_timecard_reducer = (state = {}, action) => {
  switch (action.type) {
    case GET_TIMECARD_REQUEST:
      return { loading: true };
    case GET_TIMECARD_SUCCESS:
      return { loading: false, data: action.payload };
    case GET_TIMECARD_FAIL:
      return { loading: false, message: action.payload };
    default:
      return state;
  }
};

//set timecard
export const set_timecard_reducer = (state = {}, action) => {
  switch (action.type) {
    case SET_TIMECARD_REQUEST:
      return { loading: true };
    case SET_TIMECARD_SUCCESS:
      return { loading: false, data: action.payload };
    case SET_TIMECARD_FAIL:
      return { loading: false, message: action.payload };
    default:
      return state;
  }
};

//delete timecard_file
export const delete_timecard_file_reducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_TIMECARD_FILE_REQUEST:
      return { loading: true };
    case DELETE_TIMECARD_FILE_SUCCESS:
      return { loading: false, data: action.payload };
    case DELETE_TIMECARD_FILE_FAIL:
      return { loading: false, data: action.payload };
    default:
      return state;
  }
};

//get client orga
export const get_client_orga_reducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CLT_ORGA_REQUEST:
      return { loading: true };
    case GET_CLT_ORGA_SUCCESS:
      return { loading: false, data: action.payload };
    case GET_CLT_ORGA_FAIL:
      return { loading: false, data: action.payload };
    default:
      return state;
  }
};

//trigger to start saving data reducer
export const start_saving_locations_reducer = (
  state = { start: false },
  action
) => {
  switch (action.type) {
    case "START_SAVING_LOCATIONS":
      return { start: action.payload };
    default:
      return state;
  }
};

//SET client orga
export const set_client_orga_reducer = (state = {}, action) => {
  switch (action.type) {
    case SET_CLT_ORGA_REQUEST:
      return { loading: true };
    case SET_CLT_ORGA_SUCCESS:
      return { loading: false, data: action.payload };
    case SET_CLT_ORGA_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//get locations
export const get_locations_reducer = (state = {}, action) => {
  switch (action.type) {
    case GET_LOCATION_REQUEST:
      return { loading: true };
    case GET_LOCATION_SUCCESS:
      return { loading: false, data: action.payload };
    case GET_LOCATION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//SET location
export const set_location_reducer = (state = {}, action) => {
  switch (action.type) {
    case SET_LOCATION_REQUEST:
      return { loading: true };
    case SET_LOCATION_SUCCESS:
      return { loading: false, data: action.payload };
    case SET_LOCATION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//ADD location
export const add_location_reducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_LOCATION_REQUEST:
      return { loading: true };
    case ADD_LOCATION_SUCCESS:
      return { loading: false, data: action.payload };
    case ADD_LOCATION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//delete location
export const delete_location_reducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_LOCATION_REQUEST:
      return { loading: true };
    case DELETE_LOCATION_SUCCESS:
      return { loading: false, data: action.payload };
    case DELETE_LOCATION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//get locations
export const get_additional_user_reducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ADDITIONAL_USRES_REQUEST:
      return { loading: true };
    case GET_ADDITIONAL_USRES_SUCCESS:
      return { loading: false, data: action.payload };
    case GET_ADDITIONAL_USRES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//SET additional user
export const set_additional_user_reducer = (state = {}, action) => {
  switch (action.type) {
    case SET_ADDITIONAL_USERS_REQUEST:
      return { loading: true };
    case SET_ADDITIONAL_USERS_SUCCESS:
      return { loading: false, data: action.payload };
    case SET_ADDITIONAL_USERS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//ADD additional user
export const add_additional_user_reducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_ADDITIONAL_USERS_REQUEST:
      return { loading: true };
    case ADD_ADDITIONAL_USERS_SUCCESS:
      return { loading: false, data: action.payload };
    case ADD_ADDITIONAL_USERS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// get review
export const get_review_reducer = (state = {}, action) => {
  switch (action.type) {
    case GET_REVIEW_REQUEST:
      return { loading: true };
    case GET_REVIEW_SUCCESS:
      return { loading: false, data: action.payload };
    case GET_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// add review
export const add_review_reducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_REVIEW_REQUEST:
      return { loading: true };
    case ADD_REVIEW_SUCCESS:
      return { loading: false, data: action.payload };
    case ADD_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// delete review
export const delete_review_reducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_REVIEW_REQUEST:
      return { loading: true };
    case DELETE_REVIEW_SUCCESS:
      return { loading: false, data: action.payload };
    case DELETE_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// add assignement
export const add_assignement_reducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_ASSIGNEMENT_REQUEST:
      return { loading: true };
    case ADD_ASSIGNEMENT_SUCCESS:
      return { loading: false, data: action.payload };
    case ADD_ASSIGNEMENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// get assignement
export const get_assignement_reducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ASSIGNEMENT_REQUEST:
      return { loading: true };
    case GET_ASSIGNEMENT_SUCCESS:
      return { loading: false, data: action.payload };
    case GET_ASSIGNEMENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// set assignement's status
export const set_assignement_reducer = (state = {}, action) => {
  switch (action.type) {
    case SET_ASSIGNEMENT_REQUEST:
      return { loading: true };
    case SET_ASSIGNEMENT_SUCCESS:
      return { loading: false, data: action.payload };
    case SET_ASSIGNEMENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// get all assignements
export const get_all_assignements_reducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_ASSIGNEMENT_REQUEST:
      return { loading: true };
    case GET_ALL_ASSIGNEMENT_SUCCESS:
      return { loading: false, data: action.payload };
    case GET_ALL_ASSIGNEMENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// get geolocation
export const get_geolocation_reducer = (state = {}, action) => {
  switch (action.type) {
    case GET_GEOLOCATION_REQUEST:
      return { loading: true };
    case GET_GEOLOCATION_SUCCESS:
      return { loading: false, data: action.payload };
    case GET_GEOLOCATION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// delete assignement
export const delete_assignement_reducer = (
  state = { loading: false },
  action
) => {
  switch (action.type) {
    case DELETE_ASSIGNEMENT_REQUEST:
      return { loading: true };
    case DELETE_ASSIGNEMENT_SUCCESS:
      return { loading: false, data: action.payload };
    case DELETE_ASSIGNEMENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//update user file
export const update_user_file_reducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER_FILE_REQUEST:
      return { loading: true };
    case UPDATE_USER_FILE_SUCCESS:
      return { loading: false, data: action.payload };
    case UPDATE_USER_FILE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//search reducer
export const search_reducer = (state = {}, action) => {
  switch (action.type) {
    case SEARCH_REQUEST:
      return { loading: true };
    case SEARCH_SUCCESS:
      return { loading: false, data: action.payload };
    case SEARCH_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//like reducer
export const like_reducer = (state = {}, action) => {
  switch (action.type) {
    case LIKE_REQUEST:
      return { loading: true };
    case LIKE_SUCCESS:
      return { loading: false, data: action.payload };
    case LIKE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//remove like reducer
export const remove_like_reducer = (state = {}, action) => {
  switch (action.type) {
    case REMOVE_LIKE_REQUEST:
      return { loading: true };
    case REMOVE_LIKE_SUCCESS:
      return { loading: false, data: action.payload };
    case REMOVE_LIKE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//get liked reducer
export const get_liked_reducer = (state = {}, action) => {
  switch (action.type) {
    case GET_LIKED_REQUEST:
      return { loading: true };
    case GET_LIKED_SUCCESS:
      return { loading: false, data: action.payload };
    case GET_LIKED_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//apply reducer
export const apply_reducer = (state = {}, action) => {
  switch (action.type) {
    case APPLY_REQUEST:
      return { loading: true };
    case APPLY_SUCCESS:
      return { loading: false, data: action.payload };
    case APPLY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//get applications reducer
export const get_applications_reducer = (state = {}, action) => {
  switch (action.type) {
    case GET_APPLICATION_REQUEST:
      return { loading: true };
    case GET_APPLICATION_SUCCESS:
      return { loading: false, data: action.payload };
    case GET_APPLICATION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
//delete applications reducer
export const delete_applications_reducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_APPLICATION_REQUEST:
      return { loading: true };
    case DELETE_APPLICATION_SUCCESS:
      return { loading: false, data: action.payload };
    case DELETE_APPLICATION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//invite freelancer
export const invite_freelancer_reducer = (state = {}, action) => {
  switch (action.type) {
    case INVITE_FREELANCER_REQUEST:
      return { loading: true };
    case INVITE_FREELANCER_SUCCESS:
      return { loading: false, message: action.payload };
    case INVITE_FREELANCER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//invite freelancer
export const get_invited_freelancer_reducer = (state = {}, action) => {
  switch (action.type) {
    case GET_INVITED_FREELANCER_REQUEST:
      return { loading: true };
    case GET_INVITED_FREELANCER_SUCCESS:
      return { loading: false, data: action.payload };
    case GET_INVITED_FREELANCER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//invite freelancer
export const delete_invitations_freelancer_reducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_INVITED_FREELANCER_REQUEST:
      return { loading: true };
    case DELETE_INVITED_FREELANCER_SUCCESS:
      return { loading: false, data: action.payload };
    case DELETE_INVITED_FREELANCER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//add assignement alert
export const add_assignement_alert_reducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_ASSIGNEMENT_ALERT_REQUEST:
      return { loading: true };
    case ADD_ASSIGNEMENT_ALERT_SUCCESS:
      return { loading: false, message: action.payload };
    case ADD_ASSIGNEMENT_ALERT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//get assignement alert
export const get_assignement_alert_reducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ASSIGNEMENT_ALERT_REQUEST:
      return { loading: true };
    case GET_ASSIGNEMENT_ALERT_SUCCESS:
      return { loading: false, data: action.payload };
    case GET_ASSIGNEMENT_ALERT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//get assignement alert
export const delete_assignement_alert_reducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_ASSIGNEMENT_ALERT_REQUEST:
      return { loading: true };
    case DELETE_ASSIGNEMENT_ALERT_SUCCESS:
      return { loading: false, message: action.payload };
    case DELETE_ASSIGNEMENT_ALERT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//login management
export const login_management_reducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_MANAGEMENT_REQUEST:
      return { loading: true };
    case LOGIN_MANAGEMENT_SUCCESS:
      return { loading: false, message: action.payload };
    case LOGIN_MANAGEMENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//add invoices
export const add_invoices_reducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_INVOICE_REQUEST:
      return { loading: true };
    case ADD_INVOICE_SUCCESS:
      return { loading: false, message: action.payload };
    case ADD_INVOICE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//delete invoices
export const delete_invoices_reducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_INVOICE_REQUEST:
      return { loading: true };
    case DELETE_INVOICE_SUCCESS:
      return { loading: false, message: action.payload };
    case DELETE_INVOICE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//get invoices
export const get_invoices_reducer = (state = {}, action) => {
  switch (action.type) {
    case GET_INVOICE_REQUEST:
      return { loading: true };
    case GET_INVOICE_SUCCESS:
      return { loading: false, data: action.payload };
    case GET_INVOICE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//delete invoice files
export const delete_invoice_files_reducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_INVOICE_FILE_REQUEST:
      return { loading: true };
    case DELETE_INVOICE_FILE_SUCCESS:
      return { loading: false, message: action.payload };
    case DELETE_INVOICE_FILE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//add favorite
export const add_favorite_reducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_FAVORITE_REQUEST:
      return { loading: true };
    case ADD_FAVORITE_SUCCESS:
      return { loading: false, message: action.payload };
    case ADD_FAVORITE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//get favorite
export const get_favorite_reducer = (state = {}, action) => {
  switch (action.type) {
    case GET_FAVORITE_REQUEST:
      return { loading: true };
    case GET_FAVORITE_SUCCESS:
      return { loading: false, data: action.payload };
    case GET_FAVORITE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//REMOVE favorite
export const remove_favorite_reducer = (state = {}, action) => {
  switch (action.type) {
    case REMOVE_FAVORITE_REQUEST:
      return { loading: true };
    case REMOVE_FAVORITE_SUCCESS:
      return { loading: false, message: action.payload };
    case REMOVE_FAVORITE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//get reserve
export const get_reserve_reducer = (state = {}, action) => {
  switch (action.type) {
    case GET_RESERVE_REQUEST:
      return { loading: true };
    case GET_RESERVE_SUCCESS:
      return { loading: false, data: action.payload };
    case GET_RESERVE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//set reserve
export const set_reserve_reducer = (state = {}, action) => {
  switch (action.type) {
    case SET_RESERVE_REQUEST:
      return { loading: true };
    case SET_RESERVE_SUCCESS:
      return { loading: false, data: action.payload };
    case SET_RESERVE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//ADD reserve
export const add_reserve_reducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_RESERVE_REQUEST:
      return { loading: true };
    case ADD_RESERVE_SUCCESS:
      return { loading: false, data: action.payload };
    case ADD_RESERVE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//remove reserve
export const remove_reserve_reducer = (state = {}, action) => {
  switch (action.type) {
    case REMOVE_RESERVE_REQUEST:
      return { loading: true };
    case REMOVE_RESERVE_SUCCESS:
      return { loading: false, data: action.payload };
    case REMOVE_RESERVE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//send verification code
export const send_verification_code_reducer = (state = {}, action) => {
  switch (action.type) {
    case VERIFY_EMAIL_REQUEST:
      return { loading: true };
    case VERIFY_EMAIL_SUCCESS:
      return { loading: false, data: action.payload };
    case VERIFY_EMAIL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//check verification code
export const check_verification_code_reducer = (state = {}, action) => {
  switch (action.type) {
    case CHECK_VERIFY_EMAIL_REQUEST:
      return { loading: true };
    case CHECK_VERIFY_EMAIL_SUCCESS:
      return { loading: false, data: action.payload };
    case CHECK_VERIFY_EMAIL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//delete file
export const delete_file_reducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_FILE_REQUEST:
      return { loading: true };
    case DELETE_FILE_SUCCESS:
      return { loading: false, data: action.payload };
    case DELETE_FILE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//ADD diplomat type
export const add_diplomat_type_reducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_DIPLOMAT_TYPE_REQUEST:
      return { loading: true };
    case ADD_DIPLOMAT_TYPE_SUCCESS:
      return { loading: false, data: action.payload };
    case ADD_DIPLOMAT_TYPE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//get diplomat type
export const get_diplomat_types_reducer = (state = {}, action) => {
  switch (action.type) {
    case GET_DIPLOMAT_TYPES_REQUEST:
      return { loading: true };
    case GET_DIPLOMAT_TYPES_SUCCESS:
      return { loading: false, data: action.payload };
    case GET_DIPLOMAT_TYPES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//contact us email reducer
export const contact_us_email_reducer = (state = {}, action) => {
  switch (action.type) {
    case SEND_EMAIL_CONTACT_REQUEST:
      return { loading: true };
    case SEND_EMAIL_CONTACT_SUCCESS:
      return { loading: false, data: action.payload };
    case SEND_EMAIL_CONTACT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//get lang
export const get_lang_reducer = (state = {}, action) => {
  switch (action.type) {
    case GET_LANG_REQUEST:
      return { loading: true };
    case GET_LANG_SUCCESS:
      return { loading: false, data: action.payload };
    case GET_LANG_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//set lang
export const set_lang_reducer = (state = {}, action) => {
  switch (action.type) {
    case SET_LANG_REQUEST:
      return { loading: true };
    case SET_LANG_SUCCESS:
      return { loading: false, data: action.payload };
    case SET_LANG_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//logout
export const logout_reducer = (state = {}, action) => {
  switch (action.type) {
    case LOGOUT_REQUEST:
      return { loading: true };
    case LOGOUT_SUCCESS:
      return { loading: false, message: action.payload };
    case LOGOUT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//delete account

export const delete_account_reducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_ACCOUNT_REQUEST:
      return { loading: true };
    case DELETE_ACCOUNT_SUCCESS:
      return { loading: false, message: action.payload };
    case DELETE_ACCOUNT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

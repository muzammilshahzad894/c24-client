import Home from "./pages/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/LogIn/Login";
import Register from "./pages/Register/Register";
import Join from "./pages/Join/Join";
import Dashboard from "./pages/Dashboard/Dashboard";
import Availability from "./pages/Availability/Availability";
import Notifications from "./pages/Notifications/Notifications";
import Assignments from "./pages/Assignments/Assignments";
import Invite from "./pages/Invite/Invite";
import Settings from "./pages/Settings/Settings";
import Profile from "./pages/Profile/Profile";
import ChangePassword from "./pages/Change-password/ChangePassword";
import CompanyDetails from "./pages/CompanyDetails/CompanyDetails";
import PersonalInformation from "./pages/PersonalInformation/PersonalInformation";
import Competences from "./pages/Competences/Competences";
import Documents from "./pages/Documents/Documents";
import Credentials from "./pages/Credentials/Credentials";
import WorkXP from "./pages/WorkXP/WorkXP";
import Organisaties from "./pages/Organisaties/Organisaties";
import React, { Suspense, useEffect, useState } from "react";
import store from "./store";
import { Provider, useSelector } from "react-redux";
import "./app.scss";
import Contracts from "./pages/Contracts/Contracts";
import TimeCards from "./pages/TimeCards/TimeCards";
import OrganasationData from "./pages/Organasation-Data/OrganasationData";
import Locations from "./pages/Locations/Locations";
import Accounts from "./pages/Accounts/Accounts";
import CreateUser from "./pages/Create-user/CreateUser";
import EditAdditionalUser from "./pages/EditAdditionalUser/EditAdditionalUser";
import ManageLocations from "./pages/ManageLocations/ManageLocations";
import HourlyRates from "./pages/HourlyRates/HourlyRates";
import PlaceCall from "./pages/PlaceCall/PlaceCall";
import PreviewAssignement from "./components/PreviewAssignement/PreviewAssignement";
import SingleAssignement from "./components/SingleAssignement/SingleAssignement";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import i18n from "./i18n";
import LoadingBox from "./components/LoadingBox/LoadingBox";
import SearchResult from "./pages/SearchResult/SearchResult";
import MyApplications from "./pages/MyApplications/MyApplications";
import SavedFreelancers from "./pages/SavedFreelancers/SavedFreelancers";
import ViewInvitations from "./pages/ViewInvitations/ViewInvitations";
import AssignementAlert from "./pages/AssignementAlert/AssignementAlert";
import MyAssignementAlerts from "./pages/MyAssignementAlerts/MyAssignementAlerts";
import Management from "./pages/Management/Management";
import InvoicesOverview from "./pages/InvoicesOverview/InvoicesOverview";
import Faq from "./pages/FAQ/Faq";
import Contact from "./pages/Contact/Contact";
import ContactForm from "./pages/ContactForm/ContactForm";
import RegisterProject from "./pages/RegisterProject/RegisterProject";
import Favorites from "./pages/Favorites/Favorites";
import CompleteRegistration from "./pages/CompleteRegistration/CompleteRegistration";
import Reserve from "./pages/Reserve/Reserve";
import Forum from "./components/Forum/Forum";
import Cookies from "./pages/Cookies/Cookies_box"
import PopupScherm from "./components/PopupScherm/PopupScherm";
import TermsCondition from "./pages/termscondition";
import PrivacyPolicy from "./pages/Privacypolicy";

function App() {
  const [locale, setLocale] = useState(i18n.language);
  i18n.on("languageChanged", (lng) => setLocale(i18n.language));
  return (
    <Provider store={store}>
      <React.StrictMode>
        <Suspense fallback={<LoadingBox big />}>
          <Router>
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/faq" exact element={<Faq />} />
              <Route path="/privacy-policy" exact element={<PrivacyPolicy />} />
              <Route path="/terms-condition" exact element={<TermsCondition />} />
              <Route path="/join" exact element={<Join />} />
              <Route path="/join" exact element={<Join />} />
              <Route path="/forum" exact element={<Forum/>} />
              <Route
                path="/complete-registration"
                exact
                element={<CompleteRegistration />}
              />
              <Route path="/login" exact element={<Login />} />
              {/* <Route path="/popup-schrem" exact element={<PopupScherm/>} /> */}
              {/* <Route path="/cookies" exact element={<Cookies/>} /> */}
              <Route path="/register" exact element={<Register />} />
              <Route path="/reset-password" exact element={<ResetPassword />} />
              <Route path="/search" exact element={<SearchResult />} />
              <Route path="/contact" exact element={<Contact />} />
              <Route path="/favorites" exact element={<Favorites />} />
              <Route path="/contact-form" exact element={<ContactForm />} />
              <Route
                path="/register-project"
                exact
                element={<RegisterProject />}
              />
              <Route
                path="/my-applications"
                exact
                element={<MyApplications />}
              />
              <Route
                path="/saved-profiles"
                exact
                element={<SavedFreelancers />}
              />
              <Route
                path="/view-invitations"
                exact
                element={<ViewInvitations />}
              />
              <Route path="dashboard" element={<Dashboard />} />
              <Route
                path="/dashboard/assignement-alerts"
                exact
                element={<AssignementAlert />}
              />
              <Route
                path="/dashboard/my-assignement-alerts"
                exact
                element={<MyAssignementAlerts />}
              />
              <Route
                path="/dashboard/availability"
                exact
                element={<Availability />}
              />
              <Route
                path="/dashboard/notifications"
                exact
                element={<Notifications />}
              />
              <Route
                path="/dashboard/assignements"
                exact
                element={<Assignments />}
              />
              <Route
                path="/dashboard/preview-assignement"
                exact
                element={<SingleAssignement />}
              />
              <Route
                path="/dashboard/view-assignement"
                exact
                element={<SingleAssignement />}
              />
              <Route
                path="/dashboard/view-assignement/:id"
                exact
                element={<SingleAssignement />}
              />
              <Route
                path="/dashboard/single-assignement"
                exact
                element={<SingleAssignement />}
              />
              <Route
                path="/dashboard/place-call"
                exact
                element={<PlaceCall />}
              />
              <Route path="/dashboard/invoices" exact element={<TimeCards />} />
              <Route
                path="/dashboard/invoices-overview"
                exact
                element={<InvoicesOverview />}
              />
              <Route path="/dashboard/invite" exact element={<Invite />} />
              <Route
                path="/dashboard/organisaties"
                exact
                element={<Organisaties />}
              />
              <Route
                path="/dashboard/contracts"
                exact
                element={<Contracts />}
              />
              <Route
                path="/dashboard/timecards"
                exact
                element={<TimeCards />}
              />
              <Route path="/dashboard/settings" exact element={<Settings />} />
              <Route
                path="/dashboard/settings/profile/:id"
                exact
                element={<Profile />}
              />
              <Route
                path="/dashboard/settings/profile"
                exact
                element={<Profile />}
              />
              <Route
                path="/dashboard/settings/change-password"
                exact
                element={<ChangePassword />}
              />
              <Route
                path="/dashboard/settings/personal-information"
                exact
                element={<PersonalInformation />}
              />
              <Route
                path="/dashboard/settings/company-details"
                exact
                element={<CompanyDetails />}
              />
              <Route
                path="/dashboard/settings/competences"
                exact
                element={<Competences />}
              />
              <Route
                path="/dashboard/settings/documents"
                exact
                element={<Documents />}
              />
              <Route
                path="/dashboard/settings/credentials"
                exact
                element={<Credentials />}
              />
              <Route
                path="/dashboard/settings/work-experience"
                exact
                element={<WorkXP />}
              />
              <Route
                path="/dashboard/settings/organisation-data"
                exact
                element={<OrganasationData />}
              />
              <Route
                path="/dashboard/settings/locations"
                exact
                element={<Locations />}
              />
              <Route
                path="/dashboard/settings/accounts"
                exact
                element={<Accounts />}
              />
              <Route
                path="/dashboard/settings/create-user"
                exact
                element={<CreateUser />}
              />
              <Route
                path="/dashboard/settings/edit-additional-user"
                exact
                element={<EditAdditionalUser />}
              />
              <Route
                path="/dashboard/settings/manage-locations"
                exact
                element={<ManageLocations />}
              />
              <Route
                path="/dashboard/settings/hourly-rates"
                exact
                element={<HourlyRates />}
              />
              <Route
                path="/dashboard/settings/management"
                exact
                element={<Management />}
              />
              <Route
                path="/dashboard/settings/reserve"
                exact
                element={<Reserve />}
              />
            </Routes>
          </Router>
        </Suspense>
      </React.StrictMode>
    </Provider>
  );
}

export default App;

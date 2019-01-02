// Storage Controller
// Profile Controller
const ProfileCtrl = (function () {
  // profile constructor
  const Profile = function (name, age, gender, marital_status, education, experience, availableforwork, worklocation) {
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.marital_status = marital_status;
    this.education = education;
    this.experience = experience;
    this.availableforwork = availableforwork;
    this.worklocation = worklocation;
  }

})();
// UI Controller
const UICtrl = (function () {


})();
// App Controller
const App = (function (ProfileCtrl, UICtrl))
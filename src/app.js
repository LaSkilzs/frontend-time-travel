document.addEventListener('DOMContentLoaded', () => {
  getHelpwantedData();
})

// UI Vars
const switchhome = document.getElementById('home');
const switchwork = document.getElementById('findwork');
const switchprofile = document.getElementById('profile');

// Home State
const homeState = function (page) {
  document.querySelector('#title').textContent = 'Job Seekers';
  getIndustryData().then(industries => {
    let output = '';
    industries['data']['data'].forEach(function (industry) {

      output += showTopIndustry(industry['attributes'].name, industry['attributes'].availablejobs, industry['attributes'].image);

      imageOutput = industryimage(industry['attributes'].image);
      // debugger
      industry_list.push({
        "id": industry.id,
        "name": industry['attributes'].name,
        "availablejobs": industry['attributes'].availablejobs
      })
    });
    // debugger
    document.getElementById('content').innerHTML = imageOutput;
    document.getElementById('industrystandings').innerHTML = output;

  });
  getJobData().then(jobs => {
    let feature = '';
    jobs['data']['data'].forEach(function (job) {
      latest_jobs.push({
        "id": job.id,
        "title": job['attributes'].name,
        "industry": industry_list[job['attributes'].industry_id - 1].name,
        "description": job['attributes'].job_description
      });
    })

    feature = showFeatureJob(latest_jobs[0].title, latest_jobs[0].industry, latest_jobs[0].description);

    document.querySelector('.space-maker').innerHTML = feature;
    getFiveJobs();
  });
}

// Profile State
const profileState = function (page) {
  document.getElementById('title').textContent = 'Profile Page'

  getProfileData().then(profiles => {
    profile_list = profiles;
    let output = '';
    profiles['profiles']['data'].forEach(function (profile) {

      if ("1" === profile.id) {
        output = showProfileData(profile['attributes'].name, profile['attributes'].education, profile['attributes'].gender, profile['attributes'].experience, profile['attributes'].trade, profile['attributes'].availableforwork)
      }
    })
    document.getElementById('content').innerHTML = output;
  });

}

// WorkState
const workState = function (page) {
  document.getElementById('title').textContent = 'Help Wanted';

  getHelpwantedData().then(wantads => {
    let output = "";
    wantads['helpwanteds']['data'].forEach(function (wantad) {
      output += showHelpWantedData(wantad['attributes'].location, wantad['attributes'].female, wantad['attributes'].wage_per_week, wantad['attributes'].housing_offered, wantad['attributes'].image)
    })
    document.getElementById('content').innerHTML = output;
  });
}




// STATE MANAGEMENT FUNCTION
const PageState = function () {
  let currentState = new homeState(this);

  this.init = function () {
    this.change(new homeState);
  }
  this.change = function (state) {
    currentState = state;
  }
};

//  INSTANTIATE PAGESTATE
const page = new PageState();

// INITIALIZE FIRST PAGE
page.init();

// Event Listeners
// Home
switchhome.addEventListener('click', (e) => {
  page.change(new homeState);
  e.preventDefault();
})
// Find Work
switchwork.addEventListener('click', (e) => {
  page.change(new workState);

  e.preventDefault();
})
// Contact
switchprofile.addEventListener('click', (e) => {
  page.change(new profileState);
  e.preventDefault();
})

// GLOBAL DATA STORAGE VARIABLES
let wantads_list = new Array();
let latest_jobs = new Array();
let industry_list = new Array();
let profile_list = new Array();

//FETCH DATA FROM API
async function getHelpwantedData() {
  const response = await fetch('http://localhost:3000/api/v1/helpwanteds');
  const data = await response.json();
  return data;
}
async function getJobData() {
  const response = await fetch('http://localhost:3000/api/v1/jobs');
  const data = await response.json();
  return data;
}
async function getIndustryData() {
  const response = await fetch('http://localhost:3000/api/v1/industries');
  const data = await response.json();
  return data;
}
async function getFunFactData() {
  const response = await fetch('http://localhost:3000/api/v1/funfacts');
  const data = await response.json();
  return data;
}
async function getProfileData() {
  const response = await fetch('http://localhost:3000/api/v1/profiles');
  const data = await response.json();
  return data;
}
async function getApplicationData() {
  const response = await fetch('http://localhost:3000/api/v1/applications');
  const data = await response.json();
  return data;
}

// PROMISES FROM FETCH

getFunFactData().then(facts => {
  funfacts = new Array();
  let output = ''
  facts['data']['data'].forEach(function (fact) {
    funfacts.push({
      "id": fact.id,
      "fact": fact['attributes'].fact
    })
  });
  output = showFacts(funfacts[3].id, funfacts[8].fact);
  document.querySelector('.allfacts').innerHTML = output;
});
function showTopIndustry(name, availablejobs) {
  return (`

    <li class="list-group-item d-flex justify-content-between align-items-center">
      ${name}
      <span class="badge badge-primary badge-pill">${availablejobs}</span></li>
  `)
}
function industryimage(name, availablejobs, image) {
  return (`
  <div class="row">
    <div class="card col-5 mb-5">
      <img class="mt-5 pd-3" src="images/kindred.jpg" alt="" height: 100px;></img>
      <div class="card-body ">
        <h4 class="card-subtitle">Find Your Next GiG</h4>
        <button class="btn-success center ml-5 mt-5">apply today</button>
      </div>
    </div>
    <div class="card col-7 mb-5">
      <div class="card-body">
        <h4 class="text-center">Top Industry Openings:</h4>
        <ul id="industrystandings">
        </ul>
      </div>
    </div>
  </div>
  `)
}
function showFeatureJob(title, industry, description) {
  return (`
    <h3>Featured Jobs</h3>
      <div class="row card featured">
        <div class="card-body">
          <div class="">
            <h2>${title}</h2>
            <h5>${industry}</h5>
            <p>${description}</p>
          </div>
          <div class="float-right">
            <button class="btn-success">show</button>
            <button class="btn-primary">apply</button>
          </div>
        </div>
      </div>
  `)
}
function showRegularJob(title, industry, description) {
  return (`
  <div class="row card">
    <div class="card-body">
      <div class="">
        <h2>${title}</h2>
        <h4>${industry}</h4>
        <p>${description}</p>
      </div>
      <div class="float-right">
        <button class="btn-success">show</button>
        <button class="btn-primary">apply</button>
      </div>
    </div>
  </div>
  `)
}
function getFiveJobs() {
  let output = '';
  for (let i = 0; i < 5; i++) {
    output += showRegularJob(latest_jobs[i].title, latest_jobs[i].industry, latest_jobs[i].description)
  }
  document.querySelector('.employmentsection').innerHTML = output;
}
function getFiveHelpwanteds() {
  let output = '';
  helpwanted_list
  for (let i = 0; i < 5; i++) {
    output += showRegularJob(latest_jobs[i].title, latest_jobs[i].industry, latest_jobs[i].description)
  }
  // document.querySelector('.employmentsection').innerHTML = output;
}
function showHeaders(header) {
  return (`
    <div class="helpwanted">
      <h3>${header}</h3>
    </div>
  `)
}
function changeHeaders() {
  let output = '';
  output = showHeaders("Latest Jobs");
  document.querySelector('.title-changers').innerHTML = output;
}
function showFacts(id, fact) {
  return (`
    <div class="fact-header card-header">
      Fact #${id}
    </div>
    <div class="fact-body card-body">
      <blockquote class="blockquote mb-0">
            ${fact}
      </blockquote>
    </div>
  `)
}

function showHelpWantedData(location, female, wage_per_week, housing_offered, image) {
  return (`
 
    <div class="card col-12 mb-5">
      <div class="card-body">
        <h4>Workers Needed</h4>
        <ul>
          <li><span style="font-weight: bold;">Location:</span> ${location} </li>
          <li><span "font-weight: bold;">Female:</span> ${female} </li>
          <li "font-weight: bold;"><span>Wage per Week:</span> ${wage_per_week} </li>
          <li "font-weight: bold;"><span>Housing Offered:</span> ${housing_offered} </li>
        </ul>
        <div class="float-right">
          <button class="btn-success data-toggle="modal"
            data-target="#exampleModal2"">apply</button>
          <button class="btn-primary">show</button>
        </div>
      </div>
      </div>
    </div> 
  `)
}
function showProfileData(name, education, gender, experience, trade, availableforwork) {
  return (`
  <div class="row">
  <div class="card col-5  mb-3">
      <img class="m-5" src="images/avatar.png" alt="">
      <div class="card-body ">
      <h5 class="card-subtitle">${name}</h5>
      </div>
      </div>
      <div class="card col-7 mb-3">
      <div class="card-body">
      <h4 class="text-center">Work Experience:</h4>
      <br>
      <br>
        <ul>
          <li><span style="font-weight: bold;">Education:</span> ${education} </li>
          <li><span style="font-weight: bold;">Gender:</span> ${gender} </li>
          <li><span style="font-weight: bold;">Experience:</span>${experience} </li>
          <li style="font-weight: bold;"><span>Know Trade:</span> ${trade} </li>
          <li style="font-weight: bold;"><span>Available:</span> ${availableforwork} </li>
        </ul>
        <br>
        <br>
        <div class="float-right">
          <button class="btn-success">new</button>
          <button class="btn-primary">edit</button>
        </div>
      </div>
      </div>
    </div> 
    </div>
  `)
}

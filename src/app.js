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

  getIndustryData().then(function (result) {
    industryData(result.data.data);
  })
  getIndustryData().then(industries => {

    industries['data']['data'].forEach(function (industry) {
      industry_list.push({
        "id": industry.id,
        "name": industry['attributes'].name,
        "availablejobs": industry['attributes'].availablejobs
      })
    });
    // debugger
    return industryData(industry_list);
  });
  getJobData().then(jobs => {
    latest_jobs = new Array();
    let feature = '';
    let output = '';
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
  document.getElementById('content').innerHTML = `
  <div id="row" class="row">
      <div class="card col-5  mb-3">
      <img class="m-5" src="images/avatar.png" alt="">
      <div class="card-body ">
      <h5 class="card-subtitle">Name</h5>
      </div>
      </div>
      <div class="card col-7 mb-3">
      <div class="card-body">
      <h4 class="text-center">Work Experience:</h4>
    </div>`;
}
// WorkState
const workState = function (page) {
  document.getElementById('title').textContent = 'Help Wanted';
  getHelpwantedData().then(function (result) {
    wantadData(result.helpwanteds)
  });

}
getHelpwantedData().then(wantads => {
  wantads['helpwanteds']['data'].forEach(function (wantad) {
    wantads_list.push({
      'id': wantad.id,
      'location': wantad['attributes'].location,
      'female': wantad['attributes'].female,
      'wage_per_week': wantad['attributes'].wage_per_week,
      'housing_offered': wantad['attributes'].housing_offered,
      'image': wantad['attributes'].image,
      'job_id': wantad['attributes'].job_id,
      'industry_id': wantad['attributes'].industry_id,
      'profile_id': wantad['attributes'].profile_id
    })
  });
  return wantadData(wantads_list);
});
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
let job_list = new Array();
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
function industryimage(image) {
  return (`
  <div class="row">
    <div class="card col-4 mb-5">
      <img class="m-2" src="images/kindred.jpg" alt=""></img>
      <div class="card-body ">
        <h4 class="card-subtitle"> </h4>
      </div>
    </div>
    <div class="card col-8 mb-5">
      <div class="card-body">
        <h4>Top Industry Openings</h4>
        <ul>
           <li class="list-group-item d-flex justify-content-between align-items-center">
      ${name}
      <span class="badge badge-primary badge-pill">${availablejobs}</span></li>
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
            <button class="btn-primary">save</button>
            <button class="btn-danger">remove</button>
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
        <button class="btn-danger">remove</button>
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
function industryData(industry_list) {
  let output = '';

  industry_list.forEach(function (industry) {
    output += showTopIndustry(industry['attributes'].name, industry['attributes'].availablejobs, industry['attributes'].image)

  });

  document.getElementById('content').innerHTML = output;

}
function wantadData(wantads_list, id) {
  let output = '';
  for (var wantad in wantads_list) {
    if (id && id === wantads_list[id]) {
      output = showHelpWantedData(wantad.gender, wantad.age, wantad.hours, wantad.wage_per_week, wantad.environment, wantad.education, wantad.housing);
    } else {
      output = showHelpWantedData(wantad.gender, wantad.age, wantad.hours, wantad.wage_per_week, wantad.environment, wantad.education, wantad.housing);
    }
  }

  document.getElementById('content').innerHTML = output;
}
function showHelpWantedData(gender, age, hours, wage_per_week, environment, education, housing, image) {
  return (`
  <div class="row">
    <div class="card col-5 mb-5">
      <img class="m-2" src="images/railroad.jpeg"alt=""></img>
      <div class="card-body ">
        <h4 class="card-subtitle"> </h4>
      </div>
    </div>
    <div class="card col-7 mb-5">
      <div class="card-body">
        <h4>Workers Needed</h4>
        <ul>
          <li><span style="font-weight: bold;">Gender:</span> ${gender} </li>
          <li><span "font-weight: bold;">Age:</span> ${age} </li>
          <li><span "font-weight: bold;">Hours:</span>${hours} </li>
          <li "font-weight: bold;"><span>Wage per Week:</span> ${wage_per_week} </li>
          <li "font-weight: bold;"><span>Location:</span> ${environment} </li>
          <li "font-weight: bold;"><span>HS Diploma:</span> ${education} </li>
          <li><span "font-weight: bold;">Housing:</span> ${housing} </li>
        </ul>
        <div class="float-right">
          <button class="btn-success">apply</button>
          <button class="btn-primary">save</button>
        </div>
      </div>
      </div>
    </div> 
  `)
}

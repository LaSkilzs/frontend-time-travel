// ONLOAD
document.addEventListener('DOMContentLoaded', () => {
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
    changeHeaders();

  })
  getIndustryData().then(industries => {
    industry_list = new Array();
    let output = '';

    industries['data']['data'].forEach(function (industry) {
      output += showTopIndustry(industry['attributes'].name, industry['attributes'].availablejobs)

      industry_list.push({
        "id": industry.id,
        "name": industry['attributes'].name,
        "availablejobs": industry['attributes'].availablejobs
      })
    });
    document.getElementById('industrystandings').innerHTML = output;
  })
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
  })
});
// GET ALL DATA
async function getJobData() {
  const response = await fetch('http://localhost:3000/api/v1/jobs');
  const data = await response.json();
  return data;
}
async function getFunFactData() {
  const response = await fetch('http://localhost:3000/api/v1/funfacts');
  const data = await response.json();
  return data;
}
async function getIndustryData() {
  const response = await fetch('http://localhost:3000/api/v1/industries');
  const data = await response.json();
  return data;
}
async function getHelpwantedData() {
  const response = await fetch('http://localhost:3000/api/v1/helpwanteds');
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
// RETRIEVE DATA FROM PROMISES 
// getApplicationData().then(applications => {
//   apps = new Array();
//   applications['data']['data'].forEach(function (app) {
//     apps.push({
//       'id': app.id,
//       'profile_id': app['attributes'].profile_id, 'app_score': app['attributes'].app_score,
//       'worklocation': app['attributes'].worklocation
//     })
//   });
//   console.log(apps);
// })

// getProfileData().then(profiles => {
//   profilecard = new Array();
//   profiles["profiles"]["data"].forEach(function (profile) {
//     profilecard.push({
//       "id": profile.id,
//       "name": profile['attributes'].name,
//       "age": profile['attributes'].age,
//       "gender": profile['attributes'].gender,
//       "marital_status": profile['attributes'].marital_status,
//       "education": profile['attributes'].education,
//       "experience": profile['attributes'].experience,
//       "trade": profile['attributes'].trade,
//       "availableforwork": profile['attributes'].availableforwork
//     })
//   });
//   console.log(profilecard)
// })

// getHelpwantedData().then(helpwanteds => {
//   helpwanted_list = new Array();
//   helpwanteds['helpwanteds']['data'].forEach(function (helpwanted) {
//     helpwanted_list.push({
//       "id": helpwanted.id,
//       "location": helpwanted['attributes'].location,
//       "female": helpwanted['attributes'].female,
//       "wage_per_week": helpwanted['attributes'].wage_per_week,
//       "housing_offered": helpwanted['attributes'].housing_offered,
//       "job_id": helpwanted['attributes'].job_id,
//       "industry_id": helpwanted['attributes'].industry_id,
//       "profile_id": helpwanted['attributes'].profile_id
//     })
//   });
//   console.log(helpwanted_list)
// })


// HTML SHOW DATA INFO
function showTopIndustry(name, availablejobs) {
  return (`
    <li class="list-group-item d-flex justify-content-between align-items-center">
      ${name}
      <span class="badge badge-primary badge-pill">${availablejobs}</span></li>
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
            <button class="btn-danger">delete</button>
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
        <button class="btn-primary">save</button>
        <button class="btn-danger">delete</button>
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
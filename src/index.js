// ONLOAD
document.addEventListener('DOMContentLoaded', () => {

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

async function getProfileData() {
  const response = await fetch('http://localhost:3000/api/v1/profiles');
  const data = await response.json();
  return data;
}

async function getHelpwantedData() {
  const response = await fetch('http://localhost:3000/api/v1/helpwanteds');
  const data = await response.json();
  return data;
}

getHelpwantedData().then(helpwanteds => {
  helpwanted_list = new Array();

  helpwanteds['helpwanteds']['data'].forEach(function (helpwanted) {
    helpwanted_list.push(helpwanted['attributes'].location, helpwanted['attributes'].female, helpwanted['attributes'].wage_per_week, helpwanted['attributes'].housing_offered, helpwanted['attributes'].job_id, helpwanted['attributes'].industry_id, helpwanted['attributes'].profile_id)
  });
  console.log(helpwanted_list)
})

async function getIndustryData() {
  const response = await fetch('http://localhost:3000/api/v1/industries');
  const data = await response.json();
  return data;
}

getIndustryData().then(industries => {
  industry_list = new Array();
  industries['data']['data'].forEach(function (industry) {
    industry_list.push(industry['attributes'].name, industry['attributes'].summary)
  });
  console.log(industry_list)

})
// RETRIEVE DATA FROM PROMISES 

getJobData().then(jobs => {
  header = new Array();
  info = new Array();

  jobs['data']['data'].forEach(function (job) {
    header.push(job['attributes'].name, job['attributes'].industry_id, job['attributes'].job_description)
    info.push(job['attributes'].gender, job['attributes'].age, job['attributes'].high_hours_of_work, job['attributes'].start_avg_wage_per_week, job['attributes'].work_environment, job['attributes'].skill_level, job['attributes'].educated, job['attributes'].housing_offered)
  });
  console.log(header);
  console.log(info);
})

getFunFactData().then(facts => {
  funfacts = new Array();
  facts['data'].forEach(function (fact) {
    funfacts.push(fact.generation_id, fact.fact_length, fact.fact)
  });
  console.log(funfacts);
})

getProfileData().then(profiles => {
  profilecard = new Array();
  profiles["profiles"]["data"].forEach(function (profile) {
    profilecard.push(profile['attributes'].name, profile['attributes'].age, profile['attributes'].gender, profile['attributes'].marital_status, profile['attributes'].education)
  });
  console.log(profilecard)
})




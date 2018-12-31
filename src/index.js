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




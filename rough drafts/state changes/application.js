class Application {
  constructor(citizenship, parentunion, parenttrade, entreprenuership, workwithothers, monotoustask, worklifebalance, workenvironment, toomanyhours, worklocation) {
    this.citizenship = citizenship;
    this.parentunion = parentunion;
    this.parenttrade = parenttrade;
    this.entreprenuership = entreprenuership;
    this.workwithothers = workwithothers;
    this.monotoustask = monotoustask;
    this.worklifebalance = worklifebalance;
    this.workenvironment = workenvironment;
    this.toomanyhours = toomanyhours;
    this.worklocation = worklocation;
  }

  calculateQuiz() {
    let quiz_score = 0;
    this.keys.forEach(function (result) {
      if (result === true) {
        sum += Math.floor(Math.random() * (15 - 5) + 5);
      } else {
        sum += Math.floor(Math.random() * 5(5 - 0) + 5);
      }
    });
    return quiz_score;
  }

}
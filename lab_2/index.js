class NutritionCalculator {
  calculateRestingCalories(data) {
    if (data.gender === "male") {
      const calories = 10 * data.weight + 6.25 * data.height - 5 * data.age + 5;
      return calories;
    } else {
      const calories =
        10 * data.weight + 6.25 * data.height - 5 * data.age - 161;
      return calories;
    }
  }
  calculateDailyCalories(data) {
    const restingCalories = this.calculateRestingCalories(data);
    if (data.activity === "low") {
      return restingCalories * 1.4;
    } else if (data.activity === "moderate") {
      return restingCalories * 1.6;
    } else {
      return restingCalories * 1.75;
    }
  }
  calculateGoalCalories(data) {
    const dailyCalories = this.calculateDailyCalories(data);
    if (data.goal === "lose") {
      return dailyCalories * 0.9;
    } else if (data.goal === "maintain") {
      return dailyCalories * 1;
    } else {
      return dailyCalories * 1.1;
    }
  }
  calculateMacros(calories) {
    const proteins = (calories * 0.2) / 4;
    const fats = (calories * 0.3) / 9;
    const carbohydrates = (calories * 0.5) / 4;
    const pfc = {
      proteins,
      fats,
      carbohydrates,
    };
    return pfc;
  }
  calculate(data) {
    const calories = this.calculateGoalCalories(data);
    const macros = this.calculateMacros(calories);
    macros.calories = calories;
    return macros;
  }
}

const calculator = new NutritionCalculator();

const ageInput = document.querySelector("#age");
const heightInput = document.querySelector("#height");
const weightInput = document.querySelector("#weight");
const genderInput = document.querySelector("#gender");
const activityInput = document.querySelector("#activity");
const goalInput = document.querySelector("#goal");
const button = document.querySelector("#calculate");
const errorMessage = document.querySelector("#errorMessage");

const caloriesElement = document.querySelector("#caloriesResult");
const proteinsElement = document.querySelector("#proteinsResult");
const fatsElement = document.querySelector("#fatsResult");
const carbohydratesElement = document.querySelector("#carbohydratesResult");

button.addEventListener("click", function () {
  caloriesElement.textContent = "";
  proteinsElement.textContent = "";
  fatsElement.textContent = "";
  carbohydratesElement.textContent = "";
  if (
    ageInput.value === "" ||
    heightInput.value === "" ||
    weightInput.value === ""
  ) {
    errorMessage.textContent = "Заполните все поля!";
    return;
  } else {
    errorMessage.textContent = "";
  }
  const userData = {
    age: Number(ageInput.value),
    height: Number(heightInput.value),
    weight: Number(weightInput.value),
    gender: genderInput.value,
    activity: activityInput.value,
    goal: goalInput.value,
  };
  if (userData.age < 18) {
    errorMessage.textContent = "Возраст должен быть от 18 лет!";
    return;
  }
  if (userData.height <= 0) {
    errorMessage.textContent = "Введите корректный рост!";
    return;
  }
  if (userData.weight <= 0) {
    errorMessage.textContent = "Введите корректный вес!";
    return;
  }
  const result = calculator.calculate(userData);
  caloriesElement.textContent = result.calories.toFixed(1) + "калл";
  proteinsElement.textContent = result.proteins.toFixed(1) + "г";
  fatsElement.textContent = result.fats.toFixed(1) + "г";
  carbohydratesElement.textContent = result.carbohydrates.toFixed(1) + "г";
});

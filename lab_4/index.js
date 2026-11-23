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
const errorMessage = document.querySelector("#errorMessage");

const caloriesElement = document.querySelector("#caloriesResult");
const proteinsElement = document.querySelector("#proteinsResult");
const fatsElement = document.querySelector("#fatsResult");
const carbohydratesElement = document.querySelector("#carbohydratesResult");

function updateResults() {
  caloriesElement.textContent = "";
  proteinsElement.textContent = "";
  fatsElement.textContent = "";
  carbohydratesElement.textContent = "";

  if (ageInput.value === "") {
    errorMessage.textContent = "Введите возраст";
    return;
  }

  if (Number(ageInput.value) < 18) {
    errorMessage.textContent = "Возраст должен быть от 18 лет!";
    return;
  }

  if (heightInput.value === "") {
    errorMessage.textContent = "Введите рост";
    return;
  }

  if (Number(heightInput.value) <= 0) {
    errorMessage.textContent = "Введите корректный рост!";
    return;
  }

  if (weightInput.value === "") {
    errorMessage.textContent = "Введите вес";
    return;
  }

  if (Number(weightInput.value) <= 0) {
    errorMessage.textContent = "Введите корректный вес!";
    return;
  }
  if (genderInput.value === "") {
    errorMessage.textContent = "Выберите пол";
    return;
  }

  if (activityInput.value === "") {
    errorMessage.textContent = "Выберите активность";
    return;
  }

  if (goalInput.value === "") {
    errorMessage.textContent = "Выберите цель";
    return;
  }

  errorMessage.textContent = "";

  const userData = {
    age: Number(ageInput.value),
    height: Number(heightInput.value),
    weight: Number(weightInput.value),
    gender: genderInput.value,
    activity: activityInput.value,
    goal: goalInput.value,
  };

  const result = calculator.calculate(userData);

  caloriesElement.textContent = result.calories.toFixed(1) + " ккал";
  proteinsElement.textContent = result.proteins.toFixed(1) + " г";
  fatsElement.textContent = result.fats.toFixed(1) + " г";
  carbohydratesElement.textContent = result.carbohydrates.toFixed(1) + " г";
}

ageInput.addEventListener("input", updateResults);
heightInput.addEventListener("input", updateResults);
weightInput.addEventListener("input", updateResults);

genderInput.addEventListener("change", updateResults);
activityInput.addEventListener("change", updateResults);
goalInput.addEventListener("change", updateResults);

updateResults();

const showMacrosInput = document.querySelector("#showMacros");
const macroDetails = document.querySelector("#macroDetails");

function updateMacroVisibility() {
  macroDetails.hidden = !showMacrosInput.checked;
}

showMacrosInput.addEventListener("change", updateMacroVisibility);

updateMacroVisibility();

// Переходы
ageInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    heightInput.focus();
  }
});

heightInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    weightInput.focus();
  }
});

weightInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();

    genderInput.focus();

    if (typeof genderInput.showPicker === "function") {
      genderInput.showPicker();
    }
  }
});

genderInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    activityInput.focus();
  }
});

activityInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    goalInput.focus();
  }
});

// Собственный класс исключения
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

class NutritionCalculator {
  // Проверка возраста
  validateAge(age) {
    if (!Number.isFinite(age) || age < 18 || age > 123) {
      throw new ValidationError("Возраст должен быть от 18 до 123 лет!");
    }
  }

  // Проверка роста
  validateHeight(height) {
    if (!Number.isFinite(height) || height < 60 || height > 272) {
      throw new ValidationError("Рост должен быть от 60 до 272 см!");
    }
  }

  // Проверка веса
  validateWeight(weight) {
    if (!Number.isFinite(weight) || weight <= 0 || weight > 645) {
      throw new ValidationError(
        "Вес должен быть больше 0 и не превышать 645 кг!",
      );
    }
  }

  // Общая проверка данных
  validateData(data) {
    this.validateAge(data.age);
    this.validateHeight(data.height);
    this.validateWeight(data.weight);
  }

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
      return dailyCalories;
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
    this.validateData(data);

    const calories = this.calculateGoalCalories(data);
    const macros = this.calculateMacros(calories);

    macros.calories = calories;

    return macros;
  }
}

// Создание экземпляра калькулятора
const calculator = new NutritionCalculator();

// Поля ввода
const ageInput = document.querySelector("#age");
const heightInput = document.querySelector("#height");
const weightInput = document.querySelector("#weight");
const genderInput = document.querySelector("#gender");
const activityInput = document.querySelector("#activity");
const goalInput = document.querySelector("#goal");

const errorMessage = document.querySelector("#errorMessage");

// Поля результатов
const caloriesElement = document.querySelector("#caloriesResult");
const proteinsElement = document.querySelector("#proteinsResult");
const fatsElement = document.querySelector("#fatsResult");
const carbohydratesElement = document.querySelector("#carbohydratesResult");

// Обновление результатов
function updateResults() {
  caloriesElement.textContent = "";
  proteinsElement.textContent = "";
  fatsElement.textContent = "";
  carbohydratesElement.textContent = "";

  errorMessage.textContent = "";

  try {
    // Возраст
    if (ageInput.value === "") {
      errorMessage.textContent = "Введите возраст";
      return;
    }

    calculator.validateAge(Number(ageInput.value));

    // Рост
    if (heightInput.value === "") {
      errorMessage.textContent = "Введите рост";
      return;
    }

    calculator.validateHeight(Number(heightInput.value));

    // Вес
    if (weightInput.value === "") {
      errorMessage.textContent = "Введите вес";
      return;
    }

    calculator.validateWeight(Number(weightInput.value));

    // Пол
    if (genderInput.value === "") {
      errorMessage.textContent = "Выберите пол";
      return;
    }

    // Активность
    if (activityInput.value === "") {
      errorMessage.textContent = "Выберите активность";
      return;
    }

    // Цель
    if (goalInput.value === "") {
      errorMessage.textContent = "Выберите цель";
      return;
    }

    // Подготовка данных
    const userData = {
      age: Number(ageInput.value),
      height: Number(heightInput.value),
      weight: Number(weightInput.value),
      gender: genderInput.value,
      activity: activityInput.value,
      goal: goalInput.value,
    };

    // Расчёт
    const result = calculator.calculate(userData);

    // Отображение результатов
    caloriesElement.textContent = result.calories.toFixed(1) + " ккал";

    proteinsElement.textContent = result.proteins.toFixed(1) + " г";

    fatsElement.textContent = result.fats.toFixed(1) + " г";

    carbohydratesElement.textContent = result.carbohydrates.toFixed(1) + " г";
  } catch (error) {
    // Обработка ошибок ввода
    if (error instanceof ValidationError) {
      errorMessage.textContent = error.message;
    } else {
      // Не скрываем непредвиденные ошибки программы
      throw error;
    }
  }
}

// Слушатели изменения числовых полей
ageInput.addEventListener("input", updateResults);
heightInput.addEventListener("input", updateResults);
weightInput.addEventListener("input", updateResults);

// Слушатели изменения списков
genderInput.addEventListener("change", updateResults);
activityInput.addEventListener("change", updateResults);
goalInput.addEventListener("change", updateResults);

// Начальное обновление
updateResults();

// Управление отображением БЖУ
const showMacrosInput = document.querySelector("#showMacros");
const macroDetails = document.querySelector("#macroDetails");

function updateMacroVisibility() {
  macroDetails.hidden = !showMacrosInput.checked;
}

showMacrosInput.addEventListener("change", updateMacroVisibility);

updateMacroVisibility();

// Переходы между полями по Enter
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

class Student {
  constructor(name, age, averageScore, isBudget) {
    this.name = name;
    this.age = age;
    this.averageScore = averageScore;
    this.isBudget = isBudget;
  }
  introduce() {
    console.log(this.name, this.age, this.averageScore, this.isBudget);
  }
}
const students = [
  new Student("Никита", 22, 4.7, true),
  new Student("Анна", 20, 4.9, false),
  new Student("Олег", 21, 3.8, true),
  new Student("Мария", 19, 4.5, true),
  new Student("Саня", 23, 4.2, false),
  new Student("Дмитрий", 20, 3.6, true),
  new Student("Екатерина", 22, 4.8, false),
  new Student("Александр", 21, 4.1, true),
  new Student("Виктория", 19, 4.9, true),
  new Student("Иван", 23, 3.5, false),
  new Student("Анастасия", 20, 4.5, false),
  new Student("Максим", 22, 4.0, true),
  new Student("Полина", 21, 4.7, false),
  new Student("Артём", 19, 3.9, true),
  new Student("София", 23, 4.8, true),
];

function showStudents(students) {
  for (const student of students) {
    student.introduce();
  }
}

function createJsonFile(data) {
  const json = JSON.stringify(data, null, 2);

  const file = new Blob([json], {
    type: "application/json",
  });

  return file;
}

function addDownloadLink(data, filename) {
  const file = createJsonFile(data);
  const url = URL.createObjectURL(file);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  link.textContent = "Скачать " + filename;

  link.style.display = "block";
  link.style.marginBottom = "12px";

  document.body.append(link);
}

// Cначала бюджетники, а потом по баллу
const byBudgetAndScore = students.toSorted((a, b) => {
  const budgetDiff = b.isBudget - a.isBudget;

  if (budgetDiff !== 0) {
    return budgetDiff;
  }

  return b.averageScore - a.averageScore;
});

// По возрасту
const byAge = students.toSorted((a, b) => a.age - b.age);

// По имени
const byName = students.toSorted((a, b) => a.name.localeCompare(b.name, "ru"));

// По среднему баллу
const byScore = students.toSorted((a, b) => b.averageScore - a.averageScore);

addDownloadLink(byAge, "students-by-age.json");
addDownloadLink(byName, "students-by-name.json");
addDownloadLink(byScore, "students-by-score.json");
addDownloadLink(byBudgetAndScore, "students-by-BudgetAndScore.json");
console.log("Сортировка по бюджету и баллу:");
showStudents(byBudgetAndScore);

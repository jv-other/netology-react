/**
 * Пройденные километры за день
 */
class Step {

  constructor(id = null, date, distance = 0) {
    this.id = id || crypto.randomUUID();
    this.date = date;
    this.distance = distance;
  }

  add(step) {
    this.distance += step.distance;
    return this;
  }

  update(step) {
    this.distance = step.distance;
    return this;
  }

}

/**
 * Учетные данные тренировок
 */
class StepsRepository {

  constructor() {
    this.steps = [];
  }

  // список
  list() {
    return this.steps;
  }

  // получение записи по id
  get(id) {
    return this.steps.find(step => id === step.id);
  }

  // поиск записи по дате
  find(date) {
    return this.steps.find(step => +date === +step.date);
  }

  // изменить количество пройденных километров за дату
  update(step) {
    return this.get(step.id).update(step);
  }

  // удалить запись по id
  remove(id) {
    const index = this.steps.findIndex(step => id === step.id);
    return (-1 < index) ? this.steps.splice(index, 1) : [];
  }

  // если запись с переданным id существует - обновление данных
  // если запись с заданной датой существует - данные суммируются
  // иначе запись добавляется
  addOrUpdate(newStep) {
    let step = null;
    if (step = this.get(newStep.id)) {
      return step.update(newStep);
    }
    if (step = this.find(newStep.date)) {
      return step.add(newStep);
    }
    return this.__add(newStep);
  }

  __sort() {
    this.steps.sort((a, b) => a.date < b.date ? 1 : -1);
  }

  __add(step) {
    this.steps = this.steps.concat(step);
    this.__sort();
    return step;
  }

}

export { StepsRepository as default, Step };
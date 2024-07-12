function createElement(html) {
  const element = document.createElement("div");
  element.insertAdjacentHTML("beforeend", html);
  return element.firstElementChild;
}

class Passengers {
  _state = {
    allPassengers: 0,
    counters: {},
  };

  constructor(Counter) {
    this._Counter = Counter;
    this._data = ["Adult (16-59)", "Infant (0-2)", "Senior (60+)", "Children (3-15)"];
    this._init();
  }

  _init() {
    this._element = createElement(this._getTemplate());
    this._setStateCountersStart();
    this._render();
  }

  _getTemplate() {
    return `<div class="passengers">
        <span class="passengers__title">All passengers: "${this._state.allPassengers}"</span>
        <div class="passengers__counters"></div>
      </div>`;
  }

  _setStateAllPassengersHandler(id, value) {
    this._setStateCounters(id, value);
    this._setStateAllPassengers(this._getTotalCounters())
    this._render();
  }

  _setStateAllPassengers(value) {
    this._state.allPassengers = value;
  }

  // value - сколько накликали в счетчике
  _setStateCounters(id, value) {
    this._state.counters[id] = value;
  }

  _setStateCountersStart() {
    this._data.forEach((item, i) => {
      this._setStateCounters(i, 0);
    });
    // console.log(this._state.counters);
  }

  _getTotalCounters() {
    return Object.values(this._state.counters).reduce((acc, item) => {
      return acc + item;
    }, 0);
  }

  _generateCounters() {
    // _generateCounters должен возвратить массив счетчиков
    return this._data.map((title, id) => {
      const number = this._state.counters[id];
      return new this._Counter(title, number, id, this._setStateAllPassengersHandler.bind(this)).element;
    });
  }

  _render() {
    this._element.querySelector(".passengers__counters").textContent = "";
    this._element.querySelector(".passengers__counters").append(...this._generateCounters());
    this._element.querySelector(".passengers__title").textContent = `All passengers: ${this._state.allPassengers}`;
  }

  get element() {
    return this._element;
  }
}

class Counter {
  constructor(title, number, id, setStateAllPassengersHandler) {
    this._title = title;
    this._number = number;
    this._setStateAllPassengersHandler = setStateAllPassengersHandler;
    this._id = id;
    this._init();
  }

  _init() {
    this._element = createElement(this._getTemplate());
    this._addListeners();
    this._render();
  }

  _getTemplate() {
    return `<div class="counter">
            <span class="counter__title">${this._title}</span>
            <div class="counter__control">
              <button class="btn btn--minus" ${this._number === 0 ? "disabled" : ""}>-</button>
              <input class="input input--counter" value="${this._number}" />
              <button class="btn btn--plus">+</button>
            </div>
          </div>`;
  }

  _addListeners() {
    this._element.querySelector(".btn--minus").addEventListener("click", () => {
      if (this._number - 1 < 0) {
        return;
      }

      this._setStateAllPassengersHandler(this._id, this._number - 1);
    });

    this._element.querySelector(".btn--plus").addEventListener("click", () => {
      this._setStateAllPassengersHandler(this._id, this._number + 1);
    });
  }

  _render() {
    this._element.querySelector(".input--counter").value = this._number;
    // if (this._number === 0) {
    //   this._element.querySelector(".btn--minus").setAttribute("disabled","disabled")
    // } else {
    //   this._element.querySelector(".btn--minus").removeAttribute("disabled")
    // }
  }

  get element() {
    return this._element;
  }
}

const root = document.querySelector(".root");
root.insertAdjacentElement("beforeend", new Passengers(Counter).element);

// const arr = [10, 20, 30];

// const result = arr.reduce((acc, item) => {
//   return acc + item
// }, 0)

// console.log(result);

// const names = ['Ivan', "Mary", 'Garry'];
// const result = names.reduce((acc,item) => {
//   return acc + item
// }, "")
// console.log(result);

// const names = {
//   35665: "Ivan",
//   345: "Mary",
//   47: "Garry",
// };

// const result = Object.keys(names).reduce((acc, id) => {
//   return acc + id
// },0)

// console.log(result);

// const arr = [
//   {
//     id: 3425,
//     name: 'Ivan',
//     money: 10000
//   },
//   {
//     id: 345,
//     name: 'Ivan2',
//     money: 20000
//   }
// ]

// const result = arr.reduce((acc, worker) => {
//   return acc + worker.money
// }, 0)

// console.log(result);
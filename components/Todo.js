class Todo {
  constructor(data, selector, handleCheck, handleDelete) {
    this._completed = data.completed;
    this._date = data.date;
    this._id = data.id;
    this._name = data.name;
    this._total = data.length;
    this._templateElement = document.querySelector(selector);
    this._handleCheck = handleCheck;
    this._handleDelete = handleDelete;
  }

  _setEventListeners() {
    this.todoCheckboxEl.addEventListener("change", () => {
      this._completed = !this._completed;
      this._handleCheck(this._completed);
    });

    this._todoDeleteBtn.addEventListener("click", () => {
      if (this.todoCheckboxEl.checked) {
        this._completed = !this._completed;
        this._handleCheck(this._completed);
      }
      this._todoElement.remove();
      this._handleDelete(this._completed);
    });
  }

  _generateDueDate() {
    this.dueDate = new Date(this._date);
    this.todoDate = this._todoElement.querySelector(".todo__date");
    if (!isNaN(this.dueDate)) {
      this.todoDate.textContent = `Due: ${this.dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }
  }

  _generateCheckboxEl() {
    this.todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this.todoLabel = this._todoElement.querySelector(".todo__label");
    this.todoCheckboxEl.checked = this._completed;
    this.todoCheckboxEl.id = `todo-${this._id}`;
    this.todoLabel.setAttribute("for", `todo-${this._id}`);
  }

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    const todoNameEl = this._todoElement.querySelector(".todo__name");
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");

    todoNameEl.textContent = this._name;

    this._generateCheckboxEl();
    this._generateDueDate();
    this._setEventListeners();

    return this._todoElement;
  }
}

export default Todo;
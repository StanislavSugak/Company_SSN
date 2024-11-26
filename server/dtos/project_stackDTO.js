class ProjectStackDTO {
    constructor({ id_project, id_stack, count_required }) {
        this.id_project = id_project;
        this.id_stack = id_stack;
        this.count_required = count_required;
    }

    validate() {
        // Пример валидации
        if (this.id_project === undefined || this.id_project === null) {
            throw new Error('id_project is required');
        }
        if (this.id_stack === undefined || this.id_stack === null) {
            throw new Error('id_stack is required');
        }
        if (this.count_required === undefined || this.count_required === null) {
            throw new Error('count_required is required');
        }
        if (typeof this.count_required !== 'number' || isNaN(this.count_required)) {
            throw new Error('count_required must be a number');
        }
        // Добавьте другие проверки по мере необходимости
    }
}

module.exports = ProjectStackDTO; // Экспортируем класс
export class garage {
  get addCarButton() {
    return cy.get(".panel-page .btn-primary");
  }
  get addButton() {
    return cy.get(".modal-footer .btn-primary");
  }
  get addFuelExpenseButtonForNewlyAdded() {
    return cy.get(".car_add-expense.btn-success");
  }
}

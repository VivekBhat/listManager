var app = angular.module('shoppingList', ["ui.bootstrap", "ngStorage"]);

app.controller('ShoppingListCtrl', function() {    
  vm = this;
  vm.currentListIndex = 0;
  vm.totalLists = 1;  

  console.log("ShoppingListCtrl");
  
});
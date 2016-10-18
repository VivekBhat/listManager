var app = angular.module('shoppingList', ["ui.bootstrap", "ngStorage"]);

app.controller('ShoppingListCtrl', function() {    
  
  vm = this;
  
  // define properties
  vm.currentListIndex = 0;
  vm.totalLists = 1;  

  // define models
  var List = function(){
      this.name = null;
      this.listItems = [];
  };
  
  var ListItem = function(name, index){
      this.name = name;
      this.complete = false;
      this.mode = "view";
      this.index = index;
  };  

  // create a dummy list with some data
  vm.currentList = new List();
  vm.currentList.name = "Dummy List";
  vm.currentList.listItems.push(new ListItem("zero", 0));
  vm.currentList.listItems.push(new ListItem("one", 1));
  vm.currentList.listItems.push(new ListItem("two", 2));
  vm.currentList.listItems.push(new ListItem("three", 3));
  
});
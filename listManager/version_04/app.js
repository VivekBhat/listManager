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

  List.prototype.addItem = function(itemName){    
    this.listItems.push(new ListItem(itemName, this.listItems.length));
    vm.newItem = "";
    console.log("Adding", this);
  };
  
  var ListItem = function(name, index){
      this.name = name;
      this.completed = false;
      this.mode = "view";
      this.index = index;              
  };

  // we use prototypes because it exist only 1 time opposed to a function on the object that would exist for each instance 
  ListItem.prototype.complete = function(){
    this.completed = !this.completed;
    console.log("Completing", this);
  };

  ListItem.prototype.edit = function(){
    this.mode = 'edit';
    this.originalName = this.name;
    console.log("Editing", this);
  };

  ListItem.prototype.delete = function(){
    console.log("Deleting", this);
  };

  ListItem.prototype.save = function(){
    this.mode = 'view';
    console.log("Saving", this);
  };

  ListItem.prototype.cancel = function(){
    this.mode = 'view';
    this.name = this.originalName;
    console.log("Canceling", this);
  };

  // create a dummy list with some data
  vm.currentList = new List();
  vm.currentList.name = "Dummy List";
  vm.currentList.listItems.push(new ListItem("zero", 0));
  vm.currentList.listItems.push(new ListItem("one", 1));
  vm.currentList.listItems.push(new ListItem("two", 2));
  vm.currentList.listItems.push(new ListItem("three", 3));
});

// Helper Directive
app.directive('ngEnter', function() {
  return function(scope, element, attrs) {
    element.bind("keydown keypress", function(event) {
      if(event.which === 13) {
        scope.$apply(function(){
          scope.$eval(attrs.ngEnter);
        });
        event.preventDefault();
      }
    });
  };
});
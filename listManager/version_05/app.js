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
  };

  List.prototype.delete = function(){
    vm.currentList.name = null;
    vm.currentList.listItems = [];
  }
  
  var ListItem = function(name, index){
      this.name = name;
      this.completed = false;
      this.mode = "view";
      this.index = index;              
  };

  // we use prototypes because it exist only 1 time opposed to a function on the object that would exist for each instance 
  ListItem.prototype.complete = function(){
    this.completed = !this.completed;
  };

  ListItem.prototype.edit = function(){
    this.mode = 'edit';
    this.originalName = this.name;
  };

  ListItem.prototype.delete = function(){    
    var currentList = vm.currentList;

    // remove the item from the list
    currentList.listItems.splice(this.index, 1);
    
    // reset the list item indexes
    for(var i = 0; i < currentList.listItems.length; i++){
      currentList.listItems[i].index = i;
    }
  };

  ListItem.prototype.save = function(){
    this.mode = 'view';    
  };

  ListItem.prototype.cancel = function(){
    this.mode = 'view';
    this.name = this.originalName;
  };

  // create a dummy list with some data
  vm.currentList = new List();
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
var app = angular.module('shoppingList', ["ui.bootstrap", "ngStorage"]);

app.controller('ShoppingListCtrl', function($localStorage) {    
  
  vm = this;
  
  // define properties
  vm.currentListIndex = 0;
  vm.totalLists = 1;  

  var saveList = function(){
    $localStorage.allLists[vm.currentListIndex] = vm.currentList;
    vm.totalLists = $localStorage.allLists.length;
  };

  // define models
  var List = function(data){
    
    // defaults
    this.name = null;
    this.listItems = [];

    if(angular.isDefined(data))
    {
      if(angular.isDefined(data.name)){
        this.name = data.name;  
      }

      if(angular.isDefined(data.listItems)){
        for(var i = 0; i < data.listItems.length; i++){          
          this.listItems.push(new ListItem(data.listItems[i]));            
        }
      }
    }        
  };

  List.prototype.addItem = function(itemName){
    var data = {
      name: itemName,
      index: this.listItems.length 
    };

    this.listItems.push(new ListItem(data));
    vm.newItem = "";
    saveList();    
  };

  List.prototype.delete = function(){        

    $localStorage.allLists.splice(vm.currentListIndex, 1);
    vm.totalLists--;

    // go to previous list unless it is the first then go to the next list
    if(vm.currentListIndex > 0){
      vm.currentListIndex--; 
    }
    
    // show the next / previous list or create a new list
    if(vm.totalLists > 0)
    {
      vm.currentList = new List($localStorage.allLists[vm.currentListIndex]);  
    }
    else
    {
      vm.currentList = new List(); 
    }
        
    saveList();    
  };
  
  var ListItem = function(data){
    
    // defaults  
    this.name = null;
    this.completed = false;
    this.mode = "view";
    this.index = 0;

    if(angular.isDefined(data))
    {
      if(angular.isDefined(data.name)){
        this.name = data.name;
      }

      if(angular.isDefined(data.completed)){
        this.completed = data.completed;
      }

      if(angular.isDefined(data.mode)){
        this.mode = data.mode;
      }

      if(angular.isDefined(data.index)){
        this.index = data.index;              
      }
    }    
  };

  // we use prototypes because it exist only 1 time opposed to a function on the object that would exist for each instance 
  ListItem.prototype.complete = function(){
    this.completed = !this.completed;
    saveList();
  };

  ListItem.prototype.edit = function(){
    this.mode = 'edit';
    this.originalName = this.name;
    saveList();
  };

  ListItem.prototype.delete = function(){    
    var currentList = vm.currentList;

    // remove the item from the list
    currentList.listItems.splice(this.index, 1);
    
    // reset the list item indexes
    for(var i = 0; i < currentList.listItems.length; i++){
      currentList.listItems[i].index = i;
    }
    saveList();
  };

  ListItem.prototype.save = function(){
    this.mode = 'view';
    saveList();    
  };

  ListItem.prototype.cancel = function(){
    this.mode = 'view';
    this.name = this.originalName;
    saveList();
  };

  // check local storage for the currentList
  if(angular.isUndefined($localStorage.allLists)){
    $localStorage.allLists = [];  
    vm.currentList = new List();
  }
  else{
    vm.currentList = new List($localStorage.allLists[0]);
  }
  vm.totalLists = $localStorage.allLists.length;

  vm.addList = function(){    
    $localStorage.allLists.push(vm.currentList);
    vm.currentList = new List();
    vm.currentListIndex++;
    vm.totalLists++;
  }; 

  vm.nextList = function(){
    vm.currentListIndex++;
    vm.currentList = new List($localStorage.allLists[vm.currentListIndex]);
  };

  vm.prevList = function(){
    vm.currentListIndex--;
    vm.currentList = new List($localStorage.allLists[vm.currentListIndex]);
  };
    
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
(function(window) {
    'use strict';

    function Controller(storage, template) {
        this.bindEvents();
        this.storage = storage;
        this.template = template;
        this.ul = document.getElementById("todo-list");
        this.entry = document.getElementById("todo-entry");
        this.showList();
        this.storage.storeOld();
        this.validationRules = {
            listLength: 10,
            entryLength: 120
        }
    }
    Controller.prototype = {
        bindEvents: function() {
            var self = this;

            //Adding element by enter
            document.getElementById("todo-entry").addEventListener("keypress", function(e) {
                if (e.keyCode === 13) {
                    self.addItem();
                }
            });

            //Adding element by button click
            document.getElementById("todo-add").addEventListener("click", function(e) {
                self.addItem();
            });

            //Sorting list
            document.getElementById("todo-sort").addEventListener("click", self.sortList());

            //Clear the complete list
            document.getElementById("todo-clear").addEventListener("click", self.clearList());

            //Reset the checked items in the list
            document.getElementById("todo-reset").addEventListener("click", self.resetList());

            //Delete the items
            document.querySelector('body').addEventListener('click', self.deleteItem());

            //update item
            document.querySelector('ul').addEventListener("click", self.updateItem());

            //undo the action
            document.getElementById("todo-undo").addEventListener('click', self.undoAction());
        },

        sortList: function() {
            var self = this;
            return function() {
                self.storage.sortList();
                self.showList();
            }
        },

        addItem: function() {
            var self = this;

            if (self.isValid()) {
                var timeId = new Date().getTime();
                var itemData = {
                    id: timeId,
                    value: self.entry.value,
                    checked: false
                }

                self.storage.addItem(itemData);
                self.showList();
                self.entry.value = "";
            }
        },

        updateItem: function() {
            var self = this;
            return function(e) {
                if (e.target.getAttribute("class") === "todo-item-checkbox") {
                    self.storage.updateItem(e.target.value, e.target.checked);
                }
            }
        },

        showList: function() {
            var self = this;
            self.ul.innerHTML = self.template.showList(self.storage.getData().todos);
        },

        deleteItem: function() {
            var self = this;
            return function(e) {
                if (e.target.tagName.toLowerCase() === 'a') {
                    e.preventDefault();
                    self.storage.removeItem(e.target.getAttribute("data-id"));
                    self.showList();
                }
            }
        },

        //Function to validate 
        isValid: function() {
            var self = this;
            if (self.entry.value === "") {
                document.getElementById("emptyError").style.display = "block";
                return false;
            }
            if (self.entry.value.length > self.validationRules.entryLength) {
                document.getElementById("entryLengthError").style.display = "block";
                return false;
            }
            if (self.ul.children.length >= self.validationRules.listLength) {
                document.getElementById("lengthError").style.display = "block";
                return false;
            }

            self.resetErrors();
            return true;
        },

        resetList: function() {
            var self = this;
            return function() {
                self.storage.reset();
                self.showList();
            }
        },

        //Clear all the items 
        clearList: function() {
            var self = this;
            return function(e) {
                self.storage.clearAll();
                self.resetErrors();
                self.showList();

            }
        },

        resetErrors: function() {
            var children = document.getElementById("todo-validationmsgs").children;
            for (var i = 0; i < children.length; i++) {
                if (children[i].tagName.toLowerCase() === 'p') {
                    children[i].style.display = "none";
                }
            }
        },

        undoAction: function() {
            var self = this;
            return function(e) {
                self.storage.undo();
                self.showList();
            }
        }

    }
    window.app = window.app || {};
    window.app.Controller = Controller;
})(window);
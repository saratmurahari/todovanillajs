(function(window) {
    'use strict';

    function Store(name) {
        this.appname = name;
        this.oldValue={
        	todos:[]
        };
        if (!localStorage[name]) {
            var data = {
                todos: []
            };

            localStorage[name] = JSON.stringify(data);
        }
    }

    Store.prototype.storeOld = function() {
    	var data = JSON.parse(localStorage[this.appname]);
    	this.oldValue=data;
    }

    Store.prototype.addItem = function(itemData) {
    	this.storeOld();
        var data = JSON.parse(localStorage[this.appname]);
        data.todos.push(itemData);
        localStorage[this.appname] = JSON.stringify(data);
    }
    Store.prototype.sortList = function(itemData) {
    	this.storeOld();
        var data = JSON.parse(localStorage[this.appname]);
        data.todos = data.todos.reverse();
        localStorage[this.appname] = JSON.stringify(data);
    }

    Store.prototype.updateItem = function(id, checked) {
    	this.storeOld();
        var data = JSON.parse(localStorage[this.appname]);
        for (var i = 0; i < data.todos.length; i++) {
            if (id === data.todos[i].id.toString()) {
                data.todos[i].checked = checked;
                localStorage[this.appname] = JSON.stringify(data);
                break;
            }
        }
        localStorage[this.appname] = JSON.stringify(data);

    }

    Store.prototype.getData = function() {
        return JSON.parse(localStorage[this.appname]);
    }

    Store.prototype.reset = function() {
    	this.storeOld();
        var data = JSON.parse(localStorage[this.appname]);
        for (var i = 0; i < data.todos.length; i++) {
            data.todos[i].checked = false;
        }
        localStorage[this.appname] = JSON.stringify(data);
    }

    Store.prototype.clearAll = function() {
    	this.storeOld();
        var data = JSON.parse(localStorage[this.appname]);
        data.todos.splice(0, data.todos.length);
        localStorage[this.appname] = JSON.stringify(data);
    }

    Store.prototype.removeItem = function(id) {
    	this.storeOld();
        var data = JSON.parse(localStorage[this.appname]);
        for (var i = 0; i < data.todos.length; i++) {
            if (id === data.todos[i].id.toString()) {
                data.todos.splice(i, 1);
                localStorage[this.appname] = JSON.stringify(data);
                break;
            }
        }

    }

    Store.prototype.undo=function(){
    	localStorage[this.appname]=JSON.stringify(this.oldValue);
    }

    window.app = window.app || {};
    window.app.Store = Store;
})(window);
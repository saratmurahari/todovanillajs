(function() {
    'use strict';

    function Todo(name) {
        this.storage = new app.Store(name);
        this.template = new app.Template();
        this.controller = new app.Controller(this.storage,this.template);
    }

    var todo = new Todo("todoapp");
})();



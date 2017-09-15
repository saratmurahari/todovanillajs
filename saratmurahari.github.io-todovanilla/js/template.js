(function(window) {
    'use strict';

    function Template() {
        this.defaultTemplate = '<li id="{{timeid}}">' +
            '<div class="todo-listitemleft">' +
            '<input type="checkbox"  class="todo-item-checkbox" {{checked}} value="{{timeid}}"/> ' +
            '<span class="todo-task">{{itemvalue}}</span>' +
            '</div>' +
            '<div class="todo-listitemright">' +
            '<a href="#" data-id="{{timeid}}" class="todo-remove">Delete</a>' +
            '</div>' +
            '</li>';
    }

    Template.prototype.showList = function(data) {
        var len = data.length,view="";
        for (var i = 0; i < len; i++) {
            var template = this.defaultTemplate;
            var checked = '';

            if (data[i].checked) {
                checked = 'checked';
            }

            template = template.replace(/{{timeid}}/g, data[i].id);
            template = template.replace('{{itemvalue}}', data[i].value);
            template = template.replace('{{checked}}', checked);
            view = view +template;
        }
        return view;
    }
    window.app = window.app || {};
    window.app.Template = Template;
})(window);
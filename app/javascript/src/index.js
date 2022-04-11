import $ from 'jquery';

import {
    indexTasks,
    postTask,
    changeStatus,
    deleteTask
} from './requests.js';

indexTasks(function (response) {
    var htmlString = response.tasks.map(function(task) {
        return "<div class='col-12 mb-3 task d-flex align-items-center' data-id='" + task.id + "' data-completed='" + task.completed + "'>\
                    <span>" + task.content + "</span>\
                    <button class='btn completed_btn' data-action='mark_complete'><i class='fa-solid fa-check'></i></button>\
                    <button class='btn active_btn' data-action='mark_active'><i class='fa-solid fa-rotate-left'></i></button>\
                    <button class='btn delete_btn' data-action='delete'><i class='fa-solid fa-xmark'></i></button>\
                </div>";
    });

    $('#tasks').html(htmlString);
});

$(document).on('click', 'button:not([type=submit])', function(e) {

    var action = $(e.currentTarget).data('action');
    var target = e.currentTarget.closest('.task');
    var id  = $(target).data('id');

    if (action == 'mark_complete' || action == 'mark_active') {
        changeStatus(id, action, function() {
            var status = $(target).data('completed');
            $(target).attr('data-completed', !status);
        });
    } else if (action == 'delete') {
        deleteTask(id, function() {
            $(target).fadeOut(500);
            setTimeout(() => $(target).detach(), 500);
        });
    }

});

$(document).on('submit', 'form', function(e) {
    console.log('test');
    e.preventDefault();

    var content = $('#addTask').val();

    postTask(content, function(response) {
        console.log(response);
        $('#tasks').append("<div class='col-12 mb-3 task d-flex align-items-center' data-id='" + response.task.id + "' data-completed='" + response.task.completed + "'>\
                                <span>" + response.task.content + "</span>\
                                <button class='btn completed_btn' data-action='mark_complete'><i class='fa-solid fa-check'></i></button>\
                                <button class='btn active_btn' data-action='mark_active'><i class='fa-solid fa-rotate-left'></i></button>\
                                <button class='btn delete_btn' data-action='delete'><i class='fa-solid fa-xmark'></i></button>\
                            </div>");
    });

    $('#addTask').val('');
});
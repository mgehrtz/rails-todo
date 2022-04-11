import $ from 'jquery';

import {
    indexTasks,
    postTask,
    changeStatus,
    deleteTask
} from './requests.js';

indexTasks(function (response) {
    var htmlString = response.tasks.map(function(task) {

        var completedClass = '';
        
        if (task.completed) {
            completedClass = 'completed';
        }

        return "<div class='col-12 mb-3 task d-flex align-items-center " + completedClass + "' data-id='" + task.id + "'>\
                    <span>" + task.content + "</span>\
                    <button class='btn completed_btn' data-action='mark_complete'><i class='fa-solid fa-check'></i></button>\
                    <button class='btn active_btn' data-action='mark_active'><i class='fa-solid fa-rotate-left'></i></button>\
                    <button class='btn delete_btn' data-action='delete'><i class='fa-solid fa-xmark'></i></button>\
                </div>";
    });

    $('#tasks').html(htmlString);
});

$(document).on('click', 'button', function(e) {

    var action = $(e.currentTarget).data('action');
    var target = e.currentTarget.closest('.task');
    var id  = $(target).data('id');

    if (action == 'mark_complete' || action == 'mark_active') {
        changeStatus(id, action, function() {
            $(target).toggleClass('completed');
        });
    } else if (action == 'delete') {
        deleteTask(id, function() {
            $(target).fadeOut(500);
            setTimeout(() => $(target).detach(), 500);
        });
    }

});

$(document).on('submit', 'form', function(e) {

    e.preventDefault();

    var content = $('#addTask').val();

    postTask(content, function(response) {

        var completedClass = '';
        
        if (task.completed) {
            completedClass = 'completed';
        }

        $('#tasks').append("<div class='col-12 mb-3 task d-flex align-items-center " + completedClass + "' data-id='" + response.task.id + "'>\
                                <span>" + response.task.content + "</span>\
                                <button class='btn completed_btn' data-action='mark_complete'><i class='fa-solid fa-check'></i></button>\
                                <button class='btn active_btn' data-action='mark_active'><i class='fa-solid fa-rotate-left'></i></button>\
                                <button class='btn delete_btn' data-action='delete'><i class='fa-solid fa-xmark'></i></button>\
                            </div>");
    });

    $('#addTask').val('');
});
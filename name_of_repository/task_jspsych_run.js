jsPsych.init({
    timeline: timeline,
    on_finish: function() {
        jsPsych.data.get().localSave('csv', 'data.csv');
    }
});
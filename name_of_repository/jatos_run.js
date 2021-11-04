jatos.onLoad(function() {
    jsPsych.init( {
    　timeline: timeline,
      on_finish: function() {
        var resultJson = jsPsych.data.get().json();
        jatos.submitResultData(resultJson, jatos.startNextComponent);
      }
    });
});
  
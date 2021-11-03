var jsPsych = initJsPsych({
  on_finish: () => jatos.endStudy(jsPsych.data.get().json())
});

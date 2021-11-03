/*タイムラインの実行*/
jatos.onLoad(() => {
  jatos.addAbortButton();
  jsPsych.run(timeline);
});

/* 全画面化とスタート(Worker IDとtask_nameを追加)*/
var fullscreen = {
  type: "fullscreen",
  message: "<p><span style='font-size:20pt;'>それでは課題をはじめます。</span></p>"+
           "<p><span style='font-size:20pt;'>以下の「開始」を押すと，全画面になって課題がはじまります。</span></p>",
  button_label: "<p style='font-size:20px'>開始</p>",
  fullscreen_mode: true,
  on_finish: function(data){
    var worker_ID = jatos.workerId;
    jsPsych.data.addProperties({workerID: worker_ID});
    var task_name = jatos.componentProperties.title;
    jsPsych.data.addProperties({taskName: task_name});
  }
};
  
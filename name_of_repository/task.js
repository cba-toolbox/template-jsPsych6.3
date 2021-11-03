/* デモ用のストループ課題 */
/* 挨拶 */
var welcome = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: "<p><span style='font-size:20pt;'>実験にお越しいただき，ありがとうございます。</span></p>"+
  "<p><span style='font-size:20pt;'>キーボードのキーをどれか押して，開始してください</span></p>"
};

/* 全画面化 */
var fullscreen = {
  type: jsPsychFullscreen,
  message: "<p><span style='font-size:20pt;'>これ以降は全画面表示で実験を行います。以下の「次に進む」を押して次へ進んでください。</span></p>",
  button_label: "<p style='font-size:20px'>次に進む</p>",
  fullscreen_mode: true,
};

/* 教示 */
var instructions = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: "<p style='text-align:left'>この課題では, 以下のような色のついた単語を見ていただきます。</p>"+
      "<p style='color:red;font-size:60pt;'>青</p>"+
      "<p style='text-align:left'>単語の意味は無視して，それぞれの単語の「色」を以下のキーボードのキーを押して回答してください。</p>"+
      "<p style='text-align:left'>左手の人差し指と中指でzとx，右手の人差し指と中指でnとmを押してください。</p>"+
      "<p style='text-align:left'>・<span style='color:red'>赤色</span>の単語ならzを押す</p>"+
      "<p style='text-align:left'>・<span style='color:blue'>青色</span>の単語ならxを押す</p>"+
      "<p style='text-align:left'>・<span style='color:green'>緑色</span>の単語ならnを押す</p>"+
      "<p style='text-align:left'>・<span style='color:yellow'>黄色</span>の単語ならmを押す</p>"+
      "<p style='text-align:left'>上の例の場合だと，赤色で「青」と書いてありますので，dを押します</p>"+
      "<p style='text-align:left'>キーボードのキーをどれか押すと課題が始まります</p>",
  post_trial_gap: 1000
};

/*刺激の設定*/
var stimuli = [
  {stimulus: "<p style='color:red;font-size:60pt;'>赤</p>",
   data: { no:'1', stim_type: 'congruent', correct_key_press: 'z'}},
  {stimulus: "<p style='color:green;font-size:60pt;'>赤</p>",
   data: { no:'2', stim_type: 'incongruent', correct_key_press: 'n'}},
  {stimulus: "<p style='color:yellow;font-size:60pt;'>赤</p>",
   data: { no:'3', stim_type: 'incongruent', correct_key_press: 'm'}},
  {stimulus: "<p style='color:blue;font-size:60pt;'>赤</p>",
   data: { no:'4', stim_type: 'incongruent', correct_key_press: 'x'}},
  {stimulus: "<p style='color:red;font-size:60pt;'>緑</p>",
   data: { no:'5', stim_type: 'congruent', correct_key_press: 'z'}},
  {stimulus: "<p style='color:green;font-size:60pt;'>緑</p>",
   data: { no:'6', stim_type: 'incongruent', correct_key_press: 'n'}},
  {stimulus: "<p style='color:yellow;font-size:60pt;'>緑</p>",
  　data: { no:'7', stim_type: 'incongruent', correct_key_press: 'm'}},
  {stimulus: "<p style='color:blue;font-size:60pt;'>緑</p>",
  　data: { no:'8', stim_type: 'incongruent', correct_key_press: 'x'}},
  {stimulus: "<p style='color:red;font-size:60pt;'>黄</p>",
  　data: { no:'9', stim_type: 'congruent', correct_key_press: 'z'}},
  {stimulus: "<p style='color:green;font-size:60pt;'>黄</p>",
  　data: { no:'10', stim_type: 'incongruent', correct_key_press: 'n'}},
  {stimulus: "<p style='color:yellow;font-size:60pt;'>黄</p>",
  　data: { no:'11', stim_type: 'incongruent', correct_key_press: 'm'}},
  {stimulus: "<p style='color:blue;font-size:60pt;'>黄</p>",
  　data: { no:'12', stim_type: 'incongruent', correct_key_press: 'x'}},
  {stimulus: "<p style='color:red;font-size:60pt;'>青</p>",
  　data: { no:'13', stim_type: 'congruent', correct_key_press: 'z'}},
  {stimulus: "<p style='color:green;font-size:60pt;'>青</p>",
  　data: { no:'14', stim_type: 'incongruent', correct_key_press: 'n'}},
  {stimulus: "<p style='color:yellow;font-size:60pt;'>青</p>",
  　data: { no:'15', stim_type: 'incongruent', correct_key_press: 'm'}},
  {stimulus: "<p style='color:blue;font-size:60pt;'>青</p>",
  　data: { no:'16', stim_type: 'incongruent', correct_key_press: 'x'}}
];

/*ストループ課題*/
var stroop = {
  timeline: [{
    type: jsPsychHtmlKeyboardResponse,
    choices: ["z","x","n","m"],
    trial_duration: 2000,
    response_ends_trial: true,
    stimulus: jsPsych.timelineVariable('stimulus'),
    prompt: '赤色ならz,  青色ならx,  緑色ならn,  黄色ならm',
    data: jsPsych.timelineVariable('data'),
    on_finish: function(data){
      var correct = 0;
      if(data.correct_key_press == data.response){
        correct = 1;
      } 
      data.correct = correct;
    },
    post_trial_gap: function() {
        return Math.floor(Math.random() * 1500) + 500;
    }
  }],
  timeline_variables: stimuli,
  sample: {type: 'fixed-repetitions',size: 2}
};

/*デブリーフィング*/
var debrief = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function() {
    var incongruent_trials = jsPsych.data.get().filter({stim_type: 'incongruent'}).count();
    var congruent_trials = jsPsych.data.get().filter({stim_type: 'congruent'}).count();
    var accuracy = Math.round(jsPsych.data.get().filter({correct: 1}).count() / (incongruent_trials + congruent_trials) * 100);
    var congruent_rt = Math.round(jsPsych.data.get().filter({correct: 1, stim_type: 'congruent'}).select('rt').mean());
    var incongruent_rt = Math.round(jsPsych.data.get().filter({correct: 1, stim_type: 'incongruent'}).select('rt').mean());
    return "<p>あなたの正答率は，<strong>"+accuracy+"%</strong>でした。</p> " +
    "<p>色と単語が一致していた時にボタンを押すまでにかかる時間の平均は， <strong>" + congruent_rt + "ms</strong>でした。</p>"+
    "<p>色と単語が不一致だった時にボタンを押すまでにかかる時間の平均は， <strong>" + incongruent_rt + "ms</strong>でした。</p>"+
    "<p>キーボードのキーをどれか押すと結果を保存して終了します。その後，ブラウザを閉じて終了してください。ご参加ありがとうございました。</p>";
  }
};

/*タイムラインの設定*/
var timeline = [welcome, fullscreen, instructions, stroop, debrief];
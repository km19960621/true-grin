const server = require("express")();
const line = require("@line/bot-sdk");

const line_config = {
  channelAccessToken: process.env.LINE_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET
};

server.listen(process.env.PORT || 3000);

const bot = new line.Client(line_config);

server.post('/bot/webhook', line.middleware(line_config), (req, res, next) => {
  res.sendStatus(200);

  let events_processed = [];

  const messages = [
    "@bye",
    "yeah",
    "アミーゴ",
    "ウリィィィィィィィィ",
    "運命運命w",
    "ええ〜、そういう考え方もありますねぇ",
    "お疲れ様〜☆",
    "会話になってないよ〜",
    "カレー飲んだことある？",
    "今日もあっそぼー！",
    "人生とはねぇ..出会いと別れだよねぇ...",
    "それもまた一興",
    "確かに",
    "黙れ豆",
    "千葉県の平和は僕が守る！",
    "猪突猛進！猪突猛進！",
    "日本の未来はWow Wow Wow Wow",
    "バッチコイベイベー",
    "不要不急のコメントは控えてください(>_<)",
    "勉強したくないε=ε=ε=ε=ε=ε=┌(;￣◇￣)┘",
    "僕と契約して魔法少女にならないか？",
    "僕もそう思うにゃわん",
    "勇気が世界の闇を照らし始める"
  ];
  const message = messages[Math.floor(Math.random() * messages.length)];

  const messages_thank = [
      "ありがとう",
      "あんたに褒められても嬉しくないんだからね！///",
      "でしょ？",
      "テヘペロ"
  ];
  const message_thank = messages_thank[Math.floor(Math.random() * messages_thank.length)];

  const messages_one = [
    "botなめてるでしょw",
    "会話する気あるの〜？"
  ];
  const message_one = messages_one[Math.floor(Math.random() * messages_one.length)];

  const messages_question = [
    "あと3時間あればわかる",
    "それアンダースタンド",
    "答えは2です",
    "まあね",
    "わかんない",
    "僕に聞かれても困るよー"
  ];
  const message_question = messages_question[Math.floor(Math.random() * messages_question.length)];


  req.body.events.forEach((event) => {
    if (event.type == "message" && event.message.type == "text") {
      if (event.message.text.length == 1) {
       events_processed.push(bot.replyMessage(event.replyToken, {
         type: "text",
         text: message_one
       }));
      } else if (event.message.text == "@bye") {
        events_processed.push(bot.replyMessage(event.replyToken, {
          type: "text",
          text: "効かん！"
        }));
      } else if (event.message.text.match(/GO/) || event.message.text.match(/行け/)) {
        events_processed.push(bot.replyMessage(event.replyToken, {
          type: "text",
          text: "マツケンでGO!"
        }));
      } else if (event.message.text.match(/いいね/) || event.message.text.match(/可愛い/) || event.message.text.match(/すご/)) {
        events_processed.push(bot.replyMessage(event.replyToken, {
          type: "text",
          text: message_thank
        }));
      } else if (event.message.text.match(/いる？/)) {
        events_processed.push(bot.replyMessage(event.replyToken, {
          type: "text",
          text: "いないよ"
        }));
      } else if (event.message.text.match(/オーナーズリーグ/)) {
        events_processed.push(bot.replyMessage(event.replyToken, {
          type: "text",
          text: "オーナーズリーグ最高！"
        }));
      } else if (event.message.text.match(/知らな/) || event.message.text.match(/知らん/)) {
        events_processed.push(bot.replyMessage(event.replyToken, {
          type: "text",
          text: "これだから若いもんは"
        }));
      } else if (event.message.text.match(/何してる/)) {
        events_processed.push(bot.replyMessage(event.replyToken, {
          type: "text",
          text: "オーナーズリーグの整理整頓"
        }));
      } else if (event.message.text.match(/バグ/)) {
        events_processed.push(bot.replyMessage(event.replyToken, {
          type: "text",
          text: "仕様です"
        }));
      } else if (event.message.text.length == 8) {
        events_processed.push(bot.replyMessage(event.replyToken, {
         type: "text",
         text: `${event.message.text.substr(0, 4)}クエスト`
        }));
      } else if (event.message.text.match(/？/)) {
        events_processed.push(bot.replyMessage(event.replyToken, {
         type: "text",
         text: message_question
        }));
      } else {
        events_processed.push(bot.replyMessage(event.replyToken, {
          type: "text",
          text: message
        }));
      }
    } else if (event.type == "message" && event.message.type == "sticker") {
      events_processed.push(bot.replyMessage(event.replyToken, {
        type: "text",
        text: "ああ、スタンプで会話終わらそうとするあれね"
      }));
    }
  });

  Promise.all(events_processed).then(
    (response) => {
      console.log(`${response.length} event(s) processed.`);
    }
  );

  return;
});

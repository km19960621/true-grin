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
    "お疲れ様〜☆",
    "カレー飲んだことある？",
    "祇園精舎の鐘の声\n諸行無常の響きあり",
    "今日もあっそぼー！",
    "仕方ない",
    "それな",
    "出会いと別れ、それが人生。",
    "それもまた一興",
    "僕と契約して魔法少女にならないか？",
    "黙れ豆",
    "だよね",
    "痴漢者トーマス",
    "どりん",
    "勉強したくないε=ε=ε=ε=ε=ε=┌(;￣◇￣)┘"
  ];
  const message = messages[Math.floor(Math.random() * messages.length)];

  const messages_thank = [
      "ありがとう",
      "気にすんな",
      "でしょ？",
      "テヘペロ"
  ];
  const message_thank = messages_thank[Math.floor(Math.random() * messages_thank.length)];

  const messages_one = [
    "botなめてるでしょw",
    "会話する気ある？"
  ];
  const message_one = messages_one[Math.floor(Math.random() * messages_one.length)];

  const messages_question = [
    "うん",
    "そうだね",
    "それアンダースタンド",
    "答えは2です",
    "まあね",
    "わかんない",
    "俺に聞かれてもなー"
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
          text: "生きる意味について考えてるよ！"
        }));
      } else if (event.message.text.match(/バグ/)) {
        events_processed.push(bot.replyMessage(event.replyToken, {
          type: "text",
          text: "仕様です"
        }));
      } else if (event.message.text.length == 8) {
        events_processed.push(bot.replyMessage(event.replyToken, {
         type: "text",
         text: `${event.message.text.substr(0, 4)}クエストの間違いでは？`
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

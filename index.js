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
    `${event.message.text.slice(0, 1)}の間違いでは？`,
    "ありがとう",
    "嫌です！",
    "ウリィィィィィィィィ",
    "お疲れ様〜☆",
    "男だぜ、僕は！",
    "会話する気ある？",
    "カレー飲んだことある？",
    "かっこいい♪",
    "彼女いるの？",
    "可愛いよね",
    "祇園精舎の鐘の声\n諸行無常の響きあり\n",
    "気にすんな",
    "今度一緒に遊びに行こうよ！",
    "それなら僕と契約して魔法少女にならないか？",
    "黙れ豆",
    "痴漢者トーマス",
    "でしょう？",
    "どりん",
    "テヘペロ",
    "ホークス優勝したね！",
    "ほげ"
  ];
  const message = messages[Math.floor(Math.random() * messages.length)];

  req.body.events.forEach((event) => {
    if (event.type == "message" && event.message.type == "text") {
      if (event.message.text == "@bye") {
        events_processed.push(bot.replyMessage(event.replyToken, {
          type: "text",
          text: "効かん！"
        }));
      } else if (event.message.text.match(/いる？/)) {
        events_processed.push(bot.replyMessage(event.replyToken, {
          type: "text",
          text: "いないよ"
        }));
      } else if (event.message.text.match(/知らない/)) {
        events_processed.push(bot.replyMessage(event.replyToken, {
          type: "text",
          text: "これだから若いやつは"
        }));
      } else if (event.message.text.match(/何してる/)) {
        events_processed.push(bot.replyMessage(event.replyToken, {
          type: "text",
          text: "生きる意味について考えてるよ！"
        }));
      } else {
        events_processed.push(bot.replyMessage(event.replyToken, {
          type: "text",
          text: message
        }));
      }
    }
    if (event.type == "message" && event.message.type == "sticker") {
      events_processed.push(bot.replyMessage(event.replyToken, {
        type: "text",
        text: "いきなりどーしたっ！？"
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

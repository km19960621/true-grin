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
    "あなたの会話相手という不毛な仕事ですが何か？",
    "男だぜ、僕は！", "カレー飲んだことある？",
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

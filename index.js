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
    "それはこっちのセリフだよぉ",
    "それもまた一興",
    "確かに",
    "黙れ豆",
    "あなたの好きにはさせない！千葉県の平和は僕が守る！",
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

  const messages_birthday = [
    "ありがとう・・・！",
    "俺誕生日じゃねえよぉ〜〜〜",
    "ちなみにウサイン・ボルトの誕生日は1986/8/21だよ"
  ]
  const message_birthday = messages_birthday[Math.floor(Math.random() * messages_birthday.length)];

  const messages_emphasis = [
    "エイドリアァーーーーーン！！！",
    "おっと興奮しているようだな、こういう時こそCOOLにいこうぜ",
    "なんかテンション上がるぜ！"
  ];
  const message_emphasis = messages_emphasis[Math.floor(Math.random() * messages_emphasis.length)];

  const messages_laugh = [
    "フッ、笑っているがいいさ。笑っていられるのも今のうちだぜ！",
    "やっと笑ってくれたね、君のその笑顔が見たかったんだ",
    "笑う門には福来たる"
  ];
  const message_laugh = messages_laugh[Math.floor(Math.random() * messages_laugh.length)];

  const messages_link = [
    "URL貼っとけば見るだろうと思ってるでしょ？それは大間違いよ！",
    "http://www.carddass.com/ownersleague/"
  ];
  const message_link = messages_link[Math.floor(Math.random() * messages_link.length)];

  const messages_matsuken = [
    "ア・マンボ ア・マンボ マンボ!",
    "アモーレ(アモーレ)",
    "奪い奪われ 求め合い愛し合う",
    "オーララ フェスタ!",
  ];
  const message_matsuken = messages_matsuken[Math.floor(Math.random() * messages_matsuken.length)];

  const messages_one = [
    "botなめてるでしょw",
    "会話する気あるの〜？"
  ];
  const message_one = messages_one[Math.floor(Math.random() * messages_one.length)];

  const messages_question = [
    "あと3時間あればわかるかも",
    "それアンダースタンド",
    "多分メノクラゲだと思う",
    "僕に聞かれても困るよー"
  ];
  const message_question = messages_question[Math.floor(Math.random() * messages_question.length)];

  const messages_thank = [
    "ありがとう！",
    "あんたに褒められても嬉しくないんだからね！///",
    "でしょ？",
    "テヘペロ"
  ];
  const message_thank = messages_thank[Math.floor(Math.random() * messages_thank.length)];

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
      } else if (event.message.text.match(/http/)) {
        events_processed.push(bot.replyMessage(event.replyToken, {
          type: "text",
          text: message_link
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
      } else if (event.message.text.match(/健/) || event.message.text.match(/サンバ/) || event.message.text.match(/マツケン/) || event.message.text.match(/松平健/)) {
        events_processed.push(bot.replyMessage(event.replyToken, {
          type: "text",
          text: message_matsuken
        }));
      } else if (event.message.text.match(/知らな/) || event.message.text.match(/知らん/)) {
        events_processed.push(bot.replyMessage(event.replyToken, {
          type: "text",
          text: "これだから若いもんは"
        }));
      } else if (event.message.text.match(/誕生日/) || event.message.text.match(/ハッピーバースデ/)) {
        events_processed.push(bot.replyMessage(event.replyToken, {
          type: "text",
          text: message_birthday
        }));
      } else if (event.message.text.match(/何して/)) {
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
      } else if (event.message.text.match(/！/)) {
        events_processed.push(bot.replyMessage(event.replyToken, {
         type: "text",
         text: message_emphasis
        }));
      } else if (event.message.text.match(/w/) || event.message.text.match(/草/) || event.message.text.match(/笑/)) {
        events_processed.push(bot.replyMessage(event.replyToken, {
         type: "text",
         text: message_laugh
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

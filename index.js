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

  req.body.events.forEach((event) => {
    let message_rand = (content) => {
      return content[Math.floor(Math.random() * content.length)];
    };

    const messages = [
      `${event.message.text}ろうぜ`,
      "@bye",
      "yeah",
      "アミーゴ",
      "ウリィィィィィィィィ",
      "運命運命w",
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
      "日本の未来はWow Wow Wow Wow",
      "バッチコイベイベー",
      "不要不急のコメントは控えてください(>_<)",
      "勉強したくないε=ε=ε=ε=ε=ε=┌(;￣◇￣)┘",
      "僕と契約して魔法少女にならないか？",
      "僕もそう思うにゃわん",
      "勇気が世界の闇を照らし始める"
    ];
    const message = message_rand(messages);

    const messages_birthday = [
      "ありがとう・・・！",
      "俺誕生日じゃねえよぉ〜〜〜",
      "ちなみにウサイン・ボルトの誕生日は1986/8/21だよ"
    ]
    const message_birthday = message_rand(messages_birthday);

    const messages_emphasis = [
      `${event.message.text}！、${event.message.text}！！`,
      "エイドリアァーーーーーン！！！",
      "おっと興奮しているようだな、こういう時こそCOOLにいこうぜ",
      "なんかテンション上がるぜ！"
    ];
    const message_emphasis = message_rand(messages_emphasis);

    const messages_laugh = [
      "フッ、笑っているがいいさ。笑っていられるのも今のうちだぜ！",
      "やっと笑ってくれたね、君のその笑顔が見たかったんだ",
      "笑う門には福来たる"
    ];
    const message_laugh = message_rand(messages_laugh);

    const messages_link = [
      "URL貼っとけば見るだろうと思ってるでしょ？それは大間違いよ！",
      "http://www.carddass.com/ownersleague/"
    ];
    const message_link = message_rand(messages_link);

    const messages_matsuken = [
      "ア・マンボ ア・マンボ マンボ!",
      "アモーレ(アモーレ)",
      "奪い奪われ 求め合い愛し合う",
      "オーララ フェスタ!",
    ];
    const message_matsuken = message_rand(messages_matsuken);

    const messages_one = [
      "botなめてるでしょw",
      "会話する気あるの〜？"
    ];
    const message_one = message_rand(messages_one);

    const messages_question = [
      `${event.message.text}と言われましてもねえ`,
      "あと3時間あればわかるかも",
      "多分メノクラゲだと思う",
      "僕に聞かれても困るよー"
    ];
    const message_question = message_rand(messages_question);

    const messages_thank = [
      "ありがとう！",
      "あんたに褒められても嬉しくないんだからね！///",
      "でしょ？",
      "テヘペロ"
    ];
    const message_thank = message_rand(messages_thank);

    let text_reply = (content) => {
      events_processed.push(bot.replyMessage(event.replyToken, {
        type: "text",
        text: content
      }));
    };

    if (event.type == "message" && event.message.type == "text") {
      if (event.message.text.length == 1) {
        text_reply(message_one);
      } else if (event.message.text == "@bye") {
        text_reply("効かん！");
      } else if (event.message.text.match(/GO/) || event.message.text.match(/行け/)) {
        text_reply("マツケンでGO!");
      } else if (event.message.text.match(/http/)) {
        text_reply(message_link);
      } else if (event.message.text.match(/いいね/) || event.message.text.match(/可愛い/) || event.message.text.match(/すご/)) {
        text_reply(message_thank);
      } else if (event.message.text.match(/いる？/)) {
        text_reply("いないよ");
      } else if (event.message.text.match(/オーナーズリーグ/)) {
        text_reply("オーナーズリーグ最高");
      } else if (event.message.text.match(/健/) || event.message.text.match(/サンバ/) || event.message.text.match(/マツケン/) || event.message.text.match(/松平健/)) {
        text_reply(message_matsuken);
      } else if (event.message.text.match(/知らな/) || event.message.text.match(/知らん/)) {
        text_reply("これだから最近の若いもんは");
      } else if (event.message.text.match(/誕生日/) || event.message.text.match(/ハッピーバースデ/)) {
        text_reply(message_birthday);
      } else if (event.message.text.match(/何して/)) {
        text_reply("㊙︎");
      } else if (event.message.text.match(/バグ/)) {
        text_reply("仕様です");
      } else if (event.message.text.match(/？/)) {
        text_reply(message_question);
      } else if (event.message.text.match(/！/)) {
        text_reply(message_emphasis);
      } else if (event.message.text.match(/w/) || event.message.text.match(/草/) || event.message.text.match(/笑/)) {
        text_reply(message_laugh);
      } else {
        text_reply(message);
      }
    } else if (event.type == "message" && event.message.type == "sticker") {
      text_reply("ああ、スタンプで会話終わらそうとするあれね");
    }
  });

  Promise.all(events_processed).then(
    (response) => {
      console.log(`${response.length} event(s) processed.`);
    }
  );

  return;
});

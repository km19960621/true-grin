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
      `${event.message.text.charAt(0)}${event.message.text.charAt(0)}${event.message.text.charAt(0)}${event.message.text.charAt(0)}${event.message.text.charAt(0)}`,
      `${event.message.text.substr(0, 2)}市`,
      `${event.message.text.substr(0, 4)}クエスト${Math.floor(Math.random() * 11)}`,
      `新機能・文字数カウンター発動！\n先ほどのメッセージの文字数は${event.message.text.length}文字です・・・！`,
      `なるほど、${event.message.text}なのね！（これぞバックトラッキング）`,
      "┌(┌^o^)┐",
      "@bye",
      "Hey,let\'s grin with me!",
      "UREEYYY",
      "運命運命w",
      "男には死ぬと分かっていても戦わなければならない時がある。それが今だ。",
      "学習できるbotになりたいぜ",
      "カレー飲んだことある？",
      "艱難辛苦っ・・・・・！",
      "今日もあっそぼー！",
      "人生とはネェ..出会いと別れだよネェ...",
      "そういう考え方もあると思う。だからこそ私はそういう考え方もあるのではないかと思う。",
      "それは論点のすり替えだ",
      "それもまた一興",
      "たーしかに",
      "ただいま緊急メンテナンス中です。メッセージを送信しないでください。",
      "黙れ豆",
      "時は金なり・・・！",
      "バッチコイベイベー！",
      "不要不急のコメントは控えてください(>_<)",
      "勉強したくないε=ε=ε=ε=ε=ε=┌(;￣◇￣)┘",
      "ぼくもそうおもうニャワン"
    ];
    const message = message_rand(messages);

    const messages_birthday = [
      "ありがとよ！",
      "俺今日誕生日じゃねえよぉ〜〜〜",
      "ちなみにウサイン・ボルトの誕生日は1986/8/21だよ"
    ];
    const message_birthday = message_rand(messages_birthday);

    const messages_emphasis = [
      `${event.message.text}、${event.message.text}！`,
      "なんかテンション上がるぜ！"
    ];
    const message_emphasis = message_rand(messages_emphasis);

    const messages_laugh = [
      "いい笑顔だ",
      "笑う門には福来たる",
      "笑っていられるのも今のうちだぜ"
    ];
    const message_laugh = message_rand(messages_laugh);

    const messages_link = [
      "URL 貼っても見るとは 限らない",
      "http://www.carddass.com/ownersleague/"
    ];
    const message_link = message_rand(messages_link);

    const messages_matsuken = [
      "ア・マンボ ア・マンボ マンボ!",
      "アモーレ(アモーレ)",
      "奪い奪われ 求め合い愛し合う",
      "オーララ フェスタ!"
    ];
    const message_matsuken = message_rand(messages_matsuken);

    const messages_one = [
      `${event.message.text}${event.message.text}${event.message.text}`,
      "botなめてるでしょw",
      "会話する気あるの〜？"
    ];
    const message_one = message_rand(messages_one);

    const messages_question = [
      `${event.message.text.replace("？", "ლ(^o^ლ)")}`,
      `「${event.message.text.replace("？", "")}」ですか。ええ、現段階で明らかなこと、それはあなたが「${event.message.text}」と問うていることそれ自体なんです。`,
      "あと3時間考えればわかるかも",
      "答えは風の中さ・・・"
    ];
    const message_question = message_rand(messages_question);

    /*const messages_stamp = [
      "༼;´༎ຶ ۝ ༎ຶ༽",
      "ああ、スタンプで会話終わらせようとするアレね",
      "言葉にしないと伝わらない思いもあると思うぜ"
    ];
    const message_stamp = message_rand(messages_stamp);
*/
    const messages_thank = [
      "ありがとう",
      "あんたに褒められても嬉しくないんだからね！///",
      "サンキューだ"
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
      } else if (event.message.text.match(/オーナーズリーグ/)) {
        text_reply("オーナーズリーグは神");
      } else if (event.message.text.match(/健/) || event.message.text.match(/サンバ/) || event.message.text.match(/マツケン/) || event.message.text.match(/松平/)) {
        text_reply(message_matsuken);
      }/* else if (event.message.text.match(/邪魔/) || (event.message.text.match(/じゃま/)) {
        text_reply("僕のリプライが邪魔だと？フフ、本当に邪魔なのはどっちなのか今から思い知らせてやるぜ");
      } */else if (event.message.text.match(/知らな/) || event.message.text.match(/知らん/)) {
        text_reply("これだから最近の若いもんは");
      } else if (event.message.text.match(/誕生日/) || event.message.text.match(/ハッピーバースデ/)) {
        text_reply(message_birthday);
      } else if (event.message.text.match(/何して/)) {
        text_reply("㊙︎");
      } else if (event.message.text.match(/バグ/)) {
        text_reply("仕様です");
      } else if (event.message.text.match(/.*？$/)) {
        text_reply(message_question);
      } else if (event.message.text.match(/！/)) {
        text_reply(message_emphasis);
      } else if (event.message.text.match(/w/) || event.message.text.match(/草/) || event.message.text.match(/笑/)) {
        text_reply(message_laugh);
      } else {
        text_reply(message);
      }
    }/* else if (event.type == "message" && event.message.type == "sticker") {
      text_reply(message_stamp);
    }*/
  });

  Promise.all(events_processed).then(
    (response) => {
      console.log(`${response.length} event(s) processed.`);
    }
  );

  return;
});

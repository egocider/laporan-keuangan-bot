//CONFIG
var BOT_TOKEN = "123456789:JKIhihKHI!@#$ljLLJL"; //BOT TOKEN ANDA
var SS_URL =
  "https://docs.google.com/spreadsheets/d/1cj25tC-LtXYfNA19DHitYwz-b0DK5TV1QKpwXs4Flbc/"; //URL SPREADSHEET
var SHEET_NAME = "Sheet1"; //NAMA SHEET
var USERS = [1347888872]; //CHAT ID, bisa lebih dari 1

//BEGIN
var SHEET = SpreadsheetApp.openByUrl(SS_URL).getSheetByName(SHEET_NAME);

function doGet(e) {
  return HtmlService.createHtmlOutput("<h1>OK</h1>");
}

function doPost(e) {
  if (e.postData.type == "application/json") {
    let update = JSON.parse(e.postData.contents);
    if (update) {
      commands(update);
      return true;
    }
  }
}

function commands(update) {
  let chatId = update.message.chat.id;
  let first_name = update.message.chat.first_name;
  let text = update.message.text || "";
  let tanggal = new Date().toLocaleString();

  if (USERS.includes(chatId)) {
    if (text.startsWith("/start")) {
      sendMessage({
        chat_id: chatId,
        text: "Mulai laporan dengan cara \n/a [harga] [item1, item2 dst]",
      });
    } else if (text.startsWith("/a")) {
      let item,
        harga,
        stext = text.split(" ");

      harga = eval(stext[1]);
      item = stext.join(" ");

      if (harga && item) {
        insert_value([tanggal, item, harga, chatId, first_name], SHEET);

        sendMessage({
          chat_id: chatId,
          text: "Laporan sukses ( ˘ ³˘)♥︎.",
        });
      } else {
        sendMessage({
          chat_id: chatId,
          text: "Gagal. Pastikan sesuai format. \n/a [harga]  [item1, item2 dst]",
        });
      }
    }
  }
}

function sendMessage(postdata) {
  var options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(postdata),
    muteHttpExceptions: true,
  };
  UrlFetchApp.fetch(
    "https://api.telegram.org/bot" + BOT_TOKEN + "/sendMessage",
    options
  );
}

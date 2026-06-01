// ============================================================
// ACC CASE LIBRARY — Google Apps Script API
// ============================================================
// 【使い方】
// 1. Google スプレッドシートを開く
// 2. 拡張機能 → Apps Script → このコードを貼り付ける
// 3. デプロイ → 新しいデプロイ（または既存デプロイの管理 → 新しいバージョン）
//    実行するユーザー: 自分 / アクセスできるユーザー: 全員
// 4. デプロイURLをコピーして index.html / detail.html の GAS_API_URL に貼る
// ============================================================
// ★ スプレッドシートの1行目（ヘッダー行）の名前がそのままJSのキー名になります
//    列を追加・削除してもこのコードの再デプロイは不要です
// ============================================================

const SHEET_NAME = 'data';

function doGet(e) {
  try {
    const ss    = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];
    const rows  = sheet.getDataRange().getValues();

    if (rows.length < 2) return jsonOutput({ cards: [] });

    const MEDAL_LABELS = {
      'grand-prix': 'グランプリ',
      'gold'      : 'ゴールド',
      'silver'    : 'シルバー',
      'bronze'    : 'ブロンズ',
      'finalist'  : 'ファイナリスト',
    };

    // 1行目をヘッダーとして読み込む（列を追加しても自動対応）
    const headers = rows[0].map(h => String(h).trim());

    const cards = rows
      .slice(1)
      .filter(row => String(row[0]).trim())
      .map((row, index) => {
        const card = { id: index };

        // ヘッダー名をキーとして全列を読み込む
        headers.forEach((key, i) => {
          if (key) card[key] = String(row[i] || '');
        });

        card.year       = Number(card.year) || 0;
        card.medalLabel = MEDAL_LABELS[card.medal] || card.medal;

        // "Url" で終わる全フィールドに Google Drive URL 変換を適用
        // （thumbnailUrl / imageUrl2 / imageUrl3 / imageUrl4 などすべて対象）
        Object.keys(card).forEach(key => {
          if (key.endsWith('Url') && card[key]) {
            card[key] = convertDriveUrl(card[key]);
          }
        });

        return card;
      });

    return jsonOutput({ cards });

  } catch (err) {
    return jsonOutput({ error: err.message, cards: [] });
  }
}

// Google Drive の共有URLを lh3 形式に変換
function convertDriveUrl(url) {
  if (!url) return '';
  const match = url.match(/\/file\/d\/([^\/]+)/);
  if (match) return 'https://lh3.googleusercontent.com/d/' + match[1];
  return url;
}

function jsonOutput(data) {
  const output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}

# BTC Price Converter Chrome拡張機能

BTCを入力してリアルタイムのドルと日本円価格を表示するChrome拡張機能です。

## 機能

- BTC数量を入力してドル（USD）と日本円（JPY）の価格を表示
- CoinDesk APIからリアルタイムのBTC価格を取得
- ExchangeRate APIから最新の為替レート（USD/JPY）を取得
- シンプルで使いやすいポップアップインターフェース

## インストール方法

1. Chromeブラウザで `chrome://extensions/` にアクセス
2. 右上の「デベロッパーモード」を有効にする
3. 「パッケージ化されていない拡張機能を読み込む」をクリック
4. `btc-converter-extension` フォルダを選択
5. 拡張機能がインストールされ、ツールバーにアイコンが表示されます

## 使用方法

1. ツールバーの拡張機能アイコンをクリック
2. 「BTC数量」フィールドに変換したいBTC数量を入力（例: 0.1）
3. 「変換」ボタンをクリックまたはEnterキーを押す
4. USD価格とJPY価格がリアルタイムで表示されます

## ファイル構成

```
btc-converter-extension/
├── manifest.json    # 拡張機能の設定ファイル
├── popup.html      # ポップアップのHTMLファイル
├── popup.css       # ポップアップのスタイルファイル
├── popup.js        # 価格変換のロジックファイル
└── README.md       # このファイル
```

## 使用API

- **CoinDesk API**: BTC価格（USD）の取得
- **ExchangeRate API**: USD/JPY為替レートの取得

## 注意事項

- インターネット接続が必要です
- API制限により、短時間での大量リクエストは制限される場合があります
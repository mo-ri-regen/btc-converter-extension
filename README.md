# BTC Price Converter Chrome 拡張機能

BTC を入力してリアルタイムのドルと日本円価格を表示する Chrome 拡張機能です。

## 機能

- BTC 数量を入力してドル（USD）と日本円（JPY）の価格を表示
- CoinDesk API からリアルタイムの BTC 価格を取得
- ExchangeRate API から最新の為替レート（USD/JPY）を取得
- シンプルで使いやすいポップアップインターフェース

## インストール方法

1. Chrome ブラウザで `chrome://extensions/` にアクセス
2. 右上の「デベロッパーモード」を有効にする
3. 「パッケージ化されていない拡張機能を読み込む」をクリック
4. `btc-converter-extension` フォルダを選択
5. 拡張機能がインストールされ、ツールバーにアイコンが表示されます

## 使用方法

1. ツールバーの拡張機能アイコンをクリック
2. 「BTC 数量」フィールドに変換したい BTC 数量を入力（例: 0.1）
3. 「変換」ボタンをクリックまたは Enter キーを押す
4. USD 価格と JPY 価格がリアルタイムで表示されます

## ファイル構成

```
btc-converter-extension/
├── manifest.json    # 拡張機能の設定ファイル
├── popup.html      # ポップアップのHTMLファイル
├── popup.css       # ポップアップのスタイルファイル
├── popup.js        # 価格変換のロジックファイル
└── README.md       # このファイル
```

## 使用 API

- **CoinDesk API**: BTC 価格（USD）の取得
- **ExchangeRate API**: USD/JPY 為替レートの取得

## 注意事項

- インターネット接続が必要です
- API 制限により、短時間での大量リクエストは制限される場合があります

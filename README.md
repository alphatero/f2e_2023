# 今晚來開票

![封面](https://github.com/alphatero/f2e_2023/blob/88cc3a4d6acafb0fbdb0be05ec0886012186eb20/TodayShowVote.png)

## 專案介紹

這是參加 2023 年 The F2E 比賽的專案

> 以快速能夠查看即時開票資訊，以及歷屆資料分析為主的平台

## 專案團隊

| 開發人員 | 負責開發範圍 |
| -------- | ------------ |
| alpha    | 前端開發     |
| 鉛筆     | 設計         |

## 安裝本專案

- Node.js 版本必需為 v18.15.0

1. 取得專案
   ```
   git clone git@github.com:alphatero/f2e_2023.git
   ```
2. 移動到專案中
   ```
   cd f2e_2023
   ```
3. 安裝套件
   ```
   pnpm install
   ```
4. 根據 `.evn.example` 內容來調整設定
   ```
   NEXT_PUBLIC_API_URL= # API 位置
   ```
5. 運行專案
   ```
   pnpm run dev
   ```
6. 開啟專案
   在瀏覽器中前往 `http://localhost:3000` 後，輸入對應身份組的帳號密碼即可查看

## 專案使用技術

- Node.js
- Next.js
- TypeScript
- Zustand
- TailwindCSS
- D3
- D3-geo
- Topojson-client
- React-chartjs-2
- Radix-ui
- Headless-ui

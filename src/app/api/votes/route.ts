import { NextResponse } from "next/server";

export async function GET() {
  // data 是 {
  // winner: 1, 當選的候選人號碼
  // country: " ", 所有縣市

  const data = {
    list: [
  {
    country: "台北市",
    winner: 1,
  },
  {
    country: "新北市",
    winner: 2,
  },
  {
    country: "桃園市",
    winner: 3,
  },
  {
    country: "基隆市",
    winner: 1,
  },
  {
    country: "新竹市",
    winner: 2,
  },
  {
    country: "新竹縣",
    winner: 3,
  },
  {
    country: "苗栗縣",
    winner: 1,
  },
  {
    country: "台中市",
    winner: 2,
  },
  {
    country: "彰化縣",
    winner: 3,
  },
  {
    country: "南投縣",
    winner: 1,
  },
  {
    country: "雲林縣",
    winner: 2,
  },
  {
    country: "嘉義市",
    winner: 3,
  },
  {
    country: "嘉義縣",
    winner: 1,
  },
  {
    country: "台南市",
    winner: 2,
  },
  {
    country: "高雄市",
    winner: 3,
  },
  {
    country: "屏東縣",
    winner: 1,
  },
  {
    country: "宜蘭縣",
    winner: 2,
  },
  {
    country: "花蓮縣",
    winner: 3,
  },
  {
    country: "台東縣",
    winner: 1,
  },
  {
    country: "澎湖縣",
    winner: 2,
  },
  {
    country: "金門縣",
    winner: 3,
  },
  {
    country: "連江縣",
    winner: 1,
      },
      
    ]
  }

return NextResponse.json(data)
}
      
     
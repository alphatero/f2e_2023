import { NextResponse } from "next/server";

export async function GET() {
  const data = {
    "人口數": 23598776,
    "選舉人數": 19311105,
    "候選組數": 3,
    "當選組數": 1,
    "合計": 14464571,
    "有效票數": 14300940,
    "無效票數": 163631,
    "選舉人數/人口數": "81.83%",
    "投票數/選舉人數": "74.90%",
    "當選人數/候選人數": "33.33%"
  }
  
  return NextResponse.json(data)

}
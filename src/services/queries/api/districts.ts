import districts from '@/data/districts.json'

export const getDistricts = async (  country: string ) => {
  // 各縣市的各個鄉鎮市區並加上一個 winner 的欄位是 1, 2, 3 當中亂數選擇
  const list = districts.map((district) => ({
    ...district,
    districts: district.districts.map((district) => ({
      ...district,
      winner: Math.floor(Math.random() * 3) + 1,
    })),
  }))

  const data = {
    list: list.filter((district) => district.name === country),
  }

  return data.list
}
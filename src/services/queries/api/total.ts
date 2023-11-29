export const getTotal = async () => {
  const data = {
    validPercentage: '74.9',
    invalidPercentage: '25.1',
    validTickets: 14464571,
    invalidTickets: 14300940,
    valid: 14464571,
    candidates:
      [
        {
          id: 1,
          name: '卜瞻匠 / 詹言巴',
          value: 608590,
          percentage: '4.26',
          party: '半熟蛋加醬油黨'
        },
        {
          id: 2,
          name: '夏杉耀 / 魯豆輔',
          value: 5522119,
          percentage: '38.61',
          party: '芋頭火鍋黨'
        },
        {
          id: 3,
          name: '范湯理 / 左沙拉',
          value: 8170231,
          percentage: '57.13',
          party: '香菜黨'
        },
      ]
  }

  return data
}
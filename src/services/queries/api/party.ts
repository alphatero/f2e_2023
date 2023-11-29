import { get } from '@/utils/axios';

export const getParty = async () => {
  const data = 
  {
    ticket:[
      {
        year: "2012",
        list: [
          {
            name: "中國國民黨",
            votes: 608590,
          },
          {
            name: "民主進步黨",
            votes: 6894744,
          },
          {
            name: "其他政黨",
            votes: 14464571,
          }
        ],
    },
    {
      year: "2016",
      list: [
        {
          name: "中國國民黨",
          votes: 5522119,
        },
        {
          name: "民主進步黨",
          votes: 8170231,
        },
        {
          name: "其他政黨",
          votes: 14464571,
        }
      ],
    },
    {
      year: "2020",
      list: [
        {
          name: "中國國民黨",
          votes: 5522119,
        },
        {
          name: "民主進步黨",
          votes: 8170231,
        },
        {
          name: "其他政黨",
          votes: 14464571,
        }
      ],
    }
    ],
    percentage: [
      {
        year: "2012",
        list: [
          {
            name: "中國國民黨",
            votes: "4.21",
          },
          {
            name: "民主進步黨",
            votes: "47.80",
          },
          {
            name: "其他政黨",
            votes: "47.99",
          }
        ],
    },
    {
      year: "2016",
      list: [
        {
          name: "中國國民黨",
          votes: "38.61",
        },
        {
          name: "民主進步黨",
          votes: "57.23",
        },
        {
          name: "其他政黨",
          votes: "4.16",
        }
      ],
    },
    {
      year: "2020",
      list: [
        {
          name: "中國國民黨",
          votes: "38.61",
        },
        {
          name: "民主進步黨",
          votes: "57.23",
        },
        {
          name: "其他政黨",
          votes: "4.16",
        }
      ],
    }
    ],
  }
  return data;
}
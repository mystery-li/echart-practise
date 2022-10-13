// 引入包
const express = require("express");
const fs = require("fs");
const cors = require("cors");
const port = 5500;
// 引入app
const app = express();
app.use(cors());

app.use((req, res, next) => {
  console.log("匹配成功");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS,GET,POST,PUT,DELETE");
  next();
});
// 写接口
app.get("/seller", (req, res) => {
  const data = [
    {
      name: "商家1",
      value: 99,
    },
    {
      name: "商家2",
      value: 102,
    },
    {
      name: "商家3",
      value: 83,
    },
    {
      name: "商家4",
      value: 49,
    },
    {
      name: "商家5",
      value: 200,
    },
    {
      name: "商家6",
      value: 152,
    },
    {
      name: "商家7",
      value: 76,
    },
    {
      name: "商家8",
      value: 23,
    },
    {
      name: "商家9",
      value: 87,
    },
    {
      name: "商家10",
      value: 223,
    },
    {
      name: "商家11",
      value: 145,
    },
    {
      name: "商家12",
      value: 187,
    },
    {
      name: "商家13",
      value: 127,
    },
    {
      name: "商家14",
      value: 57,
    },
    {
      name: "商家15",
      value: 99,
    },
  ];
  res.send(data);
});
app.get("/trend", (req, res) => {
  const data = {
    map: {
      title: "地区销量趋势",
      base: 310,
      unit: "万",
      data: [
        {
          name: "上海",
          data: [
            "155.13",
            "154.65",
            "171.46",
            "164.38",
            "237.23",
            "300.65",
            "240.29",
            "232.07",
            "193.31",
            "136.70",
            "48.64",
            "90.20",
          ],
        },
        {
          name: "北京",
          data: [
            "86.25",
            "33.80",
            "145.58",
            "21.79",
            "176.09",
            "132.41",
            "291.05",
            "191.89",
            "151.54",
            "94.25",
            "141.75",
            "157.14",
          ],
        },
        {
          name: "深圳",
          data: [
            "143.94",
            "186.29",
            "183.64",
            "251.48",
            "195.48",
            "152.16",
            "52.47",
            "184.12",
            "203.79",
            "39.16",
            "56.37",
            "161.64",
          ],
        },
        {
          name: "广州",
          data: [
            "57.60",
            "77.61",
            "307.24",
            "165.05",
            "175.41",
            "276.88",
            "269.04",
            "296.11",
            "105.31",
            "283.39",
            "134.08",
            "265.38",
          ],
        },
        {
          name: "重庆",
          data: [
            "200.82",
            "215.56",
            "249.80",
            "222.67",
            "216.98",
            "60.12",
            "309.68",
            "273.35",
            "150.99",
            "251.97",
            "26.15",
            "186.99",
          ],
        },
      ],
    },
    seller: {
      title: "商家销量趋势",
      base: 120,
      unit: "万",
      data: [
        {
          name: "商家1",
          data: [
            "33.00",
            "86.07",
            "28.77",
            "34.29",
            "102.45",
            "0.30",
            "50.50",
            "21.70",
            "25.41",
            "25.71",
            "66.90",
            "63.29",
          ],
        },
        {
          name: "商家2",
          data: [
            "12.83",
            "102.42",
            "37.37",
            "95.55",
            "45.45",
            "112.72",
            "113.53",
            "106.41",
            "75.67",
            "113.91",
            "37.32",
            "28.04",
          ],
        },
        {
          name: "商家3",
          data: [
            "73.54",
            "40.92",
            "89.81",
            "113.41",
            "76.34",
            "107.15",
            "55.61",
            "0.33",
            "106.29",
            "78.30",
            "98.05",
            "38.67",
          ],
        },
        {
          name: "商家4",
          data: [
            "47.19",
            "73.57",
            "44.60",
            "84.03",
            "62.82",
            "15.65",
            "64.72",
            "88.98",
            "29.25",
            "5.41",
            "79.11",
            "118.46",
          ],
        },
        {
          name: "商家5",
          data: [
            "74.84",
            "116.45",
            "107.69",
            "11.03",
            "17.31",
            "42.22",
            "97.60",
            "108.64",
            "43.87",
            "110.65",
            "5.96",
            "38.41",
          ],
        },
      ],
    },
    commodity: {
      title: "商品销量趋势",
      base: 50,
      unit: "万",
      data: [
        {
          name: "女装",
          data: [
            "47.71",
            "13.34",
            "19.30",
            "7.93",
            "41.93",
            "23.01",
            "22.63",
            "26.91",
            "0.62",
            "39.23",
            "48.74",
            "29.48",
          ],
        },
        {
          name: "手机数码",
          data: [
            "46.66",
            "46.52",
            "23.65",
            "1.73",
            "44.26",
            "47.07",
            "17.86",
            "40.20",
            "3.78",
            "31.46",
            "28.01",
            "8.63",
          ],
        },
        {
          name: "男装",
          data: [
            "26.98",
            "30.71",
            "42.59",
            "29.50",
            "26.86",
            "17.65",
            "30.15",
            "15.85",
            "9.28",
            "30.20",
            "32.35",
            "34.46",
          ],
        },
        {
          name: "大家电",
          data: [
            "20.26",
            "46.23",
            "43.84",
            "46.75",
            "28.29",
            "32.36",
            "45.30",
            "16.73",
            "40.40",
            "45.07",
            "29.86",
            "41.92",
          ],
        },
        {
          name: "美妆护肤",
          data: [
            "7.58",
            "23.66",
            "39.78",
            "30.20",
            "25.72",
            "36.20",
            "47.55",
            "35.39",
            "27.85",
            "37.56",
            "16.91",
            "3.91",
          ],
        },
      ],
    },
    common: {
      month: [
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月",
      ],
    },
    type: [
      {
        key: "map",
        text: "地区销量趋势",
      },
      {
        key: "seller",
        text: "商家销量趋势",
      },
      {
        key: "commodity",
        text: "商品销量趋势",
      },
    ],
  };
  res.send(data);
});
app.get("/map", (req, res) => {
  let value = {};
  fs.readFile("./map/online-retailers/第一天素材/04.资料/矢量地图数据/china.json", "utf-8", (err, data) => {
    value = JSON.parse(data);
    res.send(value);
  });
});
app.get("/changeMap", (req, res) => {
  const scatterData = [
    {
      name: "黄金用户",
      children: [
        {
          name: "武汉",
          value: [114.31, 30.52],
        },
        {
          name: "丹东",
          value: [124.37, 40.13],
        },
        {
          name: "张家口",
          value: [114.87, 40.82],
        },
        {
          name: "深圳",
          value: [114.07, 22.62],
        },
      ],
    },
    {
      name: "白金用户",
      children: [
        {
          name: "金华",
          value: [119.64, 29.12],
        },
        {
          name: "西安",
          value: [108.95, 34.27],
        },
      ],
    },
    {
      name: "砖石用户",
      children: [
        {
          name: "成都",
          value: [104.06, 30.67],
        },
      ],
    },
  ];
  res.send(scatterData)
});
app.get('/provice',(req,res)=>{
  // 前台放松拼音数据 然后打开相对应的json
  fs.readFile(req.query.path,'utf-8',(err,data)=>{
    res.send(JSON.parse(data))
  })
})
app.get('/rank',(req,res)=>{
  const rankData = [
    {
      "name": "广东",
      "value": 230
    },
    {
      "name": "福建",
      "value": 214
    },
    {
      "name": "浙江",
      "value": 203
    },
    {
      "name": "上海",
      "value": 310
    },
    {
      "name": "北京",
      "value": 289
    },
    {
      "name": "江苏",
      "value": 207
    },
    {
      "name": "四川",
      "value": 189
    },
    {
      "name": "重庆",
      "value": 195
    },
    {
      "name": "陕西",
      "value": 160
    },
    {
      "name": "湖南",
      "value": 140
    },
    {
      "name": "河北",
      "value": 170
    },
    {
      "name": "辽宁",
      "value": 106
    },
    {
      "name": "湖北",
      "value": 120
    },
    {
      "name": "江西",
      "value": 99
    },
    {
      "name": "天津",
      "value": 107
    },
    {
      "name": "吉林",
      "value": 143
    },
    {
      "name": "青海",
      "value": 65
    },
    {
      "name": "山东",
      "value": 166
    },
    {
      "name": "山西",
      "value": 134
    },
    {
      "name": "云南",
      "value": 87
    },
    {
      "name": "安徽",
      "value": 79
    }
  ]
  res.send(rankData)
})
app.get('/hotproduct',(req,res)=>{
  const hotProductData = [
    {
      "name": "女装",
      "children": [
        {
          "name": "裙装",
          "value": 56202,
          "children": [
            {
              "name": "套装裙",
              "value": 10281
            },
            {
              "name": "A字裙",
              "value": 22331
            },
            {
              "name": "复古连衣裙",
              "value": 23590
            }
          ]
        },
        {
          "name": "女士上衣",
          "value": 42013,
          "children": [
            {
              "name": "格子衬衫",
              "value": 7896
            },
            {
              "name": "雪纺衫",
              "value": 10422
            },
            {
              "name": "polo衫",
              "value": 23695
            }
          ]
        },
        {
          "name": "外套",
          "value": 210282,
          "children": [
            {
              "name": "牛仔外套",
              "value": 87330
            },
            {
              "name": "针织外套",
              "value": 65770
            },
            {
              "name": "风衣外套",
              "value": 57182
            }
          ]
        },
        {
          "name": "裤装",
          "value": 168203,
          "children": [
            {
              "name": "工装裤",
              "value": 68203
            },
            {
              "name": "阔腿裤",
              "value": 50000
            },
            {
              "name": "牛仔裤",
              "value": 50000
            }
          ]
        },
        {
          "name": "特色类目",
          "value": 40292,
          "children": [
            {
              "name": "大码女装",
              "value": 292
            },
            {
              "name": "旗袍",
              "value": 10000
            },
            {
              "name": "礼服",
              "value": 10000
            }
          ]
        },
        {
          "name": "童装",
          "value": 20313,
          "children": [
            {
              "name": "童衣",
              "value": 5000
            },
        {
              "name": "童裤子",
              "value": 15313
            }
          ]
        }
      ]
    },
    {
      "name": "手机数码",
      "children": [
        {
          "name": "手机",
          "value": 201023,
          "children": [
            {
              "name": "拍照手机",
              "value": 1023
            },
            {
              "name": "游戏手机",
              "value": 40000
            },
            {
              "name": "全面屏手机",
              "value": 160000
            }
          ]
        },
        {
          "name": "手机配件",
          "value": 103735,
          "children": [
            {
              "name": "手机壳",
              "value": 3735
            },
            {
              "name": "手机贴膜",
              "value": 70000
            },
            {
              "name": "创意配件",
              "value": 30000
            }
          ]
        },
        {
          "name": "摄影摄像",
          "value": 83834,
          "children": [
            {
              "name": "单反相机",
              "value": 3834
            },
            {
              "name": "微单",
              "value": 50000
            },
            {
              "name": "镜头",
              "value": 30000
            }
          ]
        },
        {
          "name": "影音娱乐",
          "value": 68384,
          "children": [
            {
              "name": "耳机/耳麦",
              "value": 30000
            },
            {
              "name": "音箱/音响",
              "value": 8384
            },
            {
              "name": "麦克风",
              "value": 30000
            }
          ]
        },
        {
          "name": "数码配件",
          "value": 45038,
          "children": [
            {
              "name": "存储卡",
              "value": 10000
            },
            {
              "name": "三脚架/云台",
              "value": 5038
            },
            {
              "name": "机身附件",
              "value": 30000
            }
          ]
        },
        {
          "name": "智能设备",
          "value": 90382,
          "children": [
            {
              "name": "智能手环",
              "value": 382
            },
            {
              "name": "智能家居",
              "value": 60000
            },
            {
              "name": "无人机",
              "value": 30000
            }
          ]
        },
        {
          "name": "其他",
          "value": 10201,
          "children": [
            {
              "name": "运营商",
              "value": 10000
            },
            {
              "name": "电子教育",
              "value": 201
            }
          ]
        }
      ]
    },
    {
      "name": "美妆护肤",
      "children": [
        {
          "name": "面部护肤",
          "value": 430291,
          "children": [
            {
              "name": "乳液/面霜",
              "value": 30291
            },
            {
              "name": "洁面",
              "value": 100000
            },
            {
              "name": "面膜",
              "value": 300000
            }
          ]
        },
        {
          "name": "彩妆",
          "value": 80284,
          "children": [
            {
              "name": "口红",
              "value": 60284
            },
            {
              "name": "粉底液",
              "value": 10000
            },
            {
              "name": "眉笔/眉粉",
              "value": 10000
            }
          ]
        },
        {
          "name": "男士护肤",
          "value": 40294,
          "children": [
            {
              "name": "洁面",
              "value": 10294
            },
            {
              "name": "剃须",
              "value": 5000
            },
            {
              "name": "护肤套装",
              "value": 25000
            }
          ]
        },
        {
          "name": "美妆工具",
          "value": 50939,
          "children": [
            {
              "name": "化妆棉",
              "value": 10939
            },
            {
              "name": "化妆刷",
              "value": 10000
            },
            {
              "name": "双眼皮贴",
              "value": 30000
            }
          ]
        },
        {
          "name": "其他",
          "value": 10921,
          "children": [
            {
              "name": "香水",
              "value": 921
            },
            {
              "name": "当季主推",
              "value": 10000
            }
          ]
        }
      ]
    }
  ]
  res.send(hotProductData)
})
app.get('/stock',(req,res)=>{
  const stockData = [{
    "name": "IPhone 11",
    "stock": 2310,
    "sales": 2103
}, {
    "name": "长筒靴系带",
    "stock": 34312,
    "sales": 23509
}, {
    "name": "打底毛衣宽松",
    "stock": 22140,
    "sales": 12830
}, {
    "name": "厚款羽绒服",
    "stock": 10842,
    "sales": 5492
}, {
    "name": "牛仔裤",
    "stock": 68102,
    "sales": 44043
}, {
    "name": "加厚卫衣",
    "stock": 12032,
    "sales": 8603
}, {
    "name": "衬衫",
    "stock": 9890,
    "sales": 8960
}, {
    "name": "HUAWEI P30",
    "stock": 20130,
    "sales": 12302
}, {
    "name": "手机壳",
    "stock": 89342,
    "sales": 42948
}, {
    "name": "打底裤",
    "stock": 5034,
    "sales": 1220
}]
  res.send(stockData)
})
// 监听
app.listen(port, () => {
  console.log("http://127.0.0.1:5500");
});

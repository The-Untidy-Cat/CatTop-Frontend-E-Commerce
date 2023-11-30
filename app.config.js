const OFFLINE_STORES = [
    {
        id: 1,
        name: "Miền Nam",
        address: "KP6, P.Linh Trung, TP. Thủ Đức, TP. Hồ Chí Minh",
        phone: "1900633579",
        openTime: "00:00 - 23:59"
    }
]

const PRICE_LIST = [
    {
      key: "duoi-10-trieu",
      label: "Dưới 10 triệu",
      min_price: 0,
      max_price: 10000000,
    },
    {
      key: "tu-10-den-15-trieu",
      label: "Từ 10 - 15 triệu",
      min_price: 10000000,
      max_price: 15000000,
    },
    {
      key: "tu-15-den-20-trieu",
      label: "Từ 15 - 20 triệu",
      min_price: 15000000,
      max_price: 20000000,
    },
    {
      key: "tu-20-den-25-trieu",
      label: "Từ 20 - 25 triệu",
      min_price: 20000000,
      max_price: 25000000,
    },
    {
      key: "tu-25-den-30-trieu",
      label: "Từ 25 - 30 triệu",
      min_price: 25000000,
      max_price: 30000000,
    },
    {
      key: "tren-30-trieu",
      label: "Trên 30 triệu",
      min_price: 30000000,
    },
  ];

module.exports = {
    OFFLINE_STORES,
    PRICE_LIST
}
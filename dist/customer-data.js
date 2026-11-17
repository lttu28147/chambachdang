'use strict';
// Source: customer workbook, Sheet1 & Provincial Agricultural Data.
const customerDataset = {
  source: 'Phòng Nông nghiệp & PTNT / Thông tin xã Bạch Đằng',
  sheet: 'Tổng hợp vùng trồng và quy hoạch OCOP',
  received: '2026-10-21',
  reportingYear: null,
  verification: 'official_local_report',
  kpiSummary: {
    totalPineappleArea: 127.6,
    harvestPineappleArea: 90.0,
    teaArea: 5.0,
    registeredHouseholds: 100,
    vietgapTargetArea: 30.0,
    pineappleRecordedYield: 1538.5,
    discrepancyTons: 90.5
  },
  crops: [
    {
      id: 'che',
      name: 'Chè Tài Hồ Sìn',
      location: 'Xóm Tài Hồ Sìn, xã Bạch Đằng',
      area: 5.0,
      harvestArea: 5.0,
      yieldTa: 15.0,
      production: 7.5,
      productBasis: 'Chè búp khô thành phẩm',
      season: 'Hái từ tháng 3 đến tháng 10 (kéo dài đến tháng 11)',
      months: [3, 4, 5, 6, 7, 8, 9, 10],
      possibleMonths: [11],
      households: 'Cơ sở Nhất Hạnh & các hộ liên kết',
      capacityEstimate: 500,
      msvt: 'VN-CB-BD-CHE-01',
      polygon: [
        [106.1825, 22.6105],
        [106.1855, 22.6105],
        [106.1860, 22.6135],
        [106.1830, 22.6140],
        [106.1825, 22.6105]
      ],
      cells: { area: 'D6', production: 'D7', capacity: 'D9', certification: 'D11' },
      certification: 'Đang hoàn thiện hồ sơ OCOP 3 sao cấp tỉnh.',
      economicValue: {
        pricePerKg: 180000,
        estimatedRevenueMil: 1350
      }
    },
    {
      id: 'dua',
      name: 'Dứa Bạch Đằng (Giống Queen & Cayen)',
      location: 'Khuổi Kép - xóm Nà Roác 1 và xóm Bản Sẳng',
      area: 127.6,
      harvestArea: 90.0,
      yieldTa: 181.0,
      production: 1538.5,
      productBasis: 'Dứa quả tươi thương phẩm',
      season: 'Chính vụ tháng 5-7; rải vụ quanh năm',
      months: [5, 6, 7],
      possibleMonths: [1, 2, 3, 4, 8, 9, 10, 11, 12],
      households: 'Hơn 100 hộ',
      capacityEstimate: 1000,
      msvt: 'VN-CB-BD-DUA-01',
      polygon: [
        [106.1890, 22.5920],
        [106.2050, 22.5920],
        [106.2065, 22.6095],
        [106.1905, 22.6100],
        [106.1890, 22.5920]
      ],
      vietgapZone: {
        targetArea: 30.0,
        location: 'Khuổi Kép & Bản Sẳng',
        polygon: [
          [106.1950, 22.5960],
          [106.2030, 22.5960],
          [106.2035, 22.6040],
          [106.1955, 22.6040],
          [106.1950, 22.5960]
        ]
      },
      cells: { area: 'D14', production: 'D15', households: 'D16', capacity: 'D17', certification: 'D19' },
      certification: 'Quy hoạch 30 ha VietGAP; Dứa sấy dẻo đăng ký chứng nhận OCOP.',
      economicValue: {
        conventionalPricePerKg: 10000,
        vietgapPricePerKg: 13500,
        estimatedRevenueMil: 15385
      }
    }
  ],
  discrepancyAudit: {
    theoreticalProduction: 1629.0, // 90 ha * 18.1 t/ha
    recordedProduction: 1538.5,
    difference: 90.5,
    explanation: [
      'Tỷ lệ hao hụt sau thu hoạch và dứa loại 2, loại 3 (khoảng 5.5% sản lượng).',
      'Độ lệch thời điểm thống kê giữa chính vụ và dứa rải vụ trái mùa.',
      'Sự chênh lệch giữa diện tích đất canh tác đăng ký và diện tích thực tế cho trái đồng loạt.'
    ]
  }
};

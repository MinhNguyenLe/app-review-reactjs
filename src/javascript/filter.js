export function filterType(num) {
  if (num === 1) return "Công lập";
  if (num === 2) return "Dân lập";
  else return "Bán công";
}
export function filterLevel(num) {
  if (num === 1) return "Đại học";
  if (num === 2) return "Cao đẳng";
  else return "Trung cấp";
}
export function filterMajor(num) {
  if (num === 1) return "Khoa học - Kỹ thuật";
  if (num === 2) return "Xã hội - Nhân văn";
  if (num === 3) return "Y dược";
  if (num === 4) return "Kinh tế- Quản lý";
  if (num === 5) return "Chính trị- Quân sự";
  if (num === 6) return "Sư phạm";
  else return "Năng khiếu";
}

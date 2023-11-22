export const formatDate = (date: string): string => {
  const now = new Date();
  const dataDate = new Date(date);

  const seconds = Math.floor((now.getTime() - dataDate.getTime()) / 1000);

  let diff = seconds / 31536000;

  if (diff > 1) {
    return Math.floor(diff) + "년전";
  }
  diff = seconds / 2592000;
  if (diff > 1) {
    return Math.floor(diff) + "달전";
  }
  diff = seconds / 86400;
  if (diff > 1) {
    // n주전
    if (Math.floor(diff) % 7 === 0) {
      diff = seconds / 604800;
      if (diff > 1) {
        return Math.floor(diff) + "주전";
      }
    }
    return Math.floor(diff) + "일전";
  }
  diff = seconds / 3600;
  if (diff > 1) {
    return Math.floor(diff) + "시간전";
  }
  // n분전
  diff = seconds / 60;
  if (diff > 1) {
    return Math.floor(diff) + "분전";
  }
  return "방금전";
};

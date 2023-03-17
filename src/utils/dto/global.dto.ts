export const userConfig = (obj) => {
  obj = {
    ...obj,
    loai_nguoi_dung: obj.permission.permission_name,
  };
  delete obj['permission'];
  return obj;
};

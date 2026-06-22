export const isDecimalNumber = (num: number | string) => {
  if (!num) return false;
  return !!Math.abs(Number(num)).toString().split(".")[1];
};

export const isEmail = (email: string = "") => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

function validateNumberLetters(val: string) {
  let numbers = 0;
  val = val.toString();
  for (let i = 0; i < val.length; i += 1) {
    if (val[i] >= "0" && val[i] <= "9") numbers += 1;
  }
  return numbers;
}

export const isPhone = (phone: string) => {
  const res = validateNumberLetters(phone);
  return res > 10 && res <= 13;
};

import { TimeZone } from "@/config";
import moment from "moment-timezone";

const parseAddress = require("parse-address-string");

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const formatTime = (
  time: Date | string | number = "now",
  format: string = "MM/DD/YYYY HH:mm",
) => {
  let rlt = "";
  if (time === "now") rlt = moment().tz(TimeZone).format(format);
  else rlt = moment(time).tz(TimeZone).format(format);
  if (rlt === "Invalid date") {
    if (typeof time === "string" && time.length > 0) {
      rlt = moment(Number(time)).tz(TimeZone).format(format);
    }
    if (rlt === "Invalid date") rlt = "";
  }
  return rlt;
};

export const multiSelectRender = (obj: any) => {
  let rlt = "";
  Object.keys(obj).map((key, index) => {
    rlt += `${index !== 0 && obj[key] && rlt.length ? ", " : ""}${obj[key] ? key : ""}`;
  });
  return rlt;
};

export const formatDate = (
  time: Date | string | number = "now",
  dateFormat = "MM/DD/YYYY",
) => {
  if (!time) return "";
  if (
    typeof time == "number" ||
    (!isNaN(Number(time)) && Number(time) > Math.pow(10, 10))
  )
    time = new Date(Number(time));

  let rlt = "";
  if (time === "now") rlt = moment().tz(TimeZone).format(dateFormat);
  else rlt = moment(time).tz(TimeZone).format(dateFormat);
  if (rlt === "Invalid date") {
    if (typeof time === "string" && time.length > 0) {
      rlt = moment(Number(time)).tz(TimeZone).format(dateFormat);
    }
    if (rlt === "Invalid date") rlt = "";
  }
  return rlt;
};

export const formatDateYMD = (time: Date | string | number = "now") => {
  return formatDate(time, "YYYY-MM-DD");
};

// Return "true" if "Today" <= "date"
export const isBeforeOrEqualToday = (date: Date | string | number) => {
  return moment()
    .tz(TimeZone)
    .isBefore(moment(new Date(date)).add(1, "days").tz(TimeZone));
};

export const getDaysDiff = (date1: any, date2: any) => {
  return moment(date1).tz(TimeZone).diff(moment(date2).tz(TimeZone), "days");
};

const removePrefix0 = (val: string) => {
  let rlt = "";
  if (val === "0") return "0";
  for (let i = 0; i < val.length; i += 1) {
    if (val[i] >= "0" && val[i] <= "9") {
      if (rlt.length === 0 && val[i] === "0") {
      } else rlt += val[i];
    }
  }
  return rlt;
};

const getOnlyNumber = (val: string) => {
  try {
    let rlt = "";
    let data = val.toString();
    for (let i = 0; i < data.length; i += 1) {
      if (data[i] >= "0" && data[i] <= "9") rlt += data[i];
    }
    return rlt;
  } catch {
    return "";
  }
};

export const thousandSeperator = (
  param: any,
  withoutDecimal = false,
  decimalCount = 2,
) => {
  try {
    param = param.toString();
    let sign = param[0];
    let no_decimal = removePrefix0(getOnlyNumber(param.split(".")[0]));
    let decimal = param.split(".")[1];
    let value: any = no_decimal.replace(/,/g, "");
    let caret = value.length - 1;
    while (caret - 3 > -1) {
      caret -= 3;
      value = value.split("");
      value.splice(caret + 1, 0, ",");
      value = value.join("");
    }
    if (decimal !== undefined && !withoutDecimal) {
      decimal = getOnlyNumber(decimal).substring(0, decimalCount);
      value += "." + decimal;
    }
    if (sign === "-") value = "-" + value;
    return value;
  } catch {
    return "";
  }
};

export const phoneConvertor = (val: any) => {
  try {
    let rlt = "";
    val = val.toString();
    for (let i = 0; i < val.length; i += 1) {
      // if (rlt.length < 11) {
      if (val[i] >= "0" && val[i] <= "9") rlt += val[i];
      // }
    }
    rlt = rlt.substring(0, 13);
    if (rlt.length > 10 && rlt.length <= 13) {
      const len = rlt.length;
      rlt = `+ ${rlt.substring(0, len - 10)} (${rlt.substring(len - 10, len - 7)}) ${rlt.substring(len - 7, len - 4)}-${rlt.substring(len - 4, len)}`;
    }
    return rlt;
  } catch {
    return "";
  }
};

export const creditScoreConvertor = (val: any) => {
  try {
    let rlt = "";
    val = val.toString();
    for (let i = 0; i < val.length; i += 1) {
      if (rlt.length < 10) {
        if (val[i] >= "0" && val[i] <= "9") rlt += val[i];
      }
    }
    if (rlt.length > 3) {
      rlt = rlt.substring(0, 3);
    }
    return rlt;
  } catch {
    return "";
  }
};

export function ssnConvertor(val: any) {
  try {
    let rlt = "";
    val = val.toString();
    for (let i = 0; i < val.length; i += 1) {
      if (rlt.length < 9) {
        if (val[i] >= "0" && val[i] <= "9") rlt += val[i];
      }
    }
    if (rlt.length === 9) {
      rlt = `${rlt.substring(0, 3)}-${rlt.substring(3, 5)}-${rlt.substring(5, 9)}`;
    }
    return rlt;
  } catch {
    return "";
  }
}

function entityTaxIDConvertor(val: any) {
  try {
    let rlt = "";
    val = val.toString();
    for (let i = 0; i < val.length; i += 1) {
      if (rlt.length < 9) {
        if (val[i] >= "0" && val[i] <= "9") rlt += val[i];
      }
    }
    if (rlt.length === 9) {
      rlt = `${rlt.substring(0, 2)}-${rlt.substring(2, 9)}`;
    }
    return rlt;
  } catch {
    return "";
  }
}

function countDecimal(param: number | string, decimalStep: number) {
  try {
    param = param.toString();
    let sign = param[0];
    let no_decimal = removePrefix0(getOnlyNumber(param.split(".")[0]));
    let decimal = param.split(".")[1];
    let value = no_decimal.replace(/,/g, "");
    if (decimal !== undefined) {
      decimal = getOnlyNumber(decimal).substring(0, decimalStep);
      value += "." + decimal;
    }
    if (sign === "-") value = "-" + value;
    return value;
  } catch {
    return "";
  }
}

export const InputConvert = function (data: any, value: any) {
  try {
    if (data.type === "phone") {
      value = phoneConvertor(value);
    }
    if (data.type === "thousandSep") {
      value = thousandSeperator(value);
    }
    if (data.type === "thousandSepNoDecimal") {
      value = thousandSeperator(value, true);
    }
    if (data.type === "ssn") {
      value = ssnConvertor(value);
    }
    // if (data.length) {
    //   value = `${value}`.substring(0, data.length)
    // }
    if (data.maxLength) {
      value = `${value}`.substring(0, data.maxLength);
    }
    if (data.type === "number" && data.decimalStep) {
      value = countDecimal(value, data.decimalStep);
    }
    if (data.type === "number" && data.maxNumberRange !== undefined) {
      if (removeComma(value) > data.maxNumberRange) value = data.maxNumberRange;
    }
    if (data.type === "creditScore") {
      value = creditScoreConvertor(value);
    }
    if (data.type === "entityTaxID") {
      value = entityTaxIDConvertor(value);
    }
    if (data.type === "email") {
      value = value.toLowerCase();
    }
    if (data.type === "date") {
      if (value === undefined || value === null) value = "";
      else value = formatDateYMD(value);
    }
    if (data.inputType === "text") {
      let { title = "" } = data;
      title = title.replace(/\s/g, "").toLowerCase();
      const nameTitles = ["firstname", "middlename", "lastname", "fullname"];
      for (const nameTitle of nameTitles) {
        if (title.includes(nameTitle)) {
          value = capitalize(value);
          break;
        }
      }
    }
  } catch {}
  return value;
};

export const capitalize = (str: string, lower = false) =>
  (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) =>
    match.toUpperCase(),
  );

export const sortByKey = (
  arr: Array<any>,
  key: string,
  sortOrder: 1 | -1 = 1,
) => {
  return arr.sort((a: any, b: any) => {
    const valueA = (a[key] || "").toString().toUpperCase(); // ignore upper and lowercase
    const valueB = (b[key] || "").toString().toUpperCase(); // ignore upper and lowercase
    if (valueA < valueB) return -sortOrder;
    if (valueA > valueB) return sortOrder;

    return 0;
  });
};

export function getPrice3decimal(
  param: string | number,
  withoutDecimal = false,
) {
  try {
    param = param.toString();
    let sign = param[0];
    let no_decimal = removePrefix0(getOnlyNumber(param.split(".")[0]));
    let decimal = param.split(".")[1];
    let value = no_decimal.replace(/,/g, "");
    let caret = value.length - 1;
    while (caret - 3 > -1) {
      caret -= 3;
      const values = value.split("");
      values.splice(caret + 1, 0, ",");
      value = values.join("");
    }
    if (decimal !== undefined && !withoutDecimal) {
      decimal = getOnlyNumber(decimal).substring(0, 3);
      value += "." + decimal;
    }
    if (sign === "-") value = "-" + value;
    return value;
  } catch {
    return "";
  }
}

export const removeComma = function (val: number | string) {
  try {
    val = val.toString();
    let sign = val[0];
    let rlt = "";
    for (let i = 0; i < val.length; i += 1) {
      if (val[i] >= "0" && val[i] <= "9") rlt += val[i];
      if (val[i] === ".") rlt += val[i];
    }
    let nRlt = Number(rlt);
    if (sign === "-") nRlt *= -1;
    return nRlt;
  } catch {
    return 0;
  }
};

export function getPrice2decimal(
  param: number | string,
  withoutDecimal = false,
  mustdecimal = false,
  withDollar = false,
) {
  try {
    param = param.toString();
    let sign = param[0];
    let no_decimal = removePrefix0(getOnlyNumber(param.split(".")[0]));
    let decimal = param.split(".")[1];
    let value = no_decimal.replace(/,/g, "");
    let caret = value.length - 1;
    while (caret - 3 > -1) {
      caret -= 3;
      const values = value.split("");
      values.splice(caret + 1, 0, ",");
      value = values.join("");
    }
    if (decimal !== undefined && !withoutDecimal) {
      decimal = getOnlyNumber(decimal).substring(0, 2);
      if (decimal.length === 1) decimal += "0";
      if (decimal !== "00" || mustdecimal) value += "." + decimal;
    }
    if (decimal === undefined && mustdecimal) {
      value += ".00";
    }
    if (withDollar) value = "$" + value;
    if (sign === "-") value = "-" + value;
    return value;
  } catch {
    return "";
  }
}

export const fileTobase64 = function (file: File, withExtention = false) {
  return new Promise(async (resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async () => {
      resolve({
        name: withExtention ? file.name : file.name.replace(".pdf", ""),
        base64: reader.result,
      });
    };

    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(file);
  });
};

export const blobToBase64 = function (blob: any) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
};

export const base64ToBlob = function (base64str: string) {
  return new Promise(async (resolve, reject) => {
    try {
      base64str = base64str.split("base64,")[1];
      // decode base64 string, remove space for IE compatibility
      var binary = atob(base64str.replace(/\s/g, ""));
      var len = binary.length;
      var buffer = new ArrayBuffer(len);
      var view = new Uint8Array(buffer);
      for (var i = 0; i < len; i++) {
        view[i] = binary.charCodeAt(i);
      }

      // create the blob object with content-type "application/pdf"
      var blob = new Blob([view], { type: "application/pdf" });

      resolve(blob);
    } catch (error) {
      reject(error);
    }
  });
};

export function getItemsFromFullAddress(fullAddress: string) {
  return new Promise((resolve, reject) => {
    parseAddress(fullAddress, (err: any, addressObj: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(addressObj);
      }
    });
  });
}

export function validateGoogleAddress(fullAddress: string): Promise<any> {
  return new Promise(async (resolve) => {
    let rlt = {
      street_address1: "",
      city: "",
      state: "",
      postal_code: "",
    };
    try {
      const res = (await getItemsFromFullAddress(fullAddress)) as any;
      Object.keys(rlt).map((key) => {
        if (res[key] !== undefined && res[key] !== null)
          (rlt as any)[key] = res[key];
        return true;
      });
      resolve(rlt);
    } catch {
      resolve(rlt);
    }
  });
}

export function borrowerFullName(borrower: Record<string, string>) {
  return [borrower.firstName, borrower.middleName, borrower.lastName]
    .join(" ")
    .trim()
    .replace("  ", " ");
}

export const dayToMSec = (days: number) => {
  return days * 24 * 60 * 60 * 1000;
};

export const getUniqueFileName = (fileName: string, fileNames: string[]) => {
  if (!fileNames.includes(fileName)) return fileName;

  let newFilename = fileName;
  if (!fileName.match(/ \((\d){1,}\)./))
    newFilename = fileName.replace(".", " (1).");

  let index = 1;
  while (true) {
    newFilename = newFilename.replace(/ \((\d){1,}\)./, ` (${index}).`);
    if (!fileNames.includes(newFilename)) return newFilename;
    index += 1;
    if (index >= 1000) break;
  }

  return fileName.replace(".", ` (${Date.now()}).`);
};

export const solveDecimalJavascriptSum = (
  list: Array<number>,
  positions: number = 3,
) => {
  const factor = Math.pow(10, positions);
  let rlt = 0;
  list.map((item) => {
    rlt += Number(item.toFixed(positions)) * factor;
  });
  return Number((rlt / factor).toFixed(positions));
};

export const filterObject = (values: Record<string, boolean>) => {
  return Object.keys(values).filter((key) => values[key]);
};

export const serialize = (obj: Record<string, any>, prefix = ""): string => {
  var str = [],
    p;
  for (p in obj) {
    if (obj.hasOwnProperty(p)) {
      var k = prefix ? prefix + "[" + p + "]" : p,
        v = obj[p];
      str.push(
        v !== null && typeof v === "object"
          ? serialize(v, k)
          : encodeURIComponent(k) + "=" + encodeURIComponent(v),
      );
    }
  }
  return str.join("&");
};

export const getFileName = (fileKey: string) => {
  let rlt = fileKey.replace(/^.*[\\\/]/, "");
  try {
    const params = rlt.split("-");
    const len = params.length;
    if (len) {
      let val = params[len - 1];
      const exts = val.split(".");
      if (exts.length === 2) val = exts[0];
      rlt = rlt.replace(`-${val}`, "");
    }
  } catch {}
  return rlt;
};

// Convert from HH:MM to HH:MM AM
export const convertTo12HoursMode = (time: string) => {
  const timeStr = time.split(":");

  let symbol = " AM";

  if (Number(timeStr[0]) === 12) symbol = " PM";
  else if (Number(timeStr[0]) > 12) {
    timeStr[0] = String(Number(timeStr[0]) - 12);
    symbol = " PM";
  }

  return timeStr[0] + ":" + timeStr[1] + symbol;
};

export const fromToNumberOptions = (start: number, end: number) => {
  let rlt: any = {};
  for (let i = start; i <= end; i += 1) {
    rlt[i] = i.toString();
  }
  return rlt;
};

export function convertToUrlCase(str: string) {
  let url = str.replace(":", "-");
  url = url.toLowerCase();
  return url;
}

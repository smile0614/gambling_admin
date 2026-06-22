import { toast } from "react-toastify";

export const transformWalletAddress = (address: string, dots: number = 3) => {
  if (!address) return "No Data";
  const match = address.match(/^([a-zA-Z0-9]{7})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/);
  if (!match) return address;
  return `${match[1]}${" .".repeat(dots)} ${match[2]}`;
};

export const transformId = (id: string, len: number = 5) => {
  if (!id) return "No Id";
  return `${id.substring(0, len)}...`;
};

export function formatCompactNumber(
  number: number,
  setting: Record<string, string | number>,
) {
  try {
    const res = Intl.NumberFormat("en", setting).format(number);
    return res;
  } catch (error) {
    return 0;
  }
}

export function currencyFormat1(number: number) {
  return formatCompactNumber(number, {
    notation: "compact",
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 4,
    miniumFractionDigits: 2,
  });
}

export function currencyFormat(
  number: number,
  zeroNum: number,
  symbol: string = "$",
) {
  try {
    let res = "";
    if (number === 0) {
      res = new Array(2).fill("0").join("");
      res = `${symbol} 0.${res}`;
      return res;
    }
    const zeroCount = -Math.floor(Math.log10(number));
    if (zeroNum < 5) {
      res = formatCompactNumber(number, {
        maximumFractionDigits: zeroNum,
        minimumFractionDigits: 2,
      }).toString();
      return `${symbol} ${res}`;
    }
    if (zeroCount < zeroNum) {
      res = formatCompactNumber(number, {
        maximumFractionDigits: zeroNum,
        minimumFractionDigits: 2,
      }).toString();
      return `${symbol} ${res}`;
    }
    res = formatCompactNumber(number, {
      maximumFractionDigits: zeroNum,
      minimumFractionDigits: 2,
    }).toString();
    return `${symbol} ${res}`;
  } catch (error) {
    return "";
  }
}

export function copyClipBoard(text: string, msg: string = "Copied") {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text);
  } else {
    // text area method
    let textArea = document.createElement("textarea");
    textArea.value = text;
    // make the textarea out of viewport
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand("copy");
    textArea.remove();
  }
  toast.success(msg, { toastId: "copy" });
}

export function getTransactionLink(network: string) {
  switch (network.toLowerCase()) {
    case "bsc":
      return "https://bscscan.com/tx";
    case "ethereum":
      return "https://etherscan.io/tx";
    case "polygon":
      return "https://polygonscan.com/tx";

    default:
      return "https://bscscan.com/tx";
  }
}

export const getStatusColor = (status: string) => {
  let color = "#ff4500";
  switch (status?.toLowerCase()) {
    case "processing":
      color = "#ff4500";
      break;
    case "pending":
      color = "#ff4500";
      break;
    case "rejected":
      color = "#c31414";
      break;
    case "failed":
      color = "#c31414";
      break;
    case "required":
    case "accepted":
    case "complete":
      color = "#3BC117";
      break;

    case "bet":
    case "lose":
      color = "#c31414";
      break;
    case "win":
      color = "#3BC117";
      break;

    default:
      color = "#3BC117";
      break;
  }
  return color;
};

export const getKycStatus = (status: number) => {
  switch (status) {
    case 1:
      return "Required";
    case 2:
      return "Pending";
    case 3:
      return "Accepted";
    case 4:
      return "Rejected";

    default:
      return "Required";
  }
};

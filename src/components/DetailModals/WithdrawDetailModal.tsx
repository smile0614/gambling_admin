import Image from "next/image";
import CustomPopup from "../Popup/CustomPopup";
import {
  currencyFormat1,
  formatCompactNumber,
  transformId,
  transformWalletAddress,
} from "@/utils/format";
import { getStatusColor } from "@/utils/common";
import CopyButton from "../Copy/Copy";
import cn from "classnames";
import { approveWithdraw, rejectWithdraw } from "@/services/apis/withdraw";
import { toast } from "react-toastify";

interface WithdrawDetailModal {
  show: boolean;
  onClose: () => void;
  setShow: (show: boolean) => void;
  transaction: any;
  setAction: (action: string | number) => void;
}

const WithdrawDetailModal: React.FC<WithdrawDetailModal> = ({
  show,
  onClose,
  setShow,
  transaction,
  setAction,
}) => {
  const onApprove = async () => {
    if (!transaction?.id) return;
    const response = await approveWithdraw({ transaction_id: transaction?.id });
    const { status, message } = response;
    if (status) {
      toast.success(message ? message : "Withdraw is approved", {
        toastId: "withdrawApprove",
      });
      setAction(Date.now());
    } else {
      toast.error(message ? message : "Error", { toastId: "withdrawApprove" });
    }
  };

  const onReject = async () => {
    if (!transaction?.id) return;
    const response = await rejectWithdraw({ transaction_id: transaction?.id });
    const { status, message } = response;
    if (status) {
      toast.success(message ? message : "Withdraw is rejected", {
        toastId: "withdrawReject",
      });
      setAction(Date.now());
    } else {
      toast.error(message ? message : "Error", { toastId: "withdrawReject" });
    }
  };

  return (
    <CustomPopup
      showModal={show}
      setShowModal={setShow}
      onClose={onClose}
      title="Withdraw Transaction Detail"
      classNames="max-w-md"
    >
      <div className="flex w-full flex-col gap-1">
        <div className="flex flex-col items-center justify-center gap-2 text-center text-title-md font-bold text-black dark:text-white">
          <Image
            alt=""
            width={30}
            height={30}
            className="h-[50px] w-[50px]"
            src={`/images/fiats/${String(transaction?.symbol).toUpperCase()}.png`}
            onError={(e) => {
              return `/images/fiats/USDT.png`;
            }}
          />
          <h3>
            {`${formatCompactNumber(transaction?.amount, {
              maximumFractionDigits: 4,
              miniumFractionDigits: 2,
            })} ${transaction?.symbol}`}{" "}
            ({currencyFormat1(transaction?.amount_usd)})
          </h3>
        </div>

        <div className="flex justify-between">
          <h4>Fee</h4>
          <p className="font-bold capitalize">
            {formatCompactNumber(transaction?.fee, {
              maximumFractionDigits: 4,
              miniumFractionDigits: 2,
            })} {transaction?.symbol}
          </p>
        </div>

        <div className="flex justify-between">
          <h4>Fee USD</h4>
          <p
            className="font-bold capitalize"
          >
            {currencyFormat1(transaction?.fee_usd)}
          </p>
        </div>

        <div className="flex justify-between">
          <h4>Status</h4>
          <p
            className="font-bold capitalize"
            style={{ color: getStatusColor(transaction?.status) }}
          >
            {transaction?.status}
          </p>
        </div>

        {String(transaction?.status).toLocaleLowerCase() === "pending" && (
          <div className="flex justify-between">
            <h4>Pending Reason</h4>
            <p className="">{transaction?.pendingReason}</p>
          </div>
        )}

        <div className="flex justify-between">
          <h4>Network</h4>
          <p className="font-bold capitalize">{transaction?.network}</p>
        </div>

        <div className="flex justify-between">
          <h4>Order Id</h4>
          <div className="flex gap-2">
            <p className="font-bold capitalize">
              {transformId(transaction?.id, 12)}
            </p>
            <CopyButton text={transaction?.id} />
          </div>
        </div>

        <div className="flex w-full justify-between gap-4 text-wrap">
          <h4>Transaction Hash</h4>
          <div className="flex gap-2">{transaction?.hash}</div>
        </div>

        <div className="flex w-full justify-between gap-4 text-wrap">
          <h4>Time</h4>
          <p className="text-wrap font-bold capitalize">
            {transaction?.created_at}
          </p>
        </div>

        <div className="flex w-full justify-between gap-4 text-wrap">
          <h4>From</h4>
          <div className="flex gap-2">
            <p className="text-wrap font-bold capitalize">
              {transformWalletAddress(transaction?.from_address, 4)}
            </p>
            <CopyButton text={transaction?.from_address} />
          </div>
        </div>

        <div className="flex w-full justify-between gap-4 text-wrap break-all">
          <h4>To</h4>
          <div className="flex gap-2">
            <p className="text-wrap text-right font-bold capitalize">
              {transformWalletAddress(transaction?.to_address, 4)}
            </p>
            <CopyButton text={transaction?.to_address} />
          </div>
        </div>

        <div className="flex w-full justify-between gap-4 text-wrap">
          <h4>User</h4>
          <p className="text-wrap font-bold capitalize">
            {transaction?.userName}
          </p>
        </div>

        {transaction?.userType && (
          <div className="flex w-full justify-between gap-4 text-wrap">
            <h4>User Type</h4>
            <p className="text-wrap font-bold capitalize">
              {transaction?.userType}
            </p>
          </div>
        )}

        {String(transaction?.status).toLocaleLowerCase() === "pending" && (
          <div className="mt-4 flex w-full justify-end gap-4">
            <button
              className={cn(
                `flex w-full max-w-40 items-center justify-center gap-2 rounded-sm border border-primary p-2 text-center text-primary   shadow-sm hover:bg-primary hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`,
              )}
              onClick={onApprove}
            >
              Approve
            </button>
            <button
              className={cn(
                `flex w-full max-w-40 items-center justify-center gap-2 rounded-sm border border-primary p-2 text-center text-primary   shadow-sm hover:bg-primary hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`,
              )}
              onClick={onReject}
            >
              Reject
            </button>
          </div>
        )}
      </div>
    </CustomPopup>
  );
};

export default WithdrawDetailModal;

import Image from "next/image";
import CustomPopup from "../Popup/CustomPopup";
import {
  formatCompactNumber,
  transformId,
  transformWalletAddress,
} from "@/utils/format";
import { getStatusColor } from "@/utils/common";
import CopyButton from "../Copy/Copy";

interface DepositDetailModal {
  show: boolean;
  onClose: () => void;
  setShow: (show: boolean) => void;
  transaction: any;
}

const DepositDetailModal: React.FC<DepositDetailModal> = ({
  show,
  onClose,
  setShow,
  transaction,
}) => {
  return (
    <CustomPopup
      showModal={show}
      setShowModal={setShow}
      onClose={onClose}
      title="Deposit Transaction Detail"
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
          <h3>{`${Number(transaction?.amount || 0).toFixed(2)} ${transaction?.symbol}`}</h3>
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
          <div className="flex gap-2">
            {transaction?.hash}
            {/* <CopyButton text={transaction?.hash} /> */}
          </div>
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
      </div>
    </CustomPopup>
  );
};

export default DepositDetailModal;

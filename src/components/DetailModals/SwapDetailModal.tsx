import Image from "next/image";
import CustomPopup from "../Popup/CustomPopup";
import {
  formatCompactNumber,
  transformId,
  transformWalletAddress,
} from "@/utils/format";
import { getStatusColor } from "@/utils/common";
import CopyButton from "../Copy/Copy";
import SvgColor from "@/assets/svgs/SvgColor";

interface SwapDetailModal {
  show: boolean;
  onClose: () => void;
  setShow: (show: boolean) => void;
  transaction: any;
}

const SwapDetailModal: React.FC<SwapDetailModal> = ({
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
      title="Swap Transaction Detail"
      classNames="max-w-md"
    >
      <div className="flex w-full flex-col gap-1">
        <div className="flex justify-center gap-2">
          <div className="flex flex-col items-center justify-center gap-2 text-center text-title-md font-bold text-black dark:text-white">
            <Image
              alt=""
              width={30}
              height={30}
              className="h-[50px] w-[50px]"
              src={`/images/fiats/${String(transaction?.from_symbol).toUpperCase()}.png`}
              onError={(e) => {
                return `/images/fiats/USDT.png`;
              }}
            />
            <h3>{`${Number(transaction?.from_amount || 0).toFixed(2)} ${transaction?.from_symbol}`}</h3>
          </div>
          <div className="flex flex-col items-center justify-center">
              <SvgColor src="/assets/icons/swap.svg" style={{ width: 24, height: 24 }} className="dark:text-white text-black font-bold"/>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 text-center text-title-md font-bold text-black dark:text-white">
            <Image
              alt=""
              width={30}
              height={30}
              className="h-[50px] w-[50px]"
              src={`/images/fiats/${String(transaction?.to_symbol).toUpperCase()}.png`}
              onError={(e) => {
                return `/images/fiats/USDT.png`;
              }}
            />
            <h3>{`${Number(transaction?.to_amount || 0).toFixed(2)} ${transaction?.to_symbol}`}</h3>
          </div>
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
          <h4>From Amount</h4>
          <div className="flex gap-2">
            <p className="text-wrap font-bold capitalize">
              {formatCompactNumber(transaction?.from_amount, {
                maximumFractionDigits: 4,
                miniumFractionDigits: 2,
              })}
            </p>
          </div>
        </div>

        <div className="flex w-full justify-between gap-4 text-wrap">
          <h4>From Amount USD</h4>
          <div className="flex gap-2">
            <p className="text-wrap font-bold capitalize">
              {formatCompactNumber(transaction?.from_amount_usd, {
                maximumFractionDigits: 4,
                miniumFractionDigits: 2,
                currency: "USD",
                style: "currency",
              })}
            </p>
          </div>
        </div>

        <div className="flex w-full justify-between gap-4 text-wrap">
          <h4>To Amount</h4>
          <div className="flex gap-2">
            <p className="text-wrap font-bold capitalize">
              {formatCompactNumber(transaction?.to_amount, {
                maximumFractionDigits: 4,
                miniumFractionDigits: 2,
              })}
            </p>
          </div>
        </div>

        <div className="flex w-full justify-between gap-4 text-wrap">
          <h4>To Amount USD</h4>
          <div className="flex gap-2">
            <p className="text-wrap font-bold capitalize">
              {formatCompactNumber(transaction?.to_amount_usd, {
                maximumFractionDigits: 4,
                miniumFractionDigits: 2,
                currency: "USD",
                style: "currency",
              })}
            </p>
          </div>
        </div>

        <div className="flex w-full justify-between gap-4 text-wrap">
          <h4>User</h4>
          <p className="text-wrap font-bold capitalize">
            {transaction?.userName}
          </p>
        </div>

        <div className="flex w-full justify-between gap-4 text-wrap">
          <h4>User Type</h4>
          <p className="text-wrap font-bold capitalize">
            {transaction?.userType}
          </p>
        </div>
      </div>
    </CustomPopup>
  );
};

export default SwapDetailModal;

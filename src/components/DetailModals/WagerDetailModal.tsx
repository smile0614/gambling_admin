import Image from "next/image";
import CustomPopup from "../Popup/CustomPopup";
import {
  formatCompactNumber,
  transformId,
  transformWalletAddress,
} from "@/utils/format";
import { getStatusColor } from "@/utils/common";
import CopyButton from "../Copy/Copy";

interface WagerDetailModal {
  show: boolean;
  onClose: () => void;
  setShow: (show: boolean) => void;
  transaction: any;
}

const WagerDetailModal: React.FC<WagerDetailModal> = ({
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
      title="Wager Transaction Detail"
      classNames="max-w-md"
    >
      <div className="flex w-full flex-col gap-1">
        <div className="flex flex-col items-center justify-center gap-2 text-center text-title-md font-bold text-black dark:text-white">
          <Image
            alt=""
            width={30}
            height={30}
            className="h-[50px] w-[50px]"
            src={`/images/fiats/${String(transaction?.currency).toUpperCase()}.png`}
            onError={(e) => {
              return `/images/fiats/USDT.png`;
            }}
          />
          <h3>{`${Number(transaction?.profit_amount || 0).toFixed(2)} ${transaction?.currency}`}</h3>
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
          <h4>Order Id</h4>
          <div className="flex gap-2">
            <p className="font-bold capitalize">
              {transformId(transaction?.id, 12)}
            </p>
            <CopyButton text={transaction?.id} />
          </div>
        </div>

        <div className="flex w-full justify-between gap-4 text-wrap">
          <h4>Game Id</h4>
          <div className="flex gap-2">
            <p className="text-wrap font-bold capitalize">
              {transformId(transaction?.gameId, 12)}
            </p>
            <CopyButton text={transaction?.gameId} />
          </div>
        </div>

        <div className="flex w-full justify-between gap-4 text-wrap">
          <h4>Game Identifier</h4>
          <div className="flex gap-2 truncate">
            <p className="truncate text-wrap font-bold capitalize">
              {transaction?.gameIdentifier}
            </p>
            <CopyButton text={transaction?.gameIdentifier} />
          </div>
        </div>

        <div className="flex w-full justify-between gap-4 text-wrap">
          <h4>Game</h4>
          <div className="flex gap-2">
            <p className="text-wrap font-bold capitalize">
              {transaction?.game_title}
            </p>
            <CopyButton text={transaction?.game_title} />
          </div>
        </div>

        <div className="flex w-full justify-between gap-4 text-wrap">
          <h4>Bet Amount</h4>
          <div className="flex gap-2">
            <p className="text-wrap font-bold capitalize">
              {formatCompactNumber(transaction?.amount, {
                maximumFractionDigits: 4,
                miniumFractionDigits: 2,
              })}
            </p>
          </div>
        </div>

        <div className="flex w-full justify-between gap-4 text-wrap">
          <h4>Bet Amount USD</h4>
          <div className="flex gap-2">
            <p className="text-wrap font-bold capitalize">
              {formatCompactNumber(transaction?.amount_usd, {
                maximumFractionDigits: 4,
                miniumFractionDigits: 2,
                currency: "USD",
                style: "currency",
              })}
            </p>
          </div>
        </div>

        <div className="flex w-full justify-between gap-4 text-wrap">
          <h4>Profit Amount</h4>
          <div className="flex gap-2">
            <p className="text-wrap font-bold capitalize">
              {formatCompactNumber(transaction?.profit_amount, {
                maximumFractionDigits: 4,
                miniumFractionDigits: 2,
              })}
            </p>
          </div>
        </div>

        <div className="flex w-full justify-between gap-4 text-wrap">
          <h4>Profit Amount USD</h4>
          <div className="flex gap-2">
            <p className="text-wrap font-bold capitalize">
              {formatCompactNumber(transaction?.profit_amount_usd, {
                maximumFractionDigits: 4,
                miniumFractionDigits: 2,
                currency: "USD",
                style: "currency",
              })}
            </p>
          </div>
        </div>

        <div className="flex w-full justify-between gap-4 text-wrap">
          <h4>Profit Multiplier</h4>
          <div className="flex gap-2">
            <p className="text-wrap font-bold capitalize">
              {formatCompactNumber(transaction?.profitMultiplier, {
                maximumFractionDigits: 4,
                miniumFractionDigits: 2,
              })}
              X
            </p>
          </div>
        </div>

        <div className="flex w-full justify-between gap-4 text-wrap">
          <h4>Time</h4>
          <p className="text-wrap font-bold capitalize">
            {transaction?.created_at}
          </p>
        </div>

        {transaction?.userId && (
          <div className="flex w-full justify-between gap-4 text-wrap">
            <h4>User ID</h4>
            <div className="flex gap-2">
              <p className="text-wrap font-bold capitalize">
                {transformId(transaction?.userId, 12)}
              </p>
              <CopyButton text={transaction?.userId} />
            </div>
          </div>
        )}

        {transaction?.userName && (
          <div className="flex w-full justify-between gap-4 text-wrap">
            <h4>User</h4>
            <p className="text-wrap font-bold capitalize">
              {transaction?.userName}
            </p>
          </div>
        )}

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

export default WagerDetailModal;

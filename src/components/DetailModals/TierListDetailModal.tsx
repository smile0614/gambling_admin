import Image from "next/image";
import CustomPopup from "../Popup/CustomPopup";
import {
  formatCompactNumber,
  transformId,
  transformWalletAddress,
} from "@/utils/format";
import { getStatusColor } from "@/utils/common";
import CopyButton from "../Copy/Copy";
import { avatarUrl } from "@/config";

interface TierDetailModal {
  show: boolean;
  onClose: () => void;
  setShow: (show: boolean) => void;
  userInfo: any;
}

const TierDetailModal: React.FC<TierDetailModal> = ({
  show,
  onClose,
  setShow,
  userInfo,
}) => {
  return (
    <CustomPopup
      showModal={show}
      setShowModal={setShow}
      onClose={onClose}
      title="User Detail"
      classNames="max-w-md"
    >
      <div className="flex w-full flex-col gap-1">
        <div className="flex flex-col items-center justify-center gap-2 text-center text-title-md font-bold text-black dark:text-white">
          <h3>{`${userInfo?.name}`}</h3>
        </div>

        <div className="flex justify-between">
          <h4>User Id</h4>
          <div className="flex gap-2">
            <p className="font-bold">{transformId(userInfo?.id, 12)}</p>
            <CopyButton text={userInfo?.id} />
          </div>
        </div>

        <div className="flex justify-between">
          <h4>VIP Level</h4>
          <div className="flex gap-2">
            <p className="font-bold">{userInfo?.vipLevel}</p>
          </div>
        </div>

        <div className="flex justify-between">
          <h4>Registered Date</h4>
          <div className="flex gap-2">
            <p className="font-bold">{userInfo?.registeredAt}</p>
          </div>
        </div>

        <div className="flex justify-between">
          <h4>Total Deposit Amount</h4>
          <div className="flex gap-2">
            <p className="font-bold">
              {formatCompactNumber(userInfo?.depositAmountUsd, {
                maximumFractionDigits: 4,
                miniumFractionDigits: 2,
                style: "currency",
                currency: "USD",
              })}
            </p>
          </div>
        </div>

        <div className="flex justify-between">
          <h4>Total Withdraw Amount</h4>
          <div className="flex gap-2">
            <p className="font-bold">
              {formatCompactNumber(userInfo?.withdrawAmountUsd, {
                maximumFractionDigits: 4,
                miniumFractionDigits: 2,
                style: "currency",
                currency: "USD",
              })}
            </p>
          </div>
        </div>

        <div className="flex justify-between">
          <h4>Total Wager Amount</h4>
          <div className="flex gap-2">
            <p className="font-bold">
              {formatCompactNumber(userInfo?.wagerAmountUsd, {
                maximumFractionDigits: 4,
                miniumFractionDigits: 2,
                style: "currency",
                currency: "USD",
              })}
            </p>
          </div>
        </div>

        <div className="flex justify-between">
          <h4>Total Win Amount</h4>
          <div className="flex gap-2">
            <p className="font-bold">
              {formatCompactNumber(userInfo?.winAmountUsd, {
                maximumFractionDigits: 4,
                miniumFractionDigits: 2,
                style: "currency",
                currency: "USD",
              })}
            </p>
          </div>
        </div>

        <div className="flex justify-between">
          <h4>Total Lose Amount</h4>
          <div className="flex gap-2">
            <p className="font-bold">
              {formatCompactNumber(userInfo?.loseAmountUsd, {
                maximumFractionDigits: 4,
                miniumFractionDigits: 2,
                style: "currency",
                currency: "USD",
              })}
            </p>
          </div>
        </div>

        <div className="flex justify-between">
          <h4>Total Bonus Amount</h4>
          <div className="flex gap-2">
            <p className="font-bold">
              {formatCompactNumber(userInfo?.bonusAmountUsd, {
                maximumFractionDigits: 4,
                miniumFractionDigits: 2,
                style: "currency",
                currency: "USD",
              })}
            </p>
          </div>
        </div>
      </div>
    </CustomPopup>
  );
};

export default TierDetailModal;

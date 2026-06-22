import Image from "next/image";
import CustomPopup from "../Popup/CustomPopup";
import {
  formatCompactNumber,
  transformId,
  transformWalletAddress,
} from "@/utils/format";
import { getKycStatus, getStatusColor } from "@/utils/common";
import CopyButton from "../Copy/Copy";
import { avatarUrl, IdUrl } from "@/config";
import cn from "classnames";
import { updateKyc } from "@/services/apis/users";
import { toast } from "react-toastify";

interface UserDetailModal {
  show: boolean;
  onClose: () => void;
  setShow: (show: boolean) => void;
  userInfo: any;
}

const UserDetailModal: React.FC<UserDetailModal> = ({
  show,
  onClose,
  setShow,
  userInfo,
}) => {
  const onKyc = async (status: 3 | 4) => {
    if (!userInfo?.id) return;
    const response = await updateKyc({ user_id: userInfo?.id, type: status });
    toast.success("Successfully Updated", { toastId: "kyc" });
    onClose();
  };

  return (
    <CustomPopup
      showModal={show}
      setShowModal={setShow}
      onClose={() => setShow(false)}
      title="User Detail"
      classNames="max-w-md"
    >
      <div className="flex w-full flex-col gap-1">
        <div className="flex flex-col items-center justify-center gap-2 text-center text-title-md font-bold text-black dark:text-white">
          <Image
            width={30}
            height={40}
            src={`${avatarUrl}/${userInfo?.avatar}`}
            alt=""
            style={{ width: 80, height: 80 }}
            onError={(e) => {
              e.currentTarget.src = "/images/default-avatar.png";
            }}
          />

          {userInfo?.name}
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
          <h4>Email</h4>
          <div className="flex gap-2">
            <p className="font-bold">{userInfo?.email}</p>
          </div>
        </div>

        <div className="flex justify-between">
          <h4>Phone</h4>
          <div className="flex gap-2">
            <p className="font-bold">{userInfo?.phone}</p>
          </div>
        </div>

        <div className="flex justify-between">
          <h4>Telegram</h4>
          <div className="flex gap-2">
            <p className="font-bold">{userInfo?.tg}</p>
          </div>
        </div>

        <div className="flex justify-between">
          <h4>Wallet</h4>
          <div className="flex gap-2">
            <p className="font-bold">
              {transformWalletAddress(userInfo?.walletAddress)}
            </p>
            <CopyButton text={userInfo?.walletAddress} />
          </div>
        </div>

        <div className="flex justify-between">
          <h4>KYC Status</h4>
          <div className="flex gap-2">
            <p
              className="font-bold"
              style={{ color: getStatusColor(getKycStatus(userInfo?.kyc)) }}
            >
              {getKycStatus(userInfo?.kyc)}
            </p>
          </div>
        </div>

        {userInfo?.kycFront && (
          <div className="flex justify-between">
            <h4>KYC Front Photo</h4>
            <div className="flex gap-2">
              <a href={`${IdUrl}/${userInfo?.kycFront}`} target="_blank">
                Kyc Frontend Photo
              </a>
            </div>
          </div>
        )}

        {userInfo?.kycBack && (
          <div className="flex justify-between">
            <h4>KYC Back Photo</h4>
            <div className="flex gap-2">
              <a href={`${IdUrl}/${userInfo?.kycBack}`} target="_blank">
                Kyc Back Photo
              </a>
            </div>
          </div>
        )}

        <div className="flex justify-between">
          <h4>Referral Code</h4>
          <div className="flex gap-2">
            <p className="font-bold">{userInfo?.referralCode}</p>.
            <CopyButton text={userInfo?.referralCode} />
          </div>
        </div>

        <div className="flex justify-between">
          <h4>Country</h4>
          <div className="flex gap-2">
            <p className="font-bold">{userInfo?.country}</p>
          </div>
        </div>

        <div className="flex justify-between">
          <h4>Language</h4>
          <div className="flex gap-2">
            <p className="font-bold capitalize">{userInfo?.language}</p>
          </div>
        </div>

        <div className="flex justify-between">
          <h4>Registered Date</h4>
          <div className="flex gap-2">
            <p className="font-bold">{userInfo?.registered}</p>
          </div>
        </div>

        <div className="flex justify-between">
          <h4>Restricted Date</h4>
          <div className="flex gap-2">
            <p className="font-bold">{userInfo?.restricted}</p>
          </div>
        </div>

        <div className="flex justify-between">
          <h4>Disabled Date</h4>
          <div className="flex gap-2">
            <p className="font-bold">{userInfo?.disabled}</p>
          </div>
        </div>

        {userInfo?.kyc === 2 && (
          <div className="mt-4 flex w-full justify-end gap-4">
            <button
              className={cn(
                `flex w-full max-w-40 items-center justify-center gap-2 rounded-sm border border-indigo-600 p-2 text-center text-indigo-600   shadow-sm hover:bg-indigo-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`,
              )}
              onClick={() => onKyc(3)}
            >
              KYC Accept
            </button>

            <button
              className={cn(
                `flex w-full max-w-40 items-center justify-center gap-2 rounded-sm border border-indigo-600 p-2 text-center text-indigo-600   shadow-sm hover:bg-indigo-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`,
              )}
              onClick={() => onKyc(4)}
            >
              KYC Reject
            </button>
          </div>
        )}
      </div>
    </CustomPopup>
  );
};

export default UserDetailModal;

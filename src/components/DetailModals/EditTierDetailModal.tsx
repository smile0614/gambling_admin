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
import { useEffect, useState } from "react";
import CustomInput from "../common/Input/CustomInput";
import { InputConvert } from "@/utils/convertor";
import cn from "classnames";
import { updateTier } from "@/services/apis/tier";

interface EditTierDetailModal {
  show: boolean;
  onClose: () => void;
  setShow: (show: boolean) => void;
  tierInfo: any;
}

const EditTierDetailModal: React.FC<EditTierDetailModal> = ({
  show,
  onClose,
  setShow,
  tierInfo,
}) => {
  const [data, setData] = useState(tierInfo);

  useEffect(() => {
    setData(tierInfo);
  }, [tierInfo]);

  const onEdit = async () => {
    const response = await updateTier({
      id: data?.id,
      name: data?.name,
      email: data?.email,
      phone: data?.phone,
      wager_settlement_percent: Number(data.wagerSettlement),
      losing_settlement_percent: Number(data.losingSettlement),
    });
    onClose()
  };

  return (
    <CustomPopup
      showModal={show}
      setShowModal={setShow}
      onClose={() => setShow(false)}
      title="Edit Tier Detail"
      classNames="max-w-lg"
    >
      <div className="flex w-full flex-col gap-2">
        <div className="flex flex-col items-center justify-center gap-2 text-center text-title-md font-bold text-black dark:text-white">
          <CustomInput
            value={data?.name}
            onChange={(val) => setData({ ...data, name: val })}
            className="border-x-0 border-t-0 !p-1 !px-2 text-center"
            type="text"
          />
        </div>

        <div className="flex justify-between">
          <h4>Tier Id</h4>
          <div className="flex gap-2">
            <p className="font-bold">{transformId(data?.id, 12)}</p>
            <CopyButton text={data?.id} />
          </div>
        </div>

        <div className="flex justify-between">
          <h4>Email</h4>
          <div className="flex gap-2">
            <CustomInput
              value={data?.email}
              onChange={(val) => setData({ ...data, email: val })}
              className="!p-1 !px-2"
              type="email"
            />
          </div>
        </div>

        <div className="flex justify-between">
          <h4>Phone</h4>
          <div className="flex gap-2">
            <CustomInput
              value={data?.phone}
              onChange={(val) =>
                setData({
                  ...data,
                  phone: InputConvert({ type: "phone" }, val),
                })
              }
              className="!p-1 !px-2"
              type="phone"
            />
          </div>
        </div>

        <div className="flex justify-between">
          <h4>Referral Code</h4>
          <div className="flex gap-2">
            <p className="font-bold">{data?.code}</p>
            <CopyButton text={data?.code} />
          </div>
        </div>

        <div className="flex justify-between">
          <h4>Wager Settlement (%)</h4>
          <div className="flex gap-2">
            <CustomInput
              value={data?.wagerSettlement}
              onChange={(val) => setData({ ...data, wagerSettlement: val })}
              className="!p-1 !px-2"
              type="number"
            />
          </div>
        </div>

        <div className="flex justify-between">
          <h4>Losing Settlement (%)</h4>
          <div className="flex gap-2">
            <CustomInput
              value={data?.losingSettlement}
              onChange={(val) => setData({ ...data, losingSettlement: val })}
              className="!p-1 !px-2"
              type="number"
            />
          </div>
        </div>

        <div className="mt-4 flex w-full justify-end gap-4">
          <button
            className={cn(
              `flex w-full max-w-40 items-center justify-center gap-2 rounded-sm border border-indigo-600 p-2 text-center text-indigo-600   shadow-sm hover:bg-indigo-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`,
            )}
            onClick={onEdit}
          >
            Edit
          </button>
        </div>
      </div>
    </CustomPopup>
  );
};

export default EditTierDetailModal;

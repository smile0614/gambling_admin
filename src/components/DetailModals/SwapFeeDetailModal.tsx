import Image from "next/image";
import CustomPopup from "../Popup/CustomPopup";
import {
  formatCompactNumber,
  transformId,
  transformWalletAddress,
} from "@/utils/format";
import { getStatusColor } from "@/utils/common";
import CopyButton from "../Copy/Copy";
import CustomInput from "../common/Input/CustomInput";
import { useEffect, useState } from "react";
import cn from "classnames";
import { changeCurrency } from "@/services/apis/withdraw";
import { getFee, getSwapTransactions, updateFee } from "@/services/apis/swap";
import { toast } from "react-toastify";

interface SwapFeeEditDeailModal {
  show: boolean;
  onClose: () => void;
  setShow: (show: boolean) => void;
}

const SwapFeeEditDeailModal: React.FC<SwapFeeEditDeailModal> = ({
  show,
  onClose,
  setShow,
}) => {
  const [data, setData] = useState(0);
  const getSwapFee = async () => {
    const response = await getFee();
    setData(response.fee);
  };

  const onEdit = async () => {
    const response = await updateFee({ fee: data });
    toast.success("Swap Fee is successfully updated.", { toastId: "swapFee" });
    onClose();
  };

  useEffect(() => {
    getSwapFee();
  }, [show]);

  return (
    <CustomPopup
      showModal={show}
      setShowModal={setShow}
      onClose={onClose}
      title="Swap Fee"
      classNames="max-w-xs"
    >
      <div className="flex w-full flex-col gap-1">

        <div className="flex justify-center">
          <div className="flex gap-2 w-full">
            <CustomInput
              value={data}
              onChange={(val) => setData(val)}
            //   className="!p-1 !px-2 w-full"
              type="number"
            />
          </div>
        </div>

        <div className="mt-4 flex w-full justify-end gap-4">
          <button
            className={cn(
              `flex w-full max-w-20 items-center justify-center gap-2 rounded-sm border border-indigo-600 p-1 text-center text-indigo-600   shadow-sm hover:bg-indigo-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`,
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

export default SwapFeeEditDeailModal;

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

interface CurrencyDetailModal {
  show: boolean;
  onClose: () => void;
  setShow: (show: boolean) => void;
  currency: any;
  onChanged: (val: number) => void;
}

const CurrencyDetailModal: React.FC<CurrencyDetailModal> = ({
  show,
  onClose,
  setShow,
  currency,
  onChanged,
}) => {
  const [data, setData] = useState(currency);

  const onEdit = async () => {
    const response = await changeCurrency(
      {
        decimals: data.decimals,
        contract_address: data.contractAddress,
        withdraw_fee: Number(data.withdrawFee),
        type: data.type,
      },
      { id: data.id },
    );

    onChanged(Date.now());
    onClose();
  };

  useEffect(() => {
    setData(currency);
  }, [currency]);

  return (
    <CustomPopup
      showModal={show}
      setShowModal={setShow}
      onClose={onClose}
      title="Currency Detail"
      classNames="max-w-md"
    >
      <div className="flex w-full flex-col gap-1">
        <div className="flex flex-col items-center justify-center gap-2 text-center text-title-md font-bold text-black dark:text-white">
          <Image
            alt=""
            width={30}
            height={30}
            className="h-[50px] w-[50px]"
            src={`/images/fiats/${String(data?.symbol).toUpperCase()}.png`}
            onError={(e) => {
              return `/images/fiats/USDT.png`;
            }}
          />
          <h3>{`${data?.symbol} ${data?.network}`}</h3>
        </div>

        <div className="flex justify-between">
          <h4>Currency Id</h4>
          <div className="flex gap-2">
            <p className="font-bold">{transformId(data?.id, 12)}</p>
            <CopyButton text={data?.id} />
          </div>
        </div>

        <div className="flex justify-between">
          <h4>Network Id</h4>
          <div className="flex gap-2">
            <p className="font-bold">
              {transformId(data?.networkId, 12)}
            </p>
            <CopyButton text={data?.networkId} />
          </div>
        </div>

        <div className="flex justify-between">
          <h4>Network</h4>
          <div className="flex gap-2">
            <p className="font-bold">{data?.network}</p>
          </div>
        </div>

        <div className="flex justify-between">
          <h4>Symbol Id</h4>
          <div className="flex gap-2">
            <p className="font-bold">
              {transformId(data?.symbolId, 12)}
            </p>
            <CopyButton text={data?.symbolId} />
          </div>
        </div>

        <div className="flex justify-between">
          <h4>Symbol</h4>
          <div className="flex gap-2">
            <p className="font-bold">{data?.symbol}</p>
          </div>
        </div>

        {currency?.contractAddress && (
          <div className="flex justify-between">
            <h4>Contract Address</h4>
            <div className="flex gap-2">
              <CustomInput
                value={data?.contractAddress}
                onChange={(val) => setData({ ...data, contractAddress: val })}
                className="!p-1 !px-2"
              />
            </div>
          </div>
        )}

        <div className="flex justify-between">
          <h4>Decimals</h4>
          <div className="flex gap-2">
            <CustomInput
              value={data?.decimals}
              onChange={(val) => setData({ ...data, decimals: val })}
              className="!p-1 !px-2"
              type="number"
            />
          </div>
        </div>

        <div className="flex justify-between">
          <h4>Withdraw Fee</h4>
          <div className="flex gap-2">
            <CustomInput
              value={data?.withdrawFee}
              onChange={(val) => setData({ ...data, withdrawFee: val })}
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

export default CurrencyDetailModal;

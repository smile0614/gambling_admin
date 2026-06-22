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
import { insertProvider, updateProvider } from "@/services/apis/game";
import { ToggleButton } from "../common/ToggleButton/CustomToggleButton";

interface ProviderDetailModal {
  show: boolean;
  onClose: () => void;
  setShow: (show: boolean) => void;
  provider: any;
  onChanged: (val: number) => void;
}

const ProviderDetailModal: React.FC<ProviderDetailModal> = ({
  show,
  onClose,
  setShow,
  provider,
  onChanged,
}) => {
  const [data, setData] = useState(provider);
  const [errors, setErrors] = useState<any>({
    name: '',
    identifier: '',
    priority: '',
    visible: ''
  });

  const handleErrors = () => {
    const _errors: any = {};
    let _isError = false;
    if (!data?.name) {
      _errors.name = "Please input name";
      _isError = true;
    }
    if (!data?.identifier) {
      _errors.identifier = 'Please input identifier';
      _isError = true
    }
    if (!data?.priority) {
      _errors.priority = "Please input priority";
      _isError = true
    }
    setErrors(_errors);
    return _isError;
  }

  const onEdit = async () => {
    if (handleErrors()) return;
    const response = await updateProvider({ name: data.name, identifier: data.identifier, priority: data.priority, is_visible: data.isVisible }, { id: data.id })

    onChanged(Date.now());
    onClose();
  };

  const onAdd = async () => {
    if (handleErrors()) return;
    const response = await insertProvider({ name: data.name, identifier: data.identifier, priority: data.priority, is_visible: data.isVisible });
    onChanged(Date.now());
    onClose();
  }

  useEffect(() => {
    setErrors({});
    setData(provider);
  }, [provider]);

  return (
    <CustomPopup
      showModal={show}
      setShowModal={setShow}
      onClose={onClose}
      title="Provider Detail"
      classNames="max-w-md"
    >
      <div className="flex w-full flex-col gap-1">
        <div className="flex flex-col items-center justify-center gap-2 text-center text-title-md font-bold text-black dark:text-white">
          {data?.icon && <Image
            alt=""
            width={30}
            height={30}
            className="h-[50px] w-[200px]"
            src={data?.icon}
            onError={(e) => {
              return `/images/fiats/USDT.png`;
            }}
          />}
        </div>

        {
          data?.id && <div className="flex justify-between">
            <h4>Id</h4>
            <div className="flex gap-2">
              <p className="font-bold">{transformId(data?.id, 12)}</p>
              <CopyButton text={data?.id} />
            </div>
          </div>
        }


        <div className="flex justify-between">
          <h4>Name</h4>
          <div className="flex gap-2">
            <CustomInput
              className="!p-1 !px-2"
              type="text"
              value={data?.name || ''}
              onChange={(val) => setData({ ...data, name: val })}
              icon={data?.id && <CopyButton text={data?.name} />}
              error={errors.name}
            />
          </div>
        </div>

        <div className="flex justify-between">
          <h4>Identifier</h4>
          <div className="flex gap-2">
            <CustomInput
              className="!p-1 !px-2"
              type="text"
              value={data?.identifier || ''}
              onChange={(val) => setData({ ...data, identifier: val })}
              icon={data?.id && <CopyButton text={data?.identifier} />}
              error={errors.identifier}
            />

          </div>
        </div>

        <div className="flex justify-between">
          <h4>Priority</h4>
          <div className="flex gap-2">
            <CustomInput
              className="!p-1 !px-2"
              type="number"
              value={data?.priority}
              onChange={(val) => setData({ ...data, priority: val })}
              error={errors.priority}
            />

          </div>
        </div>

        <div className="flex justify-between">
          <h4>Visible</h4>
          <div className="flex gap-2">
            <ToggleButton
              id={Date.now() + "is_visiable"}
              value={data?.isVisible || false}
              onChange={(val) => setData({ ...data, isVisible: val })}
            />
          </div>
        </div>

        <div className="mt-4 flex w-full justify-end gap-4">
          {
            data?.id && <button
              className={cn(
                `flex w-full max-w-20 items-center justify-center gap-2 rounded-sm border border-primary p-1 text-center text-primary  shadow-sm hover:bg-primary hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`,
              )}
              onClick={onEdit}
            >
              Edit
            </button>
          }
          {
            !data?.id && <button
              className={cn(
                `flex w-full max-w-20 items-center justify-center gap-2 rounded-sm border border-primary p-1 text-center text-primary  shadow-sm hover:bg-primary hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`,
              )}
              onClick={onAdd}
            >
              Add
            </button>
          }

        </div>
      </div>
    </CustomPopup>
  );
};

export default ProviderDetailModal;

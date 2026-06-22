import Image from "next/image";
import CustomPopup from "../Popup/CustomPopup";
import {
  currencyFormat1,
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

interface GameDetailModal {
  show: boolean;
  onClose: () => void;
  setShow: (show: boolean) => void;
  gameInfo: any;
}

const GameDetailModal: React.FC<GameDetailModal> = ({
  show,
  onClose,
  setShow,
  gameInfo,
}) => {
  return (
    <CustomPopup
      showModal={show}
      setShowModal={setShow}
      onClose={() => setShow(false)}
      title="Game Detail"
      classNames="max-w-md"
    >
      <div className="flex w-full flex-col gap-1">
        <div className="flex flex-col items-center justify-center gap-2 text-center text-title-md font-bold text-black dark:text-white">
          <Image
            src={`https://cdn.softswiss.net/i/s4/${(gameInfo?.identifier || "").replace(":", "/")}.png`}
            alt=""
            width={400}
            height={400}
            className="h-[80px] w-[80px]"
          />

          {gameInfo?.title}
        </div>

        <div className="flex justify-between">
          <h4>Game Id</h4>
          <div className="flex gap-2">
            <p className="font-bold">{transformId(gameInfo?.id, 12)}</p>
            <CopyButton text={gameInfo?.id} />
          </div>
        </div>

        <div className="flex justify-between">
          <h4>Game Provider</h4>
          <div className="flex gap-2">
            <p className="font-bold">{gameInfo?.provider}</p>
          </div>
        </div>

        <div className="flex justify-between">
          <h4>Game Identifier</h4>
          <div className="flex gap-2">
            <p className="font-bold">{gameInfo?.identifier}</p>
            <CopyButton text={gameInfo?.identifier} />
          </div>
        </div>

        <div className="flex justify-between">
          <h4>Category</h4>
          <div className="flex gap-2">
            <p className="font-bold">{gameInfo?.category}</p>
            <CopyButton text={gameInfo?.id} />
          </div>
        </div>

        <div className="flex justify-between">
          <h4>Game Theme</h4>
          <div className="flex gap-2">
            <p className="font-bold">{gameInfo?.theme}</p>
          </div>
        </div>

        <div className="flex justify-between">
          <h4>Payout</h4>
          <div className="flex gap-2">
            <p className="font-bold">{gameInfo?.payout}</p>
          </div>
        </div>

        <div className="flex justify-between">
          <h4>Total Wager Amount</h4>
          <div className="flex gap-2">
            <p className="font-bold">
              {currencyFormat1(Number(gameInfo?.wager || 0))}
            </p>
          </div>
        </div>

        <div className="flex justify-between">
          <h4>Total Profit Amount</h4>
          <div className="flex gap-2">
            <p className="font-bold">
              {currencyFormat1(Number(gameInfo?.profit || 0))}
            </p>
          </div>
        </div>

      </div>
    </CustomPopup>
  );
};

export default GameDetailModal;

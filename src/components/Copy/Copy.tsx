import SvgColor from "@/assets/svgs/SvgColor";
import { copyClipBoard } from "@/utils/format";
import cn from "classnames";

interface CopyButtonProps {
  text: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ text }) => {
  const onCopy = () => {
    copyClipBoard(text);
  };
  return (
    <div className="block cursor-copy" onClick={onCopy}>
      <SvgColor
        src="/assets/icons/copy.svg"
        style={{ width: 20, height: 20 }}
      />
    </div>
  );
};

export default CopyButton;

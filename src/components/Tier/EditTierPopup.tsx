import React from "react";

import CustomPopup from "../Popup/CustomPopup";
import CustomInput from "../common/Input/CustomInput";
import SelectDropdown from "../common/Select/selectDropdown";

interface EditTierPopupProps {
  editPopup: boolean;
  handleCloseEditTier: () => void;
  setEditPopup: (showModal: boolean) => void;
}

const EditTierPopup: React.FC<EditTierPopupProps> = ({
  editPopup,
  handleCloseEditTier,
  setEditPopup
}) => {
  return (
    <CustomPopup
      showModal={editPopup}
      onClose={handleCloseEditTier}
      setShowModal={setEditPopup}
      title="Edit TIER 1"
    >
      <div className="columm grid grid-cols-12 gap-x-8 gap-y-5  text-sm md:gap-x-10 ">
        <div className="col-span-12 xl:col-span-6">
          <div className="flex items-center  gap-1 ">
            <h6 className="w-full max-w-30">Headquarter</h6>
            <div className="w-full">
              <SelectDropdown options={[]} />
            </div>
          </div>
        </div>
        <div className="col-span-12 xl:col-span-6">
          <div className="flex items-center  gap-1 ">
            <h6 className="w-full max-w-30">ID </h6>
            <div className="w-full">
              <CustomInput type="text" placeholder="SPARKY" />
            </div>
          </div>
        </div>

        <div className="col-span-12 xl:col-span-6">
          <div className="flex items-center  gap-1 ">
            <h6 className=" w-full max-w-30">TIER 1 name</h6>
            <div className="w-full">
              <CustomInput type="text" placeholder="Team Philippines" />
            </div>
          </div>
        </div>

        <div className="col-span-12 xl:col-span-6">
          <div className="flex items-center  gap-1 ">
            <h6 className=" w-full max-w-30">Password</h6>
            <div className="w-full">
              <CustomInput type="password" placeholder="zz1234" />
            </div>
          </div>
        </div>

        <div className="col-span-12 xl:col-span-6">
          <div className="flex items-center  gap-1 ">
            <h6 className=" w-full max-w-30">Contact number</h6>
            <div className="w-full">
              <CustomInput type="text" placeholder="+8528828188" />
            </div>
          </div>
        </div>

        <div className="col-span-12 xl:col-span-6">
          <div className="flex items-center  gap-1 ">
            <h6 className=" w-full max-w-30">Register code</h6>
            <div className="w-full">
              <CustomInput type="text" placeholder="Tier1ABCD" />
            </div>
          </div>
        </div>

        <div className="col-span-12 xl:col-span-6">
          <div className="flex items-center  gap-1 ">
            <h6 className=" w-full max-w-30">Network</h6>
            <div className="w-full">
              <SelectDropdown options={[]} />
            </div>
          </div>
        </div>

        <div className="col-span-12 xl:col-span-6">
          <div className="flex items-center  gap-1 ">
            <h6 className=" w-full max-w-30">Token</h6>
            <div className="w-full">
              <SelectDropdown options={[]} />
            </div>
          </div>
        </div>

        <div className="col-span-12">
          <div className="flex items-center  gap-1 ">
            <h6 className=" w-full max-w-30">Receiving address</h6>
            <div className="w-full">
              <CustomInput
                type="text"
                placeholder="0x199691f7e7b801984f7ffeb4bc8ff553c0f79219"
              />
            </div>
          </div>
        </div>

        <div className="col-span-12  pt-5">
          <h3 className="text-center text-title-md font-bold text-black dark:text-white">
            Profit % settings
          </h3>
        </div>
        <div className="col-span-12 xl:col-span-6">
          <div className="flex items-center  justify-center gap-1 ">
            <h6 className=" w-full max-w-30">Casino Wager fee</h6>
            <div className="w-full">
              <CustomInput type="text" placeholder="0.5" />
            </div>
            <h6 className="w-full max-w-30">
              % [max: <span className="text-[#D3242C]">1.2</span>%]{" "}
            </h6>
          </div>
        </div>

        <div className="col-span-12 xl:col-span-6">
          <div className="flex items-center  justify-center gap-2 ">
            <h6 className=" w-full max-w-30">Casino losing fee</h6>
            <div className="w-full">
              <CustomInput type="text" placeholder="30" />
            </div>
            <h6 className="w-full max-w-30">
              % [max: <span className="text-[#D3242C]">50</span>%]{" "}
            </h6>
          </div>
        </div>

     

 
      </div>

      <div className="flex gap-4 pt-10">
        <button
          onClick={handleCloseEditTier}
          className="m-auto  inline-block w-full max-w-xs rounded-sm border border-indigo-600   bg-indigo-600 p-2 text-center text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2  focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Update TIER 1 Registration
        </button>
      </div>
    </CustomPopup>
  );
};

export default EditTierPopup;

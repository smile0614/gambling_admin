import React, { useEffect, useState } from "react";

import CustomPopup from "../Popup/CustomPopup";
import CustomInput from "../common/Input/CustomInput";
import SelectDropdown from "../common/Select/selectDropdown";
import { ROLES } from "@/types";
import RoleBasedGuard from "@/hooks/RoleBaseGuard";
import TierSelects from "./Tier1Selects";
import {
  createTier,
  createTierGenerateCode,
  getTierDataById,
} from "@/services/apis/tier";
import { toast } from "react-toastify";
import { isEmail, isPhone } from "@/utils/validator";
import { InputConvert } from "@/utils/convertor";
import SvgColor from "@/assets/svgs/SvgColor";

interface AddTierPopupProps {
  addPopup: boolean;
  handleCloseAddTier: () => void;
  setAddPopup: (showModal: boolean) => void;
  roleType: ROLES;
  setCreated: (created: number) => void;
}

const defaultErrors = {
  email: "",
  password: "",
  name: "",
  phone: "",
  code: "",
  wagerSettlement: "",
  losingSettlement: "",
};

const defaultMaxFees = {
  [ROLES.TIER1]: {
    wagerFee: 1.2,
    losingFee: 50,
  },
  [ROLES.TIER2]: {
    wagerFee: 0.8,
    losingFee: 30,
  },
  [ROLES.TIER3]: {
    wagerFee: 0.4,
    losingFee: 20,
  },
};

const AddTierPopup: React.FC<AddTierPopupProps> = ({
  addPopup,
  handleCloseAddTier,
  setAddPopup,
  roleType,
  setCreated,
}) => {
  const roles = [
    { label: "Tier1", value: ROLES.TIER1 },
    { label: "Tier2", value: ROLES.TIER2 },
    { label: "Tier3", value: ROLES.TIER3 },
  ];

  const [errors, setErrors] = useState(defaultErrors);

  const [maxFee, setMaxFee] = useState(defaultMaxFees[ROLES.TIER1]);

  const [inputStats, setInputStats] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    // code: "",
    wagerSettlement: 0,
    losingSettlement: 0,
    role: roleType,
    tier1: "",
    tier2: "",
  });

  // const createRegisterCode = async () => {
  //   const response = await createTierGenerateCode();
  //   setInputStats({ ...inputStats, code: response });
  // };

  const onCreateTier = async () => {
    const newErrors = { ...defaultErrors };

    if (!isEmail(inputStats.email)) newErrors.email = "Invalid Email";
    if (!inputStats.email) newErrors.email = "Required";

    if (!inputStats.password) newErrors.password = "Required";
    if (!inputStats.name) newErrors.name = "Required";

    if (!isPhone(inputStats.phone)) newErrors.phone = "Invalid Phone";
    if (!inputStats.phone) newErrors.phone = "Required";

    if (inputStats.wagerSettlement > maxFee.wagerFee) newErrors.wagerSettlement = "High Wager Fee";
    if (inputStats.losingSettlement > maxFee.losingFee) newErrors.losingSettlement = "High Losing Fee"; 

    // if (!inputStats.code) newErrors.code = "Required";
    setErrors(newErrors);

    if (
      newErrors.email ||
      newErrors.password ||
      newErrors.name ||
      newErrors.phone ||
      newErrors.code || 
      newErrors.wagerSettlement ||
      newErrors.losingSettlement
    ) {
      return;
    }

    const response = await createTier({
      email: inputStats.email,
      password: inputStats.password,
      name: inputStats.name,
      phone: inputStats.phone,
      role: inputStats.role,
      // code: inputStats.code,
      parent_tier:
        roleType === ROLES.TIER1
          ? null
          : roleType === ROLES.TIER2
            ? inputStats.tier1
            : inputStats.tier2,
      wager_settlement_percent: inputStats.wagerSettlement,
      losing_settlement_percent: inputStats.losingSettlement,
    });
    toast("Tier is created successfully");
    setCreated(Date.now());
    handleCloseAddTier();
  };

  const setTierMaxFee = async (tierId: string) => {
    if (!tierId) {
      return;
    }
    const response = await getTierDataById({ id: tierId });
    const wagerSettelementPercent = response.wager_settlement_percent;
    const losingSettlementPercent = response.losing_settlement_percent;

    setMaxFee({
      wagerFee: Number(wagerSettelementPercent),
      losingFee: Number(losingSettlementPercent),
    });
  };

  useEffect(() => {
    setInputStats({
      email: "",
      password: "",
      name: "",
      phone: "",
      // code: "",
      wagerSettlement: 0,
      losingSettlement: 0,
      role: roleType,
      tier1: "",
      tier2: "",
    });
    if (roleType === ROLES.TIER1) {
      setMaxFee(defaultMaxFees[ROLES.TIER1]);
    }
    if (roleType === ROLES.TIER2) {
      setMaxFee(defaultMaxFees[ROLES.TIER2]);
    }
    if (roleType === ROLES.TIER3) {
      setMaxFee(defaultMaxFees[ROLES.TIER3]);
    }
  }, [addPopup]);

  useEffect(() => {
    setTierMaxFee(inputStats.tier1);
  }, [inputStats.tier1]);

  useEffect(() => {
    setTierMaxFee(inputStats.tier2);
  }, [inputStats.tier2]);

  return (
    <CustomPopup
      showModal={addPopup}
      setShowModal={setAddPopup}
      onClose={handleCloseAddTier}
      title={
        roleType === ROLES.TIER1
          ? "Add Tier1"
          : roleType === ROLES.TIER2
            ? "Add Tier2"
            : "Add Tier3"
      }
    >
      <div className="columm grid grid-cols-12 gap-x-8 gap-y-5  text-sm md:gap-x-10 ">
        <div className="col-span-12 xl:col-span-6">
          <div className="flex items-center  gap-1">
            <h6 className="w-full max-w-30">
              Email <span className="text-red">*</span>{" "}
            </h6>
            <div className="w-full">
              <CustomInput
                type="email"
                placeholder="alex@example.com"
                value={inputStats.email}
                onChange={(value) =>
                  setInputStats({ ...inputStats, email: value })
                }
                error={errors.email}
              />
            </div>
          </div>
        </div>

        <div className="col-span-12 xl:col-span-6">
          <div className="flex items-center  gap-1 ">
            <h6 className=" w-full max-w-30">
              Password <span className="text-red">*</span>{" "}
            </h6>
            <div className="w-full">
              <CustomInput
                type="password"
                placeholder="zz1234"
                value={inputStats.password}
                onChange={(value) =>
                  setInputStats({ ...inputStats, password: value })
                }
                error={errors.password}
              />
            </div>
          </div>
        </div>

        <div className="col-span-12 xl:col-span-6">
          <div className="flex items-center  gap-1 ">
            <h6 className=" w-full max-w-30">
              Name <span className="text-red">*</span>{" "}
            </h6>
            <div className="w-full">
              <CustomInput
                type="text"
                placeholder="Team Philippines"
                value={inputStats.name}
                onChange={(value) =>
                  setInputStats({ ...inputStats, name: value })
                }
                error={errors.name}
              />
            </div>
          </div>
        </div>

        <div className="col-span-12 xl:col-span-6">
          <div className="flex items-center  gap-1 ">
            <h6 className=" w-full max-w-30">
              Contact number <span className="text-red">*</span>{" "}
            </h6>
            <div className="w-full">
              <CustomInput
                type="phone"
                placeholder="+8528828188"
                value={inputStats.phone}
                onChange={(value) =>
                  setInputStats({
                    ...inputStats,
                    phone: InputConvert({ type: "phone" }, value),
                  })
                }
                error={errors.phone}
              />
            </div>
          </div>
        </div>

        <div className="col-span-12 xl:col-span-6">
          <div className="flex items-center gap-1">
            <h6 className="w-full max-w-30">
              Role <span className="text-red">*</span>{" "}
            </h6>
            <div className="w-full">
              <SelectDropdown
                id="role"
                disabled
                options={roles}
                value={inputStats.role}
                onChange={(value) =>
                  setInputStats({ ...inputStats, role: value })
                }
              />
            </div>
          </div>
        </div>

        {/* <div className="col-span-12 xl:col-span-6">
          <div className="flex items-center  gap-1 ">
            <h6 className=" w-full max-w-30">
              Register code <span className="text-red">*</span>{" "}
            </h6>
            <div className="relative w-full">
              <CustomInput
                type="text"
                placeholder="Tier1ABCD"
                value={inputStats.code}
                onChange={(value) =>
                  setInputStats({ ...inputStats, code: value })
                }
                error={errors.code}
                icon={
                  <SvgColor
                    src="/assets/icons/refresh.svg"
                    style={{ width: 20, height: 20 }}
                  />
                }
                onIcon={createRegisterCode}
              />
            </div>
          </div>
        </div> */}

        {[ROLES.TIER2, ROLES.TIER3].includes(roleType) && (
          <div className="col-span-12 xl:col-span-6">
            <div className="flex items-center gap-1">
              <h6 className=" w-full max-w-30">
                Tier 1 <span className="text-red">*</span>{" "}
              </h6>
              <TierSelects
                parent=""
                type={ROLES.TIER1}
                value={inputStats.tier1}
                setValue={(value) =>
                  setInputStats({ ...inputStats, tier1: value })
                }
              />
            </div>
          </div>
        )}

        {[ROLES.TIER3].includes(roleType) && (
          <div className="col-span-12 xl:col-span-6">
            <div className="flex items-center gap-1">
              <h6 className=" w-full max-w-30">
                Tier 2 <span className="text-red">*</span>{" "}
              </h6>
              <TierSelects
                parent={inputStats.tier1}
                type={ROLES.TIER2}
                value={inputStats.tier2}
                setValue={(value) =>
                  setInputStats({ ...inputStats, tier2: value })
                }
              />
            </div>
          </div>
        )}

        <div className="col-span-12  pt-5">
          <h3 className="text-center text-title-md font-bold text-black dark:text-white">
            Profit % settings
          </h3>
        </div>
        <div className="col-span-12 xl:col-span-6">
          <div className="flex items-center  justify-center gap-1 ">
            <h6 className=" w-full max-w-30">
              Casino Wager fee <span className="text-red">*</span>{" "}
            </h6>
            <div className="w-full">
              <CustomInput
                type="number"
                placeholder="0.5"
                min={0}
                max={maxFee.wagerFee}
                value={inputStats.wagerSettlement}
                onChange={(value) =>
                  setInputStats({ ...inputStats, wagerSettlement: value })
                }
                error={errors.wagerSettlement}
              />
            </div>
            <h6 className="w-full max-w-30">
              % [max: <span className="text-[#D3242C]">{maxFee.wagerFee}</span>{" "}
              %]{" "}
            </h6>
          </div>
        </div>

        <div className="col-span-12 xl:col-span-6">
          <div className="flex items-center  justify-center gap-2 ">
            <h6 className=" w-full max-w-30">
              Casino losing fee <span className="text-red">*</span>{" "}
            </h6>
            <div className="w-full">
              <CustomInput
                type="number"
                placeholder="30"
                max={maxFee.losingFee}
                min={0}
                value={inputStats.losingSettlement}
                onChange={(value) =>
                  setInputStats({ ...inputStats, losingSettlement: value })
                }
                error={errors.losingSettlement}
              />
            </div>
            <h6 className="w-full max-w-30">
              % [max: <span className="text-[#D3242C]">{maxFee.losingFee}</span>
              %]{" "}
            </h6>
          </div>
        </div>
      </div>

      <div className="flex gap-4 pt-10">
        <button
          onClick={onCreateTier}
          className="m-auto  inline-block w-full max-w-xs rounded-sm border border-primary   bg-primary p-2 text-center text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2  focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {roleType === ROLES.TIER1
            ? "TIER 1"
            : roleType === ROLES.TIER2
              ? "TIER 2"
              : "TIER 3"}{" "}
          New Registration
        </button>
      </div>
    </CustomPopup>
  );
};

export default AddTierPopup;

import React, { useEffect, useState } from "react";
import SelectDropdown from "../common/Select/selectDropdown";
import {
  getTier1SmallList,
  getTier2List,
  getTier2SmallList,
} from "@/services/apis/tier";
import { ROLES } from "@/types";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { AppState } from "@/redux/store";

interface TierSelectsProps {
  parent: string;
  type: ROLES;
  value: string;
  setValue: (value: any) => void;
}

const TierSelects: React.FC<TierSelectsProps> = ({
  value,
  setValue,
  type,
  parent,
}) => {
  const userInfo = useSelector((state: AppState) => state.auth.user);

  const [options, setOptions] = useState<
    Array<{ label: string; value: string }>
  >([]);
  const getTiers = useCallback(async () => {
    try {
      //   const response = await getTier1SmallList();
      let response: any = [];
      if (userInfo.role === ROLES.ADMIN) {
        switch (type) {
          case ROLES.TIER1:
            response = await getTier1SmallList();
            break;
          case ROLES.TIER2:
            if (parent != "")
              response = await getTier2SmallList({ tier1_id: parent });

            break;

          default:
            break;
        }
      }

      const _options =
        response?.map((item: any) => ({
          label: item.name,
          value: item.id,
        })) || [];

      if (userInfo.role === type) {
        setOptions([{ label: userInfo.name, value: userInfo.id }]);
      } else if (userInfo.role > type) {
        setOptions([]);
      } else {
        setOptions(_options);
      }
    } catch (error) {
      setOptions([]);
    }
  }, [parent, userInfo]);

  useEffect(() => {
    getTiers();
  }, [getTiers]);

  return (
    <>
      <div className="w-full">
        <SelectDropdown
          id="role"
          options={options}
          value={value}
          onChange={(value) => setValue(value)}
        />
      </div>
    </>
  );
};

export default TierSelects;

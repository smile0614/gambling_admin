const UserTableFilter: React.FC = () => {
  return (
    <div className="w-ful pb-4">
      <div className="flex items-center justify-between  ">
        <div className="flex gap-5">
          <div className="flex items-center justify-between gap-1 text-sm font-normal">
            Online <GreenUserIcon /> 899
          </div>
        </div>
        <div className="flex items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5">
            <ClockIcon />
            <form className={`w-full relative  max-w-[120px] `}>
              <select
                id="days"
                className="relative appearance-none pr-4 block w-full border-none  bg-transparent text-sm font-normal   focus-visible:outline-none    "
              >
                <option value="7 days">Last 7 days</option>
                <option value="15 days">Last 15 days</option>
                <option value="30 days">Last 30 days</option>
              </select>
              <span className="absolute right-0 top-1/2 z-20 -translate-y-1/2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.8">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                      fill="#637381"
                    ></path>
                  </g>
                </svg>
              </span>
            </form>
          </div>
          <div className="flex items-center gap-2.5">
            <form className={`w-full  max-w-[120px] `}>
              <select
                id="days"
                className="block w-full border-none bg-transparent  text-sm font-normal text-[#b05b00]   focus-visible:outline-none    "
              >
                <option value="utc">UTC</option>
                <option value="ist">IST</option>
                <option value="utc">UTC</option>
              </select>
            </form>
          </div>
          <button className="h-5 px-1.5">
            {" "}
            <SearchIcon />{" "}
          </button>
          <button className="h-5 px-1.5">
            {" "}
            <Refreshicon />{" "}
          </button>
          <button className="h-5 px-1.5">
            {" "}
            <ArrowDown />{" "}
          </button>
          <div className="h-5 w-[1px] bg-black dark:bg-[#637381]"></div>
          <button className="h-5 px-1.5">
            {" "}
            <ArrowUp />{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserTableFilter;

const GreenUserIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <ellipse cx="10" cy="6" rx="6" ry="6" fill="#34CA00" />
      <path
        d="M20 17.996C20 20.2037 15.5228 19.9947 10 19.9947C4.47715 19.9947 0 20.2037 0 17.996C0 15.7884 4.47715 12 10 12C15.5228 12 20 15.7884 20 17.996Z"
        fill="#34CA00"
      />
    </svg>
  );
};

const GrayUserIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <ellipse cx="10" cy="6" rx="6" ry="6" fill="#98A8A6" />
      <path
        d="M20 17.996C20 20.2037 15.5228 19.9947 10 19.9947C4.47715 19.9947 0 20.2037 0 17.996C0 15.7884 4.47715 12 10 12C15.5228 12 20 15.7884 20 17.996Z"
        fill="#98A8A6"
      />
    </svg>
  );
};

const ClockIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20ZM9.99957 18.2223C14.5406 18.2223 18.2218 14.5411 18.2218 10.0001C18.2218 5.45907 14.5406 1.77786 9.99957 1.77786C5.45856 1.77786 1.77734 5.45907 1.77734 10.0001C1.77734 14.5411 5.45856 18.2223 9.99957 18.2223ZM9.7793 5.3335H11.1126V11.1113H9.7793V11.1112H5.33453V9.77783H9.7793V5.3335Z"
        fill="#637381"
      />
    </svg>
  );
};

const ArrowUp = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="7"
      viewBox="0 0 13 7"
      fill="none"
    >
      <path d="M1 6.5L6.5 1L12 6.5" stroke="#637381" />
    </svg>
  );
};

const ArrowDown = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="8"
      viewBox="0 0 13 8"
      fill="none"
    >
      <path d="M11.9873 1L6.4873 6.5L0.987305 0.999999" stroke="#637381" />
    </svg>
  );
};

const SearchIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M15.3451 13.6016C17.835 10.2671 17.5653 5.52324 14.536 2.49398C11.2107 -0.831328 5.8193 -0.831328 2.49398 2.49398C-0.831328 5.81929 -0.831328 11.2107 2.49398 14.536C5.52316 17.5652 10.2668 17.8349 13.6013 15.3453C13.6669 15.5123 13.7672 15.6688 13.9022 15.8038L17.7049 19.6066C18.23 20.1316 19.0812 20.1316 19.6063 19.6066C20.1313 19.0815 20.1313 18.2302 19.6063 17.7052L15.8035 13.9024C15.6686 13.7675 15.5121 13.6672 15.3451 13.6016ZM13.4664 3.56439C16.2005 6.29853 16.2005 10.7315 13.4664 13.4656C10.7323 16.1997 6.29933 16.1997 3.56518 13.4656C0.831038 10.7315 0.831038 6.29853 3.56518 3.56438C6.29933 0.83024 10.7323 0.83024 13.4664 3.56439Z"
        fill="#637381"
      />
    </svg>
  );
};

const Refreshicon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M17.05 2.9375C15.2375 1.125 12.75 0 9.9875 0C4.4625 0 0 4.475 0 10C0 15.525 4.4625 20 9.9875 20C14.65 20 18.5375 16.8125 19.65 12.5H17.05C16.025 15.4125 13.25 17.5 9.9875 17.5C5.85 17.5 2.4875 14.1375 2.4875 10C2.4875 5.8625 5.85 2.5 9.9875 2.5C12.0625 2.5 13.9125 3.3625 15.2625 4.725L11.2375 8.75H19.9875V0L17.05 2.9375Z"
        fill="#637381"
      />
    </svg>
  );
};

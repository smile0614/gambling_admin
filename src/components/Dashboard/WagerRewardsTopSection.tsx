"use client";

const WagerRewardsTopSection = () => {
  return (
    <div className="flex flex-wrap justify-between gap-y-4 rounded-sm border border-stroke bg-white px-5 pb-8 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
      <div className="flex gap-8 ">
        <div className="flex items-center gap-2">
          <span className="text-base font-medium">Partner’s Wager Rewards:</span>
          <h4 className="text-title-sm font-bold text-black dark:text-white ">
            4754K
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-base font-medium">Wager Rewards: </span>
          <h4 className="text-title-sm font-bold text-black dark:text-white ">
            456K
          </h4>
        </div>
      </div>

      <div className="flex justify-end w-full max-w-full flex-wrap gap-5 lg:max-w-[560px]">
        <button className="inline-block  w-full max-w-30 rounded-sm border border-indigo-600   bg-indigo-600 p-2 text-center text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2  focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          {" "}
         Register
        </button>
      </div>
    </div>
  );
};

export default WagerRewardsTopSection;

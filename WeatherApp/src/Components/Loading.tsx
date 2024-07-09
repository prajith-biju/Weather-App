export const Loading = () => {
  return (
    <div className="max-w-full  w-full h-screen bg-[#222] p-0 flex items-center justify-center overflow-hidden">
      <div className="flex gap-[24px] items-center">
        <div className="w-[150px] h-[150px] bg-[#fff] animate-loadingAnim rounded-full relative origin-center before:content-[''] before:w-[120px] before:h-[120px] before:bg-[#222] before:absolute before:rounded-full before:translate-x-[15px] before:translate-y-[15px]">
          <div className="bg-[#222] h-[30px] w-[85px] absolute top-[65px] left-[65px]"></div>
        </div>
        <h1 className="text-[50px] font-bold text-[#fff]">
          Data Fetching please wait...
        </h1>
      </div>
    </div>
  );
};

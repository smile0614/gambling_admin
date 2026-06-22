const FullScreenLoader = () => {
    return (
      <div className="fixed flex top-0 left-0 w-screen h-screen items-center justify-center bg-white dark:bg-black z-[10000]">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
      </div>
    );
  };
  
  export default FullScreenLoader;
  
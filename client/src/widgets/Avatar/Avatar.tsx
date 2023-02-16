export const Avatar = ({ imgSrc }: { imgSrc: string }) => {
  return (
    <div className="flex justify-center items-center space-x-4" data-testid="flowbite-avatar">
      <div className="relative">
        <img
          alt=""
          className="!rounded-full rounded w-10 h-10 rounded"
          data-testid="flowbite-avatar-img"
          src={imgSrc}
        />
      </div>
    </div>
  );
};

export const NotFoundPopulation = ({
  cityName,
}: {
  cityName: string | undefined;
}) => {
  return (
    <div className="text-center">
      <h1 className="text-[24px] text-bold">
        Sorry opulation details of {cityName} is not available right now!!
      </h1>
    </div>
  );
};

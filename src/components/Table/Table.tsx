export const Table = ({ data = [] }) => {
  return (
    <>
      {data.map(([key, value]: string[]) => (
        <div>
          {key}: {value}
        </div>
      ))}
    </>
  );
};

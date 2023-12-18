export const Table = ({ data = [] }) => {
  return (
    <>
      {data.map(([key, value]: string[], i: number) => (
        <div key={`${value}${i}`}>
          {key}: {value}
        </div>
      ))}
    </>
  );
};

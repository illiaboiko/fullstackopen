const Filter = ({ onChange, value }) => {
  return (
    <>
      filter shown with: <input onChange={onChange} value={value} type="text" />
      <h2>Add new</h2>
    </>
  );
};
export default Filter;

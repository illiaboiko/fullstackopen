function InputForm({
  onSubmit,
  onInputNameChange,
  onInputPhoneChange,
  nameValue,
  phoneValue,
}) {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          name: <input onChange={onInputNameChange} value={nameValue} />
          <br />
          phone number:{" "}
          <input onChange={onInputPhoneChange} value={phoneValue} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
}

export default InputForm;

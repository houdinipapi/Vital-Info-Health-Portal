/* eslint-disable react/prop-types */

const Field = ({ label, name, type, value, onChange, onBlur, error }) => {
  const inputProps = {
    name,
    type,
    value,
    onChange,
    onBlur
  };

  return (
    <div>
      <label>{label}</label>
      {type === 'textarea' ? (
        <textarea {...inputProps} />
      ) : (
        <input {...inputProps} />
      )}
      {error && <div>{error}</div>}
    </div>
  );
};

export default Field;

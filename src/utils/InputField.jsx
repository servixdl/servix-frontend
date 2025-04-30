// Componente reutilizable para campos de tipo email o contraseña.
// Ideal para usarse en formularios como login o registro.
const InputField = ({ label, name, value, onChange, type = "text", placeholder }) => (
    <div className="mb-4">
      {/* Etiqueta descriptiva del campo */}
      <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-700">
        {label}
      </label>
  
     
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />
    </div>
  );
  
  export default InputField;
  
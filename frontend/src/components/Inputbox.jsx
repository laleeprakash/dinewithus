export function Inputbox({ label, placeholder, onChange, id, type = "text",accept}) {
  return (
    <div className="p-1">
      <div className="p-1 text-sm font-medium text-left">
        <label htmlFor={id} className="font-semibold">{label}</label>
      </div>
      <input
      accept={accept}
        id={id}
        required
        onChange={onChange}
        placeholder={placeholder}
        type={type}
       className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
    </div>
  );
}

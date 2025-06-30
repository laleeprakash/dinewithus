export function Button({label,onClick}){
  return <div>
    <button className="w-full p-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-500 transition duration-200" type="submit" onClick={onClick}>{label}</button>
  </div>
}
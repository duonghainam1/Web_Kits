
const ListPage = () => {
  return (<div className="flex justify-center mt-16">
  <div className="flex items-center *:mx-3 *:border *:border-gray-600 *:w-[40px]
   *:h-[40px] *:grid *:place-items-center *:duration-300 *:cursor-pointer">
    <button className="opacity-100">1</button>
    <button className="opacity-50 hover:opacity-100">2</button>
    <button className="opacity-50 hover:opacity-100">3</button>
    <button className="opacity-50 hover:opacity-100">4</button>
    <button className="opacity-50 hover:opacity-100">&#10095;</button>
  </div>
  </div>)
}

export default ListPage
export default function SearchBar({search, setSearch}) {
  return (
    <div className="px-6 mt-4">
      <div className="bg-gray-800 px-4 py-3 rounded-full flex items-center">
        <i className="fa-solid fa-magnifying-glass pr-3 text-gray-400"></i>
        <input
          className="w-full outline-none text-lg text-white bg-transparent placeholder-gray-400 focus:ring-2 focus:ring-gray-500 rounded-full px-4"
          type="text"
          placeholder="Search your notes"
          value={search}
          onChange={(e) => {setSearch(e.target.value)}}
        />
      </div>
    </div>
  );
}

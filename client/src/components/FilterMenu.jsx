export default function FilterMenu({ onSelectRegion }) {
  const regions = ['', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania']
  return (
    <select
      onChange={e => onSelectRegion(e.target.value)}
      className="w-full max-w-xs bg-white shadow rounded p-3 cursor-pointer"
    >
      <option value="">Filter by Region</option>
      {regions.slice(1).map(region => (
        <option key={region} value={region}>
          {region}
        </option>
      ))}
    </select>
  )
}

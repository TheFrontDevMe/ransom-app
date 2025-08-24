import { getCountryData } from "@/lib/utils";

function CountryFlagAndName({ contryCode }) {
  if (!contryCode) return null;

  const { name, flag } = getCountryData(contryCode);

  return (
    <div className="flex items-center gap-1.5">
      <img
        src={flag}
        alt={`${name} flag`}
        className="h-2 w-3"
        loading="lazy"
        onError={(event) => {
          event.target.onerror = null;
          event.target.src = "https://via.placeholder.com/12x8?text=🌐";
        }}
      />
      <span className="text-[10px]">{name}</span>
    </div>
  );
}

export default CountryFlagAndName;

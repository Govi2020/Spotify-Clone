import { Link } from "react-router-dom";

const DetailsHeader = ({artistId,artistData,songData}) => {
  const a = artistData?.artists[artistId].attributes;
  return (
    <div className="relative flex w-full flex-col">
      <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28"/>
      <div className="absolute inset-0 flex items-center">
        <img src={artistId ? a?.artwork?.url.replace("{w}","500").replace("{h}","500") : songData?.images?.coverart} className="sm:w-48 w-28 sm:h-48 rounded-full object-cover border-2 shadow-xl shadow-black" />
        <div className="ml-5">
          <p className="text-white font-bold sm:text-3xl text-xl">{artistId ? a?.name : songData?.title}</p>
          {!artistId && (
            <Link to={`/artists/${songData?.artists[0].adamid}`}>
              <p className="text-base text-gray-400 mt-2">{songData?.subtitle}</p>
            </Link>
          )}
          <p className="text-base text-gray-400 mt-2">
            {artistId ? a?.genreNames[0] : songData?.genres?.primary}
          </p>
        </div>

      </div>
    </div>
  )
};

export default DetailsHeader;

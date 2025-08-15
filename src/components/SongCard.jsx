import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

const SongCard = ({ song, i, data, activeSong, isPlaying }) => {
    const dispatch = useDispatch();
    const handlePlayClick = () => {
        dispatch(setActiveSong({ song, data, i }));
        dispatch(playPause(true));
    };

    const handlePauseClick = () => {
        dispatch(playPause(false));
    };

    return (
        <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 rounded-lg cursor-pointer animate-slideup backdrop-blur-sm">
            <div className="relative w-full h-56 group">
                <div
                    className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex group-active:flex transition-all ${
                        activeSong?.title == song.title
                            ? "flex bg-black bg-opacity-70"
                            : "hidden"
                    }`}
                >
                    <PlayPause
                        song={song}
                        handlePause={handlePauseClick}
                        handlePlay={handlePlayClick}
                        isPlaying={isPlaying}
                        activeSong={activeSong}
                    />
                </div>
                <img
                    src={song?.images?.coverart || song?.attributes.artwork.url}
                    alt="song_img"
                    className="object-cover h-full"
                />
            </div>
            <div className="mt-4 flex flex-col">
                <p className="font-semibold text-lg text-white truncate">
                    <Link to={`/songs/${song?.key}`}>{song.title}</Link>
                </p>
                <p className="text-gray-300 text-sm truncate mt-1">
                    <Link
                        to={
                            song?.artists
                                ? `/artists/${song?.artists[0].adamid}`
                                : "/top-artists"
                        }
                    >
                        {song.subtitle}
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SongCard;

import { useDispatch, useSelector } from "react-redux";
import { Error, Loader, SongCard } from "../components";
import { genres } from "../assets/constants";
import { useGetSongsByGenreQuery } from "../redux/services/shazamCore";
import { data } from "../test";
import { selectGenreListId } from "../redux/features/playerSlice";
import { useEffect } from "react";

const Discover = () => {
    const dispatch = useDispatch();
    const { activeSong, isPlaying,genreListId } = useSelector((state) => {
        return state.player;
    });

    useEffect(() => {
        dispatch(selectGenreListId("POP"));
    },[])

    const { data, isFetching, error } = useGetSongsByGenreQuery({genreListId});
    const genreTitle = genres.find(({value}) => (value.trim().toUpperCase() === genreListId.trim().toUpperCase()))?.title;
    console.log("The Titile is " ,genreTitle);

    if (isFetching) {return <Loader title="Loading Songs"/>}
    if (error) {return <Error/>}

    return (
        <div className="flex flex-col">
            <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
                <h2 className="font-bold text-3xl text-white animate-slideup">
                    Discover {genreTitle}
                </h2>
                <select
                    onChange={(e) => {
                        dispatch(selectGenreListId(e.target.value));
                    }}
                    value={genreListId || "POP"}
                    className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5 animate-slideup"
                >
                    {genres.map((g) => (
                        <option key={g.value}>{g.title}</option>
                    ))}
                </select>
            </div>
            <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                {data?.map((song, i) => {
                    if (i < 100) {
                        return (
                            <SongCard
                                key={song.key}
                                song={song}
                                i={i}
                                isPlaying={isPlaying}
                                activeSong={activeSong}
                                data={data}
                            />
                        );
                    }
                })}
            </div>
        </div>
    );
};

export default Discover;

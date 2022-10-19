import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useGetSongBySearchQuery } from "../redux/services/shazamCore";
import { Error, Loader, SongCard } from "../components";
import { useParams } from "react-router-dom";
// import { data } from "../test";

const Search = () => {
    const {searchTerm } = useParams();
    const [activeSongs, setActiveSongs] = useState();
    const {data,isFetching,error} =  useGetSongBySearchQuery(searchTerm);
    const songs = data?.tracks?.hits?.map((song) => {
      return song.track;
    })

    // Loading Implementation
    if (isFetching) {
        return <Loader title="Searching Song Details" />;
    }

    // Error Implementation
    if (error && country) {
        return <Error />;
    }

    return (
        <div class="flex flex-col">
            <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
                Showing Results for <span className="font-black">{searchTerm}</span>
            </h2>
            <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                {songs?.map((song, i) => {
                    if (i < 100) {
                        return (
                            <SongCard
                                key={song.key}
                                song={song}
                                i={i}
                                data={data}
                            />
                        );
                    }
                })}
            </div>
        </div>
    );
};

export default Search;

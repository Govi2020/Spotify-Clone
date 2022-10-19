import { useState } from "react";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";
import { ArtistCard, Error, Loader } from "../components";

const TopArtists = () => {
    const [activeSongs, setActiveSongs] = useState("");
    const {data,isFetching,error} =  useGetTopChartsQuery();

    // Loading Implementation
    if (isFetching) {
        return <Loader title="Searching Song Details" />;
    }

    // Error Implementation
    if (error) {
        return <Error />;
    }

    return (
        <div class="flex flex-col">
            <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
                Top Artists
            </h2>
            <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                {data?.map((track, i) => {
                    if (i < 100) {
                        return (
                            <ArtistCard
                                key={track.key}
                                track={track}
                                i={i}
                            />
                        );
                    }
                })}
            </div>
        </div>
    );
};

export default TopArtists;

import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useGetSongByCountryQuery } from "../redux/services/shazamCore";
import { Error, Loader, SongCard } from "../components";
const CountryTracks = () => {
    const [country, setCountry] = useState("");
    const [loading, setLoading] = useState("");
    const [activeSongs, setActiveSongs] = useState("");
    const {data,isFetching,error} =  useGetSongByCountryQuery(country);

    console.log(country);

    useEffect(() => {
        axios
            .get(
                "https://geo.ipify.org/api/v2/country?apiKey=" + import.meta.env.VITE_GEO_API_KEY
            )
            .then((res) => setCountry(res?.data?.location?.country))
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    }, [country]);

    // // Loading Implementation
    // if (isFetching && loading) {
    //     return <Loader title="Searching Song Details" />;
    // }

    // // Error Implementation
    // if (error && country) {
    //     return <Error />;
    // }

    return (
        <div class="flex flex-col">
            <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
                Around You
            </h2>
            <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                {data?.map((song, i) => {
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

export default CountryTracks;

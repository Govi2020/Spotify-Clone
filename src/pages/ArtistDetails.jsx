import {useState} from "react";
import {useParams} from "react-router-dom";
import {useSelector,useDispatch} from "react-redux"
import {DetailsHeader,Error,Loader,RelatedSongs} from "../components"
import {useGetArtistDetailsQuery} from "../redux/services/shazamCore";

const ArtistDetails = () => {

    // Variables

    const {id} = useParams();
    const {activeSong,isPlaying} = useSelector((state) => state.player)
    const {data:artistData,isFetching:isFetchingArtistDetails,error} = useGetArtistDetailsQuery(id);

    // Loading Implementation
    if (isFetchingArtistDetails) {return <Loader title="Searching Artist Details"/>}

    // Error Implementation
    if (error){return <Error/>}

    
    return (
        <div className="flex flex-col">
            <DetailsHeader artistId={id} artistData={artistData}/>

            <RelatedSongs data={Object.values(artistData?.songs)} isPlaying={isPlaying} activeSong={activeSong} artistId={id}/>
        </div>
    )
};

export default ArtistDetails;

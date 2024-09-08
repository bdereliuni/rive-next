import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import styles from "@/styles/Watch.module.scss";
import { setContinueWatching } from "@/Utils/continueWatching";
import { IoReturnDownBack } from "react-icons/io5";
import { FaForwardStep, FaBackwardStep } from "react-icons/fa6";
import { BsHddStack, BsHddStackFill } from "react-icons/bs";
import axiosFetch from "@/Utils/fetchBackend";
import WatchDetails from "@/components/WatchDetails";

const Watch = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [type, setType] = useState<string | null>("");
  const [id, setId] = useState<string | null>(null);
  const [season, setSeason] = useState<number | null>(null);
  const [episode, setEpisode] = useState<number | null>(null);
  const [minEpisodes, setMinEpisodes] = useState(1);
  const [maxEpisodes, setMaxEpisodes] = useState(2);
  const [maxSeason, setMaxSeason] = useState(1);
  const [nextSeasonMinEpisodes, setNextSeasonMinEpisodes] = useState(1);
  const [watchDetails, setWatchDetails] = useState(false);
  const [data, setData] = useState<any>(null);
  const [seasonId, setSeasonId] = useState('');
  const [episodeId, setEpisodeId] = useState('');

  const fetchData = useCallback(async (currentType: string | null, currentId: string | null, currentSeason: string | null, currentEpisode: string | null) => {
    if (currentId && currentType) {
      const res: any = await axiosFetch({ requestID: `${currentType}Data`, id: currentId });
      setData(res);
      setMaxSeason(res?.number_of_seasons || 1);
      
      if (currentType === 'tv' && currentSeason) {
        const seasonNumber = parseInt(currentSeason);
        const seasonData: any = await axiosFetch({
          requestID: 'tvEpisodes',
          id: currentId,
          season: seasonNumber,
        });
        
        if (seasonData?.episodes?.length > 0) {
          setMaxEpisodes(seasonData.episodes[seasonData.episodes.length - 1].episode_number);
          setMinEpisodes(seasonData.episodes[0].episode_number);
          
          const currentSeasonData = res.seasons?.find((s: any) => s.season_number === seasonNumber);
          if (currentSeasonData) {
            setSeasonId(currentSeasonData.id.toString());
          }
          
          if (currentEpisode) {
            const episodeNumber = parseInt(currentEpisode);
            const episodeData = seasonData.episodes.find((e: any) => e.episode_number === episodeNumber);
            if (episodeData) {
              setEpisodeId(episodeData.id.toString());
            }
          }
        }
        
        if (currentEpisode && parseInt(currentEpisode) >= maxEpisodes - 1) {
          const nextSeasonData: any = await axiosFetch({
            requestID: 'tvEpisodes',
            id: currentId,
            season: seasonNumber + 1,
          });
          if (nextSeasonData?.episodes?.length > 0) {
            setNextSeasonMinEpisodes(nextSeasonData.episodes[0].episode_number);
          }
        }
      }
    }
  }, [maxEpisodes]);

  useEffect(() => {
    const currentType = searchParams.get("type");
    const currentId = searchParams.get("id");
    const currentSeason = searchParams.get("season");
    const currentEpisode = searchParams.get("episode");

    setType(currentType);
    setId(currentId);
    setSeason(currentSeason ? parseInt(currentSeason) : null);
    setEpisode(currentEpisode ? parseInt(currentEpisode) : null);
    
    if (currentType && currentId) {
      setContinueWatching({ type: currentType, id: currentId });
    }
    
    fetchData(currentType, currentId, currentSeason, currentEpisode);
  }, [searchParams, fetchData]);

  function handleBack() {
    if (type && id) {
      router.push(`/detail?type=${type}&id=${id}`);
    } else {
      router.push('/');
    }
  }

  function handleBackward() {
    if (episode && episode > minEpisodes && season && id) {
      router.push(`/watch?type=tv&id=${id}&season=${season}&episode=${episode - 1}`);
    }
  }
  
  function handleForward() {
    if (episode && season && id) {
      if (episode < maxEpisodes) {
        router.push(`/watch?type=tv&id=${id}&season=${season}&episode=${episode + 1}`);
      } else if (season + 1 <= maxSeason) {
        router.push(`/watch?type=tv&id=${id}&season=${season + 1}&episode=${nextSeasonMinEpisodes}`);
      }
    }
  }

  function getSource() {
    if (!data || !id || !type) return '';

    let url = `https://watchondemand.buzz/media/tmdb-`;
    if (type === 'tv') {
      url += `tv-${id}`;
      if (seasonId && episodeId) {
        url += `/${seasonId}/${episodeId}`;
      }
    } else {
      url += `movie-${id}`;
    }
    return url;
  }

  return (
    <div className={styles.watch}>
      <div onClick={handleBack} className={styles.backBtn}>
        <IoReturnDownBack
          data-tooltip-id="tooltip"
          data-tooltip-content="go back"
        />
      </div>
      {type === "tv" && (
        <div className={styles.episodeControl}>
          <div
            onClick={handleBackward}
            data-tooltip-id="tooltip"
            data-tooltip-html={
              episode && episode > minEpisodes
                ? "<div>Previous episode <span class='tooltip-btn'>SHIFT + P</span></div>"
                : `Start of season ${season}`
            }
          >
            <FaBackwardStep
              className={episode && episode <= minEpisodes ? styles.inactive : ""}
            />
          </div>
          <div
            onClick={handleForward}
            data-tooltip-id="tooltip"
            data-tooltip-html={
              episode && episode < maxEpisodes
                ? "<div>Next episode <span class='tooltip-btn'>SHIFT + N</span></div>"
                : season && season + 1 <= maxSeason
                  ? `<div>Start season ${season + 1} <span class='tooltip-btn'>SHIFT + N</span></div>`
                  : `End of season ${season}`
            }
          >
            <FaForwardStep
              className={`${episode && season && episode >= maxEpisodes && season >= maxSeason ? styles.inactive : ""} ${episode && season && episode >= maxEpisodes && season < maxSeason ? styles.nextSeason : ""}`}
            />
          </div>
        </div>
      )}
      <div
        onClick={() => setWatchDetails(!watchDetails)}
        data-tooltip-id="tooltip"
        data-tooltip-html={
          !watchDetails
            ? "More <span class='tooltip-btn'>SHIFT + M</span>"
            : "close <span class='tooltip-btn'>SHIFT + M</span>"
        }
      >
        {watchDetails ? <BsHddStackFill /> : <BsHddStack />}
      </div>
      {watchDetails && (
        <WatchDetails
          id={id}
          type={type}
          data={data}
          season={season}
          episode={episode}
          setWatchDetails={setWatchDetails}
        />
      )}
      {id && (
        <iframe
          src={getSource()}
          className={styles.iframe}
          allowFullScreen
          allow="autoplay; fullscreen"
          loading="lazy"
        ></iframe>
      )}
    </div>
  );
};

export default Watch;
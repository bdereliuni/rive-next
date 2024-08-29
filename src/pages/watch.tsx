import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import styles from "@/styles/Watch.module.scss";
import { setContinueWatching } from "@/Utils/continueWatching";
import { toast } from "sonner";
import { IoReturnDownBack } from "react-icons/io5";
import { FaForwardStep, FaBackwardStep } from "react-icons/fa6";
import { BsHddStack, BsHddStackFill } from "react-icons/bs";
import axiosFetch from "@/Utils/fetchBackend";
import WatchDetails from "@/components/WatchDetails";

const Watch = () => {
  const params = useSearchParams();
  const { back, push } = useRouter();
  const [type, setType] = useState<string | null>("");
  const [id, setId] = useState<any>();
  const [season, setSeason] = useState<any>();
  const [episode, setEpisode] = useState<any>();
  const [minEpisodes, setMinEpisodes] = useState(1);
  const [maxEpisodes, setMaxEpisodes] = useState(2);
  const [maxSeason, setMaxSeason] = useState(1);
  const [nextSeasonMinEpisodes, setNextSeasonMinEpisodes] = useState(1);
  const [watchDetails, setWatchDetails] = useState(false);
  const [data, setData] = useState<any>();
  const [seasonId, setSeasonId] = useState('');
  const [episodeId, setEpisodeId] = useState('');

  useEffect(() => {
    setType(params.get("type"));
    setId(params.get("id"));
    setSeason(params.get("season"));
    setEpisode(params.get("episode"));
    setContinueWatching({ type: params.get("type"), id: params.get("id") });
    
    const fetch = async () => {
      const res: any = await axiosFetch({ requestID: `${type}Data`, id: id });
      setData(res);
      setMaxSeason(res?.number_of_seasons);
      
      if (type === 'tv') {
        const seasonData = await axiosFetch({
          requestID: 'tvEpisodes',
          id: id,
          season: season,
        });
        
        if (seasonData?.episodes?.length > 0) {
          setMaxEpisodes(seasonData.episodes[seasonData.episodes.length - 1].episode_number);
          setMinEpisodes(seasonData.episodes[0].episode_number);
          
          const currentSeasonData = res.seasons.find((s: any) => s.season_number === parseInt(season));
          if (currentSeasonData) {
            setSeasonId(currentSeasonData.id);
          }
          
          const episodeData = seasonData.episodes.find((e: any) => e.episode_number === parseInt(episode));
          if (episodeData) {
            setEpisodeId(episodeData.id.toString());
          }
        }
        
        if (parseInt(episode) >= maxEpisodes - 1) {
          const nextSeasonData = await axiosFetch({
            requestID: 'tvEpisodes',
            id: id,
            season: parseInt(season) + 1,
          });
          if (nextSeasonData?.episodes?.length > 0) {
            setNextSeasonMinEpisodes(nextSeasonData.episodes[0].episode_number);
          }
        }
      }
    };
    
    if (id) fetch();
  }, [params, id, season, episode, type]);

  function handleBackward() {
    if (episode > minEpisodes)
      push(`/watch?type=tv&id=${id}&season=${season}&episode=${parseInt(episode) - 1}`);
  }
  
  function handleForward() {
    if (episode < maxEpisodes)
      push(`/watch?type=tv&id=${id}&season=${season}&episode=${parseInt(episode) + 1}`);
    else if (parseInt(season) + 1 <= maxSeason)
      push(`/watch?type=tv&id=${id}&season=${parseInt(season) + 1}&episode=${nextSeasonMinEpisodes}`);
  }

  function getSource() {
    if (!data) return '';

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
      <div onClick={() => back()} className={styles.backBtn}>
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
              episode > minEpisodes
                ? "<div>Previous episode <span class='tooltip-btn'>SHIFT + P</span></div>"
                : `Start of season ${season}`
            }
          >
            <FaBackwardStep
              className={`${episode <= minEpisodes ? styles.inactive : null}`}
            />
          </div>
          <div
            onClick={handleForward}
            data-tooltip-id="tooltip"
            data-tooltip-html={
              episode < maxEpisodes
                ? "<div>Next episode <span class='tooltip-btn'>SHIFT + N</span></div>"
                : parseInt(season) + 1 <= maxSeason
                  ? `<div>Start season ${parseInt(season) + 1} <span class='tooltip-btn'>SHIFT + N</span></div>`
                  : `End of season ${season}`
            }
          >
            <FaForwardStep
              className={`${episode >= maxEpisodes && season >= maxSeason ? styles.inactive : null} ${episode >= maxEpisodes && season < maxSeason ? styles.nextSeason : null}`}
            />
          </div>
        </div>
      )}
      <div
        onClick={() => setWatchDetails(!watchDetails)}
        data-tooltip-id="tooltip"
        data-tooltip-html={
          !watchDetails
            ? "More <span class='tooltip-btn'>SHIFT + M</span></div>"
            : "close <span class='tooltip-btn'>SHIFT + M</span></div>"
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
      <div className={`${styles.loader} skeleton`}></div>
      {id && (
        <iframe
          scrolling="no"
          src={getSource()}
          className={styles.iframe}
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
};

export default Watch;
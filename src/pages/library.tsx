import { useState, useEffect } from 'react';
import axiosFetch from '@/Utils/fetch';
import styles from "@/styles/Library.module.scss";
import MovieCardSmall from '@/components/MovieCardSmall';
import ReactPaginate from "react-paginate"; // for pagination
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import { MdFilterAlt, MdFilterAltOff } from "react-icons/md";
import Skeleton from 'react-loading-skeleton';
import { getBookmarks, removeBookmarks } from '@/Utils/bookmark';
import { getContinueWatching, removeContinueWatching } from '@/Utils/continueWatching';
// import MoviePoster from '@/components/MoviePoster';

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const dummyList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const Library = () => {
  const [category, setCategory] = useState("watchlist"); // latest, trending, topRated
  const [subCategory, setSubCategory] = useState("movie");
  const [ids, setIds] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        let arr: any = [];
        ids.map(async (ele: any) => {
          const data = await axiosFetch({ requestID: `${subCategory}Data`, id: ele });
          arr.push(data);
          console.log({ arr });
          setData(arr);
        })
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [ids]);

  useEffect(() => {
    // fetch bookmarks
    console.log(getBookmarks());

    if (category === "watchlist") {
      subCategory === "movie" ? setIds(getBookmarks()?.movie) : setIds(getBookmarks()?.tv);
    }
    else if (category === "continueWatching") {
      subCategory === "movie" ? setIds(getContinueWatching()?.movie) : setIds(getContinueWatching()?.tv);
    }
  }, [category, subCategory]);
  return (
    <div className={styles.MoviePage}>
      {/* if login, "hello username" */}
      {/* else, "Login to sunc to cloud" */}
      <h1>Hola!</h1>
      <div className={styles.category}>
        <p className={`${category === "watchlist" ? styles.active : styles.inactive}`} onClick={() => setCategory("watchlist")}>Watchlist</p>
        <p className={`${category === "continueWatching" ? styles.active : styles.inactive}`} onClick={() => setCategory("continueWatching")}>Continue Watching</p>
      </div>
      <div className={styles.category}>
        <p className={`${subCategory === "movie" ? styles.active : styles.inactive}`} onClick={() => setSubCategory("movie")}>Movie</p>
        <p className={`${subCategory === "tv" ? styles.active : styles.inactive}`} onClick={() => setSubCategory("tv")}>TV Shows</p>
      </div>

      <div className={styles.movieList}>
        {
          data.map((ele: any) => {
            return (
              <MovieCardSmall data={ele} media_type={subCategory} />
            )
          })
        }
        {
          data?.length === 0 && dummyList.map((ele) => (
            <Skeleton className={styles.loading} />
          ))
        }
      </div>
    </div>
  )
}

export default Library;
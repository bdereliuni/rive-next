import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import axiosFetch from "@/Utils/fetchBackend";
import "react-loading-skeleton/dist/skeleton.css";
import Carousel from "../Carousel";
import Link from "next/link";
import {
  BsBookmarkPlus,
  BsFillBookmarkCheckFill,
  BsShare,
} from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import {
  setBookmarks,
  checkBookmarks,
  removeBookmarks,
} from "@/Utils/bookmark";
import { navigatorShare } from "@/Utils/share";
import Skeleton from "react-loading-skeleton";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/Utils/firebase";

const HomeHero = () => {
  const [data, setData] = useState<any[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [index, setIndex] = useState(0);
  const [bookmarked, setBookmarked] = useState<boolean>(false);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await axiosFetch({ requestID: "trending" });
        setData(response.results || []);
        const arr: string[] = response.results
          ? response.results.map((ele: any) => 
              process.env.NEXT_PUBLIC_TMBD_IMAGE_URL + ele.backdrop_path
            ).filter(Boolean)
          : [];
        setImages(arr.length > 0 ? arr : ["/images/logo.svg"]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user.uid);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const check = async () => {
      if (user && data[index]) {
        const isBookmarked = await checkBookmarks({
          userId: user,
          type: data[index].media_type,
          id: data[index].id,
        });
        setBookmarked(isBookmarked);
      }
    };
    check();
  }, [index, data, user]);

  const handleBookmarkAdd = () => {
    if (user && data[index]) {
      setBookmarks({
        userId: user,
        type: data[index].media_type,
        id: data[index].id,
      });
      setBookmarked(true);
    }
  };

  const handleBookmarkRemove = () => {
    if (user && data[index]) {
      removeBookmarks({
        userId: user,
        type: data[index].media_type,
        id: data[index].id,
      });
      setBookmarked(false);
    }
  };

  const handleShare = () => {
    if (data[index]) {
      const url = `/detail?type=${data[index].media_type}&id=${data[index].id}`;
      navigatorShare({ text: data[index].title || data[index].name, url: url });
    }
  };

  return (
    <div className={styles.HomeHero}>
      <div className={styles.HomeCarousel}>
        {images.length > 0 ? (
          <Carousel
            imageArr={images}
            setIndex={setIndex}
            mobileHeight="60vh"
            desktopHeight="80vh"
            objectFit={"cover"}
          />
        ) : (
          <Skeleton className={styles.CarouselLoading} />
        )}
        <div className={styles.curvy}></div>
        <div className={styles.curvy2}></div>
        <div className={styles.curvy3}></div>
        <div className={styles.curvy4}></div>
        <div className={styles.HomeHeroMeta}>
          <h1
            data-tooltip-id="tooltip"
            data-tooltip-content={
              data[index] ? (data[index].title || data[index].name || "name") : "Loading..."
            }
          >
            {data[index] ? (data[index].title || data[index].name) : <Skeleton />}
          </h1>
          <div className={styles.HomeHeroMetaRow2}>
            <p className={styles.type}>
              {data[index] ? (
                data[index].media_type === "movie" ? "MOVIE" : "SHOW"
              ) : (
                <Skeleton />
              )}
            </p>
            {data[index] ? (
              <>
                <Link
                  className={styles.links}
                  href={`${
                    data[index].media_type === "movie"
                      ? `/watch?type=${data[index].media_type}&id=${data[index].id}`
                      : `/watch?type=${data[index].media_type}&id=${data[index].id}&season=1&episode=1`
                  }`}
                  data-tooltip-id="tooltip"
                  data-tooltip-content="Watch Online"
                >
                  watch <FaPlay />
                </Link>
                <Link
                  className={styles.links}
                  href={`/detail?type=${data[index].media_type}&id=${data[index].id}`}
                  data-tooltip-id="tooltip"
                  data-tooltip-content="Know More"
                >
                  detail
                </Link>

                {bookmarked ? (
                  <BsFillBookmarkCheckFill
                    className={styles.HomeHeroIcons}
                    onClick={handleBookmarkRemove}
                    data-tooltip-id="tooltip"
                    data-tooltip-content="Remove from Watchlist"
                  />
                ) : (
                  <BsBookmarkPlus
                    className={styles.HomeHeroIcons}
                    onClick={handleBookmarkAdd}
                    data-tooltip-id="tooltip"
                    data-tooltip-content="Add to Watchlist"
                  />
                )}
                <BsShare
                  className={styles.HomeHeroIcons}
                  onClick={handleShare}
                  data-tooltip-id="tooltip"
                  data-tooltip-content="Share"
                />
              </>
            ) : (
              <div>
                <Skeleton width={200} count={1} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHero;
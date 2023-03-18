import React, { useEffect } from "react";

interface PlayerProps {
  videoId: string;
}

declare global {
  interface Window {
    YT: any;
  }
}

function PlayerVideo(props: PlayerProps) {
  const { videoId } = props;

  useEffect(() => {
    // This function creates a new YouTube player object and attaches it to the DOM
    // when the component is mounted.
    function createPlayer() {
      // @ts-ignore
      window.YT.ready(function () {
        // @ts-ignore
        const player = new window.YT.Player("player", {
          videoId,
          autoplay: true,
        });
      });
    }

    // If the YouTube Player API script has not been loaded yet, load it.
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      // Call the createPlayer function when the script is loaded.
      tag.onload = createPlayer;
    } else {
      // The script is already loaded, so just call the createPlayer function.
      createPlayer();
    }
  }, [videoId]);

  return <div id="player"></div>;
}

export default PlayerVideo;

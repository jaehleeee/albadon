import { AxiosResponse } from "axios";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { infoBarState } from "../data/Atoms";

export const useAPICall = (
  subscribed: any,
  callAPI: () => Promise<AxiosResponse<any>>,
  successMsg: string,
  failMsg: string
) => {
  const setInfoBar = useSetRecoilState(infoBarState);

  useEffect(() => {
    callAPI().then(() => {});

    setInterval(() => {
      setInfoBar({
        open: false,
        label: "",
        type: "",
      });
    }, 8000);
  }, [subscribed]);
};

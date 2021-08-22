import { useEffect } from "react";
import { Loadable, useSetRecoilState } from "recoil";
import { infoBarState } from "../data/Atoms";

export function useAPICall<T>(
  loadable: Loadable<T>,
  onlyOnError: boolean = true,
  infoLabel?: string
) {
  const setInfoBar = useSetRecoilState(infoBarState);

  useEffect(() => {
    if (!onlyOnError && loadable.state === "hasValue") {
      setInfoBar({
        open: true,
        label: infoLabel
          ? `${infoLabel}에 성공했습니다 😀`
          : "서버와의 통신에 성공했습니다 😀",
        type: "success",
      });
      setInterval(() => {
        setInfoBar({
          open: false,
          label: "",
          type: "",
        });
      }, 8000);
    } else if (loadable.state === "hasError") {
      setInfoBar({
        open: true,
        label: infoLabel
          ? `${infoLabel}에 실패했어요 😭`
          : "서버와의 통신에 실패했어요 😭",
        type: "error",
      });
      setInterval(() => {
        setInfoBar({
          open: false,
          label: "",
          type: "",
        });
      }, 8000);
    }
  }, [loadable]);

  return loadable;
}

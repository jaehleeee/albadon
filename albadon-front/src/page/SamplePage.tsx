import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { ExcelUploadButton } from "../component/ExcelUploadButton";
import {ExcelDownloadButton} from "../component/ExcelDownloadButton"
import { SampleComponent } from "../component/SampleComponent";
import { currentStoreId } from "../data/Atoms";

export const SamplePage: React.FC = () => {

  const [storeId, setStoreId] = useRecoilState(currentStoreId);

  return (
    <div id="SamplePage">
      <ExcelUploadButton/>
     <ExcelDownloadButton/>
      {[1, 2, 3, 4, 5].map((item) => {
        return <SampleComponent title={`${item}번째 sampleComponent`} />;
      })}
      <div id="recoilTest">
        <button
          onClick={() => {
            // setStoreId(storeId + 1);
          }}
        >
          storeId 늘리기

        </button>

      </div>
    </div>
  );
};

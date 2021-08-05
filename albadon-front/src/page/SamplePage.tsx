import React from "react";
import { ExcelUploadButton } from "../component/ExcelUploadButton";
import { ExcelDownloadButton } from "../component/ExcelDownloadButton";
import { SampleComponent } from "../component/SampleComponent";

export const SamplePage: React.FC = () => {
  return (
    <div id="SamplePage">
      <ExcelUploadButton />
      <ExcelDownloadButton />
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

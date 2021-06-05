import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { SampleComponent } from "../component/SampleComponent";
import { currentStoreId } from "../recoil/Atom";
import { currentStore } from "../recoil/Seletor";

export const SamplePage: React.FC = () => {
  const store = useRecoilValue(currentStore);
  const [storeId, setStoreId] = useRecoilState(currentStoreId);
  return (
    <div id="SamplePage">
      {[1, 2, 3, 4, 5].map((item) => {
        return <SampleComponent title={`${item}번째 sampleComponent`} />;
      })}
      <div id="recoilTest">
        <button
          onClick={() => {
            setStoreId(storeId + 1);
          }}
        >
          storeId 늘리기
        </button>
        {store.storeName}
      </div>
    </div>
  );
};

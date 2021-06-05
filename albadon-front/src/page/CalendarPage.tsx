import React, { useEffect, useState } from "react";
import { SampleComponent } from "../component/SampleComponent";

export const SamplePage: React.FC = () => {
  return (
    <div id="SamplePage">
      {[1, 2, 3, 4, 5].map((item) => {
        return <SampleComponent title={`${item}번째 sampleComponent`} />;
      })}
    </div>
  );
};

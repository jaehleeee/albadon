import React, { useEffect, useState } from "react";

export interface props {
  title: string;
}

export const SampleComponent: React.FC<props> = ({ title, children }) => {
  return <div id="SampleComponent">{title}</div>;
};

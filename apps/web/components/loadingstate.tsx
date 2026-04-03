import React from "react";
import "../styles/LoadingState.css";

type SkeletonBlockProps = {
  width: number | string;
  height: number;
};

const SkeletonBlock: React.FC<SkeletonBlockProps> = ({ width, height }) => {
  const style: React.CSSProperties = {
    width,
    height,
  };

  return <div className="skeleton" style={style} />;
};

const CardSkeleton: React.FC = () => (
  <div className="card">
    <div className="headerRow">
      <SkeletonBlock width={140} height={16} />
      <SkeletonBlock width={72} height={24} />
    </div>
    <SkeletonBlock width="80%" height={12} />
    <div className="mtSm">
      <SkeletonBlock width="60%" height={12} />
    </div>
    <div className="mtMd">
      <SkeletonBlock width="100%" height={44} />
    </div>
  </div>
);

export const LoadingState: React.FC = () => (
  <div className="loadingState">
    {[1, 2, 3].map((i) => (
      <CardSkeleton key={i} />
    ))}
  </div>
);
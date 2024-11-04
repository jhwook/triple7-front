import { useEffect, useState } from 'react';
import CandleChart from './CandleChart';

export default function AmChart({ assetInfo, chartOpt, openData }) {
  const [busy, setBusy] = useState(false);
  console.log(assetInfo);
  useEffect(() => {
    if (!assetInfo?.symbol) return;

    setBusy(true);
    setTimeout(() => setBusy(false), 1000);
  }, [assetInfo]);

  if (busy) return <></>;
  else
    return (
      <>
        <CandleChart
          assetInfo={assetInfo}
          chartOpt={chartOpt}
          openedData={openData}
        />
      </>
    );
}

import { useEffect, useState } from "react";
import { noop } from "../../helpers.ts";
import { API } from "../../api/api.ts";
import { TJoinProductionOptions, TLine } from "./types.ts";

type TProps = {
  joinProductionOptions: TJoinProductionOptions | null;
};

export const useLinePolling = ({ joinProductionOptions }: TProps) => {
  const [line, setLine] = useState<TLine | null>(null);
  useEffect(() => {
    if (!joinProductionOptions) return noop;

    const productionId = parseInt(joinProductionOptions.productionId, 10);
    const lineId = parseInt(joinProductionOptions.lineId, 10);

    const interval = window.setInterval(() => {
      API.fetchProductionLine(productionId, lineId)
        .then((l) => setLine(l))
        .catch(console.error);
    }, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, [joinProductionOptions]);

  return line;
};

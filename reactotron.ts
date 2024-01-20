import Reactotron from "reactotron-react-native";
import {
  QueryClientManager,
  reactotronReactQuery,
} from "reactotron-react-query";

import { queryClient } from "@/queryClient";

const queryClientManager = new QueryClientManager({
  queryClient,
} as any);
Reactotron.use(reactotronReactQuery(queryClientManager) as any)
  .configure({
    onDisconnect: () => {
      queryClientManager.unsubscribe();
    },
  })
  .useReactNative()
  .connect();

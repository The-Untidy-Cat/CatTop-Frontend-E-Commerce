import { SearchBox } from "@/components/Search";
import ReduxProvider from "@/utils/redux/provider";

const App = () => {
  return (
    <ReduxProvider>
      <div className="flex p-2">
        <SearchBox />
      </div>
    </ReduxProvider>
  );
};
export default App;

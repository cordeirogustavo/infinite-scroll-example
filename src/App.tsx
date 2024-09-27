import "./App.css";
import submitters from "./greather-object.json";
import { memo, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

interface Submitter {
  status: string;
  createdAt: string;
  name: string;
  company: string;
  email: string;
  language: string;
}

interface SubmittersData {
  data: Submitter[];
}

interface Data {
  submitters: SubmittersData;
}

const RenderItems = memo(({ items }: { items: Submitter[] }) => {
  const tdStyle = "text-sm h-14 text-center text-nowrap border border-gray-300";

  return (
    <>
      {items.map((sub) => (
        <tr key={sub.email}>
          <td className={tdStyle}>
            <p>{sub.status}</p>
          </td>
          <td className={tdStyle}>{sub.createdAt}</td>
          <td className={tdStyle}>{sub.name}</td>
          <td className={tdStyle}>{sub.company}</td>
          <td className={tdStyle}>{sub.email}</td>
          <td className={tdStyle}>{sub.language}</td>
          <td className="flex flex-row align-center justify-center gap-1">
            <button className="text-sm text-blue-500">action 1</button>
            <button className="text-sm text-blue-500">action 2</button>
            <button className="text-sm text-blue-500">action 3</button>
            <button className="text-sm text-blue-500">action 4</button>
            <button className="text-sm text-blue-500">action 5</button>
          </td>
        </tr>
      ))}
    </>
  );
});

function App() {
  const data = submitters as Data;
  const [items, setItems] = useState<Submitter[]>(
    data.submitters.data.slice(0, 20)
  );
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = () => {
    if (items.length >= data.submitters.data.length) {
      setHasMore(false);
      return;
    }

    const nextItems = data.submitters.data.slice(
      items.length,
      items.length + 20
    );
    setItems((prevItems) => [...prevItems, ...nextItems]);
  };

  return (
    <div className="flex h-full items-center">
      <div id="scrollableDiv" className="overflow-y-auto h-[800px] w-full">
        <InfiniteScroll
          dataLength={items.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={<p style={{ textAlign: "center" }}>End of List</p>}
          scrollableTarget="scrollableDiv"
        >
          <table className="w-full">
            <thead>
              <tr>
                <th className="w-12" />
                <th className="w-32" />
                <th className="w-auto" />
                <th className="w-auto" />
                <th className="w-auto" />
                <th className="w-auto" />
                <th className="w-32" />
              </tr>
            </thead>
            <tbody>
              <RenderItems items={items} />
            </tbody>
          </table>
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default App;

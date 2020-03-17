import React, { createRef, useState } from "react";
import { RootState } from "../../types";

type Props = {
  state: RootState;
};

const Contents: React.FC<Props> = ({ state }) => {
  const [selectedItem, setSelectedItem] = useState<RootState["ranking"][0]>({
    title: "",
    author: "",
    rank: ""
  });

  const max = state.ranking.length;

  const startRandomSelect = () => {
    const rand = Math.floor(Math.random() * Math.floor(max));
    setSelectedItem(state.ranking[rand]);
  };

  const inputRef = createRef<HTMLInputElement>();
  const startSelect = () => {
    if (!inputRef.current) {
      return;
    }
    const target = Number(inputRef.current.value) - 1;
    if (0 <= target && target < max) {
      setSelectedItem(state.ranking[target]);
    }
  };

  return (
    <>
      <section>
        <h1>抽選</h1>
        <div>
          <input
            placeholder={`1〜${max}`}
            inputMode={"numeric"}
            id={"input"}
            ref={inputRef}
          />
          <button onClick={startSelect}>入力して選択</button>
        </div>
        <button onClick={startRandomSelect}>全部からランダム抽選</button>
      </section>
      <section>
        <h1>抽選結果</h1>
        <ul>
          <li>タイトル：{selectedItem.title}</li>
          <li>作者：{selectedItem.author}</li>
          <li>順位：{selectedItem.rank}</li>
        </ul>
      </section>
    </>
  );
};

export default Contents;

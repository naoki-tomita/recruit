import { NextPage } from "next";

const NewCandidates: NextPage = () => {
  return (
    <>
    <h2>あたらしい候補者を登録する</h2>
    <div>
      <label>なまえ</label>
      <input />
    </div>
    <div>
      <label>どこ経由？</label>
      <select>
        <option>workable</option>
        <option>wantedly</option>
        <option>紹介</option>
        <option>直接応募</option>
        <option>エージェント</option>
        <option>転職ドラフト</option>
      </select>
    </div>
    </>
  );
};

export default NewCandidates;

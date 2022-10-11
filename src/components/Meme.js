import React from "react";
const Meme = () => {
  const [AllMeme, setAllMeme] = React.useState([]);
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });

  React.useEffect(() => {
    async function getMemes() {
      const res = await fetch("https://api.imgflip.com/get_memes");
      const data = await res.json();
      setAllMeme(data.data.memes);
    }
    getMemes();

    return () => {};
  }, []);
  console.log(AllMeme);

  const getMeme = () => {
    const randomNumber = Math.floor(Math.random() * AllMeme.length);
    let url = AllMeme[randomNumber].url;
    setMeme((prev) => ({
      ...prev,
      randomImage: url,
    }));
  };

  const changeHandler = (event) => {
    setMeme((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value],
    }));
  };

  return (
    <main>
      <div className="form">
        <input
          className="form--input"
          type={"text"}
          placeholder="Top text"
          name="topText"
          onChange={changeHandler}
        />
        <input
          className="form--input"
          type={"text"}
          placeholder="Bottom text"
          name="bottomText"
          onChange={changeHandler}
        />
        <button className="form--button" onClick={getMeme}>
          Get a new meme image
        </button>
      </div>
      <div className="meme">
        <img src={meme.randomImage} className="meme--image" sizes={20} />
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
    </main>
  );
};

export default Meme;

import * as React from "react";

type Props = {
  preloadSate: {};
};

const Top: React.FC<Props> = ({ preloadSate }) => {
  return (
    <html lang={"ja"}>
      <head>
        <meta charSet={"utf-8"} />
        <meta
          name={"viewport"}
          content={"width=device-width, initial-scale=1"}
        />
        <meta name={"theme-color"} content={"#000000"} />
        <title>ボカロランキングからランダムセレクト</title>
      </head>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__store = ${JSON.stringify(preloadSate)}`
          }}
        />
        <div id="root" />
        <script src={"/static/js/bundle.js"} />
        <div
          dangerouslySetInnerHTML={{
            __html:
              "<!-- 利用しているOSSは package.json を参照してください。 https://github.com/lovetanpopo/vocaloid-karaoke-ranking-fe -->"
          }}
        />
      </body>
    </html>
  );
};

export default Top;

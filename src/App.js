import { memo, useEffect, useState } from "react";
import { cats } from "./data";
import { AdoptCatForm } from "./adopt-form";
import orderBy from "lodash/orderBy";
import styles from "./styles.module.scss";

// Yeni bir kedi seçtiğimizde önceki seçtiğimiz kedinin görüntülenme
// sayacı sıfırlanıyordu çünkü bu değeri saklayan state'i ListItem'da tutuyorduk.
// Farklı bir kedi seçtiğimizde ListItem yeniden oluşturuluyor ve local state
// ilk değeri olan 0 oluyor.

// Kedileri her yeniden sıraladığımızda listItem bileşeni yeniden oluşturulduğundan
// eğer yerel durumları viewCount buna uygun şekilde güncellenmezse görüntülenme sayısı yerinde kalabilir.

// Kedi seçtikçe veya seçimi sıfırladıkça input değerinin sıfırlanmasını
// girişleri kontrolsüz değil kontrollü olacak şekilde ayarlayarak istediğimiz
// zaman temizlenecek şekilde düzenleyebiliriz.

// Ayrıca önbelleği devredışı bıraktığımızda her kedi seçimimizde gerçekleşen gereksiz fetch
// isteğinin React.memo kullanarak önüne geçerek uygulamayı hızlandırmış olduk.

const ListItem = ({
  cat,
  viewCounts,
  setViewCounts,
  activeCat,
  setActiveCat
}) => {
  const viewCount = viewCounts[cat.name] || 0;

  const classNames = [
    styles.button,
    cat.name === activeCat?.name ? styles.buttonActive : ""
  ];

  const onCatSelect = () => {
    setActiveCat(cat);
    setViewCounts((prevViewCounts) => ({
      ...prevViewCounts,
      [cat.name]: (prevViewCounts[cat.name] || 0) + 1
    }));
  };

  return (
    <li>
      <button className={classNames.join(" ")} onClick={onCatSelect}>
        <img src={cat.src} width="100" alt={cat.name} />
        <p>
          {cat.name} <br />
          Görüntüleme: {viewCount}
        </p>
      </button>
    </li>
  );
};

const MemoizedListItem = memo(ListItem, (before, after) => {
  return (
    before.viewCounts === after.viewCounts &&
    before.activeCat === after.activeCat
  );
});

export default function App() {
  const [activeCat, setActiveCat] = useState(cats[0]);
  const [sort, setSort] = useState("asc");
  const [viewCounts, setViewCounts] = useState({});
  const [text, setText] = useState("");
  const [mail, setMail] = useState("");

  useEffect(() => {
    setText("");
    setMail("");
  }, [activeCat, sort]);

  return (
    <>
      <button onClick={() => setSort(sort === "desc" ? "asc" : "desc")}>
        Sıralamak için tıklayın: {sort}
      </button>
      <button
        onClick={() => {
          setActiveCat(undefined);
          setText("");
        }}
      >
        seçimi resetleyin
      </button>
      <div className={styles.container}>
        <ul className={styles.ul}>
          {orderBy(cats, "name", sort).map((cat) => (
            <MemoizedListItem
              viewCounts={viewCounts}
              setViewCounts={setViewCounts}
              cat={cat}
              activeCat={activeCat}
              setActiveCat={setActiveCat}
              key={cat.name}
            />
          ))}
        </ul>
        <AdoptCatForm
          mail={mail}
          setMail={setMail}
          text={text}
          setText={setText}
          cat={activeCat}
        />
      </div>
    </>
  );
}

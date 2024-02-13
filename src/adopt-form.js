import styles from "./styles.module.scss";

export const AdoptCatForm = ({ cat, text, setText, mail, setMail }) => {
  return (
    <div>
      {cat ? <p>Bu kediyi sahiplenin: {cat.name}</p> : null}
      {cat ? (
        <p>
          İsminizi giriniz:
          <br />
          <input
            type="text"
            id="name"
            className={styles.input}
            placeholder="isminiz buraya"
            onChange={(e) => setText(e.target.value)}
            value={text}
            pattern="[A-Z]+"
          />
          <br />
          <button
            onClick={() => {
              setMail("");
              setText("");
            }}
          >
            Sahiplenme talebi gönderin
          </button>
        </p>
      ) : (
        <p>
          Lütfen bize e-mail bırakın, böylece sizinle iletişime geçelim:
          <br />
          <input
            type="email"
            id="email"
            className={styles.input}
            placeholder="email buraya "
            onChange={(e) => setMail(e.target.value)}
            value={mail}
          />
          <br />
          <button
            onClick={() => {
              setText("");
              setMail("");
            }}
          >
            bilgi talebi gönderin
          </button>
        </p>
      )}
    </div>
  );
};

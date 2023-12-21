import styles from "./radioButton.module.css";

interface RadioButtonProps {
  list: { label: string; value: string }[];
  value: string;
  onSwitch: (value: string) => void;
}

const RadioButton = ({ list, value, onSwitch }: RadioButtonProps) => {
  return (
    <fieldset className={styles.root}>
      {list.map(({ label, value: listValue }) => {
        return (
          <label className={styles.label} onClick={() => onSwitch(listValue)}>
            <input
              className={styles.input}
              type="radio"
              name="contact"
              value={listValue}
              checked={listValue === value}
            />
            <span className={styles.span}>{label}</span>
          </label>
        );
      })}
    </fieldset>
  );
};

export default RadioButton;

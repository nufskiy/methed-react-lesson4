import {useState, useMemo} from 'react';
import style from './FunctionalComponent.module.css';
import PropTypes from 'prop-types';

export const FunctionalComponent = ({min, max}) => {
  const [userNumber, setUserNumber] = useState('');
  const [result, setResult] = useState('Результат');
  const [count, setCount] = useState(0);
  const [finish, setFinish] = useState(false);
  const [tempRandom, setTempRandom] = useState(0);

  const randomNumber = useMemo(() => {
    setFinish(false);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }, [finish]);

  const handleSubmit = e => {
    e.preventDefault();

    setCount(prevCount => prevCount + 1);
    if (tempRandom + 1 >= 1) {
      setTempRandom(Math.random());
    } else {
      setTempRandom(prev => prev + 1);
    }
    setResult(() => {
      if (!userNumber || userNumber < min || userNumber > max) {
        return `введите число от ${min} до ${max}`;
      }

      if (userNumber > randomNumber) {
        return `${userNumber} больше загаданного числа`;
      }

      if (userNumber < randomNumber) {
        return `${userNumber} меньше загаданного числа`;
      }

      setFinish(true);
      return `Вы угадали, загаданное число ${userNumber},
      число попыток ${count}`;
    });
  };

  const handleChange = e => {
    setUserNumber(e.target.value);
  };

  console.log('rn:', randomNumber);

  return (
    <div className={style.game}>
      <p className={style.result}>{result}</p>
      <p className={style.result}>{tempRandom}</p>
      <form className={style.form} onSubmit={handleSubmit}>
        <label className={style.label} htmlFor='user_number'>
          Угадай число
        </label>
        <input
          className={style.input}
          type='number'
          id='user_number'
          value={userNumber}
          onChange={handleChange}
        />
        <button className={style.btn}>Угадать</button>
      </form>
    </div>
  );
};

FunctionalComponent.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
};

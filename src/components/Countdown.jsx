import { useCountdown } from '../hooks/useCountdown';
import { OFFER_DEADLINE } from '../utils/constants';
import styles from './Countdown.module.css';

export default function Countdown() {
  const { d, h, m, s } = useCountdown(OFFER_DEADLINE);

  return (
    <div className={styles.wrap}>
      <span className={styles.label}>
        <i className="fas fa-circle" /> Offer ends
      </span>
      <div className={styles.units}>
        {[
          { val: d, lbl: 'Days' },
          { val: h, lbl: 'Hrs'  },
          { val: m, lbl: 'Min'  },
          { val: s, lbl: 'Sec'  },
        ].map(({ val, lbl }, i) => (
          <span key={lbl} className={styles.group}>
            {i > 0 && <span className={styles.sep}>:</span>}
            <span className={styles.unit}>
              <span className={styles.num}>{val}</span>
              <span className={styles.unitLbl}>{lbl}</span>
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

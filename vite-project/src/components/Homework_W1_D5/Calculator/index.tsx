import { useState } from 'react';
import styles from './Calculator.module.css';

export default function Calculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleClick = (value: string): void => {
    switch (value) {
      case 'C':
        setInput('');
        setResult('');
        break;
      case '=':
        try {
          const evaluated = evaluate(input);
          setResult(evaluated.toString());
        } catch {
          setResult('Error');
        }
        break;
      default:
        setInput(prev => prev + value);
    }
  };

  const evaluate = (expr: string): number => {
    const safeExpr = expr.replace(/[^-()\d/*+.]/g, '');
    return Function(`"use strict"; return (${safeExpr})`)();
  };

  const buttons = [
    '7', '8', '9', '÷',
    '4', '5', '6', '×',
    '1', '2', '3', '-',
    '0', '.', 'C', '+',
    '='
  ];

  const getButtonClass = (btn: string) => {
    if (btn === '=') return styles.equal;
    if (btn === 'C') return styles.clear;
    if (['÷', '×', '-', '+'].includes(btn)) return styles.operator;
    return styles.number;
  };

  const mapSymbol = (btn: string): string => {
    switch (btn) {
      case '×': return '*';
      case '÷': return '/';
      default: return btn;
    }
  };

  return (
    <div className={styles.calculator}>
      <div className={styles.display}>
        <div className={styles.input}>{input || '0'}</div>
        <div className={styles.result}>{result && `= ${result}`}</div>
      </div>
      <div className={styles.buttons}>
        {buttons.map(btn => (
          <button
            key={btn}
            className={`${styles.button} ${getButtonClass(btn)}`}
            onClick={() => handleClick(mapSymbol(btn))}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
}

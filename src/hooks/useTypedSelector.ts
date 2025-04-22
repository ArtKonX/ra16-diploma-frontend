import { RootState } from '@src/redux/store';
import { useSelector as rawUseSelector } from 'react-redux';

export const useSelector = <T>(selector: (state: RootState) => T) => {
  return rawUseSelector(selector);
};
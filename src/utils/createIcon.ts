import { ReactElement, cloneElement, memo, CSSProperties } from 'react';
import { cn } from '@/utils/cn';

type Props = {
  className?: string;
  style?: CSSProperties;
};

const createIcon = (Icon: ReactElement) => {
  const IconWrapper = ({  className, style }: Props) => {
    return cloneElement(Icon, { className: cn('w-full', className), style });
  };

  return memo(IconWrapper);
};

export default createIcon;
import clsx from 'clsx';
import { X, AlertCircle, CheckCircle, AlertTriangle, Info } from 'lucide-react';

export const Alert = ({ type = 'info', title, message, onClose, className }) => {
  const icons = {
    success: <CheckCircle size={20} />,
    error: <AlertCircle size={20} />,
    warning: <AlertTriangle size={20} />,
    info: <Info size={20} />,
  };

  const styles = {
    success: 'alert-success',
    error: 'alert-error',
    warning: 'alert-warning',
    info: 'alert-info',
  };

  return (
    <div className={clsx('alert flex items-start gap-3', styles[type], className)}>
      <div className="flex-shrink-0">{icons[type]}</div>
      <div className="flex-1">
        {title && <h3 className="font-semibold mb-1">{title}</h3>}
        {message && <p className="text-sm">{message}</p>}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>
      )}
    </div>
  );
};

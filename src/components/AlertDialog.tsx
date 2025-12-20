import { Button } from './Button';

interface AlertDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  onClose: () => void;
}

// =============================================================================
// Custom Modal Component for alerts (instead of alert())
// =============================================================================
const AlertDialog: React.FC<AlertDialogProps> = ({ isOpen, title, message, onClose }) => {
  if (!isOpen) return null;

  return (
    // Changed overlay to use a semi-transparent black with backdrop blur
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      {/* Modal box itself: solid dark gray background, white text */}
      <div className="bg-gray-950 rounded-lg shadow-lg p-6 max-w-sm w-full animate-fade-in border border-primary">
        <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
        <p className="text-sm text-gray-100 mb-6">{message}</p>
        <div className="flex justify-end">
          {/* Button with white/gray border - Corrected className for Button component */}
          <Button onClick={onClose} className="bg-primary text-white hover:bg-primary/90 font-semibold py-2 px-4 rounded-md shadow-md transition-colors duration-200 border border-white">
            OK
          </Button>
        </div>
      </div>
    </div>
  )
};

export { AlertDialog }
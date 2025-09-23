import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';

const CustomModal = ({ open, onOpenChange, title, message, color = 'green', onContinue }) => {
  const getThemeClasses = () => {
    switch (color) {
      case 'red':
        return {
          title: 'text-red-600',
          button: 'bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700',
          iconBg: 'bg-red-100',
          iconColor: 'text-red-600',
          border: 'border-red-200'
        };
      case 'purple':
        return {
          title: 'text-purple-600',
          button: 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700',
          iconBg: 'bg-purple-100',
          iconColor: 'text-purple-600',
          border: 'border-purple-200'
        };
      default: // green
        return {
          title: 'text-green-600',
          button: 'bg-gradient-to-r from-green-600 to-indigo-600 hover:from-green-700 hover:to-indigo-700',
          iconBg: 'bg-green-100',
          iconColor: 'text-green-600',
          border: 'border-green-200'
        };
    }
  };

  const theme = getThemeClasses();

  const getIcon = () => {
    if (color === 'green') {
      return (
        <svg className={`h-6 w-6 ${theme.iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      );
    } else if (color === 'red') {
      return (
        <svg className={`h-6 w-6 ${theme.iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      );
    } else {
      return (
        <svg className={`h-6 w-6 ${theme.iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-white to-indigo-50 rounded-xl shadow-2xl border border-indigo-100">
        <DialogHeader className="space-y-4">
          <div className={`mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 border border-indigo-200`}>
            {getIcon()}
          </div>
          <DialogTitle className={`text-center text-2xl font-bold ${theme.title}`}>
            {title}
          </DialogTitle>
          <DialogDescription className="text-center text-gray-700 text-base">
            {message}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <Button
            onClick={onContinue}
            className={`w-full py-3 px-4 rounded-lg text-white shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700`}
          >
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomModal;
import { forwardRef, InputHTMLAttributes } from 'react';

// Define the type for the props, extending the basic input HTML attributes
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

// Define the component using forwardRef with proper typings
const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  // Define the styles with explicit keys that match possible input types
  const styles = {
    checkbox:
      'rounded border-gray-300 text-gray-700 bg-white dark:bg-gray-950 dark:text-gray-500 shadow-sm disabled:opacity-75',
    file: 'file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:opacity-50 file:dark:text-gray-400',
    default:
      'w-full rounded-md shadow-sm border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-950 disabled:opacity-75',
  } as const;

  // Determine the style based on the input type. Use a type assertion to ensure only valid keys are used.
  const styleKey = (props.type as keyof typeof styles) || 'default';
  const className = styles[styleKey] || styles.default;

  return <input ref={ref} {...props} className={className} />;
});

Input.displayName = 'Input'; // It's good practice to set the displayName when using forwardRef

export default Input;

import { forwardRef, SelectHTMLAttributes } from 'react';

// Define the type for the props, extending the basic select HTML attributes
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {}

// Define the component using forwardRef with proper typings
export default forwardRef<HTMLSelectElement, SelectProps>(function Select(
  props,
  ref
) {
  return (
    <select
      ref={ref}
      {...props}
      className='w-full rounded-md shadow-sm border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-950'
    />
  );
});

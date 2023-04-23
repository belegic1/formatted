import { useCallback, useEffect, useState } from 'react';
import { User } from '../types/User';
import { sortUsers } from '../healpers/sorting';

export const useFormattedData = (data: User[]) => {
  const [formatted, setFormatted] = useState<User[]>(data);
  let formattedData = data;

  const sortBy = useCallback(
    (item: any) => {
      let sorted: User[] = [];
      if (typeof item === 'string') {
        sorted = sortUsers(formattedData, item);
      } else {
        sorted = formattedData.sort(item);
      }
      formattedData = sorted;
      setFormatted(sorted);
    },

    []
  );

  const filter = useCallback((item: any) => {
    const filtered = formattedData.filter(item);
    formattedData = filtered;
    setFormatted(filtered);
  }, []);
  const search = useCallback((item: string) => {
    const foundElements = formattedData.filter((obj) => {
      return Object.values(obj).some((val) => {
        if (typeof val === 'string' || typeof val === 'number') {
          return val.toString().toLowerCase().includes(item.toLowerCase());
        }
        return false;
      });
    });
    formattedData = foundElements;
    setFormatted(foundElements);
  }, []);

  useEffect(() => {
    formattedData = formatted;
  }, [formatted]);

  return { formatted, sortBy, filter, search };
};
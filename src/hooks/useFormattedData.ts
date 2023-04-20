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

// function sortByProperty(arr: User[], prop: string) {
//   // Sort the array using the compare function
//   arr.sort(function (a: any, b: any) {
//     // Compare the values of the 'prop' property
//     if (a[prop].toLowerCase() < b[prop].toLowerCase()) {
//       return -1;
//     } else if (a[prop] > b[prop]) {
//       return 1;
//     } else {
//       return 0;
//     }
//   });
//   return arr;
// }

// function sortByFullName(arr: User[], prop1: string, prop2: string) {
//   // Sort the array using the compare function
//   arr.sort(function (a: any, b: any) {
//     // Compare the values of the 'firstName' property
//     if (a[prop1].toLowerCase() < b[prop2].toLowerCase()) {
//       return -1;
//     } else if (a[prop1].toLowerCase() > b[prop1].toLowerCase()) {
//       return 1;
//     } else {
//       // If first names are equal, compare the values of the 'lastName' property
//       if (a[prop2].toLowerCase() < b[prop2].toLowerCase()) {
//         return -1;
//       } else if (a[prop2].toLowerCase() > b[prop2].toLowerCase()) {
//         return 1;
//       } else {
//         return 0;
//       }
//     }
//   });
//   return arr;
// }

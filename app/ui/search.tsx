'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

// useSearchParams - Permite acceder a los parámetros de la URL actual.
// Por ejemplo, los parámetros de búsqueda para esta 
// URL /dashboard/invoices?page=1&query=pendingse verían así: {page: '1', query: 'pending'}.

// usePathname - Permite leer la ruta de la URL actual.
// Por ejemplo, para la ruta /dashboard/invoices, usePathnamedevolvería '/dashboard/invoices'.

// useRouter - Permite la navegación entre rutas dentro de los componentes del cliente de manera programática. Existen varios métodos que puede utilizar.

import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // function handleSearch(term: string) {
  const handleSearch = useDebouncedCallback((term) => {   // debounce limitar busquedas
    console.log(`Searching... ${term}`);

    const params = new URLSearchParams(searchParams);

    params.set('page', '1');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);

    // - ${pathname}es la ruta actual, en su caso, "/dashboard/invoices".
    // - A medida que el usuario escribe en la barra de búsqueda, params.toString()
    //   traduce esta entrada a un formato compatible con URL.
    // - replace(${pathname}?${params.toString()})actualiza la URL con los datos de búsqueda del usuario.
    //   Por ejemplo, /dashboard/invoices?query=leesi el usuario busca "Lee".
    // - La URL se actualiza sin recargar la página, gracias a la navegación del lado del cliente de Next.js 
    //   (que aprendiste en el capítulo sobre cómo navegar entre páginas ).
    // }

  }, 300); // tiempo ms, si no se escribe se ejecutara

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()} // lee la url y pone el valor por defecto
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}

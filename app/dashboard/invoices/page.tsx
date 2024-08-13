import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/invoices/table';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchInvoicesPages } from '@/app/lib/data';


// Esto funciona, pero repetimos el título de la aplicación en cada página. Si algo cambia, 
// como el nombre de la empresa, tendrás que actualizarlo en cada página.

// En su lugar, puede utilizar el title.templatecampo en el metadataobjeto para definir una plantilla 
// para los títulos de las páginas. Esta plantilla puede incluir el título de la página y cualquier 
// otra información que desee incluir.

import { Metadata } from 'next';

/* export const metadata: Metadata = {
  title: 'Invoices | Acme Dashboard',
}; */

// Debería ver que el título de la página ahora es Invoices | Acme Dashboard.
export const metadata: Metadata = {
    title: 'Invoices',
};

export default async function Page({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        page?: string;
    };
}) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;

    const totalPages = await fetchInvoicesPages(query);

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search invoices..." />
                <CreateInvoice />
            </div>
            <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
                <Table query={query} currentPage={currentPage} />
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    );
}
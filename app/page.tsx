import { Metadata } from 'next';
import { HomePage } from './home-page';

export const metadata: Metadata = {
    title: 'Bullish',
}

export default async function Page() {
    return <HomePage />;
}
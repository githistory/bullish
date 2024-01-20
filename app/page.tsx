import { Metadata } from 'next';
import { gql } from '@apollo/client';
import client from '../lib/apollo-client';
import { HomePage } from './home-page'
import { flatMap } from 'lodash';

export const metadata: Metadata = {
    title: 'Bullish',
}

export default async function Page() {
    return <HomePage />;
}
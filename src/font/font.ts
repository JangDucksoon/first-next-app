import { Roboto } from 'next/font/google';

export const robotoMedium = Roboto({
    subsets: ['latin'],
    weight: '400',
    variable: '--var-roboto-medium',
    display: 'swap'
});

export const robotoMediumItalic = Roboto({
    subsets: ['latin'],
    weight: '500',
    style: 'italic',
    variable: '--var-roboto-medium-italic',
    display: 'swap'
});

export const robotoBold = Roboto({
    subsets: ['latin'],
    weight: '700',
    variable: '--var-roboto-bold',
    display: 'swap'
});

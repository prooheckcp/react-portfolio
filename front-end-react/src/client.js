import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
    projectId: 'kfx9bih3',
    dataset: 'production',
    apiVersion: '2022-02-01',
    useCdn: true,
    token: 'skCP58SYwB3LuHlFhciDv6SLIFCszgJSeFS88ojxOZtpt2ENsILonhsZSqRp2Wsxf5SFuESaqpCsxynAF5rdBMtU6gkv50EjTlEsgMDPtXSDAs6BgrufGHowAcOS2gLADKz5gXH4LsqpWXEbt7WjXUrct95Gi7s4L6iqFo8M86OwSnGNwdvJ',
})